import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"

mock.module("./oauth", () => ({
  getCredentials: () => ({ clientId: "x", clientSecret: "y", redirectUri: "z" }),
  basicAuthHeader: () => "Basic x",
  parseTokenResponse: async () => ({}),
  persistTokenResponse: () => ({}),
  forceRefresh: async () => ({}),
  getOAuthAccessToken: async () => "test-token",
}))

import { buildSearchPath, search, searchPaginate, searchResponseSchema } from "./endpoints/search"

function fakeResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function offsetPage(items: readonly unknown[], next: string | null) {
  return { items, total: items.length, limit: items.length, offset: 0, next, previous: null }
}

const originalFetch = globalThis.fetch
let queue: Response[] = []
let calls: string[] = []

beforeEach(() => {
  queue = []
  calls = []
  const handler = (input: Parameters<typeof fetch>[0]): Promise<Response> => {
    const url = String(input)
    calls.push(url)
    const next = queue.shift()
    if (next === undefined) throw new Error(`unexpected fetch: ${url}`)
    return Promise.resolve(next)
  }
  globalThis.fetch = Object.assign(handler, { preconnect: () => {} })
})

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe("buildSearchPath", () => {
  test("joins types with commas and includes limit/offset/market", () => {
    const path = buildSearchPath({
      q: "daft punk",
      types: ["album", "artist", "track"],
      limit: 5,
      offset: 10,
      market: "US",
    })
    expect(path).toContain("type=album%2Cartist%2Ctrack")
    expect(path).toContain("q=daft+punk")
    expect(path).toContain("limit=5")
    expect(path).toContain("offset=10")
    expect(path).toContain("market=US")
  })

  test("omits unset optional params", () => {
    const path = buildSearchPath({ q: "x", types: ["track"] })
    expect(path).not.toContain("limit=")
    expect(path).not.toContain("market=")
  })
})

describe("searchResponseSchema", () => {
  test("parses a multi-section wrapper and preserves unknown keys", () => {
    const parsed = searchResponseSchema.parse({
      tracks: offsetPage([{ id: "t1", name: "Track", extra: 1 }], null),
      artists: offsetPage([{ id: "a1", name: "Artist" }], null),
      somethingNew: { future: true },
    })
    expect(parsed.tracks?.items[0]?.id).toBe("t1")
    expect(parsed.artists?.items).toHaveLength(1)
  })

  test("tolerates null entries in nullable sections (playlists)", () => {
    const parsed = searchResponseSchema.parse({
      playlists: offsetPage([null, { id: "p1", name: "List" }], null),
    })
    expect(parsed.playlists?.items).toHaveLength(2)
    expect(parsed.playlists?.items[0]).toBeNull()
  })
})

describe("search", () => {
  test("issues one GET and parses the wrapper", async () => {
    queue.push(fakeResponse({ tracks: offsetPage([{ id: "t1", name: "One More Time" }], null) }))
    const res = await search({ q: "one more time", types: ["track"], limit: 5 })
    expect(res.tracks?.items[0]?.name).toBe("One More Time")
    expect(calls).toHaveLength(1)
    expect(calls[0]).toContain("/search?")
    expect(calls[0]).toContain("type=track")
  })

  test("throws on a shape mismatch (boundary parse)", async () => {
    queue.push(fakeResponse({ tracks: { items: "not-an-array" } }))
    await expect(search({ q: "x", types: ["track"] })).rejects.toThrow()
  })

  test("throws on a non-ok HTTP status", async () => {
    queue.push(fakeResponse({ error: { status: 404, message: "not found" } }, 404))
    await expect(search({ q: "x", types: ["track"] })).rejects.toThrow(/404/)
  })
})

describe("searchPaginate", () => {
  test("follows section.next across pages and flattens items", async () => {
    queue.push(
      fakeResponse({
        artists: offsetPage(
          [
            { id: "a1", name: "A1" },
            { id: "a2", name: "A2" },
          ],
          "https://api.spotify.com/v1/search?q=rock&type=artist&offset=2"
        ),
      })
    )
    queue.push(fakeResponse({ artists: offsetPage([{ id: "a3", name: "A3" }], null) }))
    const items = await searchPaginate("rock", "artist", { limit: 2 })
    expect(items.map((i) => i.id)).toEqual(["a1", "a2", "a3"])
    expect(calls).toHaveLength(2)
    expect(calls[1]).toContain("offset=2")
  })

  test("stops early once max is reached", async () => {
    queue.push(
      fakeResponse({
        artists: offsetPage(
          [
            { id: "a1", name: "A1" },
            { id: "a2", name: "A2" },
          ],
          "https://api.spotify.com/v1/search?q=rock&type=artist&offset=2"
        ),
      })
    )
    const items = await searchPaginate("rock", "artist", { limit: 2, max: 2 })
    expect(items).toHaveLength(2)
    expect(calls).toHaveLength(1)
  })

  test("drops null entries from nullable sections", async () => {
    queue.push(
      fakeResponse({
        playlists: offsetPage([null, { id: "p1", name: "List" }, null], null),
      })
    )
    const items = await searchPaginate("mood", "playlist")
    expect(items.map((i) => i.id)).toEqual(["p1"])
  })
})
