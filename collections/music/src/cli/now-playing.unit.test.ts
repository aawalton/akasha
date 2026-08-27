import { describe, expect, test } from "bun:test"
import { buildNowPlayingEnvelope } from "./now-playing"

type PlayerItem = {
  id: string | null
  uri: string
  name: string
  type: string
  duration_ms?: number
}

function makeState(overrides: {
  is_playing?: boolean
  progress_ms?: number | null
  deviceName?: string
  item?: PlayerItem | null
}) {
  return {
    device: {
      id: "dev-1",
      is_active: true,
      is_private_session: false,
      is_restricted: false,
      name: overrides.deviceName ?? "Living Room",
      type: "Speaker",
      volume_percent: 55,
    },
    repeat_state: "off",
    shuffle_state: false,
    context: null,
    is_playing: overrides.is_playing ?? true,
    progress_ms: overrides.progress_ms === undefined ? 42_000 : overrides.progress_ms,
    item: overrides.item === undefined ? makeItem({}) : overrides.item,
    currently_playing_type: "track",
  }
}

function makeItem(overrides: Partial<PlayerItem>): PlayerItem {
  return {
    id: overrides.id ?? "track-id-1",
    uri: overrides.uri ?? "spotify:track:track-id-1",
    name: overrides.name ?? "Afterglow",
    type: overrides.type ?? "track",
    ...(overrides.duration_ms !== undefined && { duration_ms: overrides.duration_ms }),
  }
}

function makeCurrent(overrides: { progress_ms?: number | null; item?: PlayerItem | null }) {
  return {
    context: null,
    progress_ms: overrides.progress_ms === undefined ? 50_000 : overrides.progress_ms,
    is_playing: true,
    item: overrides.item === undefined ? makeItem({}) : overrides.item,
    currently_playing_type: "track",
  }
}

describe("buildNowPlayingEnvelope", () => {
  test("surfaces duration_ms (track length) and progress_ms (position) when playing", () => {
    const state = makeState({ progress_ms: 42_000, item: makeItem({ duration_ms: 215_000 }) })
    const envelope = buildNowPlayingEnvelope(state, null)
    expect(envelope.activeDevice).toBe(true)
    if (!envelope.activeDevice) throw new Error("expected active device")
    expect(envelope.track?.duration_ms).toBe(215_000)
    expect(envelope.progress_ms).toBe(42_000)
  })

  test("prefers the fresher currently-playing values for item + progress", () => {
    const state = makeState({ progress_ms: 42_000, item: makeItem({ duration_ms: 215_000 }) })
    const current = makeCurrent({
      progress_ms: 50_000,
      item: makeItem({ id: "track-id-2", uri: "spotify:track:track-id-2", duration_ms: 180_000 }),
    })
    const envelope = buildNowPlayingEnvelope(state, current)
    if (!envelope.activeDevice) throw new Error("expected active device")
    expect(envelope.track?.id).toBe("track-id-2")
    expect(envelope.track?.duration_ms).toBe(180_000)
    expect(envelope.progress_ms).toBe(50_000)
  })

  test("falls back to state.progress_ms when current progress is null", () => {
    const state = makeState({ progress_ms: 42_000 })
    const current = makeCurrent({ progress_ms: null })
    const envelope = buildNowPlayingEnvelope(state, current)
    if (!envelope.activeDevice) throw new Error("expected active device")
    expect(envelope.progress_ms).toBe(42_000)
  })

  test("duration_ms is null when the item omits it", () => {
    const state = makeState({ item: makeItem({ duration_ms: undefined }) })
    const envelope = buildNowPlayingEnvelope(state, null)
    if (!envelope.activeDevice) throw new Error("expected active device")
    expect(envelope.track?.duration_ms).toBeNull()
  })

  test("no active device → activeDevice false, track null", () => {
    const envelope = buildNowPlayingEnvelope(null, null)
    expect(envelope).toEqual({ activeDevice: false, track: null })
  })

  test("active device with no item → track null, progress still surfaced", () => {
    const state = makeState({ item: null, progress_ms: 0 })
    const envelope = buildNowPlayingEnvelope(state, null)
    if (!envelope.activeDevice) throw new Error("expected active device")
    expect(envelope.track).toBeNull()
    expect(envelope.progress_ms).toBe(0)
  })
})
