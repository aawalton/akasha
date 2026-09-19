import { afterAll, expect, test } from "bun:test"
import { identifierMatchesItsPlace } from "akasha/check/code/pages/identifier-matches-its-place/identifier-matches-its-place.check-code.audit.code.ts"
import {
  placed,
  scratch,
} from "akasha/check/code/pages/identifier-matches-its-place/identifier-matches-its-place.check-code.decision.test-fixtures.ts"
import { treed } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"

const HELD = "akasha/held.ts"

const DRAWN = "akasha/drawn.tsx"

const NOTES = "akasha/held.md"

const BAD_FUNCTION = "export function BadName() {}\n"

afterAll(scratch.sweep)

test("an audit judges every TypeScript body git tracks, reading each from disk", () => {
  const root = placed()
  writing(root, HELD, BAD_FUNCTION)
  writing(
    root,
    DRAWN,
    "export function Ring() {\n  const ICON = held.icon\n  return <p>{ICON}</p>\n}\n"
  )
  const said = identifierMatchesItsPlace(treed(root))
  expect(said.map((one) => one.path)).toEqual([DRAWN, HELD])
  expect(said[0]?.reason).toContain("the name `ICON`")
  expect(said[1]?.reason).toContain("the function `BadName`")
})

test("an audit passes over a body that is no TypeScript", () => {
  const root = placed()
  writing(root, NOTES, BAD_FUNCTION)
  expect(identifierMatchesItsPlace(treed(root))).toEqual([])
})
