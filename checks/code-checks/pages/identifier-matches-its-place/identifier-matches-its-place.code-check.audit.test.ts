import { afterAll, expect, test } from "bun:test"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { said as git } from "../../../../git/git-running/git-running.module.code.ts"
import { identifierMatchesItsPlace } from "./identifier-matches-its-place.code-check.audit.code.ts"
import {
  placed,
  scratch,
} from "./identifier-matches-its-place.code-check.decision.test-fixtures.ts"

const HELD = "akasha/held.ts"

const DRAWN = "akasha/drawn.tsx"

const NOTES = "akasha/held.md"

const BAD_FUNCTION = "export function BadName() {}\n"

afterAll(scratch.sweep)

function treed(root: string): string {
  git(root, ["init", "--quiet"])
  git(root, ["add", "-A"])
  return root
}

test("an audit judges every TypeScript body git tracks, reading each from disk", () => {
  const root = placed()
  writing(root, HELD, BAD_FUNCTION)
  writing(root, DRAWN, "export function drawnRing() {\n  return <p>one</p>\n}\n")
  const said = identifierMatchesItsPlace(treed(root))
  expect(said.map((one) => one.path)).toEqual([DRAWN, HELD])
  expect(said[0]?.reason).toContain("the component `drawnRing`")
  expect(said[1]?.reason).toContain("the function `BadName`")
})

test("an audit passes over a body that is no TypeScript", () => {
  const root = placed()
  writing(root, NOTES, BAD_FUNCTION)
  expect(identifierMatchesItsPlace(treed(root))).toEqual([])
})
