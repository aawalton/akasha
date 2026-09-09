import { expect, test } from "bun:test"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import { answerFrom, claudeAccountUsage, saidOf } from "./claude-account-usage.command.code.ts"

const ROOT = "/nowhere"

function givenIn(): Given {
  return {
    root: ROOT,
    calledAs: "akasha claude-account usage",
    from: ROOT,
    writer: null,
    agentId: null,
  }
}

test("a word this does not take refuses as a fault in the call", () => {
  const said = claudeAccountUsage(["--sideways"], givenIn())

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
})

test("the answer carries both means the editor's two slots read", () => {
  const said = saidOf({ session: { value: 83.25, over: 8 }, weekly: { value: 66.625, over: 8 } })

  expect(JSON.parse(said)).toEqual({
    session: { value: 83.25, over: 8 },
    weekly: { value: 66.625, over: 8 },
  })
})

test("a mean taken over no account keeps its value null rather than dropping it", () => {
  expect(
    JSON.parse(saidOf({ session: { value: null, over: 0 }, weekly: { value: 12, over: 1 } }))
  ).toEqual({ session: { value: null, over: 0 }, weekly: { value: 12, over: 1 } })
})

test("a fleet that reads answers one line and no refusal", () => {
  const said = answerFrom(() => ({ session: { value: 1, over: 2 }, weekly: { value: 3, over: 4 } }))

  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
  expect(said.report.length).toBe(1)
})

test("a fleet that cannot be read is a throw carried out as a refusal", () => {
  const said = answerFrom(() => {
    throw new Error("no claude-account page sits in akasha")
  })

  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("no claude-account page sits in akasha")
})

test("the happy answer parses as the JSON the status bar reads", () => {
  const said = claudeAccountUsage([], givenIn())

  expect(said.code).toBe(0)
  const held = JSON.parse(said.report[0] ?? "null") as Record<
    string,
    { value: unknown; over: unknown }
  >
  for (const field of ["session", "weekly"]) {
    const one = held[field]

    expect(typeof one?.over).toBe("number")
    expect(one?.value === null || typeof one?.value === "number").toBe(true)
  }
})
