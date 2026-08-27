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
  addToQueue,
  currentlyPlayingSchema,
  getCurrentlyPlaying,
  getDevices,
  getPlaybackState,
  getQueue,
  getRecentlyPlayed,
  pausePlayback,
  playbackStateSchema,
  seek,
  setRepeatMode,
  setVolume,
  skipToNext,
  skipToPrevious,
  startResumePlayback,
  toggleShuffle,
  transferPlayback,
  withQuery,
} from "./endpoints/player"

const device = (over: Record<string, unknown> = {}) => ({
  id: "dev1",
  is_active: true,
  is_private_session: false,
  is_restricted: false,
  name: "My Speaker",
  type: "Computer",
  volume_percent: 50,
  ...over,
})

const item = (over: Record<string, unknown> = {}) => ({
  id: "t1",
  uri: "spotify:track:t1",
  name: "Song",
  type: "track",
  duration_ms: 1000,
  ...over,
})

const playbackState = (over: Record<string, unknown> = {}) => ({
  device: device(),
  repeat_state: "off",
  shuffle_state: false,
  context: null,
  is_playing: true,
  progress_ms: 1234,
  item: item(),
  currently_playing_type: "track",
  ...over,
})

interface Call {
  readonly url: string
  readonly method: string
  readonly body: unknown
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function noContent(): Response {
  return new Response(null, { status: 204 })
}

const originalFetch = globalThis.fetch
let queue: Response[] = []
let calls: Call[] = []

beforeEach(() => {
  queue = []
  calls = []
  const handler = (
    input: Parameters<typeof fetch>[0],
    init?: Parameters<typeof fetch>[1]
  ): Promise<Response> => {
    calls.push({ url: String(input), method: init?.method ?? "GET", body: init?.body })
    const next = queue.shift()
    if (next === undefined) throw new Error(`unexpected fetch: ${String(input)}`)
    return Promise.resolve(next)
  }
  globalThis.fetch = Object.assign(handler, { preconnect: () => {} })
})

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe("withQuery", () => {
  test("includes defined params and omits undefined", () => {
    expect(withQuery("/x", { a: 1, b: undefined, c: "y", d: false })).toBe("/x?a=1&c=y&d=false")
  })

  test("returns the bare path when no params are defined", () => {
    expect(withQuery("/x", { a: undefined })).toBe("/x")
  })
})

describe("playbackStateSchema", () => {
  test("parses a state object and preserves unknown keys", () => {
    const parsed = playbackStateSchema.parse(playbackState({ unexpected: 1 }))
    expect(parsed.device.name).toBe("My Speaker")
    expect(parsed.is_playing).toBe(true)
  })

  test("throws on a shape mismatch", () => {
    expect(() => playbackStateSchema.parse({ device: "nope" })).toThrow()
  })
})

describe("currentlyPlayingSchema", () => {
  test("tolerates a null item (advertisement / nothing resolved)", () => {
    const parsed = currentlyPlayingSchema.parse({
      context: null,
      progress_ms: null,
      is_playing: false,
      item: null,
      currently_playing_type: "unknown",
    })
    expect(parsed.item).toBeNull()
  })
})

describe("getPlaybackState", () => {
  test("parses a 200 state body", async () => {
    queue.push(jsonResponse(playbackState()))
    const state = await getPlaybackState()
    expect(state?.item?.name).toBe("Song")
    expect(calls[0]?.url).toContain("/me/player")
    expect(calls[0]?.method).toBe("GET")
  })

  test("returns null on a 204 (no active device)", async () => {
    queue.push(noContent())
    expect(await getPlaybackState()).toBeNull()
  })

  test("throws on a non-2xx status", async () => {
    queue.push(jsonResponse({ error: { status: 500, message: "boom" } }, 500))
    await expect(getPlaybackState()).rejects.toThrow(/500/)
  })
})

describe("getDevices", () => {
  test("parses the devices list", async () => {
    queue.push(jsonResponse({ devices: [device(), device({ id: "dev2", is_active: false })] }))
    const { devices } = await getDevices()
    expect(devices).toHaveLength(2)
    expect(devices[1]?.id).toBe("dev2")
  })

  test("throws on a shape mismatch (boundary parse)", async () => {
    queue.push(jsonResponse({ devices: "not-an-array" }))
    await expect(getDevices()).rejects.toThrow()
  })
})

describe("getCurrentlyPlaying", () => {
  test("parses a 200 body", async () => {
    queue.push(
      jsonResponse({
        context: null,
        progress_ms: 10,
        is_playing: true,
        item: item(),
        currently_playing_type: "track",
      })
    )
    const playing = await getCurrentlyPlaying()
    expect(playing?.item?.uri).toBe("spotify:track:t1")
  })

  test("returns null on a 204 (nothing playing)", async () => {
    queue.push(noContent())
    expect(await getCurrentlyPlaying()).toBeNull()
  })
})

describe("getRecentlyPlayed", () => {
  test("parses a cursor page and threads limit/after into the query", async () => {
    queue.push(
      jsonResponse({
        items: [{ track: item(), played_at: "2026-01-01T00:00:00Z", context: null }],
        limit: 5,
        next: null,
        cursors: { after: "abc" },
      })
    )
    const page = await getRecentlyPlayed({ limit: 5, after: 1000 })
    expect(page.items[0]?.track.name).toBe("Song")
    expect(calls[0]?.url).toContain("/me/player/recently-played")
    expect(calls[0]?.url).toContain("limit=5")
    expect(calls[0]?.url).toContain("after=1000")
  })
})

describe("getQueue", () => {
  test("parses the queue object", async () => {
    queue.push(
      jsonResponse({
        currently_playing: item(),
        queue: [item({ id: "t2", uri: "spotify:track:t2" })],
      })
    )
    const q = await getQueue()
    expect(q.currently_playing?.id).toBe("t1")
    expect(q.queue[0]?.uri).toBe("spotify:track:t2")
  })
})

describe("transferPlayback", () => {
  test("PUTs device_ids (+ play)", async () => {
    queue.push(noContent())
    await transferPlayback(["devA"], true)
    expect(calls[0]?.method).toBe("PUT")
    expect(calls[0]?.url).toContain("/me/player")
    expect(calls[0]?.body).toBe(JSON.stringify({ device_ids: ["devA"], play: true }))
  })

  test("omits play when not supplied", async () => {
    queue.push(noContent())
    await transferPlayback(["devA"])
    expect(calls[0]?.body).toBe(JSON.stringify({ device_ids: ["devA"] }))
  })
})

describe("startResumePlayback", () => {
  test("resume: PUTs /play with no body and a device_id query", async () => {
    queue.push(noContent())
    await startResumePlayback({ deviceId: "d1" })
    expect(calls[0]?.method).toBe("PUT")
    expect(calls[0]?.url).toContain("/me/player/play")
    expect(calls[0]?.url).toContain("device_id=d1")
    expect(calls[0]?.body).toBeUndefined()
  })

  test("start: maps options into the request body", async () => {
    queue.push(noContent())
    await startResumePlayback({ contextUri: "spotify:album:a", positionMs: 100 })
    expect(calls[0]?.body).toBe(
      JSON.stringify({ context_uri: "spotify:album:a", position_ms: 100 })
    )
  })

  test("throws on 403 (premium required)", async () => {
    queue.push(jsonResponse({ error: { status: 403, message: "Premium required" } }, 403))
    await expect(startResumePlayback()).rejects.toThrow(/403/)
  })
})

describe("pause / next / previous", () => {
  test("pausePlayback PUTs /pause", async () => {
    queue.push(noContent())
    await pausePlayback()
    expect(calls[0]?.method).toBe("PUT")
    expect(calls[0]?.url).toContain("/me/player/pause")
  })

  test("pausePlayback throws on 404 (no active device)", async () => {
    queue.push(jsonResponse({ error: { status: 404, message: "No active device found" } }, 404))
    await expect(pausePlayback()).rejects.toThrow(/404/)
  })

  test("skipToNext POSTs /next", async () => {
    queue.push(noContent())
    await skipToNext()
    expect(calls[0]?.method).toBe("POST")
    expect(calls[0]?.url).toContain("/me/player/next")
  })

  test("skipToPrevious POSTs /previous", async () => {
    queue.push(noContent())
    await skipToPrevious()
    expect(calls[0]?.method).toBe("POST")
    expect(calls[0]?.url).toContain("/me/player/previous")
  })
})

describe("seek / repeat / volume / shuffle", () => {
  test("seek threads position_ms and device_id", async () => {
    queue.push(noContent())
    await seek(5000, { deviceId: "d9" })
    expect(calls[0]?.method).toBe("PUT")
    expect(calls[0]?.url).toContain("/me/player/seek")
    expect(calls[0]?.url).toContain("position_ms=5000")
    expect(calls[0]?.url).toContain("device_id=d9")
  })

  test("setRepeatMode threads the state", async () => {
    queue.push(noContent())
    await setRepeatMode("track")
    expect(calls[0]?.url).toContain("/me/player/repeat")
    expect(calls[0]?.url).toContain("state=track")
  })

  test("setVolume threads volume_percent", async () => {
    queue.push(noContent())
    await setVolume(75)
    expect(calls[0]?.url).toContain("/me/player/volume")
    expect(calls[0]?.url).toContain("volume_percent=75")
  })

  test("toggleShuffle threads the boolean state", async () => {
    queue.push(noContent())
    await toggleShuffle(true)
    expect(calls[0]?.url).toContain("/me/player/shuffle")
    expect(calls[0]?.url).toContain("state=true")
  })
})

describe("addToQueue", () => {
  test("POSTs /queue with the URI-encoded uri", async () => {
    queue.push(noContent())
    await addToQueue("spotify:track:xyz")
    expect(calls[0]?.method).toBe("POST")
    expect(calls[0]?.url).toContain("/me/player/queue")
    expect(calls[0]?.url).toContain("uri=spotify%3Atrack%3Axyz")
  })

  test("throws on 404 (no active device)", async () => {
    queue.push(jsonResponse({ error: { status: 404, message: "No active device found" } }, 404))
    await expect(addToQueue("spotify:track:xyz")).rejects.toThrow(/404/)
  })
})
