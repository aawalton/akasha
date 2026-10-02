import { expect, test } from "bun:test"
import {
  chapterNotice,
  chapterReadySaid,
  readyNotice,
  readyTold,
} from "akasha/command/pages/story/turn/modules/turn-ready-pushing/turn-ready-pushing.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const GAME = "the-dating-game"

const TURN = "stories/the-dating-game/turns/the-dating-game-00-009.story-turn-played.ts"

test("the notice of a ready turn is titled with the story, numbers the turn and links to the story", () => {
  const ready = {
    game: GAME,
    storyId: "01a0de37-a4ce-75e7-b1cc-7be7e09c8244",
    title: "The Dating Game",
    turn: 9,
  }
  expect(readyNotice(ready)).toEqual({
    title: "The Dating Game",
    body: "Turn 9 is ready.",
    link: `/${storyPlayed.slug}/${GAME}-e09c8244`,
    kind: "turn-ready",
    source: `${storyPlayed.slug}/${GAME}`,
  })
})

test("a turn stating no number is a new turn ready", () => {
  const ready = {
    game: GAME,
    storyId: "01a0de37-a4ce-75e7-b1cc-7be7e09c8244",
    title: "T",
    turn: null,
  }
  expect(readyNotice(ready).body).toBe("A new turn is ready.")
})

test("the notice of a ready chapter is titled with the story, names the chapter and links to it", () => {
  const ready = {
    game: "harem-hotel",
    story: "Harem Hotel",
    chapterId: "01a0ef24-cbe9-734a-aa6e-24a8b55965c5",
    chapterSlug: "harem-hotel-0004-the-throne-room",
    title: "The Throne Room",
    chapter: 4,
  }
  expect(chapterNotice(ready)).toEqual({
    title: "Harem Hotel",
    body: "Chapter 4, The Throne Room, is ready.",
    link: `/${storyChapterWritten.slug}/harem-hotel-0004-the-throne-room-b55965c5`,
    kind: "chapter-ready",
    source: `${storyWritten.slug}/harem-hotel`,
  })
})

test("a chapter stating no number or no title is named by what it states", () => {
  expect(chapterReadySaid(2, null)).toBe("Chapter 2 is ready.")
  expect(chapterReadySaid(null, "The Gate")).toBe("The Gate is ready.")
  expect(chapterReadySaid(null, null)).toBe("A new chapter is ready.")
})

test("a push that lands is reported with its game", async () => {
  const report: string[] = []
  const asked: string[] = []
  await readyTold(
    async (_root, game, turn, noun) => {
      asked.push(`${noun} ${game} ${turn}`)
      return null
    },
    "/nowhere",
    GAME,
    TURN,
    report
  )
  expect(asked).toEqual([`turn ${GAME} ${TURN}`])
  expect(report).toEqual([`pushed\t${GAME}`])
})

test("a chapter's push is asked for as a chapter", async () => {
  const asked: string[] = []
  const chapter = "stories/climb/chapters/climb-0003.story-chapter-written.ts"
  const push = async (_root: string, game: string, at: string, noun: string) => {
    asked.push(`${noun} ${game} ${at}`)
    return null
  }
  await readyTold(push, "/nowhere", "climb", chapter, [], "chapter")
  expect(asked).toEqual([`chapter climb ${chapter}`])
})

test("a push that refuses or throws is reported and never thrown", async () => {
  const report: string[] = []
  await readyTold(async () => "the feed went unwritten", "/nowhere", GAME, TURN, report)
  await readyTold(
    async () => {
      throw new Error("the feed went unread")
    },
    "/nowhere",
    GAME,
    TURN,
    report
  )
  expect(report).toEqual(["unpushed\tthe feed went unwritten", "unpushed\tthe feed went unread"])
})
