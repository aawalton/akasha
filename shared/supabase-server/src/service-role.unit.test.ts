import { describe, expect, test } from "bun:test"
import {
  DEFAULT_REQUEST_TIMEOUT_MS,
  ERROR_BODY_SUMMARY_CHARS,
  graftPreconnect,
  makeErrorBodySummaryFetch,
  makeTimeoutFetch,
} from "./service-role"

type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>

function abortAwareBaseFetch(): {
  fetch: (input: string | URL | Request, init?: RequestInit) => Promise<Response>
  seenSignals: ReadonlyArray<AbortSignal | null | undefined>
} {
  const seenSignals: Array<AbortSignal | null | undefined> = []
  return {
    seenSignals,
    fetch: (_input, init) => {
      seenSignals.push(init?.signal)
      return new Promise<Response>((_resolve, reject) => {
        if (init?.signal == null) return
        if (init.signal.aborted) {
          reject(init.signal.reason)
          return
        }
        init.signal.addEventListener("abort", () => reject(init.signal?.reason), { once: true })
      })
    },
  }
}

describe("makeTimeoutFetch", () => {
  test("rejects a never-resolving request once the timeout elapses", async () => {
    const base = abortAwareBaseFetch()
    const wrapped = makeTimeoutFetch(20, base.fetch)
    const error = await wrapped("https://example.test/rest/v1/pages").then(
      () => null,
      (err: unknown) => err
    )
    expect(error).toBeInstanceOf(DOMException)
    expect(error instanceof DOMException && error.name).toBe("TimeoutError")
  })

  test("passes a fast response through unchanged", async () => {
    const response = new Response("ok")
    const wrapped = makeTimeoutFetch(1_000, () => Promise.resolve(response))
    expect(await wrapped("https://example.test/rest/v1/pages")).toBe(response)
  })

  test("always forwards a signal to the base fetch", async () => {
    const base = abortAwareBaseFetch()
    const wrapped = makeTimeoutFetch(20, base.fetch)
    await wrapped("https://example.test/rest/v1/pages").catch(() => undefined)
    expect(base.seenSignals).toHaveLength(1)
    expect(base.seenSignals[0]).toBeInstanceOf(AbortSignal)
  })

  test("a caller-supplied signal aborts independently of the timeout", async () => {
    const base = abortAwareBaseFetch()
    const wrapped = makeTimeoutFetch(60_000, base.fetch)
    const controller = new AbortController()
    const pending = wrapped("https://example.test/rest/v1/pages", { signal: controller.signal })
    const callerReason = new Error("caller aborted")
    controller.abort(callerReason)
    const error = await pending.then(
      () => null,
      (err: unknown) => err
    )
    expect(error).toBe(callerReason)
  })

  test("default timeout matches the documented constant", () => {
    expect(DEFAULT_REQUEST_TIMEOUT_MS).toBe(30_000)
  })
})

describe("makeErrorBodySummaryFetch", () => {
  const url = "https://example.test/rest/v1/pages"

  test("passes an ok response through unchanged", async () => {
    const response = new Response(JSON.stringify([{ id: 1 }]), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
    const wrapped = makeErrorBodySummaryFetch(() => Promise.resolve(response))
    expect(await wrapped(url)).toBe(response)
  })

  test("passes a non-ok JSON error through unchanged (PostgREST structured errors)", async () => {
    const response = new Response(JSON.stringify({ message: "permission denied", code: "42501" }), {
      status: 403,
      headers: { "content-type": "application/json; charset=utf-8" },
    })
    const wrapped = makeErrorBodySummaryFetch(() => Promise.resolve(response))
    expect(await wrapped(url)).toBe(response)
  })

  test("rewrites a non-ok HTML body into a truncated one-line summary", async () => {
    const html = `<!DOCTYPE html>\n<html>\n<head><title>502 Bad Gateway</title></head>\n<body>\n${"cloudflare ".repeat(200)}\n</body>\n</html>`
    const wrapped = makeErrorBodySummaryFetch(() =>
      Promise.resolve(
        new Response(html, {
          status: 502,
          statusText: "Bad Gateway",
          headers: { "content-type": "text/html; charset=utf-8" },
        })
      )
    )
    const res = await wrapped(url)
    const body = await res.text()
    expect(res.status).toBe(502)
    expect(res.statusText).toBe("Bad Gateway")
    expect(body).toContain("502")
    expect(body).toContain("text/html")
    expect(body).toContain("<!DOCTYPE html>")
    expect(body).not.toContain("\n")
    expect(body.length).toBeLessThan(ERROR_BODY_SUMMARY_CHARS + 120)
    expect(body).toContain(`${html.length} chars`)
  })

  test("preserves headers minus content-length on a rewritten response", async () => {
    const wrapped = makeErrorBodySummaryFetch(() =>
      Promise.resolve(
        new Response("<html>oops</html>", {
          status: 502,
          headers: {
            "content-type": "text/html",
            "cf-ray": "abc123",
            "content-length": "17",
          },
        })
      )
    )
    const res = await wrapped(url)
    expect(res.headers.get("cf-ray")).toBe("abc123")
    expect(res.headers.get("content-type")).toBe("text/html")
  })

  test("preserves an empty non-ok body (postgrest empty-404 handling)", async () => {
    const wrapped = makeErrorBodySummaryFetch(() =>
      Promise.resolve(new Response(null, { status: 404, statusText: "Not Found" }))
    )
    const res = await wrapped(url)
    expect(res.status).toBe(404)
    expect(await res.text()).toBe("")
  })

  test("a null-body status (304) survives without throwing", async () => {
    const wrapped = makeErrorBodySummaryFetch(() =>
      Promise.resolve(new Response(null, { status: 304 }))
    )
    const res = await wrapped(url)
    expect(res.status).toBe(304)
  })

  test("rewrites a non-ok text/plain error body", async () => {
    const wrapped = makeErrorBodySummaryFetch(() =>
      Promise.resolve(new Response("plain text error", { status: 500 }))
    )
    const res = await wrapped(url)
    const body = await res.text()
    expect(body).toContain("500")
    expect(body).not.toBe("plain text error")
  })
})

describe("graftPreconnect", () => {
  test("supplies a callable no-op when the runtime fetch has no preconnect (Node)", () => {
    const bare: FetchLike = () => Promise.resolve(new Response("ok"))
    const grafted = graftPreconnect(bare, bare)
    expect(typeof grafted.preconnect).toBe("function")
    expect(grafted.preconnect("https://example.test")).toBeUndefined()
  })

  test("delegates to the runtime preconnect when present (Bun)", () => {
    const calls: string[] = []
    const base = Object.assign<FetchLike, { preconnect: (url: string | URL) => undefined }>(
      () => Promise.resolve(new Response("ok")),
      {
        preconnect: (url) => {
          calls.push(String(url))
          return undefined
        },
      }
    )
    const grafted = graftPreconnect(() => Promise.resolve(new Response("ok")), base)
    grafted.preconnect("https://example.test/x")
    expect(calls).toEqual(["https://example.test/x"])
  })
})
