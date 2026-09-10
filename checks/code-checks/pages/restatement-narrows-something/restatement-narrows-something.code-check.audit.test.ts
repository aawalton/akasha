import { afterAll, expect, test } from "bun:test"
import { pathFor } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  ONE,
  PAGE_TYPE,
  TWO,
  typing,
} from "../key-names-one-property/key-names-one-property.code-check.test-fixtures.ts"
import { restatementNarrowsSomething } from "./restatement-narrows-something.code-check.audit.code.ts"
import {
  rooted,
  scratch,
  tracked,
} from "./restatement-narrows-something.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const HELD = { pagePropertySlug: "held", required: true, many: false }

test("an audit judges every declarer in the tree, no change naming one of them", () => {
  const root = rooted()
  typing(root, "over", TWO, null, [HELD])
  typing(root, "under", ONE, "over", [HELD])

  const said = restatementNarrowsSomething(tracked(root))

  expect(said.map((one) => one.path)).toEqual([pathFor(PAGE_TYPE, "under")])
  expect(said[0]?.reason).toContain("narrows nothing")
})

test("an audit lets through a tree where every restatement narrows something", () => {
  const root = rooted()
  typing(root, "over", TWO, null, [{ pagePropertySlug: "held", required: false, many: false }])
  typing(root, "under", ONE, "over", [HELD])

  expect(restatementNarrowsSomething(tracked(root))).toEqual([])
})
