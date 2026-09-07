import { expect, test } from "bun:test"
import type { Given, Kind } from "../calling/calling.module.code.ts"
import { unwarrantedIn } from "./warrant-owing.module.code.ts"

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

const CHANGES = [{ path: "akasha/two.ts", body: new Uint8Array() }]

test("a change kind saying the writer owes no reading is answered with nothing owed", () => {
  const given: Given = { ...GIVEN, changeKind: { ...OWES, writerOwesReading: false } }
  expect(unwarrantedIn(given, CHANGES)).toEqual([])
})

test("a change kind saying the writer owes a reading is asked of the warranting", () => {
  const given: Given = { ...GIVEN, changeKind: OWES }
  expect(unwarrantedIn(given, CHANGES).length).toBeGreaterThan(0)
})

test("a call naming no change kind is asked of the warranting", () => {
  expect(unwarrantedIn(GIVEN, CHANGES).length).toBeGreaterThan(0)
})
