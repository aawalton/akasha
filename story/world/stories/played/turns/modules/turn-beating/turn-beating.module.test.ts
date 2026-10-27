import { expect, test } from "bun:test"
import { beatsOf } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.test-fixtures.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  beatJobsOf,
  changesShown,
  changesUnshown,
  flowsOn,
  recorderOf,
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
  expect(refusalOf(advanced(flowing(STATED), MASTER, numbers(1), TWO))).toContain(
    "from a story-recorder seat"
  )
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

test("a hand-in hands each step the beat it made ready, and nothing to a step still busy", () => {
  const numbered = beatsOf({ beat: 1, event: "One.", changes: [] }, { beat: 2, event: "Two." })
  expect(beatJobsOf([STATED], [numbered])).toEqual([
    { part: "changes", turn: 0, beat: 2 },
    { part: "prose", turn: 0, beat: 1 },
  ])
  const both = beatsOf(
    { beat: 1, event: "One.", changes: [] },
    { beat: 2, event: "Two.", changes: [] }
  )
  expect(beatJobsOf([numbered], [both])).toEqual([])
  expect(beatJobsOf([beatsOf()], [STATED])).toEqual([{ part: "changes", turn: 0, beat: 1 }])
})

test("each list part names the recorder that fills it, and prose names none", () => {
  expect([recorderOf("changes"), recorderOf("memory"), recorderOf("pictured")]).toEqual([
    "mechanics",
    "memory",
    "picture",
  ])
  expect(recorderOf("prose")).toBeNull()
})

test("a played turn flows by beats unless roleplayed, written, holding issues, or a chapter", () => {
  expect(flowsOn(heldAt("game-master"))).toBe(true)
  expect(flowsOn(heldAt("game-master", { roleplayed: true }))).toBe(false)
  expect(flowsOn(heldAt("game-master", { written: true }))).toBe(false)
  expect(flowsOn(heldAt("game-master", { issues: ["voice: a fault"] }))).toBe(false)
  expect(flowsOn(heldAt("game-master", { mechanicsIssues: ["beat 1: no coin"] }))).toBe(false)
  expect(flowsOn(heldAt("game-master", { noun: "chapter" }))).toBe(false)
})

const REFUSED = beatsOf(
  { beat: 1, event: "One.", changes: [], prose: "One told." },
  { beat: 2, event: "Two.", issues: ["beat 2: no coin"] },
  { beat: 3, event: "Three." }
)

test("the numbers seat refuses a beat with its issues, and the game master is handed it", () => {
  const issues = { ...numbers(2), issues: ["beat 2: no coin"] }
  const once = beatsOf({ beat: 1, event: "One.", changes: [] }, { beat: 2, event: "Two." })
  const said = movedOf(advanced(flowing(once), RECORDER, issues, TWO))
  expect(said.flow?.issues).toEqual([{ beat: 2, issue: "beat 2: no coin" }])
  expect(beatJobsOf([once], [said.flow ?? once])).toEqual([{ part: "event", turn: 0, beat: 2 }])
  const both = { ...issues, changes: [{ ...GAIN, beat: 2 }] }
  expect(refusalOf(advanced(flowing(once), RECORDER, both, TWO))).toContain("no changes")
})

test("the game master states the refused beat and those after it again, keeping the beats before", () => {
  const beats = ["One.", "Two, mended.", "Three, mended."]
  const said = movedOf(advanced(flowing(REFUSED), MASTER, { kind: "beats", beats, beat: 2 }, TWO))
  expect(said.status).toBe("beats")
  expect(said.flow?.beats).toEqual(beats)
  expect(said.flow?.prose).toEqual([{ beat: 1, prose: "One told." }])
  expect(said.flow?.none).toEqual([{ beat: 1, part: "changes" }])
  expect(said.flow?.issues).toBeUndefined()
  expect(beatJobsOf([REFUSED], [said.flow ?? REFUSED])[0]).toEqual({
    part: "changes",
    turn: 0,
    beat: 2,
  })
})

test("a restatement moving a beat before the refused one, or naming another beat, is refused", () => {
  const moved = { kind: "beats", beats: ["One, moved.", "Two."], beat: 2 } as const
  expect(refusalOf(advanced(flowing(REFUSED), MASTER, moved, TWO))).toContain("beat 1 differs")
  const early = { kind: "beats", beats: ["One.", "Two."], beat: 1 } as const
  expect(refusalOf(advanced(flowing(REFUSED), MASTER, early, TWO))).toContain(
    "beat 2 is the beat ready for the game master"
  )
})

test("the game master's advance handing in nothing at beats hands every ready beat out again", () => {
  const said = movedOf(advanced(flowing(STATED), MASTER, { kind: "lore", lore: [] }, TWO))
  expect([said.status, said.again, said.flow]).toEqual(["beats", true, STATED])
})

test("a beat named off the beats status is refused", () => {
  const said = advanced(heldAt("writer"), WRITER, { ...PROSE, beat: 1 }, TWO)
  expect(refusalOf(said)).toContain("only while a turn is at beats")
})
