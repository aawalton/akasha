import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import { noSecondSpellingOfANameFormat } from "./no-second-spelling-of-a-name-format.code-check.check.code.ts"
import {
  bothArriving,
  KEBAB_CODE,
  OTHER_CODE,
  rooted,
  scratch,
} from "./no-second-spelling-of-a-name-format.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a module spelling a format's shape is refused, and the format stating it is not", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const said = noSecondSpellingOfANameFormat(change, cast.shadow)
  expect(said.map((one) => one.path)).toEqual([OTHER_CODE])
  expect(said[0]?.reason).toContain(KEBAB_CODE)
})
