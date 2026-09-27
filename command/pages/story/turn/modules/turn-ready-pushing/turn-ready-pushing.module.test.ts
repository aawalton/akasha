import { expect, test } from "bun:test"
import {
  readyNotice,
  readyTold,
} from "akasha/command/pages/story/turn/modules/turn-ready-pushing/turn-ready-pushing.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"

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

test("a push that lands is reported with its game", async () => {
  const report: string[] = []
  const asked: string[] = []
  await readyTold(
    async (_root, game, turn) => {
      asked.push(`${game} ${turn}`)
      return null
    },
    "/nowhere",
    GAME,
    TURN,
    report
  )
  expect(asked).toEqual([`${GAME} ${TURN}`])
  expect(report).toEqual([`pushed\t${GAME}`])
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
