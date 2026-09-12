import { afterAll, expect, test } from "bun:test"
import {
  addressOf,
  runChange,
  tailOf,
} from "akasha/changes/mechanical/file/rename/rename-file-page/rename-file-page.change-mechanical.code.ts"
import {
  KEPT_ENTRIES,
  KEPT_LANDS,
  KEPT_LANDS_ENTRIES,
  KEPT_PAGE,
  keptAt,
  movesOf,
  OWNED_CODE,
  OWNED_LANDS,
  OWNED_PAGE,
  OWNED_UNDER,
  ownedAt,
  RUNS,
  SEATED_PAGE,
  SEATED_SLUG,
  SECOND_PAGE,
  WARDED_CODE,
  WARDED_LANDS,
  WARDED_LANDS_CODE,
  WARDED_LANDS_SOPS,
  WARDED_PAGE,
  WARDED_SOPS,
  WAY_MANIFEST,
  WAY_PAGE,
  WIDE_CODE,
  WIDE_FIXTURES,
  WIDE_PAGE,
  WIDE_SESSIONS,
  wardedAt,
  wayAt,
  wideAt,
  worldIn,
} from "akasha/changes/mechanical/file/rename/rename-file-page/rename-file-page.change-mechanical.test-fixtures.ts"
import {
  bodiesIn,
  ledgerAt,
  worldAt,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  bodyAt,
  knownOf,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
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
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const CARRIED = "carried"

const CARRIED_PAGE = "akasha/carried/carried.module.ts"

const CARRIED_CODE = "akasha/carried/carried.module.code.ts"

const OTHER_PAGE = "akasha/three/other-one.module.ts"

const OTHER_SLUG = "other-one"

const OTHER_CODE = "akasha/three/other-one.module.code.ts"

const TYPED_SLUG = "typed-one"

const TYPED_PAGE = "akasha/five/typed-one.module.ts"

const TYPED_LANDS = "akasha/five/carried.module.ts"

const READER_PAGE = "akasha/six/reader.module.ts"

const READER_CODE = "akasha/six/reader.module.code.ts"

const TYPED_VALUE = { id: idOf("d"), pageTypeSlug: "module", slug: TYPED_SLUG }

const READER_VALUE = { id: idOf("e"), pageTypeSlug: "module", slug: "reader", code: "ts" }

function readerBody(named: string, at: string): string {
  return `import type { ${named} } from "${at}"\n\nexport const reader: ${named} = "one"\n`
}

const typedAt: string = indexedRepo({
  [TYPED_PAGE]: `export type TypedOne = string\n\n${pageOf(TYPED_VALUE)}`,

  [READER_PAGE]: pageOf(READER_VALUE),
  [READER_CODE]: readerBody("TypedOne", `../five/${TYPED_SLUG}.module.ts`),
})

const statedAs = (value: Record<string, unknown>, named: string): string =>
  bodyOf(value).replace("export const it", `export const ${named}`)

const OTHER_VALUE = { id: idOf("f"), pageTypeSlug: "module", slug: OTHER_SLUG, code: "ts" }

const SPELLER_PAGE = "akasha/eight/speller.module.ts"

const SPELLER_CODE = "akasha/eight/speller.module.code.ts"

const heldAt: string = indexedRepo({
  [SPELLER_PAGE]: pageOf({ id: idOf("c"), pageTypeSlug: "module", slug: "speller", code: "ts" }),
  [SPELLER_CODE]: `export const at = "module/${HELD_SLUG}"\n`,
})

const otherAt: string = indexedRepo({
  [OTHER_PAGE]: statedAs(OTHER_VALUE, "otherOne"),
  [OTHER_CODE]: "export const kept = 2\n",
})

test("a body that could not be read is refused", async () => {
  const said = await runChange(
    worldIn(scratch.rootFor("slug-"), () => null),
    {
      at: HELD_PAGE,
      to: CARRIED,
    }
  )
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/one/held.module.ts` could not be read")
})

test("a body stating no slug is refused", async () => {
  const body = bodyOf({ id: idOf("8"), pageTypeSlug: "module" })
  const world = worldIn(scratch.rootFor("slug-"), bodyAt(HELD_PAGE, body))
  const said = await runChange(world, { at: HELD_PAGE, to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/one/held.module.ts` states no `slug`")
})

test("a body stating no page type is refused", async () => {
  const body = bodyOf({ id: idOf("8"), slug: HELD_SLUG })
  const world = worldIn(scratch.rootFor("slug-"), bodyAt(HELD_PAGE, body))
  const said = await runChange(world, { at: HELD_PAGE, to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/one/held.module.ts` states no `pageTypeSlug`")
})

test("a refusal from the slug rename is answered as this change's own", async () => {
  const root = heldAt
  const said = await runChange(worldIn(root, textIn(root)), { at: HELD_PAGE, to: "namer" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("a `module` carries the slug `namer` already")
})

test("a page whose slug is more than one word has its camel export renamed too", async () => {
  const root = otherAt
  const said = await runChange(worldIn(root, textIn(root)), { at: OTHER_PAGE, to: CARRIED })
  const body = bodiesIn(said, textIn(root)).get(CARRIED_PAGE) ?? ""
  expect(said.refused).toBe(null)
  expect(body).toContain(`export const ${CARRIED} =`)
  expect(body).not.toContain("export const otherOne")
})

test("the slug rename and the whole carry are reached at their own addresses", async () => {
  const reached: string[] = []
  const root = heldAt
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await runChange(world, { at: HELD_PAGE, to: CARRIED })

  expect(reached[0]).toBe("change-mechanical-file-content/rename-page-address")
  expect(reached[reached.length - 1]).toBe("change-mechanical-file-content/rename-page-slug")
  expect(reached.slice(1, -1)).toEqual(["change-mechanical/move-files"])
})

test("a page's slug is renamed in its data, and its files are carried with it", async () => {
  const root = heldAt
  const was = textIn(root)
  const page = was(HELD_PAGE) ?? ""
  const namer = was(NAMER_PAGE) ?? ""
  const namerCode = was(NAMER_CODE) ?? ""
  const heldCode = was(HELD_CODE) ?? ""
  const said = await runChange(worldIn(root, was), { at: HELD_PAGE, to: CARRIED })
  const bodies = bodiesIn(said, was)
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [HELD_PAGE, CARRIED_PAGE],
    [HELD_CODE, CARRIED_CODE],
  ])
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
  expect(bodies.get(HELD_PAGE)).toBe(null)
  expect(bodies.get(HELD_CODE)).toBe(null)
})

test("a caller having restated every address already has no address restated here", async () => {
  const root = heldAt
  const was = textIn(root)
  const said = await runChange(worldIn(root, was), {
    at: HELD_PAGE,
    to: CARRIED,
    addressesRestated: true,
  })
  const bodies = bodiesIn(said, was)
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [HELD_PAGE, CARRIED_PAGE],
    [HELD_CODE, CARRIED_CODE],
  ])
  expect(bodies.get(CARRIED_PAGE) ?? "").toContain(`"slug": "${CARRIED}"`)
  expect(bodies.get(NAMER_PAGE) ?? "").toContain(`"note": "${CARRIED}"`)
  expect(bodies.has(SPELLER_CODE)).toBe(false)
})

test("a body that is no page spelling the page's address states the new address", async () => {
  const was = textIn(heldAt)
  const said = await runChange(worldIn(heldAt, was), { at: HELD_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, was).get(SPELLER_CODE)).toBe(`export const at = "module/${CARRIED}"\n`)
})

test("a beside file is carried whichever kind of property holds that file", async () => {
  const said = await runChange(worldIn(wideAt, textIn(wideAt)), { at: WIDE_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [WIDE_PAGE, CARRIED_PAGE],
    [WIDE_CODE, CARRIED_CODE],
    [WIDE_SESSIONS, "akasha/carried/carried.module.sessions.jsonl"],
    [WIDE_FIXTURES, "akasha/carried/carried.module.test-fixtures.ts"],
  ])
})

test("a page whose type holds a secret has the sops file beside it carried too", async () => {
  const world = worldIn(wardedAt, textIn(wardedAt))
  const said = await runChange(world, { at: WARDED_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [WARDED_PAGE, WARDED_LANDS],
    [WARDED_CODE, WARDED_LANDS_CODE],
    [WARDED_SOPS, WARDED_LANDS_SOPS],
  ])
})

test("a page carries the uncommitted file its type declares though the page states no key", async () => {
  const world = worldIn(keptAt, textIn(keptAt))
  const said = await runChange(world, { at: KEPT_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [KEPT_PAGE, KEPT_LANDS],
    [KEPT_ENTRIES, KEPT_LANDS_ENTRIES],
  ])
})

test("a page whose type holds a secret it keeps no file for carries no sops file", async () => {
  const world = worldIn(wardedAt, textIn(wardedAt))
  const said = await runChange(world, { at: SECOND_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([[SECOND_PAGE, WARDED_LANDS]])
})

test("a page owning its folder carries what sits under that folder, each file once", async () => {
  const said = await runChange(worldIn(ownedAt, textIn(ownedAt)), { at: OWNED_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [OWNED_PAGE, CARRIED_PAGE],
    [OWNED_CODE, CARRIED_CODE],
    [OWNED_UNDER, OWNED_LANDS],
  ])
})

test("a page carrying the slug asked for is carried into the folder that slug names", async () => {
  const root = otherAt
  const said = await runChange(worldIn(root, textIn(root)), { at: OTHER_PAGE, to: OTHER_SLUG })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [OTHER_PAGE, `akasha/${OTHER_SLUG}/${OTHER_SLUG}.module.ts`],
    [OTHER_CODE, `akasha/${OTHER_SLUG}/${OTHER_SLUG}.module.code.ts`],
  ])
})

test("a page carrying the slug asked for, in the folder that slug names, is refused", async () => {
  const world = worldIn(wardedAt, textIn(wardedAt))
  const said = await runChange(world, { at: SEATED_PAGE, to: SEATED_SLUG })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${SEATED_SLUG}\` is the slug this page carries, in the folder that slug names`
  )
})

test("a page exporting a type named from its slug has the const and the type spelled anew", async () => {
  const root = typedAt
  const said = await runChange(worldIn(root, textIn(root)), { at: TYPED_PAGE, to: CARRIED })
  const bodies = bodiesIn(said, textIn(root))
  const body = bodies.get(TYPED_LANDS) ?? ""
  expect(said.refused).toBe(null)
  expect(body).toContain("export type Carried = string")
  expect(body).toContain(`export const ${CARRIED} =`)
  expect(body).not.toContain("TypedOne")
  expect(bodies.get(READER_CODE)).toBe(readerBody("Carried", `../five/${CARRIED}.module.ts`))
})

test("a page renamed over a ledger is carried once rather than a second time", async () => {
  const root = heldAt
  const was = textIn(root)
  const said = await runChange(ledgerAt(root, was, RUNS), { at: HELD_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [HELD_PAGE, CARRIED_PAGE],
    [HELD_CODE, CARRIED_CODE],
  ])
  expect(bodiesIn(said, was).get(CARRIED_PAGE) ?? "").toContain(`"slug": "${CARRIED}"`)
})

const SCOPING = { scopePropertySlug: "section-of", propertySlug: "slug" }

const aPage = (said: Readonly<Record<string, string>>) => ({
  slug: "one",
  pageTypeSlug: "book-section",
  said: new Map(Object.entries(said)),
})

test("a folder named for what a slug adds to its parent's is named that way again", () => {
  expect(tailOf("change-repeat", "repeat", "change-again")).toBe("again")
  expect(tailOf("change-repeat", "repeat", "change-repeat-twice")).toBe("repeat-twice")
})

test("a folder the old slug does not close with names the whole new slug", () => {
  expect(tailOf("held", "one", CARRIED)).toBe(null)
  expect(tailOf("owned", "owned", CARRIED)).toBe(null)
  expect(tailOf("change-repeat", "repeat", "apply-repeat")).toBe(null)
  expect(tailOf("change-repeat", "repeat", "change-")).toBe(null)
})

test("a page whose type scopes nothing is addressed by its page type and its slug", () => {
  const known = knownOf({})
  expect(addressOf(known, aPage({ sectionOf: "my-math" }), CARRIED)).toBe(`book-section/${CARRIED}`)
})

test("a page type scoping its slug names that scope in the address", () => {
  const known = knownOf({ scoping: () => SCOPING })
  expect(addressOf(known, aPage({ sectionOf: "my-math" }), CARRIED)).toBe(
    `book-section/my-math/${CARRIED}`
  )
  expect(addressOf(known, aPage({ sectionOf: "alan-book/my-math" }), CARRIED)).toBe(
    `book-section/my-math/${CARRIED}`
  )
  expect(addressOf(known, aPage({}), CARRIED)).toBe(`book-section/${CARRIED}`)
})

test("a way named for the old slug is named for the new slug", async () => {
  const was = textIn(wayAt)
  const said = await runChange(worldIn(wayAt, was), { at: WAY_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, was).get(WAY_MANIFEST)).toContain(
    `"./${CARRIED}": "./${CARRIED}/${CARRIED}.module.code.ts"`
  )
})
