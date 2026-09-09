import { expect, test } from "bun:test"
import { ANSWER_CEILING } from "../../pages/read/long-body/long-body.module.code.ts"
import { bodyOf, fits, pointedAt, refusalsAt } from "./refusals-keeping.module.code.ts"

test("a seat's refusals are named beside that seat's page, outside the commit", () => {
  expect(refusalsAt("seat-system/seats/pages/amy.seat.ts")).toBe(
    "seat-system/seats/pages/amy.seat.refusals.uncommitted.txt"
  )
})

test("a subagent's refusals are named beside that subagent's page", () => {
  expect(refusalsAt("seat-system/subagents/pages/aine-a1.subagent.ts")).toBe(
    "seat-system/subagents/pages/aine-a1.subagent.refusals.uncommitted.txt"
  )
})

test("a path under no TypeScript name keeps no refusals", () => {
  expect(refusalsAt("elsewhere/notes.md")).toBeNull()
})

test("one blank line parts two refusals", () => {
  expect(bodyOf(["one refused", "two refused"])).toBe("one refused\n\ntwo refused\n")
})

test("the body written closes with a newline", () => {
  expect(bodyOf(["only this"])).toBe("only this\n")
})

test("a refusal set one answer holds fits", () => {
  expect(fits(["short enough to read where it was refused"])).toBe(true)
})

test("a refusal set past what one answer holds does not fit", () => {
  expect(fits(["a".repeat(ANSWER_CEILING)])).toBe(false)
})

test("the pointer names the path the refusals are written at", () => {
  expect(pointedAt("one/amy.seat.refusals.uncommitted.txt").join("\n")).toContain(
    "one/amy.seat.refusals.uncommitted.txt"
  )
})

test("the pointer names the call opening that path", () => {
  expect(pointedAt("one/amy.seat.refusals.uncommitted.txt").join("\n")).toContain(
    "akasha read --file-path"
  )
})
