import { afterAll, expect, test } from "bun:test"
import {
  HELD_PAGE,
  HELD_SLUG,
  indexedRepo,
  NAMER_PAGE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import { type World, worldAt } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange as changePageProperty } from "../../change/change-page-property/change-page-property.change-mechanical-file-content.code.ts"
import { runChange as renameExport } from "../rename-export/rename-export.change-mechanical-code.code.ts"
import { renameSlug } from "./rename-page-slug.change-mechanical-data.code.ts"

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

function holding(body: string): (path: string) => string | null {
  return (path) => (path === PAGE ? body : null)
}

function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, (world, at, given) => {
    if (at === "change-mechanical-file-content/change-page-property") {
      return Promise.resolve(
        changePageProperty(world, given as Parameters<typeof changePageProperty>[1])
      )
    }
    if (at === "change-mechanical-code/rename-export") {
      return Promise.resolve(renameExport(world, given as Parameters<typeof renameExport>[1]))
    }
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  })
}

async function whyOf(
  at: string,
  to: string,
  textOf: (path: string) => string | null
): Promise<string> {
  const world = worldIn(scratch.rootFor("rename-slug-"), textOf)
  const said = await renameSlug(world, { at, to })
  expect(said.edits).toEqual([])
  return said.refused ?? ""
}

test("a path that is no `.ts` file is refused", async () => {
  expect(await whyOf("akasha/one/held.md", KEPT, () => null)).toBe(
    "`akasha/one/held.md` is no `.ts` file"
  )
})

test("a body that could not be read is refused", async () => {
  expect(await whyOf(PAGE, KEPT, () => null)).toBe(`\`${PAGE}\` could not be read`)
})

test("a body stating no slug is refused", async () => {
  const body = WHOLE.replace(`  slug: "held",\n`, "")
  expect(await whyOf(PAGE, KEPT, holding(body))).toBe(`\`${PAGE}\` states no \`slug\``)
})

test("a body stating no page type is refused", async () => {
  const body = WHOLE.replace(`  pageTypeSlug: "module",\n`, "")
  expect(await whyOf(PAGE, KEPT, holding(body))).toBe(`\`${PAGE}\` states no \`pageTypeSlug\``)
})

test("a body stating no id is refused", async () => {
  const body = WHOLE.replace(`  id: "01a04a4a-0000-7000-8000-000000000008",\n`, "")
  expect(await whyOf(PAGE, KEPT, holding(body))).toBe(`\`${PAGE}\` states no \`id\``)
})

test("a body exporting no name its slug makes is refused", async () => {
  const body = WHOLE.replace("export const held", "export const it")
  expect(await whyOf(PAGE, KEPT, holding(body))).toBe(
    `\`${PAGE}\` exports no \`${HELD_SLUG}\`, the name its slug makes`
  )
})

test("a name that is no slug is refused", async () => {
  expect(await whyOf(PAGE, "Kept", holding(WHOLE))).toBe(
    "`Kept` is no slug, a slug being lower kebab case"
  )
  expect(await whyOf(PAGE, "kept-", holding(WHOLE))).toBe(
    "`kept-` is no slug, a slug being lower kebab case"
  )
})

test("the slug it already carries is refused", async () => {
  expect(await whyOf(PAGE, HELD_SLUG, holding(WHOLE))).toBe(
    `\`${HELD_SLUG}\` is the slug it already carries`
  )
})

test("an index that cannot answer refuses rather than narrowing the reach", async () => {
  expect(await whyOf(PAGE, KEPT, holding(WHOLE))).toContain("so no slug was restated")
})

test("a slug a page of that page type carries already is refused", async () => {
  const root = indexedRepo()
  const said = await renameSlug(worldIn(root, textIn(root)), { at: HELD_PAGE, to: "namer" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("a `module` carries the slug `namer` already")
})

test("a namer that could not be read is refused", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const world = worldIn(root, (path) => (path === NAMER_PAGE ? null : text(path)))
  const said = await renameSlug(world, { at: HELD_PAGE, to: KEPT })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_PAGE}\` names this page and could not be read`)
})

test("the page's own slug and every name of it are restated", async () => {
  const root = indexedRepo()
  const said = await renameSlug(worldIn(root, textIn(root)), { at: HELD_PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(said.edits.map((one) => one.path).sort()).toEqual([HELD_PAGE, NAMER_PAGE])
  expect(said.edits.find((one) => one.path === HELD_PAGE)?.body ?? "").toContain(
    `"slug": "${KEPT}"`
  )
  expect(said.edits.find((one) => one.path === HELD_PAGE)?.body ?? "").not.toContain(
    `"${HELD_SLUG}"`
  )
  expect(said.edits.find((one) => one.path === NAMER_PAGE)?.body ?? "").toContain(
    `"note": "${KEPT}"`
  )
  expect(said.edits.find((one) => one.path === NAMER_PAGE)?.body ?? "").toContain(
    `"module/${KEPT}"`
  )
  expect(said.edits.find((one) => one.path === NAMER_PAGE)?.body ?? "").not.toContain(HELD_SLUG)
})

test("each body is answered beside the body it was worked out from", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = await renameSlug(worldIn(root, text), { at: HELD_PAGE, to: KEPT })
  for (const one of said.edits) {
    expect(one.was).toBe(text(one.path))
    expect(one.from).toBe(undefined)
  }
})

test("the page's exported const is renamed with its slug", async () => {
  const root = indexedRepo()
  const said = await renameSlug(worldIn(root, textIn(root)), { at: HELD_PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(said.edits.find((one) => one.path === HELD_PAGE)?.body ?? "").toContain(
    `export const ${KEPT} =`
  )
  expect(said.edits.find((one) => one.path === HELD_PAGE)?.body ?? "").not.toContain(
    `export const ${HELD_SLUG} =`
  )
})

test("the bodies are answered rather than written", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = await renameSlug(worldIn(root, text), { at: HELD_PAGE, to: KEPT })
  expect(said.refused).toBe(null)
  expect(text(HELD_PAGE)).toContain(`"slug": "${HELD_SLUG}"`)
  expect(text(NAMER_PAGE)).toContain(`"note": "${HELD_SLUG}"`)
})

test("a page stating a plural is refused where the plural it becomes is not said", async () => {
  const world = worldIn(scratch.rootFor("rename-slug-"), holding(PLURAL))
  const said = await renameSlug(world, { at: PAGE, to: KEPT })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${PAGE}\` states a \`pluralSlug\`, so the plural it becomes is said`)
})

test("a page stating no plural is refused where one is said", async () => {
  const world = worldIn(scratch.rootFor("rename-slug-"), holding(WHOLE))
  const said = await renameSlug(world, { at: PAGE, to: KEPT, plural: "kepts" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${PAGE}\` states no \`pluralSlug\`, so no plural is said`)
})

test("the plural is stated anew beside the slug", async () => {
  const root = indexedRepo()
  const text = textIn(root)
  const held = (text(HELD_PAGE) ?? "").replace(
    `"slug": "${HELD_SLUG}",`,
    `"slug": "${HELD_SLUG}",\n  "pluralSlug": "helds",`
  )
  const world = worldIn(root, (path) => (path === HELD_PAGE ? held : text(path)))
  const said = await renameSlug(world, { at: HELD_PAGE, to: KEPT, plural: "kepts" })
  expect(said.refused).toBe(null)
  expect(said.edits.find((one) => one.path === HELD_PAGE)?.body ?? "").toContain(
    `"pluralSlug": "kepts"`
  )
  expect(said.edits.find((one) => one.path === HELD_PAGE)?.body ?? "").toContain(
    `"slug": "${KEPT}"`
  )
})

test("the plural and the export rename are reached at their own addresses", async () => {
  const reached: string[] = []
  const root = indexedRepo()
  const text = textIn(root)
  const held = (text(HELD_PAGE) ?? "").replace(
    `"slug": "${HELD_SLUG}",`,
    `"slug": "${HELD_SLUG}",\n  "pluralSlug": "helds",`
  )
  const world = worldAt(
    root,
    (path) => (path === HELD_PAGE ? held : text(path)),
    (_world, at) => {
      reached.push(at)
      return Promise.resolve({ edits: [], refused: null })
    }
  )

  await renameSlug(world, { at: HELD_PAGE, to: KEPT, plural: "kepts" })

  expect(reached).toEqual([
    "change-mechanical-file-content/change-page-property",
    "change-mechanical-code/rename-export",
  ])
})
