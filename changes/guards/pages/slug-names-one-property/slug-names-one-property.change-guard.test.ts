import { afterAll, expect, test } from "bun:test"
import {
  bodyOf,
  idOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { stating } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { guardedBy } from "../../../modules/guarding/change-guarding.module.code.ts"
import { slugNamesOneProperty } from "./slug-names-one-property.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [slugNamesOneProperty]

const QUIET = "quiet"

const TEXT_AT = "akasha/quiet.text-property.ts"

const FILE_AT = "akasha/kept/quiet.file-property.ts"

const NOTE_AT = "akasha/one/note.file-property.ts"

const NOTE_HELD = "akasha/note.relation-property.ts"

function aTextProperty(): string {
  return bodyOf({
    id: idOf("e"),
    pageTypeSlug: "text-property",
    slug: QUIET,
    propertySlug: QUIET,
    definition: "a text property this test's world carries",
    maxLength: 100,
    nameFormat: null,
  })
}

function aFileProperty(definition: string): string {
  return bodyOf({
    id: idOf("f"),
    pageTypeSlug: "file-property",
    slug: QUIET,
    propertySlug: "quiet-file",
    definition,
  })
}

const CARRIED: Readonly<Record<string, string>> = { [TEXT_AT]: aTextProperty() }

const HELD = "a file property beside the text property of that slug"

const BOTH: Readonly<Record<string, string>> = { ...CARRIED, [FILE_AT]: aFileProperty(HELD) }

function writtenAs(seed: string, slug: string, pageTypeSlug: string, propertySlug: string): string {
  return pageOf({
    id: idOf(seed),
    pageTypeSlug,
    slug,
    propertySlug,
    definition: "a property this answer writes",
    ...(pageTypeSlug === "relation-property" ? { targetPageType: "module" } : {}),
  })
}

function judged(root: string, said: Answer): Answer {
  return guardedBy(worldAt(root, textIn(root)), said, GUARDS)
}

function whyRefused(path: string, slug: string, held: string, kind: string): string {
  return (
    `\`${path}\` takes the slug \`${slug}\`, and \`${held}\` holds that slug ` +
    `under \`${kind}\`, so one slug would name two properties`
  )
}

test("a property taking a slug a relation property of another page type holds is refused", () => {
  const root = indexedRepo()

  const content = writtenAs("f", "note", "file-property", "held-note")
  const said = judged(root, stating([{ kind: "add", path: NOTE_AT, content }]))

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(whyRefused(NOTE_AT, "note", NOTE_HELD, "relation-property"))
})

test("a property taking that slug is refused though neither property is a relation", () => {
  const root = indexedRepo(CARRIED)
  const at = "akasha/one/quiet.file-property.ts"

  const content = writtenAs("0", QUIET, "file-property", "quiet-file")
  const said = judged(root, stating([{ kind: "add", path: at, content }]))

  expect(said.refused).toBe(whyRefused(at, QUIET, TEXT_AT, "text-property"))
})

test("a property taking a slug no other page type's property holds is not refused", () => {
  const root = indexedRepo(CARRIED)
  const at = "akasha/one/fresh.file-property.ts"

  const content = writtenAs("0", "fresh", "file-property", "fresh")
  const said = judged(root, stating([{ kind: "add", path: at, content }]))

  expect(said.refused).toBe(null)
})

test("two properties one answer writes taking one slug are refused", () => {
  const root = indexedRepo()
  const first = "akasha/one/twin.file-property.ts"
  const second = "akasha/one/twin.relation-property.ts"

  const said = judged(
    root,
    stating([
      { kind: "add", path: first, content: writtenAs("f", "twin", "file-property", "twin-file") },
      { kind: "add", path: second, content: writtenAs("0", "twin", "relation-property", "twin") },
    ])
  )

  expect(said.refused).toBe(whyRefused(first, "twin", second, "relation-property"))
})

test("a property already holding its slug is judged by nothing here", () => {
  const root = indexedRepo(BOTH)
  const was = BOTH[FILE_AT] ?? ""
  const now = aFileProperty("a file property whose definition this answer restates")

  const said = judged(
    root,
    stating([{ kind: "replace", path: FILE_AT, contentFrom: was, contentTo: now }])
  )

  expect(said.refused).toBe(null)
})

test("a page that is no property is judged by nothing here", () => {
  const root = indexedRepo()
  const at = "akasha/one/note.module.ts"
  const content = pageOf({
    id: idOf("f"),
    pageTypeSlug: "module",
    slug: "note",
    definition: "a module named as a relation property is",
    code: "ts",
  })

  const said = judged(root, stating([{ kind: "add", path: at, content }]))

  expect(said.refused).toBe(null)
})

test("a path under no page name is judged by nothing here", () => {
  const root = indexedRepo()
  const beside = "akasha/one/note.file-property.code.ts"

  const said = judged(
    root,
    stating([{ kind: "add", path: beside, content: "export const note = 1\n" }])
  )

  expect(said.refused).toBe(null)
})
