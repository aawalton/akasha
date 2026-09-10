import { afterAll, expect, test } from "bun:test"
import { noClass } from "./no-class.code-check.audit.code.ts"
import { AT, LIBRARY, scratch, tracked } from "./no-class.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const CLASS = "export class Held {\n  one = 1\n}\n"

test("a tree holding no class anywhere is let through", () => {
  const root = tracked({ [AT]: "export function one(): number {\n  return 1\n}\n" })
  expect(noClass(root)).toEqual([])
})

test("a class no change names is refused, because an audit reads the whole tree", () => {
  const root = tracked({ [AT]: CLASS, [`${LIBRARY}src/Held.ts`]: CLASS })
  const said = noClass(root)
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`class Held`")
})
