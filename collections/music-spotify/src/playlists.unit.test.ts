import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"

mock.module("./oauth", () => ({
  getCredentials: () => ({ clientId: "x", clientSecret: "y", redirectUri: "z" }),
  basicAuthHeader: () => "Basic x",
  parseTokenResponse: async () => ({}),
  persistTokenResponse: () => ({}),
  forceRefresh: async () => ({}),
  getOAuthAccessToken: async () => "test-token",
}))

import {
  addTracks,
  changePlaylistDetails,
  createPlaylist,
  getMyPlaylistsAll,
  getPlaylist,
  getPlaylistTracks,
  playlistSchema,
  removeTracks,
  reorderTracks,
  replaceTracks,
  unfollowPlaylist,
  uploadCover,
} from "./endpoints/playlists"

interface Captured {
  readonly url: string
  readonly method: string
  readonly body: string | undefined
  readonly contentType: string | undefined
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function emptyResponse(status = 200): Response {
  return new Response(null, { status })
}

function offsetPage(items: readonly unknown[], next: string | null) {
  return { items, total: items.length, limit: items.length, offset: 0, next, previous: null }
}

const originalFetch = globalThis.fetch
let queue: Response[] = []
let calls: Captured[] = []

beforeEach(() => {
  queue = []
  calls = []
  const handler = (
    input: Parameters<typeof fetch>[0],
    init?: Parameters<typeof fetch>[1]
  ): Promise<Response> => {
    const url = String(input)
    const headers = new Headers(init?.headers)
    calls.push({
      url,
      method: init?.method ?? "GET",
      body: typeof init?.body === "string" ? init.body : undefined,
      contentType: headers.get("content-type") ?? undefined,
    })
    const next = queue.shift()
    if (next === undefined) throw new Error(`unexpected fetch: ${url}`)
    return Promise.resolve(next)
  }
  globalThis.fetch = Object.assign(handler, { preconnect: () => {} })
})

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe("playlistSchema", () => {
  test("parses a playlist and preserves unknown keys", () => {
    const parsed = playlistSchema.parse({
      id: "p1",
      name: "Mix",
      owner: { id: "u1", display_name: "Al" },
      public: false,
      snapshot_id: "snap",
      future_field: 1,
    })
    expect(parsed.id).toBe("p1")
    expect(parsed.owner?.id).toBe("u1")
  })
})

describe("getPlaylist", () => {
  test("issues one GET and parses", async () => {
    queue.push(jsonResponse({ id: "abc", name: "My List" }))
    const res = await getPlaylist("abc", { market: "US" })
    expect(res.name).toBe("My List")
    expect(calls).toHaveLength(1)
    expect(calls[0]?.method).toBe("GET")
    expect(calls[0]?.url).toContain("/playlists/abc")
    expect(calls[0]?.url).toContain("market=US")
  })
})

describe("getPlaylistTracks", () => {
  test("parses an offset page with a nullable track entry", async () => {
    queue.push(
      jsonResponse(
        offsetPage(
          [{ track: { id: "t1", name: "One", uri: "spotify:track:1" } }, { track: null }],
          null
        )
      )
    )
    const page = await getPlaylistTracks("abc", { limit: 10 })
    expect(page.items).toHaveLength(2)
    expect(page.items[0]?.track?.id).toBe("t1")
    expect(page.items[1]?.track).toBeNull()
  })
})

describe("getMyPlaylistsAll", () => {
  test("follows next across pages and tolerates null entries", async () => {
    queue.push(
      jsonResponse(
        offsetPage(
          [{ id: "p1", name: "A" }, null],
          "https://api.spotify.com/v1/me/playlists?offset=2"
        )
      )
    )
    queue.push(jsonResponse(offsetPage([{ id: "p2", name: "B" }], null)))
    const all = await getMyPlaylistsAll()
    expect(all).toHaveLength(3)
    expect(all[0]?.id).toBe("p1")
    expect(all[1]).toBeNull()
    expect(all[2]?.id).toBe("p2")
    expect(calls).toHaveLength(2)
  })
})

describe("createPlaylist", () => {
  test("POSTs a JSON body and parses the returned playlist", async () => {
    queue.push(jsonResponse({ id: "new1", name: "Fresh" }, 201))
    const res = await createPlaylist("user1", {
      name: "Fresh",
      isPublic: false,
      description: "desc",
    })
    expect(res.id).toBe("new1")
    expect(calls[0]?.method).toBe("POST")
    expect(calls[0]?.url).toContain("/users/user1/playlists")
    expect(calls[0]?.contentType).toBe("application/json")
    expect(calls[0]?.body).toContain('"name":"Fresh"')
    expect(calls[0]?.body).toContain('"public":false')
    expect(calls[0]?.body).toContain('"description":"desc"')
  })
})

describe("addTracks", () => {
  test("POSTs uris and returns the snapshot", async () => {
    queue.push(jsonResponse({ snapshot_id: "s1" }, 201))
    const res = await addTracks("abc", {
      uris: ["spotify:track:1", "spotify:track:2"],
      position: 0,
    })
    expect(res.snapshot_id).toBe("s1")
    expect(calls[0]?.method).toBe("POST")
    expect(calls[0]?.url).toContain("/playlists/abc/tracks")
    expect(calls[0]?.body).toContain('"uris":["spotify:track:1","spotify:track:2"]')
    expect(calls[0]?.body).toContain('"position":0')
  })
})

describe("removeTracks", () => {
  test("DELETEs a tracks body and returns the snapshot", async () => {
    queue.push(jsonResponse({ snapshot_id: "s2" }))
    const res = await removeTracks("abc", {
      tracks: [{ uri: "spotify:track:1" }],
      snapshotId: "prev",
    })
    expect(res.snapshot_id).toBe("s2")
    expect(calls[0]?.method).toBe("DELETE")
    expect(calls[0]?.body).toContain('"tracks":[{"uri":"spotify:track:1"}]')
    expect(calls[0]?.body).toContain('"snapshot_id":"prev"')
  })
})

describe("reorderTracks", () => {
  test("PUTs a reorder body and returns the snapshot", async () => {
    queue.push(jsonResponse({ snapshot_id: "s3" }))
    const res = await reorderTracks("abc", { rangeStart: 1, insertBefore: 0, rangeLength: 2 })
    expect(res.snapshot_id).toBe("s3")
    expect(calls[0]?.method).toBe("PUT")
    expect(calls[0]?.body).toContain('"range_start":1')
    expect(calls[0]?.body).toContain('"insert_before":0')
    expect(calls[0]?.body).toContain('"range_length":2')
  })
})

describe("replaceTracks", () => {
  test("PUTs a uris body and returns the snapshot", async () => {
    queue.push(jsonResponse({ snapshot_id: "s4" }))
    const res = await replaceTracks("abc", ["spotify:track:9"])
    expect(res.snapshot_id).toBe("s4")
    expect(calls[0]?.method).toBe("PUT")
    expect(calls[0]?.body).toContain('"uris":["spotify:track:9"]')
  })
})

describe("changePlaylistDetails", () => {
  test("PUTs a details body and parses an empty 200 as null", async () => {
    queue.push(emptyResponse(200))
    const res = await changePlaylistDetails("abc", { name: "Renamed", description: "new" })
    expect(res).toBeNull()
    expect(calls[0]?.method).toBe("PUT")
    expect(calls[0]?.url).toContain("/playlists/abc")
    expect(calls[0]?.contentType).toBe("application/json")
    expect(calls[0]?.body).toContain('"name":"Renamed"')
  })
})

describe("uploadCover", () => {
  test("PUTs a verbatim base64 body under image/jpeg and parses empty 202 as null", async () => {
    queue.push(emptyResponse(202))
    const res = await uploadCover("abc", "QUJD")
    expect(res).toBeNull()
    expect(calls[0]?.method).toBe("PUT")
    expect(calls[0]?.url).toContain("/playlists/abc/images")
    expect(calls[0]?.contentType).toBe("image/jpeg")
    expect(calls[0]?.body).toBe("QUJD")
  })
})

describe("unfollowPlaylist", () => {
  test("DELETEs the followers resource and parses empty as null", async () => {
    queue.push(emptyResponse(200))
    const res = await unfollowPlaylist("abc")
    expect(res).toBeNull()
    expect(calls[0]?.method).toBe("DELETE")
    expect(calls[0]?.url).toContain("/playlists/abc/followers")
    expect(calls[0]?.body).toBeUndefined()
  })
})

describe("error handling", () => {
  test("throws on a non-ok HTTP status with the status in the message", async () => {
    queue.push(jsonResponse({ error: { status: 404, message: "not found" } }, 404))
    await expect(getPlaylist("missing")).rejects.toThrow(/404/)
  })

  test("throws on a response shape mismatch (boundary parse)", async () => {
    queue.push(jsonResponse({ id: 123 }))
    await expect(getPlaylist("abc")).rejects.toThrow()
  })
})
