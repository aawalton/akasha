import { expect, test } from "bun:test"
import {
  type Chapter,
  chapterScened,
  picturedSpliced,
  picturesLaid,
  taken,
} from "akasha/command/pages/story/turn/picture/story-turn-picture.command.code.ts"

const BEATS = [
  '{"beat":1,"event":"Morning.","prose":"She woke.","place":"place/home","present":["character-player/her"],"pictured":[{"cover":"image/image-old","coverAfter":"She woke.","setting":"home"}]}',
  '{"beat":2,"event":"Noon.","prose":"She ate."}',
].join("\n")

const PAGE = `import type { StoryChapterWritten } from "x"

export const one = {
  slug: "one",
  cover: "image/image-old",
  beats: "jsonl",
} as const satisfies StoryChapterWritten
`

function chapter(pictures: boolean): Chapter {
  return {
    at: "story/one.story-chapter-written.ts",
    text: PAGE,
    value: {},
    beatsAt: "story/one.story-chapter-written.beats.jsonl",
    beatsText: `${BEATS}\n`,
    storyValue: pictures ? { picturesOnBeats: true } : {},
  }
}

const SECOND = JSON.stringify({
  beat: 2,
  cover: "image/image-two",
  coverAfter: "She ate.",
  place: "place/home",
  characters: ["character-player/her"],
})

test("a picture lands on its beat, and the scenes are every beat's picture in order", () => {
  const laid = picturesLaid(chapter(true), [SECOND])
  if (typeof laid === "string") throw new Error(laid)
  const lines = laid.beats.trim().split("\n")
  expect(JSON.parse(lines[1] ?? "{}").pictured).toEqual([
    {
      cover: "image/image-two",
      coverAfter: "She ate.",
      place: "place/home",
      characters: ["character-player/her"],
    },
  ])
  expect(lines[0]).toBe(BEATS.split("\n")[0])
  expect(laid.scenes).toEqual(["image/image-old", "image/image-two"])
})

test("a picture for a beat already pictured replaces what that beat pictured", () => {
  const first = JSON.stringify({ beat: 1, cover: "image/image-new", coverAfter: "She woke." })
  const laid = picturesLaid(chapter(true), [first])
  if (typeof laid === "string") throw new Error(laid)
  expect(laid.scenes).toEqual(["image/image-new"])
})

test("a story not picturing its beats, a beat past the last and an empty file are refused", () => {
  expect(picturesLaid(chapter(false), [SECOND])).toContain("picturesOnBeats")
  expect(picturesLaid(chapter(true), [SECOND.replace('"beat":2', '"beat":3')])).toContain(
    "names no beat from 1 to 2"
  )
  expect(picturesLaid(chapter(true), [])).toContain("holds no picture")
})

test("the chapter's scenes are written after its cover, or over the scenes it had", () => {
  const added = chapterScened("one.ts", PAGE, ["image/image-a"])
  expect(added).toContain('cover: "image/image-old",\n  scenes: ["image/image-a"]')
  const again = chapterScened("one.ts", added ?? "", ["image/image-b"])
  expect(again).toContain('scenes: ["image/image-b"]')
  expect(again).not.toContain("image-a")
})

const READ_PROSE = "She woke.\n \nShe ate.\n"

const READ_BEATS = [
  JSON.stringify({ beat: 1, event: "She woke.", prose: "She woke.\n \n" }),
  JSON.stringify({ beat: 2, event: "She ate.", prose: "She ate.\n" }),
].join("\n")

function readChapter(): Chapter {
  return { ...chapter(true), beatsText: `${READ_BEATS}\n`, readProse: READ_PROSE }
}

function proseOf(beats: string): string {
  return beats
    .trim()
    .split("\n")
    .map((one) => String(JSON.parse(one).prose))
    .join("")
}

test("a read chapter's pictures land without touching its prose, which still rejoins", () => {
  const laid = picturesLaid(readChapter(), [SECOND])
  if (typeof laid === "string") throw new Error(laid)
  expect(proseOf(laid.beats)).toBe(READ_PROSE)
  const lines = laid.beats.trim().split("\n")
  expect(lines[0]).toBe(READ_BEATS.split("\n")[0])
  expect(JSON.parse(lines[1] ?? "{}").pictured[0].cover).toBe("image/image-two")
})

test("a read chapter whose beats would not rejoin to its prose is refused", () => {
  const off = { ...readChapter(), readProse: `${READ_PROSE}more` }
  expect(picturesLaid(off, [SECOND])).toContain("would not rejoin")
})

test("a picture spliced onto a beat replaces that beat's pictures and keeps every other key", () => {
  const spliced = picturedSpliced(`${BEATS}\n`, [
    { beat: 1, cover: "image/image-new", coverAfter: "She woke." },
  ])
  const first = JSON.parse(spliced.split("\n")[0] ?? "{}")
  expect(first.pictured).toEqual([{ cover: "image/image-new", coverAfter: "She woke." }])
  expect(first.place).toBe("place/home")
  expect(spliced.split("\n")[1]).toBe(BEATS.split("\n")[1])
})

test("a call names the chapter and the pictures file", () => {
  expect(taken(["--chapter", "one", "--pictured-file", "p.jsonl"], "x")).toEqual({
    chapter: "one",
    file: "p.jsonl",
  })
  expect("refused" in taken(["--chapter", "one"], "x")).toBe(true)
})
