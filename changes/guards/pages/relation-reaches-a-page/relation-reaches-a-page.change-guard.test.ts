import { afterAll, expect, test } from "bun:test"
import { idOf, indexedRepo, pageOf, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { stating } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { guardedBy } from "../../../modules/guarding/change-guarding.module.code.ts"
import { relationReachesAPage } from "./relation-reaches-a-page.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [relationReachesAPage]

const AT = "akasha/one/fresh.module.ts"

const MADE = "akasha/one/made.module.ts"

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
