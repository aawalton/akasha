import { expect, test } from "bun:test"
import {
  type ClaimedCandidate,
  decideClaimedRedelivery,
} from "./supervisor-claimed-redelivery-decide.module.code.ts"

const STARTED = 1_000

function candidate(id: string, over: Partial<ClaimedCandidate> = {}): ClaimedCandidate {
  return {
    id,
    claimedAtMs: STARTED - 1,
    finding: { outcome: "lost", selfRead: false },
    ...over,
  }
}

function decide(candidates: readonly ClaimedCandidate[]) {
  return decideClaimedRedelivery({ candidates, processStartedAtMs: STARTED })
}

test("a message claimed before this process started and lost is released", () => {
  const said = decide([candidate("a")])
  expect(said.release).toEqual(["a"])
  expect(said.skipped).toEqual([])
})

test("a message claimed since this process started is still in flight", () => {
  const said = decide([candidate("a", { claimedAtMs: STARTED })])
  expect(said.release).toEqual([])
  expect(said.skipped).toEqual([{ id: "a", reason: "in-flight" }])
})

test("a message whose transcript could not be read is left alone", () => {
  expect(decide([candidate("a", { finding: null })]).skipped).toEqual([
    { id: "a", reason: "unreadable" },
  ])
})

test("a message the seat read for itself is not released", () => {
  const said = decide([candidate("a", { finding: { outcome: "lost", selfRead: true } })])
  expect(said.skipped).toEqual([{ id: "a", reason: "self-read" }])
})

test("a message that reached the seat is not released", () => {
  const said = decide([candidate("a", { finding: { outcome: "injected", selfRead: false } })])
  expect(said.skipped).toEqual([{ id: "a", reason: "injected" }])
})

test("a message that has not arrived yet is not released", () => {
  const said = decide([candidate("a", { finding: { outcome: "not-yet", selfRead: false } })])
  expect(said.skipped).toEqual([{ id: "a", reason: "not-yet" }])
})

test("a message absent from the transcript is released", () => {
  const said = decide([candidate("a", { finding: { outcome: "absent", selfRead: false } })])
  expect(said.release).toEqual(["a"])
})

test("being read by the seat itself outranks having reached it", () => {
  const said = decide([candidate("a", { finding: { outcome: "injected", selfRead: true } })])
  expect(said.skipped).toEqual([{ id: "a", reason: "self-read" }])
})

test("candidates are sorted into released and skipped, each keeping its id", () => {
  const said = decide([
    candidate("release-me"),
    candidate("in-flight", { claimedAtMs: STARTED + 1 }),
    candidate("unreadable", { finding: null }),
  ])
  expect(said.release).toEqual(["release-me"])
  expect(said.skipped.map((one) => one.id)).toEqual(["in-flight", "unreadable"])
})

test("nothing claimed releases nothing and skips nothing", () => {
  expect(decide([])).toEqual({ release: [], skipped: [] })
})
