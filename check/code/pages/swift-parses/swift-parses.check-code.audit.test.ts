import { afterAll, expect, test } from "bun:test"
import { swiftParses } from "akasha/check/code/pages/swift-parses/swift-parses.check-code.audit.code.ts"
import {
  BROKEN,
  BROKEN_LINE,
  CLEAN,
  ONE,
  rooted,
  scratch,
} from "akasha/check/code/pages/swift-parses/swift-parses.check-code.decision.test-fixtures.ts"
import { tracked } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

afterAll(scratch.sweep)

const TWO = "akasha/two.swift"

test("an audit judges every Swift file in the tree, no change naming one of them", () => {
  const said = swiftParses(tracked(rooted(), { [ONE]: BROKEN, [TWO]: CLEAN }))

  expect(said.map((one) => one.path)).toEqual([ONE])
  expect(said[0]?.reason).toContain(`line ${BROKEN_LINE}`)
})

test("an audit lets through a tree whose Swift parses", () => {
  expect(swiftParses(tracked(rooted(), { [ONE]: CLEAN }))).toEqual([])
})
