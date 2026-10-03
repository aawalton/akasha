import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { join } from "node:path"
import {
  lengthRefused,
  wordsIn,
} from "akasha/command/pages/story/turn/advance/modules/chapter-length/chapter-length.module.code.ts"
import { storyTurnAdvance } from "akasha/command/pages/story/turn/advance/story-turn-advance.command.code.ts"
import {
  advancedBy,
  beatsOf,
  CHAPTER_ARGV,
  CHAPTER_BEATS,
  chapterReach,
  GIVEN,
  LANDED,
  MASTER,
  ROOT,
  reachOver,
  seatOf,
  seen,
  turnAt,
  WRITER,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.test-fixtures.ts"
import { beatsWritten } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

function proseOf(words: number): string {
  return `${Array.from({ length: words }, () => "word").join(" ")}\n`
}

function beatsHanded(count: number) {
  return { kind: "beats", beats: beatsOf(count) } as const
}

function proseHanded(words: number) {
  return { kind: "prose", prose: proseOf(words), characters: [] } as const
}

test("words are counted between whitespace of any run", () => {
  expect(wordsIn("  Mara\topens\n\nthe   gate.\n")).toBe(4)
  expect(wordsIn("")).toBe(0)
})

test("a written chapter's beats from 50 to 100 are not refused", () => {
  expect(lengthRefused(beatsHanded(50), 0)).toBeNull()
  expect(lengthRefused(beatsHanded(100), 0)).toBeNull()
})

test("a written chapter's beats under 50 or over 100 are refused with the count and the range", () => {
  const few = lengthRefused(beatsHanded(49), 0) ?? ""
  expect(few).toContain("50 to 100")
  expect(few).toContain("these number 49")
  expect(few).toContain("the chapter before sets no length")
  expect(lengthRefused(beatsHanded(101), 0)).toContain("these number 101")
})

test("prose from 50 to 200 words for each beat is not refused", () => {
  expect(lengthRefused(proseHanded(100), 2)).toBeNull()
  expect(lengthRefused(proseHanded(400), 2)).toBeNull()
})

test("prose outside 50 to 200 words for each beat is refused with words, beats and range", () => {
  const short = lengthRefused(proseHanded(99), 2) ?? ""
  expect(short).toContain("100 to 400 words for its 2 beats")
  expect(short).toContain("this prose runs 99 words")
  expect(short).toContain("the chapter before sets no length")
  expect(lengthRefused(proseHanded(401), 2)).toContain("this prose runs 401 words")
})

test("prose for a chapter stating no beats is of any length", () => {
  expect(lengthRefused(proseHanded(1), 0)).toBeNull()
})

test("another step's output is of any length", () => {
  expect(lengthRefused({ kind: "lore", lore: [] }, 0)).toBeNull()
})

test("a written chapter handed too few beats is refused and lands nothing", async () => {
  const into = seen()
  const argv = [...CHAPTER_ARGV, "--beats-file", join(ROOT, "beats.txt")]
  const answer = await storyTurnAdvance(argv, GIVEN, async () => LANDED, chapterReach(into))
  expect(answer.refusals.join(" ")).toContain("these number 2")
  expect(into.folded).toEqual([])
  expect(into.notices).toEqual([])
})

test("a written chapter handed 50 beats lands", async () => {
  const into = seen()
  const argv = [...CHAPTER_ARGV, "--beats-file", CHAPTER_BEATS]
  const reach = chapterReach(into)
  const answer = await storyTurnAdvance(
    argv,
    GIVEN,
    async () => LANDED,
    reach,
    () => undefined
  )
  expect(answer.refusals).toEqual([])
  expect(into.folded.length).toBe(1)
})

test("a written chapter's writer handing prose too short for its beats is refused", async () => {
  const into = seen()
  const held = { beats: beatsOf(50), scenes: [], changes: [], memory: [] }
  const reach = {
    ...chapterReach(into, "writer", seatOf("writer", WRITER), { beats: "jsonl" }),
    textIn: () => beatsWritten(held),
  }
  const argv = [...CHAPTER_ARGV, "--prose-file", join(ROOT, "prose.txt"), "--title", "The Gate"]
  const answer = await storyTurnAdvance(argv, GIVEN, async () => LANDED, reach)
  expect(answer.refusals.join(" ")).toContain("2500 to 10000 words for its 50 beats")
  expect(into.folded).toEqual([])
})

test("a played turn's game master is not held to a chapter's length", async () => {
  const into = seen()
  const reach = reachOver(turnAt("game-master"), seatOf("game-master", MASTER), into)
  const answer = await advancedBy(["--beats-file", join(ROOT, "beats.txt")], reach)
  expect(answer.refusals).toEqual([])
  expect(into.folded.length).toBe(1)
})
