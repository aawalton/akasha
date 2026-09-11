import { expect, test } from "bun:test"
import { stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import { dropped } from "akasha/changes/modules/edits-dropping/edits-dropping.module.code.ts"
import type {
  Carried,
  Facing,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const ONE = "01a058c0-0000-7000-8000-000000000001"

const AT = "akasha/lines.file-property.ts"

const BESIDE = "akasha/one.thing.ts"

const APPENDED = "akasha/one.thing.lines.jsonl"

const SAYS: Value = { slug: "lines", propertySlug: "lines", appendOnly: true }

function carryingAt(named: string): Carried {
  return named === "file-property/lines"
    ? { carrying: [{ pageTypeSlug: "thing", path: BESIDE, id: ONE, within: null }] }
    : { refused: "no page property carries that slug" }
}

const FACING: Facing = {
  kindsUnder: () => ["file-property"],
  everyOfType: () => [{ path: AT }],
  valueAt: () => SAYS,
  carryingOf: carryingAt,
  filesIn: () => [],
}

test("a body replaced at a path only added to at its end is dropped from the answer", () => {
  const said = dropped(
    FACING,
    stating([{ kind: "replace", path: APPENDED, contentFrom: "was", contentTo: "now" }])
  )

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("an edit adding at the end of such a file is kept", () => {
  const one = { kind: "append", path: APPENDED, content: "a line\n" } as const

  expect(dropped(FACING, stating([one])).edits).toEqual([one])
})

test("an edit moving or taking away such a file is kept", () => {
  const one = { kind: "move", pathFrom: APPENDED, pathTo: BESIDE } as const
  const two = { kind: "remove", path: APPENDED } as const

  expect(dropped(FACING, stating([one, two])).edits).toEqual([one, two])
})

test("an answer with no such body is answered as the answer that answer already was", () => {
  const said = stating([{ kind: "replace", path: BESIDE, contentFrom: "was", contentTo: "now" }])

  expect(dropped(FACING, said)).toBe(said)
})
