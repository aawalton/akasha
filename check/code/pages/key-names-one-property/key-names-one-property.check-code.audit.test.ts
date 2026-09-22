import { afterAll, expect, test } from "bun:test"
import { keyNamesOneProperty } from "akasha/check/code/pages/key-names-one-property/key-names-one-property.check-code.audit.code.ts"
import {
  NUMBER,
  ONE,
  RECORD,
  recorded,
  rooted,
  scratch,
  TEXT,
} from "akasha/check/code/pages/key-names-one-property/key-names-one-property.check-code.decision.test-fixtures.ts"
import {
  declaring,
  pathFor,
  tracked,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

const UNDER = "akasha-keyed-audit-"

const OVER_AT = "akasha/over.page-type.ts"

afterAll(scratch.sweep)

test("an audit judges every page type the index has, no change naming one of them", () => {
  const root = rooted(UNDER)
  declaring(root, "held", { pageTypeSlug: NUMBER })
  typed(root, "over", null, ["text-property/held", "number-property/held"])

  const said = keyNamesOneProperty(tracked(root))

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

  const said = keyNamesOneProperty(tracked(root))

  expect(said.map((one) => one.path)).toEqual([pathFor(RECORD, "taking")])
  expect(said[0]?.reason).toContain("`taking`")
})

test("an audit lets through a tree where each key names one property", () => {
  const root = rooted(UNDER)
  declaring(root, "over", { pageTypeSlug: TEXT })
  typed(root, "one", null, ["held", "over"])

  expect(keyNamesOneProperty(tracked(root))).toEqual([])
})
