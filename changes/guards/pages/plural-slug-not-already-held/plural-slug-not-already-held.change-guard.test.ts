import { afterAll, expect, test } from "bun:test"
import { idOf, indexedRepo, pageOf, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { stating } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { guardedBy } from "../../../modules/guarding/change-guarding.module.code.ts"
import { pluralSlugNotAlreadyHeld } from "./plural-slug-not-already-held.change-guard.code.ts"

afterAll(scratch.sweep)

const GUARDS = [pluralSlugNotAlreadyHeld]

const AT = "akasha/one/fresh.page-type.ts"

const ALSO = "akasha/one/second.page-type.ts"

const KEPT = "akasha/kept.page-type.ts"

const KEPT_PLURAL = "kepts"

function aType(seed: string, slug: string, pluralSlug: string): string {
  return pageOf({
    id: idOf(seed),
    pageTypeSlug: "page-type",
    slug,
    definition: "a page type naming many of its own pages",
    extends: ["page-type/page"],
    pluralSlug,
  })
}

function repoHolding(): string {
  return indexedRepo({ [KEPT]: aType("d", "kept", KEPT_PLURAL) })
}

function judged(root: string, said: Answer): Answer {
  return guardedBy(worldAt(root, textIn(root)), said, GUARDS)
}

test("a page type stating a plural slug another page type states is refused", () => {
  const root = repoHolding()

  const said = judged(
    root,
    stating([{ kind: "add", path: AT, content: aType("f", "fresh", KEPT_PLURAL) }])
  )

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${AT}\` states the plural slug \`${KEPT_PLURAL}\`, and \`${KEPT}\` states that plural slug too`
  )
})

test("a page type stating a plural slug no other page type states is not refused", () => {
  const root = repoHolding()

  const said = judged(
    root,
    stating([{ kind: "add", path: AT, content: aType("f", "fresh", "freshes") }])
  )

  expect(said.refused).toBe(null)
})

test("two page types one answer writes stating one plural slug are refused", () => {
  const root = repoHolding()

  const said = judged(
    root,
    stating([
      { kind: "add", path: AT, content: aType("f", "fresh", "twins") },
      { kind: "add", path: ALSO, content: aType("0", "second", "twins") },
    ])
  )

  expect(said.refused).toBe(
    `\`${AT}\` states the plural slug \`twins\`, and \`${ALSO}\` states that plural slug too`
  )
})

test("a page that is no page type is judged by nothing", () => {
  const root = repoHolding()
  const at = "akasha/one/fresh.module.ts"
  const body = pageOf({
    id: idOf("f"),
    pageTypeSlug: "module",
    slug: "fresh",
    definition: "a page stating a plural slug of its own",
    code: "ts",
    pluralSlug: KEPT_PLURAL,
  })

  const said = judged(root, stating([{ kind: "add", path: at, content: body }]))

  expect(said.refused).toBe(null)
})

test("a path under no page name is judged by nothing", () => {
  const root = repoHolding()
  const beside = "akasha/one/fresh.page-type.code.ts"

  const said = judged(
    root,
    stating([{ kind: "add", path: beside, content: "export const fresh = 1\n" }])
  )

  expect(said.refused).toBe(null)
})
