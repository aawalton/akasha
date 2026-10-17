import { expect, test } from "bun:test"
import { roleplay } from "akasha/agent/role/pages/roleplay.role.ts"
import { roleplayRecorder } from "akasha/agent/role/pages/roleplay-recorder.role.ts"
import { roleplayWorldbuilder } from "akasha/agent/role/pages/roleplay-worldbuilder.role.ts"
import { roleplayTold } from "akasha/command/pages/story/turn/advance/modules/turn-roleplay-telling/turn-roleplay-telling.module.code.ts"
import type { Told } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import {
  GAME_MASTER,
  MECHANICS,
  PLAYER,
  RECORDERS,
  WORLD_BUILDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const AT = "stories/the-saga/turns/the-saga-00-003.story-turn-played.ts"

function notifying(sent: string[], pushed: string[]) {
  return {
    notify: async (to: string, body: string) => {
      sent.push(`${to}: ${body}`)
      return null
    },
    readyPushed: async (_root: string, game: string, at: string) => {
      pushed.push(`${game}: ${at}`)
      return null
    },
  }
}

const RECORDER = "awen-roleplay-recorder-the-saga"

const BUILDER = "awen-roleplay-worldbuilder-the-saga"

const NARRATOR = "shaestrel-roleplay-the-saga"

const SEATS: Readonly<Record<string, string>> = {
  [roleplayRecorder.slug]: RECORDER,
  [roleplayWorldbuilder.slug]: BUILDER,
  [roleplay.slug]: NARRATOR,
}

const seatsOf = (game: string, role: string) => {
  const seat = SEATS[role]
  return game === "the-saga" && seat !== undefined ? [seat] : []
}

test("a roleplayed turn's move is told to each roleplay-recorder seat of its story alone", async () => {
  const sent: string[] = []
  const pushed: string[] = []
  const after: Told = { report: [], faults: [] }
  const telling = {
    root: "/r",
    game: "the-saga",
    turn: AT,
    from: MECHANICS,
    status: RECORDERS,
  }
  await roleplayTold(notifying(sent, pushed), telling, after, seatsOf)
  expect(sent).toEqual([`${RECORDER}: The turn \`${AT}\` is at recorders.`])
  expect(pushed).toEqual([])
  expect(after.report).toEqual([`told\t${RECORDER}`])
  expect(after.faults).toEqual([])
})

test("a roleplayed turn back at game-master is told to the roleplay seat alone", async () => {
  const sent: string[] = []
  const after: Told = { report: [], faults: [] }
  const telling = { root: "/r", game: "the-saga", turn: AT, from: MECHANICS, status: GAME_MASTER }
  await roleplayTold(notifying(sent, []), telling, after, seatsOf)
  expect(sent).toEqual([`${NARRATOR}: The turn \`${AT}\` is at game-master.`])
})

test("a roleplayed turn's notice carries each job of its step to the roleplay-recorder alone", async () => {
  const sent: string[] = []
  const after: Told = { report: [], faults: [] }
  const telling = {
    root: "/r",
    game: "the-saga",
    turn: AT,
    from: GAME_MASTER,
    status: MECHANICS,
    jobs: ["the first job", "the second job"],
  }
  await roleplayTold(notifying(sent, []), telling, after, seatsOf)
  const notice = `The turn \`${AT}\` is at mechanics.`
  expect(sent).toHaveLength(1)
  expect(sent[0]).toStartWith(`${RECORDER}: ${notice}\n\n`)
  expect(sent[0]).toEndWith("the first job\n\n---\n\nthe second job")
})

test("the roleplay-worldbuilder's notice carries no job", async () => {
  const sent: string[] = []
  const after: Told = { report: [], faults: [] }
  const telling = {
    root: "/r",
    game: "the-saga",
    turn: AT,
    from: WORLD_BUILDER,
    status: MECHANICS,
    jobs: ["a job"],
  }
  await roleplayTold(notifying(sent, []), telling, after, seatsOf)
  expect(sent).toContain(`${BUILDER}: The turn \`${AT}\` is at mechanics.`)
})

test("a roleplayed turn leaving world-builder pushes Alan that it is ready", async () => {
  const sent: string[] = []
  const pushed: string[] = []
  const after: Told = { report: [], faults: [] }
  const telling = {
    root: "/r",
    game: "the-saga",
    turn: AT,
    from: WORLD_BUILDER,
    status: MECHANICS,
  }
  await roleplayTold(notifying(sent, pushed), telling, after, seatsOf)
  expect(pushed).toEqual([`the-saga: ${AT}`])
  expect(after.report).toContain("pushed\tthe-saga")
  expect(after.report).toContain(`told\t${BUILDER}`)
})

test("a story with no roleplay-recorder seat up is named as a fault, and nothing is sent", async () => {
  const sent: string[] = []
  const pushed: string[] = []
  const after: Told = { report: [], faults: [] }
  const telling = {
    root: "/r",
    game: "the-saga",
    turn: AT,
    from: RECORDERS,
    status: PLAYER,
  }
  await roleplayTold(notifying(sent, pushed), telling, after, () => [])
  expect(sent).toEqual([])
  expect(after.faults.join(" ")).toContain("has no roleplay-recorder seat up")
})
