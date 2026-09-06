import { afterAll, expect, test } from "bun:test"
import {
  HELD_PAGE,
  HELD_SLUG,
  indexedRepo,
  NAMER_PAGE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import type { Answer } from "../../modules/change-answer/change-answer.module.types.ts"
import { worldAt } from "../../modules/change-shadow/change-shadow.module.code.ts"
import { renameSlug } from "./rename-page-slug.change-mechanical.code.ts"

afterAll(scratch.sweep)

const PAGE = "akasha/one/held.module.ts"

const KEPT = "kept"

const WHOLE = `export const held = {
  id: "01a04a4a-0000-7000-8000-000000000008",
  pageTypeSlug: "module",
  slug: "held",
} as const
`

const PLURAL = `export const held = {
  id: "01a04a4a-0000-7000-8000-000000000008",
  pageTypeSlug: "module",
  slug: "held",
  pluralSlug: "helds",
} as const
`

const NOTHING = (): null => null

function holding(body: string): (path: string) => string | null {
  return (path) => (path === PAGE ? body : null)
}

function pathsOf(said: Answer): readonly string[] {
  return said.edits.map((one) => one.path).sort()
}

function bodyIn(said: Answer, path: string): string {
  return said.edits.find((one) => one.path === path)?.body ?? ""
}

function whyOf(at: string, to: string, textOf: (path: string) => string | null): string {
  const world = worldAt(scratch.rootFor("rename-slug-"), textOf)
  const said = renameSlug(world, { at, to })
  expect(said.edits).toEqual([])
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

test("a body exporting no name its slug makes is refused", () => {
  const body = WHOLE.replace("export const held", "export const it")
  expect(whyOf(PAGE, KEPT, holding(body))).toBe(
    `\`${PAGE}\` exports no \`${HELD_SLUG}\`, the name its slug makes`
  )
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
  const said = renameSlug(worldAt(root, textIn(root)), { at: HELD_PAGE, to: "namer" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("a `module` carries the slug `namer` already")
})

test("a namer that could not be read is refused", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const world = worldAt(root, (path) => (path === NAMER_PAGE ? null : text(path)))
  const said = renameSlug(world, { at: HELD_PAGE, to: KEPT })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_PAGE}\` names this page and could not be read`)
})

test("the page's own slug and every name of it are restated", () => {
  const root = indexedRepo()
  const said = renameSlug(worldAt(root, textIn(root)), { at: HELD_PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(pathsOf(said)).toEqual([HELD_PAGE, NAMER_PAGE])
  expect(bodyIn(said, HELD_PAGE)).toContain(`"slug": "${KEPT}"`)
  expect(bodyIn(said, HELD_PAGE)).not.toContain(`"${HELD_SLUG}"`)
  expect(bodyIn(said, NAMER_PAGE)).toContain(`"note": "${KEPT}"`)
  expect(bodyIn(said, NAMER_PAGE)).toContain(`"module/${KEPT}"`)
  expect(bodyIn(said, NAMER_PAGE)).not.toContain(HELD_SLUG)
})

test("each body is answered beside the body it was worked out from", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = renameSlug(worldAt(root, text), { at: HELD_PAGE, to: KEPT })
  for (const one of said.edits) {
    expect(one.was).toBe(text(one.path))
    expect(one.from).toBe(undefined)
  }
})

test("the page's exported const is renamed with its slug", () => {
  const root = indexedRepo()
  const said = renameSlug(worldAt(root, textIn(root)), { at: HELD_PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(bodyIn(said, HELD_PAGE)).toContain(`export const ${KEPT} =`)
  expect(bodyIn(said, HELD_PAGE)).not.toContain(`export const ${HELD_SLUG} =`)
})

test("the bodies are answered rather than written", () => {
  const root = indexedRepo()
  const text = textIn(root)
  expect(renameSlug(worldAt(root, text), { at: HELD_PAGE, to: KEPT }).refused).toBe(null)
  expect(text(HELD_PAGE)).toContain(`"slug": "${HELD_SLUG}"`)
  expect(text(NAMER_PAGE)).toContain(`"note": "${HELD_SLUG}"`)
})

test("a page stating a plural is refused where the plural it becomes is not said", () => {
  const world = worldAt(scratch.rootFor("rename-slug-"), holding(PLURAL))
  const said = renameSlug(world, { at: PAGE, to: KEPT })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${PAGE}\` states a \`pluralSlug\`, so the plural it becomes is said`)
})

test("a page stating no plural is refused where one is said", () => {
  const world = worldAt(scratch.rootFor("rename-slug-"), holding(WHOLE))
  const said = renameSlug(world, { at: PAGE, to: KEPT, plural: "kepts" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${PAGE}\` states no \`pluralSlug\`, so no plural is said`)
})

test("the plural is stated anew beside the slug", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const held = (text(HELD_PAGE) ?? "").replace(
    `"slug": "${HELD_SLUG}",`,
    `"slug": "${HELD_SLUG}",\n  "pluralSlug": "helds",`
  )
  const world = worldAt(root, (path) => (path === HELD_PAGE ? held : text(path)))
  const said = renameSlug(world, { at: HELD_PAGE, to: KEPT, plural: "kepts" })
  expect(said.refused).toBe(null)
  expect(bodyIn(said, HELD_PAGE)).toContain(`"pluralSlug": "kepts"`)
  expect(bodyIn(said, HELD_PAGE)).toContain(`"slug": "${KEPT}"`)
})
