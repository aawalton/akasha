import { afterAll, afterEach, beforeAll, describe, expect, mock, test } from "bun:test"
import { getTopArtists, getTopTracks, TIME_RANGES } from "./endpoints/personalization"

mock.module("./oauth", () => ({
  getCredentials: () => ({ clientId: "x", clientSecret: "y", redirectUri: "z" }),
  basicAuthHeader: () => "Basic xyz",
  parseTokenResponse: async () => ({ access_token: "t" }),
  persistTokenResponse: () => ({ accessToken: "t", scopes: [], expiresAt: 0, refreshToken: "r" }),
  forceRefresh: async () => ({ accessToken: "t", scopes: [], expiresAt: 0, refreshToken: "r" }),
  getOAuthAccessToken: async () => "test-access-token",
}))

const realFetch = globalThis.fetch

interface StubResponse {
  readonly status: number
  readonly body: unknown
}

let calls: string[] = []
let queue: StubResponse[] = []

function enqueueResponses(...responses: readonly StubResponse[]) {
  queue = [...responses]
}

const mockFetch: typeof fetch = Object.assign(
  (input: Parameters<typeof fetch>[0]) => {
    calls.push(String(input))
    const next = queue.shift()
    if (next == null) throw new Error(`unexpected fetch: ${String(input)}`)
    return Promise.resolve(new Response(JSON.stringify(next.body), { status: next.status }))
  },
  { preconnect: realFetch.preconnect }
)

beforeAll(() => {
  globalThis.fetch = mockFetch
})

afterEach(() => {
  calls = []
  queue = []
})

afterAll(() => {
  globalThis.fetch = realFetch
})

function offsetPage(items: readonly unknown[], next: string | null): StubResponse {
  return {
    status: 200,
    body: { items, total: items.length, limit: 50, offset: 0, next, previous: null },
  }
}

describe("getTopArtists", () => {
  test("parses artists and sends the time_range + limit query params", async () => {
    enqueueResponses(offsetPage([{ id: "a1", name: "Artist One", genres: ["rock"] }], null))
    const artists = await getTopArtists("medium_term")
    expect(artists).toHaveLength(1)
    expect(artists[0]?.name).toBe("Artist One")
    expect(calls[0]).toBe(
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50"
    )
  })

  test("each time_range maps to its own request path", async () => {
    for (const range of TIME_RANGES) {
      enqueueResponses(offsetPage([], null))
      await getTopArtists(range)
    }
    expect(calls).toEqual([
      "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50",
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50",
      "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
    ])
  })

  test("follows the next link and flattens multiple pages", async () => {
    const nextUrl = "https://api.spotify.com/v1/me/top/artists?offset=50&limit=50"
    enqueueResponses(
      offsetPage([{ id: "a1", name: "One" }], nextUrl),
      offsetPage([{ id: "a2", name: "Two" }], null)
    )
    const artists = await getTopArtists("long_term")
    expect(artists.map((a) => a.id)).toEqual(["a1", "a2"])
    expect(calls).toHaveLength(2)
    expect(calls[1]).toBe(nextUrl)
  })

  test("throws on a non-2xx response", async () => {
    enqueueResponses({ status: 403, body: { error: { status: 403 } } })
    await expect(getTopArtists("short_term")).rejects.toThrow(/403/)
  })
})

describe("getTopTracks", () => {
  test("parses tracks with nested artists/album and hits the tracks path", async () => {
    enqueueResponses(
      offsetPage(
        [
          {
            id: "t1",
            name: "Track One",
            artists: [{ id: "a1", name: "Artist One" }],
            album: { id: "al1", name: "Album One" },
          },
        ],
        null
      )
    )
    const tracks = await getTopTracks("short_term")
    expect(tracks[0]?.name).toBe("Track One")
    expect(tracks[0]?.artists?.[0]?.name).toBe("Artist One")
    expect(calls[0]).toBe("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50")
  })

  test("throws on a shape mismatch (track missing required id)", async () => {
    enqueueResponses(offsetPage([{ name: "No Id" }], null))
    await expect(getTopTracks("medium_term")).rejects.toThrow()
  })
})

describe("top-items pagination is bounded (regression: no runaway deep-pagination)", () => {
  test("getTopArtists stops after one request despite a non-null next on a full page", async () => {
    const items = Array.from({ length: 50 }, (_, i) => ({ id: `a${i}`, name: `Artist ${i}` }))
    const nextUrl = "https://api.spotify.com/v1/me/top/artists?offset=50&limit=50"
    enqueueResponses(offsetPage(items, nextUrl))
    const artists = await getTopArtists("medium_term")
    expect(artists).toHaveLength(50)
    expect(calls).toHaveLength(1)
    expect(calls[0]).toBe(
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50"
    )
    expect(calls.some((c) => c.includes("offset=50"))).toBe(false)
  })

  test("getTopTracks stops after one request despite a non-null next on a full page", async () => {
    const items = Array.from({ length: 50 }, (_, i) => ({ id: `t${i}`, name: `Track ${i}` }))
    const nextUrl = "https://api.spotify.com/v1/me/top/tracks?offset=50&limit=50"
    enqueueResponses(offsetPage(items, nextUrl))
    const tracks = await getTopTracks("long_term")
    expect(tracks).toHaveLength(50)
    expect(calls).toHaveLength(1)
    expect(calls.some((c) => c.includes("offset=50"))).toBe(false)
  })
})
