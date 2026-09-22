import { afterAll, expect, test } from "bun:test"
import { viewNamesADeclaredKey } from "akasha/check/code/pages/view-names-a-declared-key/view-names-a-declared-key.check-code.audit.code.ts"
import {
  QUOIN,
  rooted,
  scratch,
  viewing,
} from "akasha/check/code/pages/view-names-a-declared-key/view-names-a-declared-key.check-code.decision.test-fixtures.ts"
import { tracked } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

const UNDER = "akasha-viewed-audit-"

const LISTS_QUOIN = `page-type/${QUOIN}`

afterAll(scratch.sweep)

test("an audit judges every view the index has, no change naming one of them", () => {
  const root = tracked(rooted(UNDER))
  const at = viewing(root, "looking", { pageType: LISTS_QUOIN, shown: ["gone"] })

  const said = viewNamesADeclaredKey(root)

  expect(said.map((one) => one.path)).toEqual([at])
  expect(said[0]?.reason ?? "").toContain("`gone` at `shown[0]`")
})

test("an audit lets through a tree where every view names a declared key", () => {
  const root = tracked(rooted(UNDER))
  viewing(root, "looking", { pageType: LISTS_QUOIN, shown: ["held"] })

  expect(viewNamesADeclaredKey(root)).toEqual([])
})
