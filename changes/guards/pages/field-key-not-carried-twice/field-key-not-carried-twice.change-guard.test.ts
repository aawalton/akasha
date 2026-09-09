import { afterAll, expect, test } from "bun:test"
import {
  bodyOf,
  idOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { stating } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/guarding/change-guarding.module.code.ts"
import { worldAt } from "../../../modules/shadow/change-shadow.module.code.ts"
import { fieldKeyNotCarriedTwice } from "./field-key-not-carried-twice.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [fieldKeyNotCarriedTwice]

const AT = "akasha/one/pair.record-property.ts"

const MADE = "akasha/one/made.relation-property.ts"

const NOTE = "relation-property/note"

const OTHER = "relation-property/other-note"

const PARTS = "relation-property/part-slugs"

const VOCABULARY: Readonly<Record<string, string>> = {
  "akasha/record-property.page-type.ts": bodyOf({
    id: idOf("d"),
    pageTypeSlug: "page-type",
    slug: "record-property",
    extends: ["page-type/page-property"],
    properties: [],
  }),
  "akasha/other-note.relation-property.ts": bodyOf({
    id: idOf("e"),
    pageTypeSlug: "relation-property",
    slug: "other-note",
    propertySlug: "note",
    targetPageType: "module",
  }),
}

function declaring(named: readonly string[]): readonly Record<string, unknown>[] {
  return named.map((one) => ({ pagePropertySlug: one, required: true, many: false }))
}

function recordOf(named: readonly string[]): string {
  return pageOf({
    id: idOf("f"),
    pageTypeSlug: "record-property",
    slug: "pair",
    propertySlug: "pair",
    definition: "a record property carrying fields",
    properties: declaring(named),
  })
}

function propertyOf(): string {
  return pageOf({
    id: idOf("0"),
    pageTypeSlug: "relation-property",
    slug: "made",
    propertySlug: "note",
    targetPageType: "module",
  })
}

function judged(root: string, said: Answer): Answer {
  return guardedBy(worldAt(root, textIn(root)), said, GUARDS)
}

function whyRefused(path: string, first: string, second: string): string {
  return (
    `\`${path}\` carries the key \`note\` from \`${first}\` and from \`${second}\`, ` +
    `and no two fields carry one key`
  )
}

test("a property carrying one key on two fields is refused", () => {
  const root = indexedRepo(VOCABULARY)

  const said = judged(root, stating([{ kind: "add", path: AT, content: recordOf([NOTE, OTHER]) }]))

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(whyRefused(AT, NOTE, OTHER))
})

test("a property carrying a key on each field is not refused", () => {
  const root = indexedRepo(VOCABULARY)

  const said = judged(root, stating([{ kind: "add", path: AT, content: recordOf([NOTE, PARTS]) }]))

  expect(said.refused).toBe(null)
})

test("a field naming a property the same answer writes is judged", () => {
  const root = indexedRepo(VOCABULARY)

  const said = judged(
    root,
    stating([
      { kind: "add", path: MADE, content: propertyOf() },
      { kind: "add", path: AT, content: recordOf([NOTE, "relation-property/made"]) },
    ])
  )

  expect(said.refused).toBe(whyRefused(AT, NOTE, "relation-property/made"))
})

test("a page type carrying one key twice is judged by nothing", () => {
  const root = indexedRepo(VOCABULARY)
  const at = "akasha/one/pair.page-type.ts"
  const body = pageOf({
    id: idOf("f"),
    pageTypeSlug: "page-type",
    slug: "pair",
    extends: ["page-type/page"],
    properties: declaring([NOTE, OTHER]),
  })

  const said = judged(root, stating([{ kind: "add", path: at, content: body }]))

  expect(said.refused).toBe(null)
})

test("a path under no page property name is judged by nothing", () => {
  const root = indexedRepo(VOCABULARY)
  const beside = "akasha/one/pair.record-property.code.ts"

  const said = judged(
    root,
    stating([{ kind: "add", path: beside, content: "export const pair = 1\n" }])
  )

  expect(said.refused).toBe(null)
})
