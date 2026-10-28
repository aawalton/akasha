import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  gainOf,
  medicineActions,
  movedOf,
} from "akasha/command/pages/medicine/actions/medicine-actions.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha nowhere",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a gain is signed and said with its range", () => {
  expect(gainOf({ low: -0.1, middle: 0.25, high: 0.5 })).toBe("+0.25  (-0.10 to +0.50)")
})

test("an action that moves no cause says so", () => {
  expect(movedOf([])).toBe("moves no cause")
  expect(movedOf([{ cause: "stroke", points: -0.01 }])).toBe("stroke -1.00 pts")
})

test("a word this takes no argument for is refused", () => {
  const said = medicineActions(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
