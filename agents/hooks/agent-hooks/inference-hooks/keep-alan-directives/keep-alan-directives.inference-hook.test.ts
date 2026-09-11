import { expect, test } from "bun:test"
import {
  directivesIn,
  personIn,
  SCOPE,
  stillWorking,
  type Valued,
} from "akasha/agents/hooks/agent-hooks/inference-hooks/keep-alan-directives/keep-alan-directives.inference-hook.code.ts"
import type { SubagentNode } from "akasha/code-system/editor/extension/subagent-reading/subagent-reading.module.code.ts"

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

test("a whole directive is read", () => {
  const held = directivesIn([
    { directiveKind: "rule", name: "One", act: "Do it.", warrant: "Because.", aids: ["An aid."] },
  ])
  expect(held).toEqual([{ name: "One", act: "Do it.", warrant: "Because.", aids: ["An aid."] }])
})

test("a directive missing a field is passed over", () => {
  expect(directivesIn([{ name: "One", act: "Do it.", warrant: "Because." }])).toEqual([])
  expect(directivesIn([{ name: "One", act: "Do it.", aids: [] }])).toEqual([])
  expect(directivesIn([{ act: "Do it.", warrant: "Because.", aids: [] }])).toEqual([])
})

test("a directive whose aids are not all text is passed over", () => {
  expect(directivesIn([{ name: "One", act: "A.", warrant: "B.", aids: ["ok", 1] }])).toEqual([])
})

test("anything that is no list of directives reads as none", () => {
  expect(directivesIn(undefined)).toEqual([])
  expect(directivesIn(null)).toEqual([])
  expect(directivesIn("directives")).toEqual([])
  expect(directivesIn([null, 1, "one"])).toEqual([])
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
