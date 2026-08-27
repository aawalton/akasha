import { describe, expect, it } from "bun:test"

import { patchPage, removePage, removeRow, writePage, writeRow } from "./index"
import {
  BACKOFF_CEILING_MS,
  backoffFor,
  FIRST_BACKOFF_MS,
  WRITE_ATTEMPTS,
  worthRetrying,
} from "./retry"

const never = async (): Promise<void> => {}

function landing(at: string): Response {
  return new Response(JSON.stringify({ ok: true, at }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}

function refusing(status: number, error: string): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function counting(answers: readonly (() => Response | never)[]): {
  readonly fetcher: (url: string, init: RequestInit) => Promise<Response>
  readonly urls: readonly string[]
} {
  const urls: string[] = []
  const fetcher = async (url: string): Promise<Response> => {
    const answer = answers[urls.length]
    urls.push(url)
    if (answer === undefined) throw new Error("the writer asked more times than this case answers")
    return answer()
  }
  return { fetcher, urls }
}

describe("a write from a pod when the workstation is not answering", () => {
  it("keeps asking up to its ceiling rather than losing the write on one refused connection", async () => {
    const unreachable = (): never => {
      throw new Error("ECONNREFUSED")
    }
    const { fetcher, urls } = counting([unreachable, unreachable, () => landing("probes/one.md")])
    const wrote = await writePage("probe", "one", { title: "One" }, "worker", fetcher, never)
    expect(wrote).toEqual({ ok: true, at: "probes/one.md" })
    expect(urls.length).toBe(3)
  })

  it("gives up at its ceiling and says the write did not land, rather than reporting success", async () => {
    const unreachable = (): never => {
      throw new Error("ECONNREFUSED")
    }
    const { fetcher, urls } = counting(Array.from({ length: WRITE_ATTEMPTS }, () => unreachable))
    const wrote = await patchPage("probe", "one", { title: "One" }, "worker", fetcher, never)
    expect(wrote.ok).toBe(false)
    expect(urls.length).toBe(WRITE_ATTEMPTS)
    expect(wrote.ok === false && wrote.why).toContain("did not land")
  })

  it("retries a service that is up but failing, which is the outage a pod cannot see", async () => {
    const { fetcher, urls } = counting([
      () => refusing(500, "the commit did not land"),
      () => landing("probes/two.md"),
    ])
    const wrote = await writePage("probe", "two", { title: "Two" }, "worker", fetcher, never)
    expect(wrote.ok).toBe(true)
    expect(urls.length).toBe(2)
  })

  it("does not retry a refusal, because asking again cannot change the answer", async () => {
    const { fetcher, urls } = counting([() => refusing(404, "no such page type")])
    const wrote = await removePage("probe", "three", "worker", fetcher, never)
    expect(wrote.ok).toBe(false)
    expect(urls.length).toBe(1)
  })
})

describe("what a failed write waits before asking again", () => {
  it("grows with each attempt and never passes its ceiling", () => {
    expect(backoffFor(1)).toBeGreaterThanOrEqual(FIRST_BACKOFF_MS)
    for (let attempt = 1; attempt <= 12; attempt += 1) {
      expect(backoffFor(attempt)).toBeLessThanOrEqual(BACKOFF_CEILING_MS * 1.5)
    }
    expect(backoffFor(2)).toBeGreaterThanOrEqual(backoffFor(1) / 1.5)
  })

  it("counts a service that is unreachable and one that is overloaded as worth asking again", () => {
    expect(worthRetrying(undefined)).toBe(true)
    expect(worthRetrying(503)).toBe(true)
    expect(worthRetrying(429)).toBe(true)
    expect(worthRetrying(404)).toBe(false)
    expect(worthRetrying(400)).toBe(false)
  })
})

describe("a row written into the sidecar of another page", () => {
  it("is addressed by its own page type and its parent's name, as a page write is", async () => {
    const { fetcher, urls } = counting([() => landing("personas/amy.days.jsonl")])
    const wrote = await writeRow(
      "persona-day",
      "amy",
      { slug: "amy-2026-08-19", mood: "bright" },
      "temper-watcher",
      fetcher,
      never
    )
    expect(wrote).toEqual({ ok: true, at: "personas/amy.days.jsonl" })
    expect(urls[0]).toContain("/write-row/persona-day/amy")
  })

  it("names the row it takes away, because the parent's name does not identify one", async () => {
    const { fetcher, urls } = counting([() => landing("personas/amy.days.jsonl")])
    const gone = await removeRow("persona-day", "amy", "amy-2026-08-19", "sweeper", fetcher, never)
    expect(gone.ok).toBe(true)
    expect(urls[0]).toContain("/remove-row/persona-day/amy")
  })

  it("is retried like any other write when the workstation is not answering", async () => {
    const unreachable = (): never => {
      throw new Error("ECONNREFUSED")
    }
    const { fetcher, urls } = counting([unreachable, () => landing("personas/amy.days.jsonl")])
    const wrote = await writeRow("persona-day", "amy", { slug: "one" }, "worker", fetcher, never)
    expect(wrote.ok).toBe(true)
    expect(urls.length).toBe(2)
  })
})
