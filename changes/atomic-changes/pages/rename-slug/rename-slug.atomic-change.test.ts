import { afterAll, expect, test } from "bun:test"
import {
  HELD_PAGE,
  HELD_SLUG,
  indexedRepo,
  NAMER_PAGE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { renameSlug } from "./rename-slug.atomic-change.code.ts"

afterAll(scratch.sweep)

const PAGE = "akasha/one/held.module.ts"

const KEPT = "kept"

const WHOLE = `export const held = {
  id: "01a04a4a-0000-7000-8000-000000000008",
  pageTypeSlug: "module",
  slug: "held",
} as const
`

const NOTHING = (): null => null

function holding(body: string): (path: string) => string | null {
  return (path) => (path === PAGE ? body : null)
}

function whyOf(at: string, to: string, textOf: (path: string) => string | null): string {
  const said = renameSlug(scratch.rootFor("rename-slug-"), { at, to }, textOf)
  expect(said.bodies).toBe(null)
  return said.refused ?? ""
}

test("a path that is no `.ts` file is refused", () => {
  expect(whyOf("akasha/one/held.md", KEPT, NOTHING)).toBe("`akasha/one/held.md` is no `.ts` file")
})

test("a body that could not be read is refused", () => {
  expect(whyOf(PAGE, KEPT, NOTHING)).toBe(`\`${PAGE}\` could not be read`)
})

test("a body stating no slug is refused", () => {
  const body = WHOLE.replace(`  slug: "held",\n`, "")
  expect(whyOf(PAGE, KEPT, holding(body))).toBe(`\`${PAGE}\` states no \`slug\``)
})

test("a body stating no page type is refused", () => {
  const body = WHOLE.replace(`  pageTypeSlug: "module",\n`, "")
  expect(whyOf(PAGE, KEPT, holding(body))).toBe(`\`${PAGE}\` states no \`pageTypeSlug\``)
})

test("a body stating no id is refused", () => {
  const body = WHOLE.replace(`  id: "01a04a4a-0000-7000-8000-000000000008",\n`, "")
  expect(whyOf(PAGE, KEPT, holding(body))).toBe(`\`${PAGE}\` states no \`id\``)
})

test("a name that is no slug is refused", () => {
  expect(whyOf(PAGE, "Kept", holding(WHOLE))).toBe(
    "`Kept` is no slug, a slug being lower kebab case"
  )
  expect(whyOf(PAGE, "kept-", holding(WHOLE))).toBe(
    "`kept-` is no slug, a slug being lower kebab case"
  )
})

test("the slug it already carries is refused", () => {
  expect(whyOf(PAGE, HELD_SLUG, holding(WHOLE))).toBe(
    `\`${HELD_SLUG}\` is the slug it already carries`
  )
})

test("an index that cannot answer refuses rather than narrowing the reach", () => {
  expect(whyOf(PAGE, KEPT, holding(WHOLE))).toContain("so no slug was restated")
})

test("a slug a page of that page type carries already is refused", () => {
  const root = indexedRepo()
  const said = renameSlug(root, { at: HELD_PAGE, to: "namer" }, textIn(root))
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe("a `module` carries the slug `namer` already")
})

test("a namer that could not be read is refused", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = renameSlug(root, { at: HELD_PAGE, to: KEPT }, (path) =>
    path === NAMER_PAGE ? null : text(path)
  )
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe(`\`${NAMER_PAGE}\` names this page and could not be read`)
})

test("the page's own slug and every name of it are restated", () => {
  const root = indexedRepo()
  const said = renameSlug(root, { at: HELD_PAGE, to: KEPT }, textIn(root))
  expect(said.refused).toBe(null)
  expect([...(said.bodies ?? new Map()).keys()].sort()).toEqual([HELD_PAGE, NAMER_PAGE])
  expect(said.bodies?.get(HELD_PAGE)).toContain(`"slug": "${KEPT}"`)
  expect(said.bodies?.get(HELD_PAGE)).not.toContain(`"${HELD_SLUG}"`)
  expect(said.bodies?.get(NAMER_PAGE)).toContain(`"note": "${KEPT}"`)
  expect(said.bodies?.get(NAMER_PAGE)).toContain(`"module/${KEPT}"`)
  expect(said.bodies?.get(NAMER_PAGE)).not.toContain(HELD_SLUG)
})

test("the bodies are answered rather than written", () => {
  const root = indexedRepo()
  const text = textIn(root)
  expect(renameSlug(root, { at: HELD_PAGE, to: KEPT }, text).refused).toBe(null)
  expect(text(HELD_PAGE)).toContain(`"slug": "${HELD_SLUG}"`)
  expect(text(NAMER_PAGE)).toContain(`"note": "${HELD_SLUG}"`)
})
