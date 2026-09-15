import { expect, test } from "bun:test"
import { invariantStatementIsPlain } from "akasha/check/code/pages/invariant-statement-is-plain/invariant-statement-is-plain.check-code.check.code.ts"
import { paged } from "akasha/check/code/pages/invariant-statement-is-plain/invariant-statement-is-plain.check-code.decision.test-fixtures.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { arriving } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const AT = "akasha/held.check.ts"

const REPO_AT = rootOf(import.meta.dir)

const SHADOW = shadowAt(REPO_AT)

function judged(path: string, statement: string): Promise<readonly Judged[]> {
  return invariantStatementIsPlain(arriving(REPO_AT, { [path]: paged(statement) }), SHADOW)
}

test("the body judged is the one the change carries", async () => {
  const said = await judged(AT, "A page is named because the slug says so.")
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("states why at `because`")
})

test("the shaped reading judges the body the change carries too", async () => {
  const said = await judged(AT, "It is read from the index.")
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`lone-pronoun`")
})

test("a file that is not TypeScript is passed over", async () => {
  expect(await judged("akasha/notes.md", "A page is named because it is.")).toEqual([])
})
