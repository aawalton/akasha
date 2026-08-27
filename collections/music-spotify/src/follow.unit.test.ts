import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"
import { z } from "zod"

mock.module("./oauth", () => ({
  getCredentials: () => ({ clientId: "x", clientSecret: "y", redirectUri: "z" }),
  basicAuthHeader: () => "Basic x",
  parseTokenResponse: async () => ({}),
  persistTokenResponse: () => ({}),
  forceRefresh: async () => ({}),
  getOAuthAccessToken: async () => "test-token",
}))

import {
  areFollowingArtists,
  areFollowingUsers,
  buildFollowContainsPath,
  buildFollowedArtistsPath,
  buildFollowingMutatePath,
  buildPlaylistFollowersContainsPath,
  followArtists,
  followPlaylist,
  getFollowedArtists,
  playlistFollowedBy,
  unfollowArtists,
  unfollowPlaylist,
  unfollowUsers,
} from "./endpoints/follow"

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function emptyResponse(status = 204): Response {
  return new Response("", { status })
}

function artistsPage(items: readonly unknown[], next: string | null) {
  return {
    artists: { items, limit: items.length, next, cursors: next == null ? null : { after: "c" } },
  }
}

const originalFetch = globalThis.fetch
let queue: Response[] = []
let calls: { url: string; method: string; body: string | undefined }[] = []

beforeEach(() => {
  queue = []
  calls = []
  const handler = (
    input: Parameters<typeof fetch>[0],
    init?: Parameters<typeof fetch>[1]
  ): Promise<Response> => {
    const url = String(input)
    const body = typeof init?.body === "string" ? init.body : undefined
    calls.push({ url, method: init?.method ?? "GET", body })
    const next = queue.shift()
    if (next === undefined) throw new Error(`unexpected fetch: ${url}`)
    return Promise.resolve(next)
  }
  globalThis.fetch = Object.assign(handler, { preconnect: () => {} })
})

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe("path builders", () => {
  test("buildFollowedArtistsPath sets type and optional limit", () => {
    expect(buildFollowedArtistsPath()).toBe("/me/following?type=artist")
    expect(buildFollowedArtistsPath(20)).toBe("/me/following?type=artist&limit=20")
  })

  test("buildFollowingMutatePath joins ids (comma-encoded) with the type", () => {
    const path = buildFollowingMutatePath("artist", ["a1", "a2"])
    expect(path).toContain("/me/following?")
    expect(path).toContain("type=artist")
    expect(path).toContain("ids=a1%2Ca2")
  })

  test("buildFollowContainsPath targets the contains endpoint", () => {
    expect(buildFollowContainsPath("user", ["u1"])).toBe("/me/following/contains?type=user&ids=u1")
  })

  test("buildPlaylistFollowersContainsPath embeds the playlist id and user ids", () => {
    expect(buildPlaylistFollowersContainsPath("p1", ["u1", "u2"])).toBe(
      "/playlists/p1/followers/contains?ids=u1%2Cu2"
    )
  })
})

describe("getFollowedArtists", () => {
  test("follows artists.next across pages and flattens items", async () => {
    queue.push(
      jsonResponse(
        artistsPage(
          [
            { id: "a1", name: "A1" },
            { id: "a2", name: "A2" },
          ],
          "https://api.spotify.com/v1/me/following?type=artist&after=a2"
        )
      )
    )
    queue.push(jsonResponse(artistsPage([{ id: "a3", name: "A3" }], null)))
    const items = await getFollowedArtists({ limit: 2 })
    expect(items.map((a) => a.id)).toEqual(["a1", "a2", "a3"])
    expect(calls).toHaveLength(2)
    expect(calls[0]?.url).toContain("/me/following?type=artist&limit=2")
    expect(calls[1]?.url).toContain("after=a2")
  })

  test("stops early once max is reached", async () => {
    queue.push(
      jsonResponse(
        artistsPage(
          [
            { id: "a1", name: "A1" },
            { id: "a2", name: "A2" },
          ],
          "https://api.spotify.com/v1/me/following?type=artist&after=a2"
        )
      )
    )
    const items = await getFollowedArtists({ limit: 2, max: 2 })
    expect(items).toHaveLength(2)
    expect(calls).toHaveLength(1)
  })

  test("preserves passthrough fields and throws on a shape mismatch", async () => {
    queue.push(jsonResponse(artistsPage([{ id: "a1", name: "A1", popularity: 73 }], null)))
    const items = await getFollowedArtists()
    const first = z.object({ popularity: z.number() }).passthrough().parse(items[0])
    expect(first.popularity).toBe(73)

    queue.push(jsonResponse({ artists: { items: "not-an-array", limit: 1, next: null } }))
    await expect(getFollowedArtists()).rejects.toThrow()
  })
})

describe("contains reads", () => {
  test("areFollowingArtists parses a boolean array from the right URL", async () => {
    queue.push(jsonResponse([true, false]))
    const res = await areFollowingArtists(["a1", "a2"])
    expect(res).toEqual([true, false])
    expect(calls[0]?.url).toContain("/me/following/contains?type=artist&ids=a1%2Ca2")
  })

  test("areFollowingUsers targets type=user", async () => {
    queue.push(jsonResponse([true]))
    await areFollowingUsers(["u1"])
    expect(calls[0]?.url).toContain("type=user")
  })

  test("playlistFollowedBy hits the playlist followers contains endpoint", async () => {
    queue.push(jsonResponse([false]))
    const res = await playlistFollowedBy("p1", ["u1"])
    expect(res).toEqual([false])
    expect(calls[0]?.url).toContain("/playlists/p1/followers/contains?ids=u1")
  })

  test("propagates a non-ok HTTP status as an error", async () => {
    queue.push(jsonResponse({ error: { status: 403, message: "forbidden" } }, 403))
    await expect(areFollowingArtists(["a1"])).rejects.toThrow(/403/)
  })
})

describe("writes (empty success body)", () => {
  test("followArtists issues a PUT and tolerates a 204 empty body", async () => {
    queue.push(emptyResponse(204))
    const res = await followArtists(["a1", "a2"])
    expect(res).toBeNull()
    expect(calls[0]?.method).toBe("PUT")
    expect(calls[0]?.url).toContain("/me/following?type=artist&ids=a1%2Ca2")
  })

  test("unfollowArtists issues a DELETE", async () => {
    queue.push(emptyResponse(204))
    await unfollowArtists(["a1"])
    expect(calls[0]?.method).toBe("DELETE")
    expect(calls[0]?.url).toContain("/me/following?type=artist&ids=a1")
  })

  test("unfollowUsers issues a DELETE against type=user", async () => {
    queue.push(emptyResponse(204))
    await unfollowUsers(["u1"])
    expect(calls[0]?.method).toBe("DELETE")
    expect(calls[0]?.url).toContain("type=user")
  })

  test("followPlaylist sends a public:false body and tolerates an empty 200", async () => {
    queue.push(emptyResponse(200))
    const res = await followPlaylist("p1", { public: false })
    expect(res).toBeNull()
    expect(calls[0]?.method).toBe("PUT")
    expect(calls[0]?.url).toContain("/playlists/p1/followers")
    expect(calls[0]?.body).toBe(JSON.stringify({ public: false }))
  })

  test("followPlaylist omits the body when public is unset", async () => {
    queue.push(emptyResponse(200))
    await followPlaylist("p1")
    expect(calls[0]?.body).toBeUndefined()
  })

  test("unfollowPlaylist issues a DELETE", async () => {
    queue.push(emptyResponse(200))
    await unfollowPlaylist("p1")
    expect(calls[0]?.method).toBe("DELETE")
    expect(calls[0]?.url).toContain("/playlists/p1/followers")
  })
})
