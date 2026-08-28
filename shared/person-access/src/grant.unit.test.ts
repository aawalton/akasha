import { afterEach, describe, expect, test } from "bun:test"
import { grantAccess } from "./grant"

// WHAT THIS PINS IS THAT A QUERY NOTHING ANSWERED IS NOT A GRANT THAT DOES NOT STAND. This mints a
// uuid and writes a fresh grant page wherever it finds no standing one, and "finds none" covered a
// query the store never answered as well as one it answered empty. Written, the fresh page is a
// second grant for one that already stands, under an id nothing else knows.

function reply(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

type Served = { written: readonly string[] }

let stop: (() => void) | null = null

/** Every query and every write is refused, which is this store seen from an unreachable network. */
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

describe("grantAccess writes a fresh grant only where the store answered that none stands", () => {
  test("a query nothing answered refuses rather than writing a second grant", async () => {
    const served = serveNothing()
    const going = grantAccess({ personSlug: "astra", accessKind: "domain", target: "pages-system" })
    await expect(going).rejects.toThrow(/went unread/)
    expect(served.written).toEqual([])
  })
})
