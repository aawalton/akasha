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
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { renamePage } from "./rename-page.refactor-change.code.ts"

afterAll(scratch.sweep)

const CARRIED = "carried"

const CARRIED_PAGE = "akasha/carried/carried.module.ts"

const CARRIED_CODE = "akasha/carried/carried.module.code.ts"

const OTHER_PAGE = "akasha/three/other-one.module.ts"

const OTHER_SLUG = "other-one"

const OTHER_CODE = "akasha/three/other-one.module.code.ts"

const WIDE_PAGE = "akasha/four/wide.module.ts"

const SEATED_SLUG = "seated"

const SEATED_PAGE = "akasha/seated/seated.module.ts"

const SEATED_CODE = "akasha/seated/seated.module.code.ts"

const NOTHING = (): null => null

const saying =
  (body: string) =>
  (path: string): string | null =>
    path === HELD_PAGE ? body : null

const statedAs = (value: Record<string, unknown>, named: string): string =>
  bodyOf(value).replace("export const it", `export const ${named}`)

test("a body that could not be read is refused", () => {
  const said = renamePage(scratch.rootFor("slug-"), { at: HELD_PAGE, to: CARRIED }, NOTHING)
  expect(said.bodies).toBe(null)
  expect(said.moved).toBe(null)
  expect(said.refused).toBe("`akasha/one/held.module.ts` could not be read")
})

test("a body stating no slug is refused", () => {
  const body = bodyOf({ id: idOf("8"), pageTypeSlug: "module" })
  const said = renamePage(scratch.rootFor("slug-"), { at: HELD_PAGE, to: CARRIED }, saying(body))
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe("`akasha/one/held.module.ts` states no `slug`")
})

test("a body stating no page type is refused", () => {
  const body = bodyOf({ id: idOf("8"), slug: HELD_SLUG })
  const said = renamePage(scratch.rootFor("slug-"), { at: HELD_PAGE, to: CARRIED }, saying(body))
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe("`akasha/one/held.module.ts` states no `pageTypeSlug`")
})

test("a page type is refused, its slug being renamed by another act", () => {
  const body = bodyOf({ id: idOf("8"), pageTypeSlug: "page-type", slug: HELD_SLUG })
  const said = renamePage(scratch.rootFor("slug-"), { at: HELD_PAGE, to: CARRIED }, saying(body))
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe(
    "`akasha/one/held.module.ts` names a page type, whose slug is renamed by another act"
  )
})

test("a refusal from the slug rename is answered as this change's own", () => {
  const root = indexedRepo()
  const said = renamePage(root, { at: HELD_PAGE, to: "namer" }, textIn(root))
  expect(said.bodies).toBe(null)
  expect(said.moved).toBe(null)
  expect(said.refused).toBe("a `module` carries the slug `namer` already")
})

test("a page whose slug is more than one word has its camel export renamed too", () => {
  const value = { id: idOf("f"), pageTypeSlug: "module", slug: OTHER_SLUG, code: "ts" }
  const root = indexedRepo({
    [OTHER_PAGE]: statedAs(value, "otherOne"),
    [OTHER_CODE]: "export const kept = 2\n",
  })
  const said = renamePage(root, { at: OTHER_PAGE, to: CARRIED }, textIn(root))
  expect(said.refused).toBe(null)
  const bodies = said.bodies ?? new Map<string, string>()
  expect(bodies.get(CARRIED_PAGE)).toContain(`export const ${CARRIED} =`)
  expect(bodies.get(CARRIED_PAGE)).not.toContain("export const otherOne")
})

test("a page's slug is renamed in its data, and its files are carried with it", () => {
  const root = indexedRepo()
  const was = textIn(root)
  const page = was(HELD_PAGE) ?? ""
  const namer = was(NAMER_PAGE) ?? ""
  const namerCode = was(NAMER_CODE) ?? ""
  const heldCode = was(HELD_CODE) ?? ""
  const said = renamePage(root, { at: HELD_PAGE, to: CARRIED }, was)
  expect(said.refused).toBe(null)
  expect([...(said.moved ?? new Map())]).toEqual([
    [HELD_PAGE, CARRIED_PAGE],
    [HELD_CODE, CARRIED_CODE],
  ])
  const bodies = said.bodies ?? new Map<string, string>()
  expect(bodies.get(CARRIED_PAGE)).toBe(
    page
      .replace(`"slug": "${HELD_SLUG}"`, `"slug": "${CARRIED}"`)
      .replace(`export const ${HELD_SLUG} =`, `export const ${CARRIED} =`)
  )
  expect(bodies.get(NAMER_PAGE)).toBe(
    namer
      .replace(`"note": "${HELD_SLUG}"`, `"note": "${CARRIED}"`)
      .replace(`"module/${HELD_SLUG}"`, `"module/${CARRIED}"`)
  )
  expect(bodies.get(CARRIED_CODE)).toBe(heldCode)
  expect(bodies.get(NAMER_CODE)).toBe(
    namerCode.replace(
      `../one/${HELD_SLUG}.module.code.ts`,
      `../${CARRIED}/${CARRIED}.module.code.ts`
    )
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
    [WIDE_PAGE]: pageOf({
      id: idOf("f"),
      pageTypeSlug: "module",
      slug: "wide",
      code: "ts",
      testFixtures: "ts",
    }),
    "akasha/four/wide.module.code.ts": "export const kept = 3\n",
    "akasha/four/wide.module.test-fixtures.ts": "export const set = 4\n",
  })
  const said = renamePage(root, { at: WIDE_PAGE, to: CARRIED }, textIn(root))
  expect(said.refused).toBe(null)
  expect([...(said.moved ?? new Map())]).toEqual([
    [WIDE_PAGE, CARRIED_PAGE],
    ["akasha/four/wide.module.code.ts", CARRIED_CODE],
    ["akasha/four/wide.module.test-fixtures.ts", "akasha/carried/carried.module.test-fixtures.ts"],
  ])
})

test("a page sharing its folder is renamed in the folder that page sits in", () => {
  const value = { id: idOf("f"), pageTypeSlug: "module", slug: OTHER_SLUG, code: "ts" }
  const root = indexedRepo({
    [OTHER_PAGE]: statedAs(value, "otherOne"),
    [OTHER_CODE]: "export const kept = 2\n",
    "akasha/three/second.module.ts": pageOf({
      id: idOf("e"),
      pageTypeSlug: "module",
      slug: "second",
    }),
  })
  const said = renamePage(root, { at: OTHER_PAGE, to: CARRIED }, textIn(root))
  expect(said.refused).toBe(null)
  expect([...(said.moved ?? new Map())]).toEqual([
    [OTHER_PAGE, "akasha/three/carried.module.ts"],
    [OTHER_CODE, "akasha/three/carried.module.code.ts"],
  ])
})

test("a page carrying the slug asked for is carried into the folder that slug names", () => {
  const value = { id: idOf("f"), pageTypeSlug: "module", slug: OTHER_SLUG, code: "ts" }
  const root = indexedRepo({
    [OTHER_PAGE]: statedAs(value, "otherOne"),
    [OTHER_CODE]: "export const kept = 2\n",
  })
  const said = renamePage(root, { at: OTHER_PAGE, to: OTHER_SLUG }, textIn(root))
  expect(said.refused).toBe(null)
  expect([...(said.moved ?? new Map())]).toEqual([
    [OTHER_PAGE, `akasha/${OTHER_SLUG}/${OTHER_SLUG}.module.ts`],
    [OTHER_CODE, `akasha/${OTHER_SLUG}/${OTHER_SLUG}.module.code.ts`],
  ])
})

test("a page carrying the slug asked for, in the folder that slug names, is refused", () => {
  const root = indexedRepo({
    [SEATED_PAGE]: pageOf({
      id: idOf("e"),
      pageTypeSlug: "module",
      slug: SEATED_SLUG,
      code: "ts",
    }),
    [SEATED_CODE]: "export const kept = 5\n",
  })
  const said = renamePage(root, { at: SEATED_PAGE, to: SEATED_SLUG }, textIn(root))
  expect(said.moved).toBe(null)
  expect(said.refused).toBe(
    `\`${SEATED_SLUG}\` is the slug this page carries, in the folder that slug names`
  )
})
