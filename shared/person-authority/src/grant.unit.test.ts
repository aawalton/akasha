import { afterEach, describe, expect, test } from "bun:test"
import { grantAuthority } from "./grant.ts"

function reply(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

type Served = { written: readonly string[] }

let stop: (() => void) | null = null

function serveNothing(): Served {
  const served: Served = { written: [] }
  const real = globalThis.fetch
  globalThis.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url
    const path = new URL(url, "http://fixture.invalid").pathname
    const posted = (init?.method ?? "GET").toUpperCase() === "POST"
    if (posted && !path.startsWith("/q")) served.written = [...served.written, path]
    return reply({ error: "the page query service is unreachable" }, 503)
  }
  stop = () => {
    globalThis.fetch = real
  }
  return served
}

afterEach(() => {
  stop?.()
  stop = null
})

describe("grantAuthority writes a grant only where the store answered that none stands", () => {
  test("a query nothing answered refuses rather than writing a second grant", async () => {
    const served = serveNothing()
    const going = grantAuthority({
      personSlug: "astra",
      authorityKind: "domain",
      target: "pages-system",
    })
    await expect(going).rejects.toThrow(/went unread/)
    expect(served.written).toEqual([])
  })
})
