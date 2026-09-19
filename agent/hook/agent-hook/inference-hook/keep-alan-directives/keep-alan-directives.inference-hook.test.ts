import { expect, test } from "bun:test"
import {
  GATES,
  holding,
  JUDGES,
  lineFor,
  personIn,
  positiveFor,
  SCOPE,
  stillWorking,
  type Valued,
} from "akasha/agent/hook/agent-hook/inference-hook/keep-alan-directives/keep-alan-directives.inference-hook.code.ts"
import { ASIDE, REFUSED } from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import type {
  Directive,
  Putting,
} from "akasha/agent/model/test/pages/directive-kept/directive-kept.model-test.code.ts"
import type { SubagentNode } from "akasha/code/editor/extension/modules/subagent-reading/subagent-reading.module.code.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { person } from "akasha/person/person.page-type.ts"

const ALAN_AT = `${person.slug}/${alan.slug}` as const

const SEATS: readonly Valued[] = [
  { path: "one.seat.ts", value: { id: "a", person: ALAN_AT } },
  { path: "two.seat.ts", value: { id: "b" } },
  { path: "three.seat.ts", value: { id: "c", person: "" } },
]

test("a seat is found by the id the agent runs under", () => {
  expect(personIn(SEATS, "a")).toBe(alan.slug)
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
    "Don't Stop!",
    "Don't Stop!",
  ])
})

test("one rule may be judged by more than one judge, each by its own sign", () => {
  const put = JUDGES.flatMap((judge) =>
    judge({ ...TURN, directives: [ruleNamed("No Commentary")] })
  )
  expect(put).toHaveLength(2)
  expect(new Set(put.map((one) => one.prompt)).size).toBe(2)
  expect(new Set(put.map((one) => one.statement)).size).toBe(1)
})

test("a rule no judge here names is put to the model by nobody", () => {
  expect(
    JUDGES.flatMap((judge) => judge({ ...TURN, directives: [ruleNamed("Act By Default")] }))
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
  {
    statement: "One At A Time: Ask one thing.",
    prompt: "the first",
    about: "One At A Time",
    test: "one-at-a-time-kept",
  },
  {
    statement: "No Commentary: Say less.",
    prompt: "the second",
    about: "No Commentary",
    test: "no-commentary-kept",
  },
]

test("a model reached by no call leaves the turn unjudged", () => {
  expect(holding(PUT, null).code).toBe(ASIDE)
})

test("a turn no judge answers yes on is let through", () => {
  expect(holding(PUT, ["NOTHING TO QUOTE\nNO", "NO"]).code).toBe(ASIDE)
})

test("a judge answered yes holds the turn open in that rule's own words and nothing else", () => {
  const held = holding(PUT, ["NO", "Also worth a look.\nYES"])
  expect(held.code).toBe(REFUSED)
  expect(held.err).toBe("No Commentary: Say less.")
})

test("the first judge answered yes ends it and the rest are not read", () => {
  expect(holding(PUT, ["YES", "YES"]).err).toContain("One At A Time: Ask one thing.")
})

test("a judge whose answer never came back is read as no", () => {
  expect(holding(PUT, []).code).toBe(ASIDE)
})

test("a line says when the run was, whose seat it was, where it stopped, and how many rules", () => {
  expect(lineFor(GATES.subagent, 0, new Date("2026-09-13T08:00:00.000Z"), "a")).toBe(
    '{"at":"2026-09-13T08:00:00.000Z","seat":"a","gate":"a subagent still to report","put":0}\n'
  )
})

test("a gate reached before the seat is known names no seat", () => {
  expect(lineFor(GATES.seat, 0, new Date("2026-09-13T08:00:00.000Z"), null)).toContain(
    '"seat":null'
  )
})

test("a line ends in a newline, so lines append rather than run together", () => {
  expect(lineFor(GATES.clean, 5, new Date(), "a").endsWith("}\n")).toBe(true)
})

test("a run that reached the model and one that never did name different gates", () => {
  const named = Object.values(GATES)
  expect(new Set(named).size).toBe(named.length)
  expect(GATES.clean).not.toBe(GATES.model)
  expect(GATES.open).not.toBe(GATES.clean)
})

test("a subagent still working and a shell still working are two gates", () => {
  expect(GATES.subagent).not.toBe(GATES.shell)
})

test("the scope says each run is recorded whether or not a model was reached", () => {
  expect(SCOPE.join("\n")).toContain("How far each run got is recorded")
})

test("each judge names the rule it asked and the test it came from", () => {
  for (const one of JUDGES.flatMap((judge) => judge(TURN))) {
    expect(one.statement.startsWith(`${one.about}:`)).toBe(true)
    expect(one.test).not.toBe("")
  }
  expect(new Set(JUDGES.flatMap((judge) => judge(TURN)).map((one) => one.test)).size).toBe(6)
})

test("a line kept for a yes holds what was put and what came back", () => {
  expect(
    positiveFor(
      "a",
      "No Commentary",
      "the whole prompt",
      "QUOTED\nYES",
      new Date("2026-09-13T08:00:00.000Z")
    )
  ).toBe(
    '{"ranAt":"2026-09-13T08:00:00.000Z","seat":"a","about":"No Commentary","prompt":"the whole prompt","said":"QUOTED\\nYES"}\n'
  )
})

test("a line kept for a yes ends in a newline, so lines append rather than run together", () => {
  expect(positiveFor("a", "One At A Time", "put", "YES", new Date()).endsWith("}\n")).toBe(true)
})
