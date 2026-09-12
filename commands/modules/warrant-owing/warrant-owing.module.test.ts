import { expect, test } from "bun:test"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { Given, Kind } from "akasha/commands/modules/calling/calling.module.code.ts"
import { unwarrantedIn } from "akasha/commands/modules/warrant-owing/warrant-owing.module.code.ts"

const GIVEN: Given = {
  root: "/repo",
  calledAs: "akasha tracking",
  from: "/repo",
  writer: null,
  agentId: null,
}

const OWES: Kind = {
  slug: "change-checked",
  runsChecks: true,
  writerOwesReading: true,
  readersOweReading: true,
}

const CHANGES: readonly FileChange[] = [{ kind: "add", path: "akasha/two.ts", content: "" }]

test("a change kind saying the writer owes no reading is answered with nothing owed", () => {
  expect(unwarrantedIn(GIVEN, { ...OWES, writerOwesReading: false }, CHANGES)).toEqual([])
})

test("a change kind saying the writer owes a reading is asked of the warranting", () => {
  expect(unwarrantedIn(GIVEN, OWES, CHANGES).length).toBeGreaterThan(0)
})

test("a change of no kind is asked of the warranting", () => {
  expect(unwarrantedIn(GIVEN, null, CHANGES).length).toBeGreaterThan(0)
})
