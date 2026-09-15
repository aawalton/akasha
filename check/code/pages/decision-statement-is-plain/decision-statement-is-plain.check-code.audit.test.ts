import { afterAll, expect, test } from "bun:test"
import { decisionStatementIsPlain } from "akasha/check/code/pages/decision-statement-is-plain/decision-statement-is-plain.check-code.audit.code.ts"
import { paged } from "akasha/check/code/pages/decision-statement-is-plain/decision-statement-is-plain.check-code.decision.test-fixtures.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

const AT = "akasha/held.check.ts"

const NOTES = "akasha/held.md"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function treed(path: string): string {
  const root = scratch.rootFor("akasha-plain-audit-")
  nothingFiled(root)
  writing(root, path, paged("A page is named because the slug says so."))
  git(root, ["init", "--quiet"])
  git(root, ["add", "-A"])
  return root
}

test("an audit judges every TypeScript body git tracks, no change naming any of them", async () => {
  const said = await decisionStatementIsPlain(treed(AT))
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("states why at `because`")
})

test("an audit passes over a body that is no TypeScript", async () => {
  expect(await decisionStatementIsPlain(treed(NOTES))).toEqual([])
})
