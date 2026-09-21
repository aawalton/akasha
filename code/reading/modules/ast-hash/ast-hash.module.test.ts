import { expect, test } from "bun:test"
import { astHashOf } from "akasha/code/reading/modules/ast-hash/ast-hash.module.code.ts"

const ONE = "$0 => $0 . length"

const TWO = "$0 => $0 . size"

test("one rule answers the same key every time", () => {
  expect(astHashOf(ONE)).toBe(astHashOf(ONE))
})

test("two rules that read apart answer two keys", () => {
  expect(astHashOf(ONE)).not.toBe(astHashOf(TWO))
})

test("a key is thirty-two hex characters", () => {
  expect(astHashOf(ONE)).toMatch(/^[0-9a-f]{32}$/)
})
