import { afterAll, expect, test } from "bun:test"
import { invariantStatementIsPlain } from "akasha/checks/code-checks/pages/invariant-statement-is-plain/invariant-statement-is-plain.code-check.audit.code.ts"
import { paged } from "akasha/checks/code-checks/pages/invariant-statement-is-plain/invariant-statement-is-plain.code-check.decision.test-fixtures.ts"
import { said as git } from "akasha/git/running/git-running.module.code.ts"
import { noPathsFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const AT = "akasha/held.check.ts"

const NOTES = "akasha/held.md"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function treed(path: string): string {
  const root = scratch.rootFor("akasha-plain-audit-")
  noPathsFiled(root)
  writing(root, path, paged("A page is named because the slug says so."))
  git(root, ["init", "--quiet"])
  git(root, ["add", "-A"])
  return root
}

test("an audit judges every TypeScript body git tracks, no change naming any of them", async () => {
  const said = await invariantStatementIsPlain(treed(AT))
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("states why at `because`")
})

test("an audit passes over a body that is no TypeScript", async () => {
  expect(await invariantStatementIsPlain(treed(NOTES))).toEqual([])
})
