import { afterAll, expect, test } from "bun:test"
import { swiftParses } from "akasha/check/code/pages/swift-parses/swift-parses.check-code.check.code.ts"
import {
  BROKEN,
  BROKEN_LINE,
  CLEAN,
  ONE,
  rooted,
  scratch,
  UNCLOSED,
} from "akasha/check/code/pages/swift-parses/swift-parses.check-code.decision.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import { landing } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

function judged(text: string): readonly Judged[] {
  const root = rooted()
  return swiftParses(landing(root, { [ONE]: bytesOf(text) }), shadowAt(root))
}

test("the check refuses Swift the change carries that does not parse", () => {
  const said = judged(BROKEN)

  expect(said.map((one) => one.path)).toEqual([ONE])
  expect(said[0]?.reason).toContain(`line ${BROKEN_LINE}`)
  expect(said[0]?.reason).toContain(UNCLOSED)
})

test("the check lets through Swift that parses", () => {
  expect(judged(CLEAN)).toEqual([])
})

test("a Swift file is the check's input and a file of any other kind is not", () => {
  const shadow = shadowAt(rooted())
  const held = [ONE, "akasha/one.ts", "akasha/one.sh"]

  expect(held.map((one) => swiftParses.isInput(one, shadow))).toEqual([true, false, false])
})
