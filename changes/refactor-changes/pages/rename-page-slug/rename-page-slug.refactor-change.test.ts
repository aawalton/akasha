import { afterAll, expect, test } from "bun:test"
import {
  bodyOf,
  HELD_CODE,
  HELD_PAGE,
  HELD_SLUG,
  idOf,
  indexedRepo,
  NAMER_CODE,
  NAMER_PAGE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { renamePageSlug } from "./rename-page-slug.refactor-change.code.ts"

afterAll(scratch.sweep)

const CARRIED = "carried"

const CARRIED_PAGE = "akasha/one/carried.module.ts"

const CARRIED_CODE = "akasha/one/carried.module.code.ts"

const OTHER_PAGE = "akasha/three/other-one.module.ts"

const OTHER_SLUG = "other-one"

const WIDE_PAGE = "akasha/four/wide.module.ts"

const NOTHING = (): null => null

const saying =
  (body: string) =>
  (path: string): string | null =>
    path === HELD_PAGE ? body : null

const statedAs = (value: Record<string, unknown>, named: string): string =>
  bodyOf(value).replace("export const it", `export const ${named}`)

test("a body that could not be read is refused", () => {
  const said = renamePageSlug(scratch.rootFor("slug-"), { at: HELD_PAGE, to: CARRIED }, NOTHING)
  expect(said.bodies).toBe(null)
  expect(said.moved).toBe(null)
  expect(said.refused).toBe("`akasha/one/held.module.ts` could not be read")
})

test("a body stating no slug is refused", () => {
  const body = bodyOf({ id: idOf("8"), pageTypeSlug: "module" })
  const said = renamePageSlug(
    scratch.rootFor("slug-"),
    { at: HELD_PAGE, to: CARRIED },
    saying(body)
  )
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe("`akasha/one/held.module.ts` states no `slug`")
})

test("a body stating no page type is refused", () => {
  const body = bodyOf({ id: idOf("8"), slug: HELD_SLUG })
  const said = renamePageSlug(
    scratch.rootFor("slug-"),
    { at: HELD_PAGE, to: CARRIED },
    saying(body)
  )
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe("`akasha/one/held.module.ts` states no `pageTypeSlug`")
})

test("a page type is refused, its slug being renamed by another act", () => {
  const body = bodyOf({ id: idOf("8"), pageTypeSlug: "page-type", slug: HELD_SLUG })
  const said = renamePageSlug(
    scratch.rootFor("slug-"),
    { at: HELD_PAGE, to: CARRIED },
    saying(body)
  )
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe(
    "`akasha/one/held.module.ts` names a page type, whose slug is renamed by another act"
  )
})

test("a refusal from the slug rename is answered as this change's own", () => {
  const root = indexedRepo()
  const said = renamePageSlug(root, { at: HELD_PAGE, to: "namer" }, textIn(root))
  expect(said.bodies).toBe(null)
  expect(said.moved).toBe(null)
  expect(said.refused).toBe("a `module` carries the slug `namer` already")
})

test("a refusal from the export rename is answered as this change's own", () => {
  const value = { id: idOf("f"), pageTypeSlug: "module", slug: OTHER_SLUG, code: "ts" }
  const root = indexedRepo({
    [OTHER_PAGE]: statedAs(value, "otherOne"),
    "akasha/three/other-one.module.code.ts": "export const kept = 2\n",
  })
  const said = renamePageSlug(root, { at: OTHER_PAGE, to: CARRIED }, textIn(root))
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe(
    "`akasha/three/other-one.module.ts` is a page, and a page's export is its slug"
  )
})

test("a page's slug is renamed in its data, and its files are carried with it", () => {
  const root = indexedRepo()
  const was = textIn(root)
  const page = was(HELD_PAGE) ?? ""
  const namer = was(NAMER_PAGE) ?? ""
  const namerCode = was(NAMER_CODE) ?? ""
  const heldCode = was(HELD_CODE) ?? ""
  const said = renamePageSlug(root, { at: HELD_PAGE, to: CARRIED }, was)
  expect(said.refused).toBe(null)
  expect([...(said.moved ?? new Map())]).toEqual([
    [HELD_PAGE, CARRIED_PAGE],
    [HELD_CODE, CARRIED_CODE],
  ])
  const bodies = said.bodies ?? new Map<string, string>()
  expect(bodies.get(CARRIED_PAGE)).toBe(
    page.replace(`"slug": "${HELD_SLUG}"`, `"slug": "${CARRIED}"`)
  )
  expect(bodies.get(NAMER_PAGE)).toBe(
    namer
      .replace(`"note": "${HELD_SLUG}"`, `"note": "${CARRIED}"`)
      .replace(`"module/${HELD_SLUG}"`, `"module/${CARRIED}"`)
  )
  expect(bodies.get(CARRIED_CODE)).toBe(heldCode)
  expect(bodies.get(NAMER_CODE)).toBe(
    namerCode.replace(`../one/${HELD_SLUG}.module.code.ts`, `../one/${CARRIED}.module.code.ts`)
  )
  expect(bodies.has(HELD_PAGE)).toBe(false)
  expect(bodies.has(HELD_CODE)).toBe(false)
})

test("a beside file whose key is more than one word is carried too", () => {
  const root = indexedRepo({
    "akasha/test-fixtures.file-property.ts": bodyOf({
      id: idOf("d"),
      pageTypeSlug: "file-property",
      slug: "test-fixtures",
      propertySlug: "test-fixtures",
    }),
    [WIDE_PAGE]: bodyOf({
      id: idOf("f"),
      pageTypeSlug: "module",
      slug: "wide",
      code: "ts",
      testFixtures: "ts",
    }),
    "akasha/four/wide.module.code.ts": "export const kept = 3\n",
    "akasha/four/wide.module.test-fixtures.ts": "export const set = 4\n",
  })
  const said = renamePageSlug(root, { at: WIDE_PAGE, to: CARRIED }, textIn(root))
  expect(said.refused).toBe(null)
  expect([...(said.moved ?? new Map())]).toEqual([
    [WIDE_PAGE, "akasha/four/carried.module.ts"],
    ["akasha/four/wide.module.code.ts", "akasha/four/carried.module.code.ts"],
    ["akasha/four/wide.module.test-fixtures.ts", "akasha/four/carried.module.test-fixtures.ts"],
  ])
})
