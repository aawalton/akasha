import { expect, test } from "bun:test"
import {
  commandExportNamedForItsSlug,
  mark,
  slugOf,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/command-export-named-for-its-slug/command-export-named-for-its-slug.syntax-rule.code.ts"
import type {
  Readers,
  Refusal,
  Typing,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import type { Naming } from "akasha/commands/modules/walking/command-walking.module.code.ts"

const SONG_AT = "commands/pages/humming/deep-song/humming-deep-song.command.code.ts"

const SONG_TEST_AT = "commands/pages/humming/deep-song/humming-deep-song.command.test.ts"

const SONG_PAGE_AT = "commands/pages/humming/deep-song/humming-deep-song.command.ts"

const MODULE_AT = "commands/pages/humming/deep-song/song-tabling.module.code.ts"

const OUTSIDE_AT = "checks/one/one.module.code.ts"

const NO_READERS: Readers = new Map()

const NAMES_NOTHING: Naming = () => null

const TYPES_NOTHING: Typing = () => null

function judging(path: string, text: string): readonly Refusal[] {
  return commandExportNamedForItsSlug({
    path,
    source: parsedAs(path, text),
    readers: NO_READERS,
    namedAt: NAMES_NOTHING,
    typedAt: TYPES_NOTHING,
  })
}

test("a command's code exporting the name its slug spells is refused nothing", () => {
  expect(judging(SONG_AT, "export function hummingDeepSong(): number {\n  return 1\n}\n")).toEqual(
    []
  )
})

test("that name exported as a const is read as the export too", () => {
  expect(judging(SONG_AT, "export const hummingDeepSong = (): number => 1\n")).toEqual([])
})

test("a command's code exporting the plural of its slug is refused", () => {
  const said = judging(SONG_AT, "export function hummingDeepSongs(): number {\n  return 1\n}\n")
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("hummingDeepSong")
  expect(said[0]?.line).toBe(1)
})

test("a declaration the file does not export is no export", () => {
  expect(judging(SONG_AT, "function hummingDeepSong(): number {\n  return 1\n}\n")).toHaveLength(1)
})

test("a declaration inside another statement is no export", () => {
  expect(
    judging(SONG_AT, "export function other(): void {\n  const hummingDeepSong = 1\n}\n")
  ).toHaveLength(1)
})

test("a test beside the code is judged nothing", () => {
  expect(judging(SONG_TEST_AT, "export const other = 1\n")).toEqual([])
})

test("the command's own page is judged nothing", () => {
  expect(judging(SONG_PAGE_AT, "export const other = 1\n")).toEqual([])
})

test("a module beside the command is judged nothing", () => {
  expect(judging(MODULE_AT, "export const other = 1\n")).toEqual([])
})

test("a file outside the commands is refused nothing", () => {
  expect(judging(OUTSIDE_AT, "export const other = 1\n")).toEqual([])
})

test("this mark excuses a file only where this rule could not have refused it", () => {
  const text = "export function hummingDeepSongs(): number {\n  return 1\n}\n"
  expect(judging(SONG_AT, text)).toHaveLength(1)
  expect(mark(text, SONG_AT)).toBe(true)
})

test("the slug is read off the stem the code file is named with", () => {
  expect(slugOf(SONG_AT)).toBe("humming-deep-song")
  expect(slugOf(SONG_TEST_AT)).toBe(null)
  expect(slugOf(OUTSIDE_AT)).toBe(null)
})
