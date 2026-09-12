import { expect, test } from "bun:test"
import {
  type Naming,
  pathOf,
  saidIn,
  wordsIn,
} from "akasha/commands/modules/walking/command-walking.module.code.ts"

const NAMED: Naming = (slug) =>
  ({ "track-session-open": "open", "track-session": "session", track: "track" })[slug] ?? null

test("the words taken down end at the first word that could be no slug", () => {
  expect(wordsIn(["music", "now", "playing"])).toEqual(["music", "now", "playing"])
  expect(wordsIn(["read", "--file-path", "one"])).toEqual(["read"])
  expect(wordsIn(["read", "-h"])).toEqual(["read"])
  expect(wordsIn(["read", "one/two.ts"])).toEqual(["read"])
  expect(wordsIn(["read", "One"])).toEqual(["read"])
  expect(wordsIn(["Read"])).toEqual([])
  expect(wordsIn([])).toEqual([])
  expect(wordsIn(["a", "b", "c", "d", "e"])).toEqual(["a", "b", "c", "d", "e"])
})

test("a hyphen inside one word is part of that word", () => {
  expect(wordsIn(["work-tree", "one"])).toEqual(["work-tree", "one"])
})

test("the call is spelled with the spaces the words were written with", () => {
  expect(saidIn(["track", "session", "open", "one"], 3)).toBe("track session open")
})

test("a level reached in one hyphenated word keeps that hyphen", () => {
  expect(saidIn(["work-tree", "one"], 1)).toBe("work-tree")
})

test("a level reached in one plain word is that word", () => {
  expect(saidIn(["held"], 1)).toBe("held")
})

test("a walk taking no word is spelled as nothing", () => {
  expect(saidIn([], 0)).toBe("")
})

test("the words reaching a level are each name above it, ending with its own", () => {
  expect(pathOf("track-session-open", NAMED)).toBe("track session open")
  expect(pathOf("track-session", NAMED)).toBe("track session")
  expect(pathOf("track", NAMED)).toBe("track")
})

test("a level whose own name carries a hyphen keeps that hyphen in one word", () => {
  const named: Naming = (slug) =>
    ({ "seat-compose-notices": "compose-notices", seat: "seat" })[slug] ?? null
  expect(pathOf("seat-compose-notices", named)).toBe("seat compose-notices")
})

test("a level stating no name is reached by what is left of its slug as one word", () => {
  expect(pathOf("work-tree", () => null)).toBe("work-tree")
  const named: Naming = (slug) => (slug === "a-b-c" ? "c" : null)
  expect(pathOf("a-b-c", named)).toBe("a-b c")
})

test("a level whose name is no ending of its slug is reached by that slug", () => {
  expect(pathOf("track-session", () => "elsewhere")).toBe("track-session")
})
