import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  musicListening,
  saidOf,
  windowOf,
} from "akasha/commands/pages/music/listening/music-listening.command.code.ts"

const GIVEN: Given = {
  root: ".",
  calledAs: "akasha music listening",
  from: ".",
  writer: null,
  agentId: null,
}

test("a window said short, medium or long is read as the term Spotify names", () => {
  expect(windowOf("short")).toBe("short_term")
  expect(windowOf("medium")).toBe("medium_term")
  expect(windowOf("long")).toBe("long_term")
})

test("a window said as the term itself is read as that term", () => {
  expect(windowOf("long_term")).toBe("long_term")
})

test("no window said is the medium window", () => {
  expect(windowOf(undefined)).toBe("medium_term")
  expect(windowOf("")).toBe("medium_term")
})

test("a window Spotify does not carry is refused before any call is made", async () => {
  const said = await musicListening(["--window", "sideways"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals.join("\n")).toContain('unknown --window "sideways"')
})

test("a window said with nothing after it is refused by name", async () => {
  const said = await musicListening(["--window"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("`--window` takes a value, and none follows it")
})

test("a window said with an equals carries what follows it", async () => {
  const said = await musicListening(["--window=sideways"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain('unknown --window "sideways"')
})

test("a limit that is no whole count is refused before any call is made", async () => {
  const said = await musicListening(["--limit", "two"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("`--limit two` is no whole number of nought or more")
})

test("a limit below zero is refused", async () => {
  const said = await musicListening(["--limit", "-3"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("`--limit -3` is no whole number of nought or more")
})

test("anything the command does not take is refused by name", async () => {
  const said = await musicListening(["--nope"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain(
    "`--nope` is no argument `akasha music listening` takes"
  )
})

test("nothing playing is said rather than left blank", () => {
  const lines = saidOf({
    window: "medium_term",
    limit: 10,
    currentlyPlaying: null,
    recentlyPlayed: [],
    topArtists: [],
    topTracks: [],
  })
  expect(lines[0]).toBe("Currently playing: (nothing)")
})

test("each list is counted in its own heading and its rows numbered", () => {
  const lines = saidOf({
    window: "short_term",
    limit: 10,
    currentlyPlaying: { item: { name: "One" }, is_playing: true },
    recentlyPlayed: [{ track: { name: "Two" }, played_at: "2026-01-01T00:00:00Z" }],
    topArtists: [{ name: "Three" }],
    topTracks: [{ name: "Four", artists: [{ name: "Five" }, { name: "Six" }] }],
  }).join("\n")
  expect(lines).toContain("Currently playing: One (playing)")
  expect(lines).toContain("Recently played (1):")
  expect(lines).toContain("  1. Two  · 2026-01-01T00:00:00Z")
  expect(lines).toContain("Top artists (short_term, 1):")
  expect(lines).toContain("Top tracks (short_term, 1):")
  expect(lines).toContain("  1. Four — Five, Six")
})
