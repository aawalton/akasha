import { afterEach, describe, expect, mock, test } from "bun:test"
import { severalShowsSchema, showSchema, simplifiedShowSchema } from "./endpoints/shows"
import { createFetchStub } from "./fetch-stub"

mock.module("./oauth", () => ({
  getCredentials: () => ({ clientId: "x", clientSecret: "y", redirectUri: "z" }),
  basicAuthHeader: () => "Basic xyz",
  parseTokenResponse: async () => ({ access_token: "t" }),
  persistTokenResponse: () => ({ accessToken: "t", scopes: [], expiresAt: 0, refreshToken: "r" }),
  forceRefresh: async () => ({ accessToken: "t", scopes: [], expiresAt: 0, refreshToken: "r" }),
  getOAuthAccessToken: async () => "fake-token",
}))

const realFetch = globalThis.fetch
afterEach(() => {
  globalThis.fetch = realFetch
})

describe("show schemas", () => {
  test("simplifiedShowSchema parses and preserves unknown keys", () => {
    const parsed = simplifiedShowSchema.parse({
      id: "s1",
      name: "A Show",
      type: "show",
      publisher: "Acme",
      total_episodes: 10,
      images: [{ url: "https://img", height: 64, width: 64 }],
    })
    expect(parsed.id).toBe("s1")
    expect(parsed.total_episodes).toBe(10)
  })

  test("showSchema embeds an episodes paging object", () => {
    const parsed = showSchema.parse({
      id: "s1",
      name: "A Show",
      type: "show",
      publisher: "Acme",
      total_episodes: 1,
      episodes: {
        items: [{ id: "e1", name: "Ep 1", type: "episode", duration_ms: 1000 }],
        total: 1,
        limit: 20,
        offset: 0,
        next: null,
        previous: null,
      },
    })
    expect(parsed.episodes.items[0]?.id).toBe("e1")
  })

  test("showSchema tolerates an absent publisher and null episode items (live shapes)", () => {
    const parsed = showSchema.parse({
      id: "s1",
      name: "A Show",
      type: "show",
      total_episodes: 2,
      episodes: {
        items: [null, { id: "e1", name: "Ep 1", type: "episode", duration_ms: 1000 }],
        total: 2,
        limit: 20,
        offset: 0,
        next: null,
        previous: null,
      },
    })
    expect(parsed.publisher).toBeUndefined()
    expect(parsed.episodes.items[0]).toBeNull()
    expect(parsed.episodes.items[1]?.id).toBe("e1")
  })

  test("severalShowsSchema tolerates null entries for market-unavailable ids", () => {
    const parsed = severalShowsSchema.parse({
      shows: [{ id: "s1", name: "A", type: "show", publisher: "p", total_episodes: 2 }, null],
    })
    expect(parsed.shows).toHaveLength(2)
    expect(parsed.shows[1]).toBeNull()
  })

  test("showSchema rejects a wrong discriminant type", () => {
    expect(() => simplifiedShowSchema.parse({ id: "s", name: "n", type: "episode" })).toThrow()
  })
})

describe("GET /shows/{id}/episodes pagination (mocked HTTP)", () => {
  test("follows the next link across pages and flattens items", async () => {
    const { paginateOffset } = await import("./client")
    const { simplifiedEpisodeSchema } = await import("./endpoints/shows")

    const page2Url = "https://api.spotify.com/v1/shows/SID/episodes?offset=1&limit=1"
    globalThis.fetch = createFetchStub(async (input) => {
      const url = typeof input === "string" ? input : input.toString()
      if (url.includes("offset=1")) {
        return new Response(
          JSON.stringify({
            items: [{ id: "e2", name: "Ep 2", type: "episode", duration_ms: 2 }],
            total: 2,
            limit: 1,
            offset: 1,
            next: null,
            previous: page2Url,
          }),
          { status: 200 }
        )
      }
      return new Response(
        JSON.stringify({
          items: [{ id: "e1", name: "Ep 1", type: "episode", duration_ms: 1 }],
          total: 2,
          limit: 1,
          offset: 0,
          next: page2Url,
          previous: null,
        }),
        { status: 200 }
      )
    })

    const items = await paginateOffset("/shows/SID/episodes?limit=1", simplifiedEpisodeSchema)
    expect(items.map((i) => i.id)).toEqual(["e1", "e2"])
  })
})
