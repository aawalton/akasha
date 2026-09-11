import { afterAll, expect, test } from "bun:test"
import { relationReachesAPage } from "akasha/changes/guards/pages/relation-reaches-a-page/relation-reaches-a-page.change-guard.code.ts"
import { stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { guardedBy } from "akasha/changes/modules/guarding/change-guarding.module.code.ts"
import { worldAt } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  bodyOf,
  idOf,
  indexedRepo,
  NAMER_PAGE,
  pageOf,
  scratch,
  textIn,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const GUARDS = [relationReachesAPage]

const AT = "akasha/one/fresh.module.ts"

const MADE = "akasha/one/made.module.ts"

const NOTE_AT = "akasha/note.relation-property.ts"

function naming(seed: string, slug: string, named: readonly string[]): string {
  return pageOf({
    id: idOf(seed),
    pageTypeSlug: "module",
    slug,
    definition: "a page naming other pages",
    code: "ts",
    partSlugs: named,
  })
}

function judged(root: string, said: Answer): Answer {
  return guardedBy(worldAt(root, textIn(root)), said, GUARDS)
}

test("a page naming a page that reaches nothing is refused", () => {
  const root = indexedRepo()

  const said = judged(
    root,
    stating([{ kind: "add", path: AT, content: naming("f", "fresh", ["module/gone"]) }])
  )

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${AT}\` states \`part-slugs\`, and no \`module\` carries the slug \`gone\``
  )
})

test("a page naming a page that reaches a page is not refused", () => {
  const root = indexedRepo()

  const said = judged(
    root,
    stating([{ kind: "add", path: AT, content: naming("f", "fresh", ["module/held"]) }])
  )

  expect(said.refused).toBe(null)
})

test("a page naming a page the same answer writes is not refused", () => {
  const root = indexedRepo()

  const said = judged(
    root,
    stating([
      { kind: "add", path: MADE, content: naming("m", "made", []) },
      { kind: "add", path: AT, content: naming("f", "fresh", ["module/made"]) },
    ])
  )

  expect(said.refused).toBe(null)
})

test("a path under no page name is judged by nothing", () => {
  const root = indexedRepo()
  const beside = "akasha/one/fresh.module.code.ts"

  const said = judged(
    root,
    stating([{ kind: "add", path: beside, content: "export const fresh = 1\n" }])
  )

  expect(said.refused).toBe(null)
})

function notePointing(target: string): string {
  return bodyOf({
    id: idOf("b"),
    pageTypeSlug: "relation-property",
    slug: "note",
    propertySlug: "note",
    targetPageType: target,
  })
}

test("a page the answer does not write and a turned target breaks refuses the answer", () => {
  const root = indexedRepo()
  const was = textIn(root)(NOTE_AT) ?? ""
  const now = notePointing("page-property")

  const said = judged(
    root,
    stating([{ kind: "replace", path: NOTE_AT, contentFrom: was, contentTo: now }])
  )

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `${NAMER_PAGE}: \`note\` — no page admitting \`page-property\` carries the slug \`held\``
  )
})
