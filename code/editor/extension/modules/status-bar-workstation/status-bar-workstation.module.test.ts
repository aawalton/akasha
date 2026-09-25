import { expect, test } from "bun:test"
import { workstationReadingOf } from "akasha/code/editor/extension/modules/status-bar-workstation/status-bar-workstation.module.code.ts"

test("a reading keeps each figure under the wire key its readout states", () => {
  expect(workstationReadingOf({ first: 12, second: 40.1 })).toEqual({ first: 12, second: 40.1 })
})

test("a reading with one figure keeps the others as no figure", () => {
  expect(workstationReadingOf({ first: 12, second: null })).toEqual({ first: 12, second: null })
})

test("a reading with no figure is no reading", () => {
  expect(workstationReadingOf({ first: null, second: null })).toBeNull()
  expect(workstationReadingOf({})).toBeNull()
})
