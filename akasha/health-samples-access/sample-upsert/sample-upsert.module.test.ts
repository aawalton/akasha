import { expect, test } from "bun:test"
import { canonicalize } from "@akasha/pages-system/repo-path"
import { KEPT_IN, keptSaid, refusalWhereNothingKeeps } from "./sample-upsert.module.code.ts"

const here = canonicalize(import.meta.dir)

test("a checkout nothing says keeps its writes is refused", () => {
  const refused = refusalWhereNothingKeeps(here, null)
  expect(refused).toContain(KEPT_IN)
  expect(refused).toContain(here)
})

test("a checkout other than the one written into is refused", () => {
  expect(refusalWhereNothingKeeps(here, `${here}/elsewhere`)).toContain(KEPT_IN)
})

test("the checkout said to keep its writes is let through", () => {
  expect(refusalWhereNothingKeeps(here, here)).toBeNull()
  expect(refusalWhereNothingKeeps(here, `${here}/.`)).toBeNull()
})

test("an environment saying nothing is read as nothing", () => {
  process.env[KEPT_IN] = "  "
  expect(keptSaid()).toBeNull()
  process.env[KEPT_IN] = here
  expect(keptSaid()).toBe(here)
  delete process.env[KEPT_IN]
})
