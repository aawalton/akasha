import { expect, test } from "bun:test"
import { lines } from "akasha/agent/seat/log-day/properties/lines.file-property.ts"
import { stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { heldToAppending } from "akasha/change/modules/edits-dropping/edits-dropping.module.code.ts"
import { fileProperty } from "akasha/page/file-property/file-property.page-type.ts"
import type {
  Carried,
  Facing,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ONE = "01a058c0-0000-7000-8000-000000000001"

const AT = "akasha/lines.file-property.ts"

const BESIDE = "akasha/one.thing.ts"

const APPENDED = "akasha/one.thing.lines.jsonl"

const SAYS: Value = { slug: lines.slug, propertySlug: lines.propertySlug, appendOnly: true }

const LINES_AT = `${fileProperty.slug}/${lines.slug}` as const

function carryingAt(named: string): Carried {
  return named === LINES_AT
    ? { carrying: [{ pageTypeSlug: "thing", path: BESIDE, id: ONE, within: null }] }
    : { refused: "no page property carries that slug" }
}

const FACING: Facing = {
  kindsUnder: () => ["file-property"],
  everyOfType: () => [{ path: AT }],
  valueAt: () => SAYS,
  carryingOf: carryingAt,
  root: "/nowhere",
}

test("a body replaced at a path only added to at its end refuses the whole answer", () => {
  const said = heldToAppending(
    FACING,
    stating([
      { kind: "replace", path: APPENDED, contentFrom: "was", contentTo: "now" },
      { kind: "replace", path: BESIDE, contentFrom: "was", contentTo: "now" },
    ])
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(`\`${APPENDED}\` is append-only`)
  expect(said.refused ?? "").toContain("append lines to its end instead")
})

test("an edit adding at the end of such a file is kept", () => {
  const one = { kind: "append", path: APPENDED, content: "a line\n" } as const

  expect(heldToAppending(FACING, stating([one])).edits).toEqual([one])
})

test("an edit moving or taking away such a file is kept", () => {
  const one = { kind: "move", pathFrom: APPENDED, pathTo: BESIDE } as const
  const two = { kind: "remove", path: APPENDED } as const

  expect(heldToAppending(FACING, stating([one, two])).edits).toEqual([one, two])
})

test("an answer with no such body is answered as the answer that answer already was", () => {
  const said = stating([{ kind: "replace", path: BESIDE, contentFrom: "was", contentTo: "now" }])

  expect(heldToAppending(FACING, said)).toBe(said)
})
