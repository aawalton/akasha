import { afterAll, expect, test } from "bun:test"
import { declaring, pathFor, typed } from "../../../modules/scratch/check-scratch.module.code.ts"
import { keyNamesOneProperty } from "./key-names-one-property.code-check.audit.code.ts"
import {
  NUMBER,
  ONE,
  RECORD,
  recorded,
  rooted,
  scratch,
  TEXT,
} from "./key-names-one-property.code-check.test-fixtures.ts"

const UNDER = "akasha-keyed-audit-"

const OVER_AT = "akasha/types/over.page-type.ts"

afterAll(scratch.sweep)

test("an audit judges every page type the index has, no change naming one of them", () => {
  const root = rooted(UNDER)
  declaring(root, "held", { pageTypeSlug: NUMBER })
  typed(root, "over", null, ["text-property/held", "number-property/held"])

  const said = keyNamesOneProperty(root)

  expect(said.map((one) => one.path)).toEqual([OVER_AT])
  expect(said[0]?.reason).toContain("`text-property/held`")
  expect(said[0]?.reason).toContain("`number-property/held`")
})

test("an audit judges the fields a record property the index has carries", () => {
  const root = rooted(UNDER)
  declaring(root, "held", { pageTypeSlug: NUMBER })
  recorded(root, "taking", ONE, [
    { pagePropertySlug: "text-property/held", required: true, many: false },
    { pagePropertySlug: "number-property/held", required: false, many: false },
  ])

  const said = keyNamesOneProperty(root)

  expect(said.map((one) => one.path)).toEqual([pathFor(RECORD, "taking")])
  expect(said[0]?.reason).toContain("`taking`")
})

test("an audit lets through a tree where each key names one property", () => {
  const root = rooted(UNDER)
  declaring(root, "over", { pageTypeSlug: TEXT })
  typed(root, "one", null, ["held", "over"])

  expect(keyNamesOneProperty(root)).toEqual([])
})
