import { expect, test } from "bun:test"
import {
  beatsOf,
  cutsIn,
  EVENT_CEILING,
  eventOf,
  kindOf,
  paragraphsIn,
} from "akasha/command/pages/story/chapter-split/story-chapter-split.command.code.ts"
import { rejoined } from "akasha/command/pages/story/modules/beat-rejoining/beat-rejoining.module.code.ts"
import {
  beatsIn,
  beatsWritten,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"

const GAP = "\n \n"

const CHAPTER = [
  "Lyonette rose early. The inn was cold.",
  "She lit the fire and swept the room.",
  "—-",
  "Erin came down the stairs. She was humming.",
  "The bees buzzed in their jar.",
].join(GAP)

const ENDED = `${CHAPTER}\n`

function joinedFrom(written: string): string {
  return rejoined(written)
}

function wordsOf(count: number): string {
  return Array.from({ length: count }, () => "word").join(" ")
}

test("a line of dashes alone is a scene mark, and a dash in a sentence is not", () => {
  expect(kindOf("—-")).toBe("mark")
  expect(kindOf("* * *")).toBe("mark")
  expect(kindOf(" ")).toBe("blank")
  expect(kindOf("—")).toBe("text")
  expect(kindOf("She stopped—then ran.")).toBe("text")
})

test("the beats' prose joined end to end is the chapter's prose, byte for byte", () => {
  for (const text of [CHAPTER, ENDED, ` \n${ENDED}`]) {
    const beats = beatsOf(text)
    expect(beats).not.toBeNull()
    if (beats === null) continue
    expect(joinedFrom(beatsWritten(beats))).toBe(text)
  }
})

test("a scene break opens a beat, and the mark stays with the beat before it", () => {
  const beats = beatsOf(ENDED)
  expect(beats?.beats).toEqual(["Lyonette rose early.", "Erin came down the stairs."])
  expect(beats?.prose?.[0]?.prose.endsWith(`—-${GAP}`)).toBe(true)
  expect(beats?.prose?.[1]?.prose.startsWith("Erin")).toBe(true)
})

test("what the split writes reads back as beats", () => {
  const beats = beatsOf(ENDED)
  if (beats === null) throw new Error("no beats")
  const read = beatsIn(beatsWritten(beats))
  expect("refused" in read).toBe(false)
})

test("a long scene is parted at its paragraphs, and no paragraph is parted", () => {
  const text = [wordsOf(300), wordsOf(300), wordsOf(700), wordsOf(10)].join(GAP)
  const paragraphs = paragraphsIn(text)
  expect(paragraphs.map((one) => one.words)).toEqual([300, 300, 700, 10])
  expect(cutsIn(paragraphs, 500).length).toBe(4)
  const beats = beatsOf(text)
  expect(beats === null ? "" : joinedFrom(beatsWritten(beats))).toBe(text)
})

test("each line holding words is a paragraph, with no blank line between them", () => {
  const text = [wordsOf(300), wordsOf(300), "—-", wordsOf(10)].join("\n")
  expect(paragraphsIn(text).map((one) => one.afterBreak)).toEqual([false, false, true])
  const beats = beatsOf(text)
  expect(beats?.beats.length).toBe(3)
  expect(beats === null ? "" : joinedFrom(beatsWritten(beats))).toBe(text)
})

test("an event is its first sentence, shortened at a word past the ceiling", () => {
  expect(eventOf(`"Hello," she said. "Sit down."${GAP}`)).toBe('"Hello," she said.')
  const long = eventOf(`${wordsOf(60)}.`)
  expect(long.length).toBeLessThanOrEqual(EVENT_CEILING + 1)
  expect(long.endsWith("…")).toBe(true)
})

test("prose holding no paragraph makes no beats", () => {
  expect(beatsOf(` \n—-\n`)).toBeNull()
})
