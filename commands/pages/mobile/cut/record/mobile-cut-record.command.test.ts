import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  buildIn,
  mobileCutRecord,
  momentIn,
} from "akasha/commands/pages/mobile/cut/record/mobile-cut-record.command.code.ts"

const GOOD = ["--build-number", "3", "--main-sha", "deadbeefcafe"]

const CALLED_AS = "akasha mobile cut record"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a call naming no build is refused before anything is filed", async () => {
  const said = await mobileCutRecord([], GIVEN)

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("--build-number")
})

test("a build that is no whole number is refused", async () => {
  const said = await mobileCutRecord(["--build-number", "abc", "--main-sha", "deadbeef"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--build-number")
  expect(said.refusals[0]).toContain("abc")
})

test("a build below one is refused", async () => {
  const said = await mobileCutRecord(["--build-number", "0", "--main-sha", "deadbeef"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals).toEqual([
    "`--build-number` names a build at or above one, and `0` is below it",
  ])
})

test("a call naming no commit is refused", async () => {
  const said = await mobileCutRecord(["--build-number", "3"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--main-sha")
})

test("a moment that is no instant is refused rather than read as now", async () => {
  const said = await mobileCutRecord([...GOOD, "--cut-at", "nope"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals).toEqual(["`nope` is no instant this can read"])
})

test("an app slug no page carries is refused rather than defaulted", async () => {
  const said = await mobileCutRecord([...GOOD, "--app", "nosuch"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("nosuch")
})

test("a flag this takes no argument at is refused by name", async () => {
  const said = await mobileCutRecord(["--bogus"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--bogus")
  expect(said.refusals[0]).toContain("--build-number")
})

test("a bare word is refused, since this names every argument at a flag", async () => {
  const said = await mobileCutRecord(["stray"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})

test("a flag naming a value with nothing after it is refused", async () => {
  const said = await mobileCutRecord(["--build-number"], GIVEN)

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--build-number")
})

test("a build at one is a build, and one above it is too", () => {
  expect(buildIn(1)).toBe(1)
  expect(buildIn(742)).toBe(742)
})

test("a call naming no moment takes the moment it was called at", () => {
  expect(momentIn(undefined, "2026-09-12T00:00:00.000Z")).toBe("2026-09-12T00:00:00.000Z")
})

test("a moment said is the moment filed", () => {
  expect(momentIn("2026-01-02T03:04:05.000Z", "2026-09-12T00:00:00.000Z")).toBe(
    "2026-01-02T03:04:05.000Z"
  )
})
