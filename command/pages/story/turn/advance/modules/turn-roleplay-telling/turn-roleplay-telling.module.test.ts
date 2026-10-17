import { expect, test } from "bun:test"
import { roleplayTold } from "akasha/command/pages/story/turn/advance/modules/turn-roleplay-telling/turn-roleplay-telling.module.code.ts"
import type { Told } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"

const AT = "stories/the-saga/turns/the-saga-00-003.story-turn-played.ts"

function notifying(sent: string[]) {
  return {
    notify: async (to: string, body: string) => {
      sent.push(`${to}: ${body}`)
      return null
    },
  }
}

test("a roleplayed turn's move is told to each roleplay-recorder seat of its story alone", async () => {
  const sent: string[] = []
  const after: Told = { report: [], faults: [] }
  await roleplayTold(
    notifying(sent),
    { game: "the-saga", turn: AT, status: "game-master" },
    after,
    (game) => (game === "the-saga" ? ["awen-roleplay-recorder-the-saga"] : [])
  )
  expect(sent).toEqual([`awen-roleplay-recorder-the-saga: The turn \`${AT}\` is at game-master.`])
  expect(after.report).toEqual(["told\tawen-roleplay-recorder-the-saga"])
  expect(after.faults).toEqual([])
})

test("a story with no roleplay-recorder seat up is named as a fault, and nothing is sent", async () => {
  const sent: string[] = []
  const after: Told = { report: [], faults: [] }
  await roleplayTold(
    notifying(sent),
    { game: "the-saga", turn: AT, status: "player" },
    after,
    () => []
  )
  expect(sent).toEqual([])
  expect(after.faults.join(" ")).toContain("has no roleplay-recorder seat up")
})
