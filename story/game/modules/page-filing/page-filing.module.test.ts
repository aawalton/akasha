import { expect, test } from "bun:test"
import { gameAttribute } from "akasha/story/game/attribute/game-attribute.page-type.ts"
import {
  type Filing,
  filedAt,
  prunedOf,
  typesAt,
} from "akasha/story/game/modules/page-filing/page-filing.module.code.ts"

const ROOT = process.cwd()

const FILING: Filing = {
  root: ROOT,
  folder: "story/game/pages/the-tower",
  pageTypeSlug: gameAttribute.slug,
  plural: "attributes",
  slug: "the-tower-grit",
  keys: ["title", "least", "most"],
  values: { title: "Grit", least: 3, most: 18 },
}

test("the type a body imports sits beside the page type", () => {
  expect(typesAt(ROOT, gameAttribute.slug)?.endsWith("game-attribute.page-type.types.ts")).toBe(
    true
  )
  expect(typesAt(ROOT, "nothing-is-filed-here")).toBe(null)
})

test("a page of a game's world sits under that game's own folder", () => {
  const composed = filedAt(FILING)
  if ("refused" in composed) throw new Error(composed.refused)
  expect(composed.answered.at).toBe(
    "story/game/pages/the-tower/attributes/the-tower-grit.game-attribute.ts"
  )
})

test("a body states its type and its slug, and imports the type beside the page type", () => {
  const composed = filedAt(FILING)
  if ("refused" in composed) throw new Error(composed.refused)
  const body = composed.answered.body
  expect(body).toContain('import type { GameAttribute } from "akasha/story/game')
  expect(body).toContain('type: "page-type/game-attribute",')
  expect(body).toContain('slug: "the-tower-grit",')
  expect(body).toContain('title: "Grit",')
  expect(body).toContain("export const theTowerGrit = {")
  expect(body).toContain("} as const satisfies GameAttribute")
})

test("a key with nothing under it is left off the body", () => {
  const composed = filedAt({ ...FILING, values: { title: "Grit", most: 18 } })
  if ("refused" in composed) throw new Error(composed.refused)
  expect(composed.answered.body).not.toContain("least")
})

test("a field with nothing under it is left out of a record too", () => {
  expect(prunedOf({ a: 1, b: undefined, c: [{ d: undefined, e: 2 }] })).toEqual({
    a: 1,
    c: [{ e: 2 }],
  })
})

test("a record inside a list is written with no empty field", () => {
  const composed = filedAt({
    ...FILING,
    keys: ["title", "bands"],
    values: { title: "Grit", bands: [{ name: "low", note: undefined }] },
  })
  if ("refused" in composed) throw new Error(composed.refused)
  expect(composed.answered.body).not.toContain("undefined")
})

test("a page type that is nowhere refuses", () => {
  expect(filedAt({ ...FILING, pageTypeSlug: "nothing-is-filed-here" })).toHaveProperty("refused")
})
