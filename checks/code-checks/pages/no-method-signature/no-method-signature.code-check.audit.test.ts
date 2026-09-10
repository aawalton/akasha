import { afterAll, expect, test } from "bun:test"
import { noMethodSignature } from "./no-method-signature.code-check.audit.code.ts"
import {
  AT,
  SIGNED,
  scratch,
  tracked,
} from "./no-method-signature.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree writing every member as a property is let through", () => {
  const body = "type Whole = {\n  readonly at: (path: string) => string\n}\n"
  expect(noMethodSignature(tracked({ [AT]: body }))).toEqual([])
})

test("a method signature no change names is refused, because an audit reads the whole tree", () => {
  const said = noMethodSignature(tracked({ [AT]: SIGNED }))
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`at` as a method signature")
})
