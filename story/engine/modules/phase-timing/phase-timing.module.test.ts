import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import {
  chosenOf,
  type Ended,
  linesOf,
  madeAtOf,
  type PhaseRow,
  PLAYER,
  phaseEnded,
  phasesOrdered,
  pickedUpIn,
  rowsAt,
  startedAtOf,
  wholesOf,
} from "akasha/story/engine/modules/phase-timing/phase-timing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE = "story/the-saga/the-saga.story-played.ts"

const T0 = Date.parse("2026-09-28T12:00:00.000Z")

const SECOND = 1000

function at(seconds: number): string {
  return new Date(T0 + seconds * SECOND).toISOString()
}

function row(runId: string, phase: string, from: number, to: number, ran = "a-seat"): PhaseRow {
  return {
    runId,
    ranAt: at(from),
    endedAt: at(to),
    phase,
    ran,
    story: "the-saga",
    wallMs: (to - from) * SECOND,
  }
}

function ended(phase: string, to: number, run = "saga-002", madeAt: number | null = T0): Ended {
  return { story: "the-saga", run, madeAt, phase, seat: "a-seat", endedAt: T0 + to * SECOND }
}

test("the time a page was made is read off the first twelve digits of its id", () => {
  expect(madeAtOf("01a0e7d8-82cc-7000-927c-fa9b426379af")).toBe(0x01a0e7d882cc)
  expect(madeAtOf(undefined)).toBeNull()
})

test("a run's first phase starts when the run was made", () => {
  expect(startedAtOf([], "saga-002", "world-builder", T0)).toBe(T0)
})

test("a phase starts where the latest other phase of its run ended", () => {
  const rows = [row("saga-002", "world-builder", 0, 10), row("saga-002", "game-master", 10, 30)]
  expect(startedAtOf(rows, "saga-002", "writer", T0)).toBe(T0 + 30 * SECOND)
})

test("a second reviewer starts where the writer ended rather than where the first reviewer did", () => {
  const rows = [row("saga-002", "writer", 0, 10), row("saga-002", "reviewers", 10, 40)]
  expect(startedAtOf(rows, "saga-002", "reviewers", T0)).toBe(T0 + 10 * SECOND)
})

test("the game master starts again where the last reviewer sent the turn back", () => {
  const rows = [
    row("saga-002", "game-master", 0, 10),
    row("saga-002", "writer", 10, 20),
    row("saga-002", "reviewers", 20, 50),
  ]
  expect(startedAtOf(rows, "saga-002", "game-master", T0)).toBe(T0 + 50 * SECOND)
})

test("a pickup is the first line from the seat's user naming the run after the phase started", () => {
  const text = [
    JSON.stringify({ type: "user", timestamp: at(-5), text: "saga-002 is at world-builder" }),
    JSON.stringify({ type: "assistant", timestamp: at(3), text: "saga-002" }),
    JSON.stringify({ type: "user", timestamp: at(4), text: "other-001" }),
    JSON.stringify({ type: "user", timestamp: at(6), text: "saga-002 is at game-master" }),
    "not json saga-002",
  ].join("\n")
  expect(pickedUpIn(text, "saga-002", T0)).toBe(T0 + 6 * SECOND)
  expect(pickedUpIn(null, "saga-002", T0)).toBeNull()
})

test("an ended phase is written beside the story's page, with the player's phase before it", () => {
  const root = scratch.rootFor("phase-timing-")
  mkdirSync(join(root, "story/the-saga"), { recursive: true })
  const said = JSON.stringify({ type: "user", timestamp: at(5), text: "saga-002" })
  phaseEnded(root, PAGE, ended("recorders", -60, "saga-001", T0 - 100 * SECOND), () => null)
  const wrote = phaseEnded(root, PAGE, ended("world-builder", 20), () => said)
  expect(wrote.map((one) => [one.runId, one.phase, one.wallMs])).toEqual([
    ["saga-001", PLAYER, 60 * SECOND],
    ["saga-002", "world-builder", 20 * SECOND],
  ])
  expect(wrote[1]?.waitMs).toBe(5 * SECOND)
  expect(wrote[1]?.workMs).toBe(15 * SECOND)
  expect(rowsAt(root, PAGE).map((one) => one.phase)).toEqual(["recorders", PLAYER, "world-builder"])
})

test("a phase whose run holds no start and no making is written nowhere", () => {
  const root = scratch.rootFor("phase-timing-")
  mkdirSync(join(root, "story/the-saga"), { recursive: true })
  expect(phaseEnded(root, PAGE, ended("writer", 10, "saga-009", null), () => null)).toEqual([])
})

const PLAYED = [
  row("saga-001", "world-builder", 0, 10),
  row("saga-001", "game-master", 10, 30),
  row("saga-001", "reviewers", 30, 60, "reviewer-1"),
  row("saga-001", "reviewers", 30, 90, "reviewer-2"),
  row("saga-001", PLAYER, 90, 200),
  row("saga-002", "world-builder", 200, 230),
]

test("phases are ordered by where they start within their run", () => {
  expect(phasesOrdered(PLAYED)).toEqual(["world-builder", "game-master", "reviewers", PLAYER])
})

test("a run's whole time leaves out the player's phase", () => {
  expect(wholesOf(PLAYED)).toEqual([90 * SECOND, 30 * SECOND])
})

test("a count chooses the newest runs by their latest end", () => {
  const kept = chosenOf(PLAYED, T0, { by: "runs", runs: 1 })
  expect(kept.map((one) => one.runId)).toEqual(["saga-002"])
})

test("a period chooses the rows started within it", () => {
  const kept = chosenOf(PLAYED, T0 + 200 * SECOND, { by: "period", ms: 150 * SECOND, said: "150s" })
  expect(kept.map((one) => one.phase)).toEqual([PLAYER, "world-builder"])
})

test("the table draws each story's phases and the whole run beneath them", () => {
  const drawn = linesOf(PLAYED).join("\n")
  expect(drawn).toContain("the-saga")
  expect(drawn).toMatch(/ {2}reviewers +2 +45\.000s +45\.000s +60\.000s/)
  expect(drawn).toContain("whole")
})
