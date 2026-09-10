import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { noIndexPathSpelled } from "./no-index-path-spelled.code-check.code.ts"
import {
  AT,
  HELD,
  PAGE,
  rooted,
  scratch,
} from "./no-index-path-spelled.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

const SPELLS = `const at = "${AT}/identity/module/slug"\n`

function judged(root: string, changed: readonly string[]): readonly Judged[] {
  const held = change(root, changed)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return noIndexPathSpelled(held, cast.shadow)
}

test("a body the change carries spelling a path into the index is refused, naming that path", () => {
  const said = judged(rooted({ [HELD]: SPELLS }), [HELD])
  expect(said.map((one) => one.path)).toEqual([HELD])
  expect(said[0]?.reason).toContain("spells a path into the index")
})

test("a page the change carries asks the index nothing, so a page is passed over", () => {
  const body = `export const held = { evidence: "measured at ${AT}/identity/module/slug" }\n`
  expect(judged(rooted({ [PAGE]: body }), [PAGE])).toEqual([])
})
