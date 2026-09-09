import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"
import { refusing, stating } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { FileChange } from "../../../modules/change-answer/change-answer.module.types.ts"
import { worldOf } from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import { guardedBy } from "../../../modules/guarding/change-guarding.module.code.ts"
import { generatedFileNotWritten } from "./generated-file-not-written.change-guard.code.ts"

const ID = "01a07750-0000-7000-8000-000000000001"

const OWNER = "01a07750-0000-7000-8000-000000000002"

const PROPERTY = "akasha/entries.file-property.ts"

const HOLDER = "akasha/one/held.module.ts"

const GENERATED = "akasha/one/held.module.entries.jsonl"

const FOREIGN = "akasha/one/held.code-check.entries.jsonl"

const PLAIN = "akasha/one/held.module.code.ts"

const NO_SLUG = "no page property carries that slug"

const ENTRIES: Value = {
  id: ID,
  pageTypeSlug: "file-property",
  slug: "entries",
  propertySlug: "entries",
  generated: true,
}

const INDEX: Partial<Shadow["index"]> = {
  carryingOf: () => ({
    carrying: [{ pageTypeSlug: "module", path: HOLDER, id: OWNER, within: null }],
  }),
  everyOfType: () => [{ path: PROPERTY, id: ID }],
  kindsUnder: () => new Set(["file-property"]),
}

const SHADOW: Shadow = {
  index: INDEX as Shadow["index"],
  filed: () => [],
  pageOf: (path) => (path === PROPERTY ? ENTRIES : null),
  codeAt: (path) => path,
}

const CARRIES_NONE: Shadow = {
  ...SHADOW,
  index: { ...INDEX, carryingOf: () => ({ refused: NO_SLUG }) } as Shadow["index"],
}

function replacing(path: string): FileChange {
  return { kind: "replace", path, contentFrom: "one", contentTo: "two" }
}

function judgedIn(shadow: Shadow, edits: readonly FileChange[]): string | null {
  return generatedFileNotWritten({ said: stating(edits), shadow, before: worldOf({}) })
}

function judged(edits: readonly FileChange[]): string | null {
  return judgedIn(SHADOW, edits)
}

test("a change to the content of a file a generated property has is refused", () => {
  const why = judged([replacing(GENERATED)])

  expect(why ?? "").toContain(`\`${GENERATED}\``)
  expect(why ?? "").toContain("rather than by hand")
})

test("a change to the content of a file no generated property has is not refused", () => {
  expect(judged([replacing(PLAIN)])).toBe(null)
})

test("that same section under a page type carrying no such property is not refused", () => {
  expect(judged([replacing(FOREIGN)])).toBe(null)
})

test("a property no page type is known to carry is a file that is not generated", () => {
  expect(judgedIn(CARRIES_NONE, [replacing(GENERATED)])).toBe(null)
})

test("a file a generated property has added is not refused", () => {
  expect(judged([{ kind: "add", path: GENERATED, content: "one" }])).toBe(null)
})

test("a file a generated property has taken away is not refused", () => {
  expect(judged([{ kind: "remove", path: GENERATED }])).toBe(null)
})

test("an answer already refused runs nothing here", () => {
  const said = refusing("the change refused before a guard was reached")

  expect(guardedBy(worldOf({}), said, [generatedFileNotWritten])).toBe(said)
})
