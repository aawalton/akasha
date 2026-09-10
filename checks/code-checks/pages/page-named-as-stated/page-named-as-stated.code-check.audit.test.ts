import { afterAll, expect, test } from "bun:test"
import { pageNamedAsStated } from "./page-named-as-stated.code-check.audit.code.ts"
import {
  LEDGER_AT,
  page,
  scratch,
  tracked,
} from "./page-named-as-stated.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit judges every file in the tree, no change naming one of them", () => {
  const root = tracked(["code"], { [LEDGER_AT]: page("ledges", "module") })

  const said = pageNamedAsStated(root)

  expect(said.map((one) => one.path)).toEqual([LEDGER_AT])
  expect(said[0]?.reason).toContain("names itself `ledges`")
})

test("an audit lets through a tree whose every page is named as that page states", () => {
  const root = tracked(["code"], { [LEDGER_AT]: page("ledger", "module") })

  expect(pageNamedAsStated(root)).toEqual([])
})
