import { expect, test } from "bun:test"
import { saidIn, wordsIn } from "./command-walking.module.code.ts"

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
