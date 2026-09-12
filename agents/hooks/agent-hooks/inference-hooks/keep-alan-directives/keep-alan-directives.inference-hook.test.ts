import { expect, test } from "bun:test"
import {
  holding,
  JUDGES,
  personIn,
  SCOPE,
  stillWorking,
  type Valued,
} from "akasha/agents/hooks/agent-hooks/inference-hooks/keep-alan-directives/keep-alan-directives.inference-hook.code.ts"
import { ASIDE, REFUSED } from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import type {
  Directive,
  Putting,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import type { SubagentNode } from "akasha/code/editor/extension/subagent-reading/subagent-reading.module.code.ts"

const SEATS: readonly Valued[] = [
  { path: "one.seat.ts", value: { id: "a", person: "alan" } },
  { path: "two.seat.ts", value: { id: "b" } },
  { path: "three.seat.ts", value: { id: "c", person: "" } },
]

test("a seat is found by the id the agent runs under", () => {
  expect(personIn(SEATS, "a")).toBe("alan")
})

test("a seat naming no person answers nothing", () => {
  expect(personIn(SEATS, "b")).toBeNull()
  expect(personIn(SEATS, "c")).toBeNull()
})

test("an id no seat carries answers nothing", () => {
  expect(personIn(SEATS, "d")).toBeNull()
  expect(personIn([], "a")).toBeNull()
})

const CHILD: readonly SubagentNode[] = [
  { key: "one", label: "Trace something", agentId: "b", children: [] },
]

test("a seat whose transcript names a subagent that has not returned is still working", () => {
  expect(stillWorking(CHILD, {})).toBe(true)
})

test("a seat with a background command still open is still working", () => {
  expect(stillWorking([], { openShells: ["task"] })).toBe(true)
})

test("a seat with no subagent running and nothing open is not still working", () => {
  expect(stillWorking([], { openShells: [] })).toBe(false)
  expect(stillWorking([], {})).toBe(false)
})

test("the scope says what the hook does not catch", () => {
  expect(SCOPE.join("\n")).toContain("It does not catch:")
  expect(SCOPE.join("\n")).toContain("Stop")
})

function ruleNamed(name: string): Directive {
  return { name, act: "Do it.", warrant: "Because.", aids: ["An aid."] }
}

const HELD: readonly Directive[] = [
  ruleNamed("Neither Clock Nor Meter"),
  ruleNamed("One At A Time"),
  ruleNamed("No Commentary"),
  ruleNamed("Don't Stop!"),
]

const TURN = { asked: "carry on", turn: "Still waiting.", directives: HELD }

test("every judge the hook runs puts its own rule to the model", () => {
  const put = JUDGES.flatMap((judge) => judge(TURN))
  expect(put.map((one) => one.statement.split(":")[0])).toEqual([
    "Neither Clock Nor Meter",
    "One At A Time",
    "No Commentary",
    "No Commentary",
  ])
})

test("one rule may be judged by more than one judge, each by its own sign", () => {
  const put = JUDGES.flatMap((judge) =>
    judge({ ...TURN, directives: [ruleNamed("No Commentary")] })
  )
  expect(put).toHaveLength(2)
  expect(put[0]?.prompt).not.toBe(put[1]?.prompt)
  expect(put[0]?.statement).toBe(put[1]?.statement)
})

test("a rule no judge here names is put to the model by nobody", () => {
  expect(
    JUDGES.flatMap((judge) => judge({ ...TURN, directives: [ruleNamed("Don't Stop!")] }))
  ).toEqual([])
})

test("each judge puts what was asked and what was written beside its rule", () => {
  for (const one of JUDGES.flatMap((judge) => judge(TURN))) {
    expect(one.prompt).toContain("<asked>\ncarry on\n</asked>")
    expect(one.prompt).toContain("<turn>\nStill waiting.\n</turn>")
    expect(one.prompt).toContain(one.statement)
  }
})

const PUT: readonly Putting[] = [
  { statement: "One At A Time: Ask one thing.", prompt: "the first" },
  { statement: "No Commentary: Say less.", prompt: "the second" },
]

test("a model reached by no call leaves the turn unjudged", () => {
  expect(holding(PUT, null).code).toBe(ASIDE)
})

test("a turn no judge answers yes on is let through", () => {
  expect(holding(PUT, ["NOTHING TO QUOTE\nNO", "NO"]).code).toBe(ASIDE)
})

test("a judge answered yes holds the turn open in that rule's own words", () => {
  const held = holding(PUT, ["NO", "Also worth a look.\nYES"])
  expect(held.code).toBe(REFUSED)
  expect(held.err).toContain("No Commentary: Say less.")
  expect(held.err).not.toContain("Also worth a look.")
})

test("the first judge answered yes ends it and the rest are not read", () => {
  expect(holding(PUT, ["YES", "YES"]).err).toContain("One At A Time: Ask one thing.")
})

test("a judge whose answer never came back is read as no", () => {
  expect(holding(PUT, []).code).toBe(ASIDE)
})
