import { expect, test } from "bun:test"
import {
  found,
  moduleOf,
  slugOf,
} from "akasha/checks/code-checks/pages/command-takes-its-arguments-through-one-reader/command-takes-its-arguments-through-one-reader.code-check.decision.code.ts"

const AT = "commands/pages/humming/deep-song/humming-deep-song.command.code.ts"

const PAGE_AT = "commands/pages/humming/deep-song/humming-deep-song.command.ts"

const OUTSIDE_AT = "akasha/humming/held.module.code.ts"

const BESIDE_AT = "commands/pages/humming/humming-arguing/humming-arguing.module.code.ts"

const FAR_AT = "temper/commands/word-reading/word-reading.module.code.ts"

const READER =
  "export function saidFor(argv: readonly string[]): number {\n  return argv.length\n}\n"

const OPENS = "export function hummingDeepSong(argv: readonly string[], given: Given): Answer {\n"

function bodied(said: string): string {
  return `${OPENS}${said}}\n`
}

test("a command handing the words of its call to `takenFor` is refused nothing", () => {
  const said = bodied("  return answered(takenFor(argv, given.calledAs, page, PAGES))\n")
  expect(found(AT, said)).toEqual([])
})

test("a command asking those words whether a flag is there is refused", () => {
  const said = found(AT, bodied('  return answered(argv.includes("--json"))\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`argv.includes`")
  expect(said[0]).toContain("takenFor")
})

test("a command reading those words by place is refused", () => {
  const said = found(AT, bodied("  return answered(argv[0])\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`argv` by place")
})

test("a command walking those words one by one is refused", () => {
  const said = found(AT, bodied("  for (const one of argv) report(one)\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("word by word")
})

test("a reader the same file declares is followed into", () => {
  const holder = "function readIn(words: readonly string[]): number {\n  return words.length\n}\n"
  const said = found(AT, holder + bodied("  return answered(readIn(argv))\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`words.length`")
})

test("a reader another file holds carries those words out of this judgement", () => {
  expect(found(AT, bodied("  return answered(readIn(argv))\n"))).toEqual([])
})

test("a command naming those words nowhere is refused nothing", () => {
  expect(found(AT, bodied("  return answered(given.root)\n"))).toEqual([])
})

test("a reader reached twice is walked once", () => {
  const holder = "function readIn(words: readonly string[]): number {\n  return words.length\n}\n"
  const twice = "  return answered(readIn(argv), readIn(argv))\n"
  expect(found(AT, holder + bodied(twice))).toHaveLength(1)
})

test("every read of those words is refused apart", () => {
  const said = found(AT, bodied('  return answered(argv[0], argv.includes("--json"))\n'))
  expect(said).toHaveLength(2)
})

test("a file outside the commands is refused nothing", () => {
  expect(found(OUTSIDE_AT, bodied("  return answered(argv[0])\n"))).toEqual([])
})

test("a command's page is no command's code", () => {
  expect(found(PAGE_AT, bodied("  return answered(argv[0])\n"))).toEqual([])
})

test("a file exporting no name the slug spells is refused nothing", () => {
  const said = "export function other(argv: readonly string[]): number {\n  return argv.length\n}\n"
  expect(found(AT, said)).toEqual([])
})

test("a command's file names that command's slug", () => {
  expect(slugOf(AT)).toBe("humming-deep-song")
  expect(slugOf(PAGE_AT)).toBeNull()
  expect(slugOf(OUTSIDE_AT)).toBeNull()
})

test("a module's file beside the commands names that module's slug", () => {
  expect(moduleOf(BESIDE_AT)).toBe("humming-arguing")
  expect(moduleOf(AT)).toBeNull()
  expect(moduleOf(FAR_AT)).toBeNull()
})

test("a module beside the commands reading those words is refused", () => {
  const said = found(BESIDE_AT, READER)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("`argv.length`")
})

test("a module away from the commands is refused nothing", () => {
  expect(found(FAR_AT, READER)).toEqual([])
})

test("a module keeping its reader to itself is refused nothing", () => {
  expect(found(BESIDE_AT, READER.replace("export ", ""))).toEqual([])
})

test("a module taking those words under another spelling is refused nothing", () => {
  expect(found(BESIDE_AT, READER.replaceAll("argv", "words"))).toEqual([])
})

test("a module handing those words to `takenFor` is refused nothing", () => {
  const said =
    "export function readIn(argv: readonly string[], calledAs: string): Read {\n" +
    "  return takenFor(argv, calledAs, page, PAGES)\n}\n"
  expect(found(BESIDE_AT, said)).toEqual([])
})

test("each reader a module exports is refused apart", () => {
  expect(found(BESIDE_AT, READER + READER.replace("saidFor", "eachFor"))).toHaveLength(2)
})

test("a reader one export of a module hands on to another is refused once", () => {
  const on =
    "export function eachFor(argv: readonly string[]): number {\n  return saidFor(argv)\n}\n"
  expect(found(BESIDE_AT, READER + on)).toHaveLength(1)
})

test("a module's refusals are named in the order the lines run", () => {
  const said = found(BESIDE_AT, READER.replace("saidFor", "eachFor") + READER)
  expect(said[0]).toContain("line 2")
  expect(said[1]).toContain("line 5")
})
