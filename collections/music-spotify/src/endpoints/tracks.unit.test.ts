import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"
import { z } from "zod"
import {
  audioAnalysisSchema,
  audioFeaturesSchema,
  recordReachability,
  severalAudioFeaturesSchema,
  severalTracksSchema,
  trackSchema,
} from "./tracks"

mock.module("../oauth", () => ({
  getCredentials: () => ({
    clientId: "test",
    clientSecret: "test",
    redirectUri: "https://example.com/cb",
  }),
  basicAuthHeader: () => "Basic dGVzdA==",
  parseTokenResponse: async () => ({ access_token: "t", token_type: "Bearer", expires_in: 3600 }),
  persistTokenResponse: () => undefined,
  forceRefresh: async () => ({
    accessToken: "t",
    refreshToken: "r",
    expiresAt: Date.now() + 3_600_000,
    scopes: [],
  }),
  getOAuthAccessToken: async () => "test-access-token",
}))

const realFetch = globalThis.fetch

function stubFetch(response: Response): undefined {
  globalThis.fetch = Object.assign(async () => response, { preconnect: realFetch.preconnect })
}

afterEach(() => {
  globalThis.fetch = realFetch
})

const idResultSchema = z.object({ id: z.string() }).passthrough()
const reachabilitySchema = z
  .object({ reachable: z.boolean(), status: z.number().optional(), reason: z.string().optional() })
  .passthrough()

describe("trackSchema", () => {
  test("parses a track and preserves unknown keys", () => {
    const parsed = trackSchema.parse({
      id: "11dFghVXANMlKmJXsNCbNl",
      name: "Cut To The Feeling",
      duration_ms: 207_960,
      explicit: false,
      external_urls: { spotify: "https://open.spotify.com/track/x", note: "kept" },
      popularity: 60,
    })
    expect(parsed.id).toBe("11dFghVXANMlKmJXsNCbNl")
    expect(parsed).toMatchObject({ popularity: 60 })
  })

  test("throws on a shape mismatch", () => {
    expect(() => trackSchema.parse({ id: 1 })).toThrow()
  })

  test("parses the artists[] display names (full GET /tracks/{id} body)", () => {
    const parsed = trackSchema.parse({
      id: "2",
      name: "Bulletproof",
      duration_ms: 1,
      explicit: false,
      external_urls: { spotify: "u" },
      artists: [{ name: "Em Beihold", id: "a1" }],
    })
    expect(parsed.artists?.map((a) => a.name)).toEqual(["Em Beihold"])
  })
})

describe("severalTracksSchema", () => {
  test("parses a tracks array with a null hole for an unmatched id", () => {
    const parsed = severalTracksSchema.parse({
      tracks: [
        {
          id: "a",
          name: "A",
          duration_ms: 1,
          explicit: false,
          external_urls: { spotify: "u" },
        },
        null,
      ],
    })
    expect(parsed.tracks).toHaveLength(2)
    expect(parsed.tracks[1]).toBeNull()
  })
})

describe("audioFeaturesSchema / severalAudioFeaturesSchema / audioAnalysisSchema", () => {
  test("parse their respective shapes", () => {
    expect(
      audioFeaturesSchema.parse({
        id: "a",
        danceability: 0.5,
        energy: 0.6,
        tempo: 120,
        valence: 0.4,
      }).id
    ).toBe("a")
    expect(
      severalAudioFeaturesSchema.parse({
        audio_features: [
          { id: "a", danceability: 0.1, energy: 0.2, tempo: 90, valence: 0.3 },
          null,
        ],
      }).audio_features
    ).toHaveLength(2)
    expect(audioAnalysisSchema.parse({ track: { duration: 207.9, extra: 1 } }).track.duration).toBe(
      207.9
    )
  })
})

describe("recordReachability", () => {
  test("records reachable + data on success", async () => {
    const result = await recordReachability("r", async () => ({ id: "a" }))
    expect(result.reachable).toBe(true)
    if (result.reachable) expect(result.data).toEqual({ id: "a" })
  })

  test("records a 403 as unreachable (with reason) rather than throwing", async () => {
    const result = await recordReachability("deprecated for new apps (403)", async () => {
      throw new Error("spotify API 403 Forbidden\nURL: x\nBody: deprecated")
    })
    expect(result.reachable).toBe(false)
    if (!result.reachable) {
      expect(result.status).toBe(403)
      expect(result.reason).toBe("deprecated for new apps (403)")
    }
  })

  test("re-throws a non-403 error", async () => {
    await expect(
      recordReachability("r", async () => {
        throw new Error("spotify API 500 Internal Server Error")
      })
    ).rejects.toThrow("500")
  })
})

async function loadDescriptor() {
  return (await import("./tracks")).default
}

function probe(
  descriptor: { probes: readonly { name: string; run: () => Promise<unknown> }[] },
  idx: number
) {
  const p = descriptor.probes[idx]
  if (p == null) throw new Error(`no probe at index ${idx}`)
  return p
}

describe("tracks descriptor probes (mocked HTTP)", () => {
  let descriptor: Awaited<ReturnType<typeof loadDescriptor>>

  beforeEach(async () => {
    descriptor = await loadDescriptor()
  })

  test("declares the five probes with an empty scope set", () => {
    expect(descriptor.name).toBe("tracks")
    expect(descriptor.scopes).toEqual([])
    expect(descriptor.probes).toHaveLength(5)
  })

  test("GET /tracks/{id} returns the parsed track on a 200", async () => {
    stubFetch(
      new Response(
        JSON.stringify({
          id: "11dFghVXANMlKmJXsNCbNl",
          name: "Cut To The Feeling",
          duration_ms: 207_960,
          explicit: false,
          external_urls: { spotify: "u" },
        }),
        { status: 200 }
      )
    )
    const result = idResultSchema.parse(await probe(descriptor, 0).run())
    expect(result.id).toBe("11dFghVXANMlKmJXsNCbNl")
  })

  test("GET /tracks (several) records unreachable on a 403 (restricted path)", async () => {
    stubFetch(new Response('{"error":{"status":403,"message":"Forbidden"}}', { status: 403 }))
    const result = reachabilitySchema.parse(await probe(descriptor, 1).run())
    expect(result.reachable).toBe(false)
    expect(result.status).toBe(403)
    expect(result.reason).toContain("restricted")
  })

  test("GET /audio-features/{id} records reachable on a 200 (works path)", async () => {
    stubFetch(
      new Response(
        JSON.stringify({ id: "a", danceability: 0.5, energy: 0.6, tempo: 120, valence: 0.4 }),
        { status: 200 }
      )
    )
    const result = reachabilitySchema.parse(await probe(descriptor, 2).run())
    expect(result.reachable).toBe(true)
  })

  test("GET /audio-features/{id} records unreachable on a 403 (deprecated path)", async () => {
    stubFetch(new Response("deprecated for new apps", { status: 403 }))
    const result = reachabilitySchema.parse(await probe(descriptor, 2).run())
    expect(result.reachable).toBe(false)
    expect(result.status).toBe(403)
  })

  test("GET /audio-analysis/{id} records unreachable on a 403 (deprecated path)", async () => {
    stubFetch(new Response("deprecated for new apps", { status: 403 }))
    const result = reachabilitySchema.parse(await probe(descriptor, 4).run())
    expect(result.reachable).toBe(false)
    expect(result.status).toBe(403)
  })

  test("a non-track 500 surfaces as a thrown error on the live read probe", async () => {
    stubFetch(new Response("boom", { status: 500 }))
    await expect(probe(descriptor, 0).run()).rejects.toThrow("500")
  })
})
