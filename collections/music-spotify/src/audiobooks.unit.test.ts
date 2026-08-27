import { afterEach, describe, expect, mock, test } from "bun:test"
import {
  audiobookSchema,
  severalAudiobooksSchema,
  simplifiedAudiobookSchema,
} from "./endpoints/audiobooks"
import { createFetchStub } from "./fetch-stub"
import { BATCH_STATUSES, isRestricted, MARKET_STATUSES, tolerateStatuses } from "./reachability"

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

describe("audiobook schemas", () => {
  test("simplifiedAudiobookSchema parses authors/narrators/total_chapters", () => {
    const parsed = simplifiedAudiobookSchema.parse({
      id: "a1",
      name: "Book",
      type: "audiobook",
      authors: [{ name: "Author A" }],
      narrators: [{ name: "Narrator N" }],
      total_chapters: 12,
    })
    expect(parsed.authors[0]?.name).toBe("Author A")
    expect(parsed.total_chapters).toBe(12)
  })

  test("audiobookSchema embeds a chapters paging object", () => {
    const parsed = audiobookSchema.parse({
      id: "a1",
      name: "Book",
      type: "audiobook",
      authors: [],
      narrators: [],
      total_chapters: 1,
      chapters: {
        items: [{ id: "c1", name: "Ch 1", type: "chapter", chapter_number: 1, duration_ms: 10 }],
        total: 1,
        limit: 50,
        offset: 0,
        next: null,
        previous: null,
      },
    })
    expect(parsed.chapters.items[0]?.id).toBe("c1")
  })

  test("severalAudiobooksSchema tolerates null entries for market-unavailable ids", () => {
    const parsed = severalAudiobooksSchema.parse({
      audiobooks: [
        null,
        { id: "a1", name: "B", type: "audiobook", authors: [], narrators: [], total_chapters: 0 },
      ],
    })
    expect(parsed.audiobooks[0]).toBeNull()
  })
})

describe("reachability-tolerant probes (mocked HTTP)", () => {
  test("a 404 single-get becomes a restricted sentinel rather than throwing", async () => {
    const { spotifyGet } = await import("./client")
    globalThis.fetch = createFetchStub(
      async () => new Response("not available in market", { status: 404 })
    )

    const result = await tolerateStatuses(MARKET_STATUSES, () =>
      spotifyGet("/audiobooks/zzz", audiobookSchema)
    )
    expect(isRestricted(result)).toBe(true)
  })

  test("a 403 batch read becomes a restricted sentinel rather than throwing", async () => {
    const { spotifyGet } = await import("./client")
    globalThis.fetch = createFetchStub(async () => new Response("forbidden", { status: 403 }))

    const result = await tolerateStatuses(BATCH_STATUSES, () =>
      spotifyGet("/audiobooks?ids=zzz", severalAudiobooksSchema)
    )
    expect(isRestricted(result)).toBe(true)
  })

  test("a non-tolerated status still propagates", async () => {
    const { spotifyGet } = await import("./client")
    globalThis.fetch = createFetchStub(async () => new Response("server error", { status: 500 }))

    await expect(
      tolerateStatuses(MARKET_STATUSES, () => spotifyGet("/audiobooks/zzz", audiobookSchema))
    ).rejects.toThrow(/500/)
  })
})
