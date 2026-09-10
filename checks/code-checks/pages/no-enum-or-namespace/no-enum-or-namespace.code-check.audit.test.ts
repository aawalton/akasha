import { afterAll, expect, test } from "bun:test"
import { noEnumOrNamespace } from "./no-enum-or-namespace.code-check.audit.code.ts"
import { AT, scratch, tracked } from "./no-enum-or-namespace.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree declaring neither an enum nor a namespace anywhere is let through", () => {
  expect(noEnumOrNamespace(tracked({ [AT]: "export const one = 1\n" }))).toEqual([])
})

test("an enum no change names is refused, because an audit reads the whole tree", () => {
  const root = tracked({ [AT]: "export enum Held {\n  One,\n}\n" })
  const said = noEnumOrNamespace(root)
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`enum Held`")
})
