import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  gainOf,
  medicineActions,
  movedOf,
  notesOf,
  rowOf,
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

const SPREAD = { low: 0, middle: 0.1, high: 0.2 }

test("an action resting on observation alone is marked and footnoted", () => {
  const observed = {
    named: "less meat",
    evidence: "observational",
    gain: SPREAD,
    moved: [],
  } as const
  const sleep = { named: "less sleep", evidence: "confounded", gain: SPREAD, moved: [] } as const
  const trial = { named: "screening", evidence: "trial", gain: SPREAD, moved: [] } as const
  expect(rowOf(observed)).toContain("less meat *")
  expect(rowOf(sleep)).toContain("less sleep †")
  expect(rowOf(trial)).not.toContain("*")
  expect(notesOf([trial])).toEqual([])
  expect(notesOf([sleep, observed])).toHaveLength(2)
  expect(notesOf([sleep])[0]).toContain("not a recommendation")
})

test("a word this takes no argument for is refused", () => {
  const said = medicineActions(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
