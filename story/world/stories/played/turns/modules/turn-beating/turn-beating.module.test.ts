import { expect, test } from "bun:test"
import { beatsOf } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.test-fixtures.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  changesShown,
  changesUnshown,
} from "akasha/story/world/stories/played/turns/modules/turn-beating/turn-beating.module.code.ts"
import type { Handed } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  advanced,
  at,
  heldAt,
  MASTER,
  movedOf,
  PROSE,
  RECORDER,
  refusalOf,
  TWO,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"

const STATED = beatsOf({ beat: 1, event: "One." }, { beat: 2, event: "Two." })

const GAIN = { beat: 1, page: "metric/xp", key: "value", from: 1, to: 2, note: "+1" }

function numbers(beat: number, more: Partial<Extract<Handed, { kind: "record" }>> = {}): Handed {
  return { kind: "record", recorder: "mechanics", beat, ...more }
}

function flowing(flow: Beats) {
  return heldAt("beats", { flow, beats: flow.beats.length })
}

test("the numbers seat hands in the beat ready for it, and its changes land on that beat", () => {
  const said = movedOf(advanced(flowing(STATED), RECORDER, numbers(1, { changes: [GAIN] }), TWO))
  expect(said.status).toBe("beats")
  expect(said.flow?.changes).toEqual([GAIN])
  expect(said.landsKept).toBe(true)
})

test("a beat with no numbers is filled as an empty list", () => {
  const said = movedOf(advanced(flowing(STATED), RECORDER, numbers(1), TWO))
  expect(said.flow?.none).toEqual([{ beat: 1, part: "changes" }])
})

test("a beat handed in out of order, or one not yet ready, is refused", () => {
  expect(refusalOf(advanced(flowing(STATED), RECORDER, numbers(2), TWO))).toBe(
    "beat 1 is the beat ready for the `mechanics` recorder, and this hands in beat 2"
  )
  const prose = { ...PROSE, beat: 1 }
  expect(refusalOf(advanced(flowing(STATED), WRITER, prose, TWO))).toContain(
    "no beat is ready for the writer yet"
  )
  const unnamed = { kind: "record", recorder: "mechanics" } as const
  expect(refusalOf(advanced(flowing(STATED), RECORDER, unnamed, TWO))).toContain("`--beat`")
})

test("a part handed in for another step, or from another seat, is refused", () => {
  const stray = { kind: "record", recorder: "inventory", beat: 1 } as const
  expect(refusalOf(advanced(flowing(STATED), RECORDER, stray, TWO))).toContain("no part of a beat")
  expect(refusalOf(advanced(flowing(STATED), WRITER, numbers(1), TWO))).toContain("story-recorder")
  expect(refusalOf(advanced(flowing(STATED), MASTER, numbers(1), TWO))).toContain("beat by beat")
  const far = numbers(1, { changes: [{ ...GAIN, beat: 2 }] })
  expect(refusalOf(advanced(flowing(STATED), RECORDER, far, TWO))).toContain("names beat 2")
})

test("the writer's prose for a beat lands on its line and in the turn's prose", () => {
  const numbered = beatsOf({ beat: 1, event: "One.", changes: [] }, { beat: 2, event: "Two." })
  const said = movedOf(advanced(flowing(numbered), WRITER, { ...PROSE, beat: 1 }, TWO))
  expect(said.flow?.prose).toEqual([{ beat: 1, prose: "Mara opens the gate." }])
  expect(said.prose).toBe("Mara opens the gate.\n")
  expect(said.values["prose"]).toBe("txt")
  expect(said.landsKept).toBe(false)
})

test("the part filling the last beat's last step moves the turn to player", () => {
  const near = beatsOf({
    beat: 1,
    event: "One.",
    prose: "One told.",
    changes: [],
    memory: [],
  })
  const picture = { kind: "record", recorder: "picture", beat: 1 } as const
  const said = movedOf(advanced(flowing(near), RECORDER, picture, TWO))
  expect(said.status).toBe("player")
  expect(said.values["stepStatus"]).toBe(at("player"))
})

const ENTRY = { page: "metric/xp", key: "value", from: 1, to: 2, note: "+1" }

const LATER = { ...ENTRY, from: 2, to: 3 }

test("only the changes of beats a move shows reach their pages, once", () => {
  const one = { beat: 1, event: "One.", changes: [ENTRY], prose: "One told." }
  const before = beatsOf(one, { beat: 2, event: "Two.", changes: [LATER] })
  const after = beatsOf(one, { beat: 2, event: "Two.", changes: [LATER], prose: "Two told." })
  const later = { beat: 2, ...LATER }
  expect(changesShown(flowing(before), "beats", after)).toEqual([later])
  expect(changesShown(flowing(before), "player", null)).toEqual([])
  expect(changesUnshown(flowing(before))).toEqual([later])
  expect(changesShown(heldAt("recorders", { changes: [GAIN] }), "player", null)).toEqual([GAIN])
})

test("a beat named off the beats status is refused", () => {
  const said = advanced(heldAt("writer"), WRITER, { ...PROSE, beat: 1 }, TWO)
  expect(refusalOf(said)).toContain("only while a turn is at beats")
})
