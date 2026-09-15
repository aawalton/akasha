import { afterAll, expect, test } from "bun:test"
import { runChange } from "akasha/change/mechanical/file/rename/rename-file-page/rename-file-page.change-mechanical.code.ts"
import {
  ADDRESSED_CARRIED,
  ADDRESSED_PAGE,
  addressedAt,
  HOLDER_CHILD,
  HOLDER_KEPT,
  HOLDER_PAGE,
  heldAt,
  KEPT_ENTRIES,
  KEPT_LANDS,
  KEPT_LANDS_ENTRIES,
  KEPT_PAGE,
  LONE_PAGE,
  movesOf,
  OTHER_CODE,
  OTHER_PAGE,
  OTHER_SLUG,
  OWNED_CODE,
  OWNED_LANDS,
  OWNED_PAGE,
  OWNED_UNDER,
  otherAt,
  pagesAt,
  READER_CODE,
  RUNS,
  readerBody,
  SEATED_PAGE,
  SEATED_SLUG,
  SECOND_PAGE,
  SHARED_CODE,
  SHARED_PAGE,
  SPELLER_CODE,
  TYPED_LANDS,
  TYPED_PAGE,
  typedAt,
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
  worldIn,
} from "akasha/change/mechanical/file/rename/rename-file-page/rename-file-page.change-mechanical.test-fixtures.ts"
import { addressOf, tailOf } from "akasha/change/modules/page-renaming/page-renaming.module.code.ts"
import {
  bodiesIn,
  ledgerAt,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  bodyAt,
  knownOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  bodyOf,
  HELD_CODE,
  HELD_PAGE,
  HELD_SLUG,
  idOf,
  NAMER_CODE,
  NAMER_PAGE,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const CARRIED = "carried"

const CARRIED_PAGE = "akasha/carried/carried.module.ts"

const CARRIED_CODE = "akasha/carried/carried.module.code.ts"

const HELD_REFS = "akasha/one/held.module.referenced-by.jsonl"

const CARRIED_REFS = "akasha/carried/carried.module.referenced-by.jsonl"

const HELD_CARRIED = "akasha/one/held.module.carried.jsonl"

const CARRIED_CARRIED = "akasha/carried/carried.module.carried.jsonl"

const heldWas = textIn(heldAt)

const carriedHeld = await runChange(worldIn(heldAt, heldWas), { at: HELD_PAGE, to: CARRIED })

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

test("the whole rename is modules called rather than any rung reached", async () => {
  const reached: string[] = []
  const root = heldAt
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  const said = await runChange(world, { at: HELD_PAGE, to: CARRIED })

  expect(said.refused).toBe(null)
  expect(reached).toEqual([])
})

test("a page's slug is renamed in its data, and its files are carried with it", () => {
  const was = heldWas
  const page = was(HELD_PAGE) ?? ""
  const namer = was(NAMER_PAGE) ?? ""
  const namerCode = was(NAMER_CODE) ?? ""
  const heldCode = was(HELD_CODE) ?? ""
  const said = carriedHeld
  const bodies = bodiesIn(said, was)
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [HELD_PAGE, CARRIED_PAGE],
    [HELD_CODE, CARRIED_CODE],
    [HELD_CARRIED, CARRIED_CARRIED],
    [HELD_REFS, CARRIED_REFS],
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
    [HELD_CARRIED, CARRIED_CARRIED],
    [HELD_REFS, CARRIED_REFS],
  ])
  expect(bodies.get(CARRIED_PAGE) ?? "").toContain(`"slug": "${CARRIED}"`)
  expect(bodies.get(NAMER_PAGE) ?? "").toContain(`"note": "${CARRIED}"`)
  expect(bodies.has(SPELLER_CODE)).toBe(false)
})

test("a body that is no page spelling the page's address states the new address", () => {
  const said = carriedHeld
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, heldWas).get(SPELLER_CODE)).toBe(`export const at = "module/${CARRIED}"\n`)
})

test("a beside file is carried whichever kind of property holds that file", async () => {
  const said = await runChange(worldIn(pagesAt, textIn(pagesAt)), { at: WIDE_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [WIDE_PAGE, CARRIED_PAGE],
    [WIDE_CODE, CARRIED_CODE],
    [WIDE_SESSIONS, "akasha/carried/carried.module.sessions.jsonl"],
    [WIDE_FIXTURES, "akasha/carried/carried.module.test-fixtures.ts"],
    ["akasha/four/wide.module.carried.jsonl", CARRIED_CARRIED],
  ])
})

test("a page whose type holds a secret has the sops file beside it carried too", async () => {
  const world = worldIn(pagesAt, textIn(pagesAt))
  const said = await runChange(world, { at: WARDED_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [WARDED_PAGE, WARDED_LANDS],
    [WARDED_CODE, WARDED_LANDS_CODE],
    [WARDED_SOPS, WARDED_LANDS_SOPS],
  ])
})

test("a page carries the uncommitted file its type declares though the page states no key", async () => {
  const world = worldIn(pagesAt, textIn(pagesAt))
  const said = await runChange(world, { at: KEPT_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [KEPT_PAGE, KEPT_LANDS],
    [KEPT_ENTRIES, KEPT_LANDS_ENTRIES],
    [
      "akasha/kepts/first/first.kept.carried.jsonl",
      "akasha/kepts/carried/carried.kept.carried.jsonl",
    ],
  ])
})

test("a page whose type holds a secret it keeps no file for carries no sops file", async () => {
  const world = worldIn(pagesAt, textIn(pagesAt))
  const said = await runChange(world, { at: SECOND_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([[SECOND_PAGE, WARDED_LANDS]])
})

test("a page sharing its folder is renamed in the folder that page sits in", async () => {
  const root = otherAt
  const said = await runChange(worldIn(root, textIn(root)), { at: SHARED_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [SHARED_PAGE, "akasha/ten/carried.module.ts"],
    [SHARED_CODE, "akasha/ten/carried.module.code.ts"],
  ])
})

test("a page owning its folder carries what sits under that folder, each file once", async () => {
  const said = await runChange(worldIn(pagesAt, textIn(pagesAt)), { at: OWNED_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [OWNED_PAGE, CARRIED_PAGE],
    [OWNED_CODE, CARRIED_CODE],
    ["akasha/owned/owned.module.carried.jsonl", CARRIED_CARRIED],
    [OWNED_UNDER, OWNED_LANDS],
  ])
})

test("a page alone in its folder with no file beside it carries that folder too", async () => {
  const root = otherAt
  const said = await runChange(worldIn(root, textIn(root)), { at: LONE_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [LONE_PAGE, CARRIED_PAGE],
    ["akasha/eleven/lone-one.module.carried.jsonl", CARRIED_CARRIED],
  ])
})

test("a folder under the one renamed is named again by what the new slug says", async () => {
  const root = otherAt
  const said = await runChange(worldIn(root, textIn(root)), { at: HOLDER_PAGE, to: "holder" })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [HOLDER_PAGE, "akasha/holder/holder.module.ts"],
    ["akasha/holders/holders.module.carried.jsonl", "akasha/holder/holder.module.carried.jsonl"],
    [
      "akasha/holders/modules/holder-one/holder-one.module.carried.jsonl",
      "akasha/holder/modules/one/holder-one.module.carried.jsonl",
    ],
    [HOLDER_CHILD, "akasha/holder/modules/one/holder-one.module.ts"],
    [
      "akasha/holders/pages/only-one.module.carried.jsonl",
      "akasha/holder/pages/only-one.module.carried.jsonl",
    ],
    [HOLDER_KEPT, "akasha/holder/pages/only-one.module.ts"],
  ])
})

test("a page carrying the slug asked for is carried into the folder that slug names", async () => {
  const root = otherAt
  const said = await runChange(worldIn(root, textIn(root)), { at: OTHER_PAGE, to: OTHER_SLUG })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [OTHER_PAGE, `akasha/${OTHER_SLUG}/${OTHER_SLUG}.module.ts`],
    [OTHER_CODE, `akasha/${OTHER_SLUG}/${OTHER_SLUG}.module.code.ts`],
    [
      "akasha/three/other-one.module.carried.jsonl",
      `akasha/${OTHER_SLUG}/${OTHER_SLUG}.module.carried.jsonl`,
    ],
  ])
})

test("a page carrying the slug asked for, in the folder that slug names, is refused", async () => {
  const world = worldIn(pagesAt, textIn(pagesAt))
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
  expect(bodies.get(READER_CODE)).toBe(readerBody("Carried", `../${CARRIED}/${CARRIED}.module.ts`))
})

test("a page renamed over a ledger is carried once rather than a second time", async () => {
  const root = heldAt
  const was = textIn(root)
  const said = await runChange(ledgerAt(root, was, RUNS), { at: HELD_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [HELD_PAGE, CARRIED_PAGE],
    [HELD_CODE, CARRIED_CODE],
    [HELD_CARRIED, CARRIED_CARRIED],
    [HELD_REFS, CARRIED_REFS],
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
  const was = textIn(pagesAt)
  const said = await runChange(worldIn(pagesAt, was), { at: WAY_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, was).get(WAY_MANIFEST)).toContain(
    `"./${CARRIED}": "./${CARRIED}/${CARRIED}.module.code.ts"`
  )
})

test("a page stating its page type as an address is named by the slug that address holds", async () => {
  const root = addressedAt
  const said = await runChange(worldIn(root, textIn(root)), { at: ADDRESSED_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [ADDRESSED_PAGE, CARRIED_PAGE],
    [ADDRESSED_CARRIED, CARRIED_CARRIED],
  ])
})
