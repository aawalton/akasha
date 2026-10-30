import { expect, test } from "bun:test"
import { stepTimed } from "akasha/command/pages/story/turn/advance/modules/turn-step-timing/turn-step-timing.module.code.ts"
import type {
  Handed,
  Held,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

const UNSTATED: Held = {
  game: "the-saga",
  status: "beats",
  lore: [],
  issues: [],
  reviewedBy: [],
  recordedBy: [],
  written: false,
}

const HELD: Held = { ...UNSTATED, oneSeat: true }

const MECHANICS = ["mechanics"]

function stepOf(handed: Handed) {
  return stepTimed(HELD, handed, MECHANICS)
}

test("a seat-graph turn's advance names no step", () => {
  const seated: Held = { ...HELD, oneSeat: false }
  expect(stepTimed(seated, { kind: "lore", lore: [] }, MECHANICS)).toEqual({})
  expect(stepTimed(UNSTATED, { kind: "prose", prose: "", characters: [] }, MECHANICS)).toEqual({})
})

test("lore, beats, prose and a review are named for what is handed in", () => {
  expect(stepOf({ kind: "lore", lore: [] })).toEqual({ step: "lore" })
  expect(stepOf({ kind: "beats", beats: ["one"] })).toEqual({ step: "beats" })
  expect(stepOf({ kind: "review", reviewer: "style", issues: [] })).toEqual({
    step: "review style",
  })
  const beatProse = [{ beat: 2, prose: "It rained." }]
  expect(stepOf({ kind: "prose", prose: "", characters: [], beatProse })).toEqual({
    step: "prose",
    beat: 2,
  })
})

test("beats handed in from one beat on are the event restated at that beat", () => {
  expect(stepOf({ kind: "beats", beats: ["one"], beat: 3 })).toEqual({ step: "event", beat: 3 })
})

test("a record is the changes, the memory or the pictures, and the beat its lines name", () => {
  const changes = [{ beat: 1, page: "a", note: "n" }]
  expect(stepOf({ kind: "record", recorder: "mechanics", changes })).toEqual({
    step: "changes",
    beat: 1,
  })
  expect(stepOf({ kind: "record", recorder: "mechanics", issues: ["no"], beat: 4 })).toEqual({
    step: "changes",
    beat: 4,
  })
  const memory = [{ beat: 2, page: "a", fact: "f" }]
  expect(stepOf({ kind: "record", recorder: "memory", memory })).toEqual({
    step: "memory",
    beat: 2,
  })
  const pictured = [{ beat: 5, cover: "c", coverAfter: "d" }]
  expect(stepOf({ kind: "record", recorder: "picture", pictured })).toEqual({
    step: "pictured",
    beat: 5,
  })
})

test("a record holding nothing is named for its recorder, and lines of two beats name none", () => {
  expect(stepOf({ kind: "record", recorder: "memory", memory: [] })).toEqual({
    step: "record memory",
  })
  const memory = [
    { beat: 1, page: "a", fact: "f" },
    { beat: 2, page: "a", fact: "g" },
  ]
  expect(stepOf({ kind: "record", recorder: "memory", memory })).toEqual({ step: "memory" })
})
