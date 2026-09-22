import { afterAll, expect, test } from "bun:test"
import {
  askingAt,
  manifestLandsOnAFile,
} from "akasha/check/code/pages/manifest-lands-on-a-file/manifest-lands-on-a-file.check-code.audit.code.ts"
import {
  AT,
  EXPORTS,
  HELD,
  MANIFEST_AT,
  manifest,
  rooted,
  scratch,
} from "akasha/check/code/pages/manifest-lands-on-a-file/manifest-lands-on-a-file.check-code.decision.test-fixtures.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { treed, wrote } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

const UNDER = "akasha-manifest-audit-"

afterAll(scratch.sweep)

test("an audit judges every manifest the index names, no change naming one of them", () => {
  const root = treed(wrote(rooted(UNDER), { [MANIFEST_AT]: manifest({ exports: EXPORTS }) }))

  const said = manifestLandsOnAFile(root)

  expect(said.map((one) => one.path)).toEqual([MANIFEST_AT])
  expect(said[0]?.reason).toContain(AT)
})

test("an audit lets through a tree where every way in lands on a file", () => {
  const root = treed(
    wrote(rooted(UNDER), {
      [MANIFEST_AT]: manifest({ exports: EXPORTS }),
      [AT]: HELD,
    })
  )

  expect(manifestLandsOnAFile(root)).toEqual([])
})

test("what the audit asks reads a body from the commit, there being no change", () => {
  const asking = askingAt(commitIn(treed(wrote(rooted(UNDER), { [AT]: HELD }))))

  expect(asking.textAt(AT)).toBe(HELD)
  expect(asking.there(AT)).toBe(true)
  expect(asking.textAt(MANIFEST_AT)).toBe(null)
})
