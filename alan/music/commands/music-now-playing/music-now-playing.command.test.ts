import { expect, test } from "bun:test"
import type { NowPlayingCurrent, NowPlayingState } from "./music-now-playing.command.code.ts"
import { envelopeOf, lineOf, nowPlayingWith } from "./music-now-playing.command.code.ts"

const PROGRESS = 1000

const LATER = 2000

const DURATION = 210000

const STATE: NowPlayingState = {
  is_playing: true,
  device: { name: "Kitchen" },
  progress_ms: PROGRESS,
  item: { name: "Bulletproof", uri: "spotify:track:one", id: "one", duration_ms: DURATION },
}

const CURRENT: NowPlayingCurrent = {
  item: { name: "Motion Sickness", uri: "spotify:track:two", id: "two" },
  progress_ms: LATER,
}

function readerFor(state: NowPlayingState | null, current: NowPlayingCurrent | null) {
  return {
    getPlaybackState: () => Promise.resolve(state),
    getCurrentlyPlaying: () => Promise.resolve(current),
  }
}

test("no playback state is the no-device envelope", () => {
  expect(envelopeOf(null, CURRENT)).toEqual({ activeDevice: false, track: null })
})

test("the currently playing track wins over the one the state names", () => {
  const envelope = envelopeOf(STATE, CURRENT)
  expect(envelope).toEqual({
    activeDevice: true,
    isPlaying: true,
    device: "Kitchen",
    progress_ms: LATER,
    track: { name: "Motion Sickness", uri: "spotify:track:two", id: "two", duration_ms: null },
  })
})

test("the state's own track is taken where nothing is currently playing", () => {
  const envelope = envelopeOf(STATE, null)
  expect(envelope).toEqual({
    activeDevice: true,
    isPlaying: true,
    device: "Kitchen",
    progress_ms: PROGRESS,
    track: { name: "Bulletproof", uri: "spotify:track:one", id: "one", duration_ms: DURATION },
  })
})

test("the human line marks a held track apart from a playing one", () => {
  expect(lineOf(envelopeOf(STATE, null))).toBe("▶ Bulletproof · Kitchen")
  expect(lineOf(envelopeOf({ ...STATE, is_playing: false }, null))).toBe("⏸ Bulletproof · Kitchen")
  expect(lineOf(envelopeOf({ ...STATE, item: null }, null))).toBe("▶ (nothing) · Kitchen")
  expect(lineOf(envelopeOf(null, null))).toBe("No active Spotify device")
})

test("the human report is the one line", async () => {
  const said = await nowPlayingWith(readerFor(STATE, null), [])
  expect(said).toEqual({ report: ["▶ Bulletproof · Kitchen"], refusals: [], code: 0 })
})

test("--json gives the envelope on one line", async () => {
  const said = await nowPlayingWith(readerFor(null, null), ["--json"])
  expect(said.code).toBe(0)
  expect(said.report).toEqual(['{"activeDevice":false,"track":null}'])
})

test("anything the command does not take refuses the call", async () => {
  const said = await nowPlayingWith(readerFor(STATE, null), ["--pretty"])
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--pretty")
})
