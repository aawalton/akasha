import { afterAll, expect, test } from "bun:test"
import { noSecondSpellingOfANameFormat } from "./no-second-spelling-of-a-name-format.code-check.audit.code.ts"
import {
  KEBAB_CODE,
  OTHER_CODE,
  SPELLING,
  STATING,
  scratch,
  tracked,
} from "./no-second-spelling-of-a-name-format.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a tree where only the name format spells its own shape is let through", () => {
  expect(noSecondSpellingOfANameFormat(tracked({ [KEBAB_CODE]: STATING }))).toEqual([])
})

test("a second spelling no change names is refused, an audit reading the whole tree", () => {
  const root = tracked({ [KEBAB_CODE]: STATING, [OTHER_CODE]: SPELLING })
  const said = noSecondSpellingOfANameFormat(root)
  expect(said.map((one) => one.path)).toEqual([OTHER_CODE])
  expect(said[0]?.reason).toContain(KEBAB_CODE)
})
