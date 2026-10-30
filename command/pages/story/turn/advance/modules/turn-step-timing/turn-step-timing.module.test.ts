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

function stepOf(handed: Handed, held: Held = HELD) {
  return stepTimed(held, handed)
}

test("a seat-graph turn's advance names no step", () => {
  const seated: Held = { ...HELD, oneSeat: false }
  expect(stepTimed(seated, { kind: "lore", lore: [] })).toEqual({})
  expect(stepTimed(UNSTATED, { kind: "prose", prose: "", characters: [] })).toEqual({})
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

test("beats handed in from one beat on restate that beat", () => {
  expect(stepOf({ kind: "beats", beats: ["one"], beat: 3 })).toEqual({ step: "restate", beat: 3 })
})

test("at beats, a record is the numbers, the memory or the pictures of the beat it names", () => {
  const changes = [{ beat: 1, page: "a", note: "n" }]
  expect(stepOf({ kind: "record", recorder: "mechanics", changes })).toEqual({
    step: "numbers",
    beat: 1,
  })
  expect(stepOf({ kind: "record", recorder: "mechanics", issues: ["no"], beat: 4 })).toEqual({
    step: "numbers",
    beat: 4,
  })
  expect(stepOf({ kind: "record", recorder: "memory", memory: [], beat: 2 })).toEqual({
    step: "memory",
    beat: 2,
  })
  const pictured = [{ beat: 5, cover: "c", coverAfter: "d" }]
  expect(stepOf({ kind: "record", recorder: "picture", pictured })).toEqual({
    step: "pictures",
    beat: 5,
  })
})

test("a turn's whole memory, handed in at player, is the step memory and names no beat", () => {
  const owing: Held = { ...HELD, status: "player", memoryOwed: true }
  const memory = [{ beat: 2, page: "a", fact: "f" }]
  expect(stepOf({ kind: "record", recorder: "memory", memory }, owing)).toEqual({
    step: "memory",
  })
})

test("off the beats, a record is named for its recorder, and lines of two beats name none", () => {
  const recording: Held = { ...HELD, status: "recorders" }
  const memory = [
    { beat: 1, page: "a", fact: "f" },
    { beat: 2, page: "a", fact: "g" },
  ]
  expect(stepOf({ kind: "record", recorder: "memory", memory }, recording)).toEqual({
    step: "record memory",
  })
  const changes = [{ beat: 1, page: "a", note: "n" }]
  const numbers: Held = { ...HELD, status: "mechanics" }
  expect(stepOf({ kind: "record", recorder: "mechanics", changes }, numbers)).toEqual({
    step: "record mechanics",
    beat: 1,
  })
})
