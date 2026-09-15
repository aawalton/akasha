import { afterAll, expect, test } from "bun:test"
import { noSecondSpellingOfANameFormat } from "akasha/check/code/pages/no-second-spelling-of-a-name-format/no-second-spelling-of-a-name-format.check-code.check.code.ts"
import {
  bothArriving,
  KEBAB_CODE,
  OTHER_CODE,
  rooted,
  scratch,
} from "akasha/check/code/pages/no-second-spelling-of-a-name-format/no-second-spelling-of-a-name-format.check-code.decision.test-fixtures.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("a module spelling a format's shape is refused, and the format stating it is not", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const said = noSecondSpellingOfANameFormat(change, cast.shadow)
  expect(said.map((one) => one.path)).toEqual([OTHER_CODE])
  expect(said[0]?.reason).toContain(KEBAB_CODE)
})
