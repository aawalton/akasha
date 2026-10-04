import { expect, test } from "bun:test"
import {
  AT,
  MASTER,
  reachOver,
  seen,
  turnAt,
} from "akasha/command/pages/story/turn/advance/story-turn-advance.command.test-fixtures.ts"
import type {
  Reach,
  Told,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import {
  type Context,
  seatsStarted,
  unstartedSaid,
} from "akasha/command/pages/story/turn/modules/turn-starting/turn-starting.module.code.ts"

const WHY = 'Model account "aawalton" needs a new login'

const AT_REVIEWERS: Context = {
  game: "the-saga",
  story: { title: "The Saga", master: MASTER },
  reviewers: [
    { slug: "continuity", name: "Continuity", at: "c.ts", instructionsAt: "c.md" },
    { slug: "voice", name: "Voice", at: "v.ts", instructionsAt: "v.md" },
  ],
  recorders: [],
  prompting: {
    title: "The Saga",
    turnAt: AT,
    address: "story-turn-played/the-saga-00-003",
    calledAs: "akasha story turn advance",
    lore: [],
    written: [],
  },
}

const STARTS = [
  { kind: "reviewer", reviewer: "continuity" },
  { kind: "reviewer", reviewer: "voice" },
] as const

function refusing(alerts: string[]): Reach {
  const into = seen()
  return {
    ...reachOver(turnAt("reviewers"), null, into),
    start: async () => {
      throw new Error(WHY)
    },
    notify: async (to, body) => {
      alerts.push(`${to}: ${body}`)
      return null
    },
    alerted: async (title, body) => {
      alerts.push(`Alan: ${title}: ${body}`)
      return null
    },
  }
}

test("a seat that does not start is told to the game master and to Alan, once for the move", async () => {
  const alerts: string[] = []
  const after: Told = { report: [], faults: [] }
  await seatsStarted(refusing(alerts), AT_REVIEWERS, STARTS, [], after)
  const lines = ["no reviewer seat was started: " + WHY, "no reviewer seat was started: " + WHY]
  const body = unstartedSaid(AT, lines)
  expect(alerts).toEqual([
    `${MASTER}: ${body}`,
    `Alan: The Saga waits on a seat that did not start: ${body}`,
  ])
  expect(after.faults).toEqual(lines)
  expect(after.report).toEqual([`told\t${MASTER}`, "told\tAlan"])
})

test("seats that are up and are sent their jobs tell nobody, and the answer says each was sent", async () => {
  const alerts: string[] = []
  const after: Told = { report: [], faults: [] }
  const reach: Reach = {
    ...refusing(alerts),
    start: async (starting) => ({ how: "sent", name: `${starting.role}-${starting.flex ?? ""}` }),
  }
  await seatsStarted(reach, AT_REVIEWERS, STARTS, [], after)
  expect(alerts).toEqual([])
  expect(after.faults).toEqual([])
  expect(after.report).toEqual(["sent\treviewer-flex-1", "sent\treviewer-flex-2"])
})

test("a telling that fails is named in the answer", async () => {
  const alerts: string[] = []
  const after: Told = { report: [], faults: [] }
  const reach: Reach = { ...refusing(alerts), alerted: async () => "the feed is gone" }
  await seatsStarted(reach, AT_REVIEWERS, STARTS.slice(0, 1), [], after)
  expect(after.faults).toContain("Alan was not told a seat did not start: the feed is gone")
})
