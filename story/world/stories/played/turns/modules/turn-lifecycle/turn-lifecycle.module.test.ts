import { expect, test } from "bun:test"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"
import { memory } from "akasha/story/recorder/pages/memory.story-recorder.ts"
import { continuity } from "akasha/story/reviewer/pages/continuity.story-reviewer.ts"
import {
  firstMoved,
  type Handed,
  type Held,
  type Latest,
  linesIn,
  noticeOf,
  slugAfter,
  stepIn,
  workingSaid,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

import {
  advanced,
  at,
  CAST,
  heldAt,
  MASTER,
  movedOf,
  PROSE,
  RECORDER,
  REVIEWER,
  recordedBy,
  TWO,
  VOICE,
  WORDS,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"
import { turnAfter } from "akasha/story/world/stories/played/turns/modules/turn-making/turn-making.module.code.ts"

const LATEST: Latest = {
  slug: "the-saga-00-002",
  position: 2,
  collections: ["story-played/the-saga"],
  unit: WORDS,
  status: "player",
}

test("an action makes the next turn at the world builder, copying the story's turns", () => {
  expect(turnAfter(LATEST, "I open the gate")).toEqual({
    slug: "the-saga-00-003",
    values: {
      partOfCollections: ["story-played/the-saga"],
      position: 3,
      unit: WORDS,
      stepStatus: at("world-builder"),
      action: "I open the gate",
    },
  })
})

test("an action is kept exactly as it was typed", () => {
  const made = turnAfter(LATEST, "  I *shout*, twice  ")
  if ("refused" in made) throw new Error(made.refused)
  expect(made.values["action"]).toBe("  I *shout*, twice  ")
})

test("an action is refused while the last turn is still being made", () => {
  const made = turnAfter({ ...LATEST, status: "reviewers" }, "I wait")
  expect(made).toEqual({
    refused: "The last turn is still being made: the reviewers are working on it.",
  })
  expect(turnAfter({ ...LATEST, status: "recorders" }, "I wait")).toEqual({
    refused: "The last turn is still being made: the recorders are working on it.",
  })
})

test("a slug's last number counts on, padded as it was", () => {
  expect(slugAfter("the-dating-game-00-002")).toBe("the-dating-game-00-003")
  expect(slugAfter("the-saga-00-009")).toBe("the-saga-00-010")
  expect(slugAfter("the-saga-00-999")).toBe("the-saga-00-1000")
  expect(slugAfter("the-saga")).toBeNull()
})

test("the words naming a step, and the lines of a handed-in file", () => {
  expect(stepIn(at("game-master"))).toBe("game-master")
  expect(stepIn(at("recorders"))).toBe("recorders")
  expect(stepIn(at("mechanics"))).toBe("mechanics")
  expect(stepIn(`${stepStatus.slug}/nobody`)).toBeNull()
  expect(workingSaid("world-builder")).toBe("The world builder is working…")
  expect(workingSaid("writer")).toBe("The writer is working…")
  expect(workingSaid("mechanics")).toBe("The mechanics recorder is working…")
  expect(workingSaid("reviewers")).toBe("The reviewers are working…")
  expect(workingSaid("recorders")).toBe("The recorders are working…")
  expect(linesIn(" one \n\n two\r\n")).toEqual(["one", "two"])
})

const STEPPED = ["mechanics", "inventory"]

const RAN = [...STEPPED, memory.slug, CAST]

const PLANNED = { beats: ["Mara opens the gate", "The hall is dark"], scenes: [] }

function stepping(held: Held, caller: typeof MASTER, handed: Handed) {
  return advanced(held, caller, handed, TWO, RAN, [], undefined, STEPPED)
}

test("the first beat a hand-in moved is the first whose event, time, place or comings differ", () => {
  expect(firstMoved(PLANNED, PLANNED)).toBeNull()
  expect(firstMoved(undefined, PLANNED)).toBe(1)
  expect(firstMoved(PLANNED, { ...PLANNED, beats: ["Mara opens the gate", "It is lit"] })).toBe(2)
  const placed = { ...PLANNED, scenes: [{ beat: 2, place: "place/hall" }] }
  expect(firstMoved(PLANNED, placed)).toBe(2)
  const timed = { ...PLANNED, scenes: [{ beat: 1, at: "2026-01-01T10:00:00Z" }] }
  const same = { ...PLANNED, scenes: [{ beat: 1, at: "2026-01-01T10:00:00.000Z" }] }
  expect(firstMoved(timed, same)).toBeNull()
})

test("a mend moving one beat runs every recorder again, one moving none runs none of them", () => {
  const ran = { planned: PLANNED, recordedBy: RAN, written: true }
  const moved = { kind: "beats", ...PLANNED, beats: ["Mara opens the gate", "It is lit"] } as const
  const said = movedOf(stepping(heldAt("game-master", ran), MASTER, moved))
  expect([said.status, said.values["recordedBy"], said.starts.length]).toEqual([
    "mechanics",
    undefined,
    2,
  ])
  const kept = movedOf(stepping(heldAt("game-master", ran), MASTER, { kind: "beats", ...PLANNED }))
  expect([kept.status, kept.values["recordedBy"]]).toEqual(["writer", RAN.map(recordedBy)])
  expect("ownLength" in kept.values).toBe(false)
})

test("a mend moving no beat runs again only the mechanics seats whose issues it answers", () => {
  const held = heldAt("game-master", {
    planned: PLANNED,
    recordedBy: RAN,
    written: true,
    mechanicsIssues: ["beat 2: no lamp is lit"],
  })
  const said = movedOf(stepping(held, MASTER, { kind: "beats", ...PLANNED }))
  expect(said.status).toBe("mechanics")
  expect(said.values["recordedBy"]).toEqual([memory.slug, CAST].map(recordedBy))
  expect(said.starts).toEqual(STEPPED.map((recorder) => ({ kind: "mechanics", recorder })))
  expect("mechanicsIssues" in said.values).toBe(true)
})

test("the writer runs on a mend because issues stand, and the chapter keeps its length", () => {
  const issues = [`${VOICE}: beat 2 is dull`]
  const held = heldAt("mechanics", { beats: 2, written: true, issues, recordedBy: ["inventory"] })
  const on = movedOf(stepping(held, RECORDER, { kind: "record", recorder: "mechanics" }))
  expect(on.status).toBe("writer")
  expect("ownLength" in on.values).toBe(false)
  const clean = { ...held, issues: [] }
  const past = movedOf(stepping(clean, RECORDER, { kind: "record", recorder: "mechanics" }))
  expect(past.status).toBe("recorders")
})

test("after a mend only the reviewer that raised an issue reviews again, until it finds none", () => {
  const mended = {
    reviewedBy: [continuity.slug],
    issues: [`${VOICE}: beat 2 is dull`],
    written: true,
    recordedBy: [memory.slug, CAST],
  }
  const back = movedOf(advanced(heldAt("writer", mended), WRITER, PROSE, TWO))
  expect(back.starts).toEqual([{ kind: "reviewer", reviewer: VOICE }])
  const still = { kind: "review", reviewer: VOICE, issues: ["beat 2 is still dull"] } as const
  const again = movedOf(advanced(heldAt("reviewers", mended), REVIEWER, still, TWO))
  expect([again.status, again.issues]).toEqual(["game-master", [`${VOICE}: beat 2 is still dull`]])
  expect(again.values["reviewedBy"]).toEqual([`story-reviewer/${continuity.slug}`])
  const clean = { ...still, issues: [] }
  const said = movedOf(advanced(heldAt("reviewers", mended), REVIEWER, clean, TWO))
  expect(said.status).toBe("player")
  expect(["issues", "mechanicsIssues"].map((key) => key in said.values)).toEqual([true, true])
  expect([said.values["issues"], said.values["mechanicsIssues"]]).toEqual([undefined, undefined])
})

test("a notice of a page holding issues says it came back for repair and names each file", () => {
  const repairs = [{ file: "x/saga-0001.issues.txt", faults: 2 }]
  const said = noticeOf("x/saga-0001.ts", "game-master", [], "chapter", repairs)
  expect(said).toContain("The chapter `x/saga-0001.ts` is at game-master.")
  expect(said).toContain("came back for repair")
  expect(said).toContain("- `x/saga-0001.issues.txt`, listing 2 faults")
  expect(noticeOf("x/saga-0001.ts", "writer")).toBe("The turn `x/saga-0001.ts` is at writer.")
})
