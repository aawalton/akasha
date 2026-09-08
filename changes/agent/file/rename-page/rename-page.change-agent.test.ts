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
import { runChange as moveFile } from "../../../mechanical/file/move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as moveFileCode } from "../../../mechanical/file/rename/move-file-code/move-file-code.change-mechanical-file.code.ts"
import { runChange as changePageProperty } from "../../../mechanical/file-content/change/change-page-property/change-page-property.change-mechanical-file-content.code.ts"
import { runChange as changeImports } from "../../../mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { runChange as renameExport } from "../../../mechanical/file-content/rename/rename-export/rename-export.change-mechanical-file-content.code.ts"
import { runChange as renamePageSlug } from "../../../mechanical/file-content/rename/rename-page-slug/rename-page-slug.change-mechanical-file-content.code.ts"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  bodiesIn,
  ledgerAt,
  type Reaching,
  type World,
  worldAt,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { renamePage } from "./rename-page.change-agent.code.ts"

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

const TYPED_SLUG = "typed-one"

const TYPED_PAGE = "akasha/five/typed-one.module.ts"

const TYPED_LANDS = "akasha/five/carried.module.ts"

const PLAIN_PAGE = "akasha/seven/plain-one.module.ts"

const PLAIN_LANDS = "akasha/seven/carried.module.ts"

const READER_PAGE = "akasha/six/reader.module.ts"

const READER_CODE = "akasha/six/reader.module.code.ts"

const TYPED_VALUE = { id: idOf("d"), pageTypeSlug: "module", slug: TYPED_SLUG }

const PLAIN_VALUE = { id: idOf("f"), pageTypeSlug: "module", slug: "plain-one" }

const READER_VALUE = { id: idOf("e"), pageTypeSlug: "module", slug: "reader", code: "ts" }

function readerBody(named: string, at: string): string {
  return `import type { ${named} } from "${at}"\n\nexport const reader: ${named} = "one"\n`
}

function typedRepo(): string {
  return indexedRepo({
    [TYPED_PAGE]: `export type TypedOne = string\n\n${pageOf(TYPED_VALUE)}`,
    [PLAIN_PAGE]: `export type Kept = string\n\n${pageOf(PLAIN_VALUE)}`,
    [READER_PAGE]: pageOf(READER_VALUE),
    [READER_CODE]: readerBody("TypedOne", `../five/${TYPED_SLUG}.module.ts`),
  })
}

const saying =
  (body: string) =>
  (path: string): string | null =>
    path === HELD_PAGE ? body : null

const statedAs = (value: Record<string, unknown>, named: string): string =>
  bodyOf(value).replace("export const it", `export const ${named}`)

const RUNS: Reaching = async (world, at, given) => {
  if (at === "change-mechanical-file-content/rename-page-slug") {
    return await renamePageSlug(world, given as Parameters<typeof renamePageSlug>[1])
  }
  if (at === "change-mechanical-file/move-file") {
    return moveFile(world, given as Parameters<typeof moveFile>[1])
  }
  if (at === "change-mechanical-file/move-file-code") {
    return await moveFileCode(world, given as Parameters<typeof moveFileCode>[1])
  }
  if (at === "change-mechanical-file-content/change-page-property") {
    return changePageProperty(world, given as Parameters<typeof changePageProperty>[1])
  }
  if (at === "change-mechanical-file-content/rename-export") {
    return renameExport(world, given as Parameters<typeof renameExport>[1])
  }
  if (at === "change-mechanical-file-content/change-imports") {
    return changeImports(world, given as Parameters<typeof changeImports>[1])
  }
  return refusing(`\`${at}\` is reached by nothing here`)
}

function worldIn(root: string, textOf: (path: string) => string | null): World {
  return worldAt(root, textOf, RUNS)
}

function movesOf(said: Answer): readonly (readonly [string, string])[] {
  const found: (readonly [string, string])[] = []
  for (const one of said.edits) {
    if (one.kind === "move") found.push([one.pathFrom, one.pathTo])
  }
  return found
}

test("a body that could not be read is refused", async () => {
  const said = await renamePage(
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
  const world = worldIn(scratch.rootFor("slug-"), saying(body))
  const said = await renamePage(world, { at: HELD_PAGE, to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/one/held.module.ts` states no `slug`")
})

test("a body stating no page type is refused", async () => {
  const body = bodyOf({ id: idOf("8"), slug: HELD_SLUG })
  const world = worldIn(scratch.rootFor("slug-"), saying(body))
  const said = await renamePage(world, { at: HELD_PAGE, to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/one/held.module.ts` states no `pageTypeSlug`")
})

test("a page type is refused, its slug being renamed by another act", async () => {
  const body = bodyOf({ id: idOf("8"), pageTypeSlug: "page-type", slug: HELD_SLUG })
  const world = worldIn(scratch.rootFor("slug-"), saying(body))
  const said = await renamePage(world, { at: HELD_PAGE, to: CARRIED })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`akasha/one/held.module.ts` names a page type, whose slug is renamed by another act"
  )
})

test("a refusal from the slug rename is answered as this change's own", async () => {
  const root = indexedRepo()
  const said = await renamePage(worldIn(root, textIn(root)), { at: HELD_PAGE, to: "namer" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("a `module` carries the slug `namer` already")
})

test("a page whose slug is more than one word has its camel export renamed too", async () => {
  const value = { id: idOf("f"), pageTypeSlug: "module", slug: OTHER_SLUG, code: "ts" }
  const root = indexedRepo({
    [OTHER_PAGE]: statedAs(value, "otherOne"),
    [OTHER_CODE]: "export const kept = 2\n",
  })
  const said = await renamePage(worldIn(root, textIn(root)), { at: OTHER_PAGE, to: CARRIED })
  const body = bodiesIn(said, textIn(root)).get(CARRIED_PAGE) ?? ""
  expect(said.refused).toBe(null)
  expect(body).toContain(`export const ${CARRIED} =`)
  expect(body).not.toContain("export const otherOne")
})

test("the slug rename and each carry are reached at their own addresses", async () => {
  const reached: string[] = []
  const root = indexedRepo()
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await renamePage(world, { at: HELD_PAGE, to: CARRIED })

  expect(reached[reached.length - 1]).toBe("change-mechanical-file-content/rename-page-slug")
  expect(new Set(reached.slice(0, -1))).toEqual(new Set(["change-mechanical-file/move-file-code"]))
})

test("a page's slug is renamed in its data, and its files are carried with it", async () => {
  const root = indexedRepo()
  const was = textIn(root)
  const page = was(HELD_PAGE) ?? ""
  const namer = was(NAMER_PAGE) ?? ""
  const namerCode = was(NAMER_CODE) ?? ""
  const heldCode = was(HELD_CODE) ?? ""
  const said = await renamePage(worldIn(root, was), { at: HELD_PAGE, to: CARRIED })
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

test("a body a move carries states the body on disk before the change", async () => {
  const root = indexedRepo()
  const was = textIn(root)
  const said = await renamePage(worldIn(root, was), { at: HELD_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(bodiesIn(said, was).get(CARRIED_CODE)).toBe(was(HELD_CODE))
})

test("a beside file whose key is more than one word is carried too", async () => {
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
  const said = await renamePage(worldIn(root, textIn(root)), { at: WIDE_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [WIDE_PAGE, CARRIED_PAGE],
    ["akasha/four/wide.module.code.ts", CARRIED_CODE],
    ["akasha/four/wide.module.test-fixtures.ts", "akasha/carried/carried.module.test-fixtures.ts"],
  ])
})

test("a page sharing its folder is renamed in the folder that page sits in", async () => {
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
  const said = await renamePage(worldIn(root, textIn(root)), { at: OTHER_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [OTHER_PAGE, "akasha/three/carried.module.ts"],
    [OTHER_CODE, "akasha/three/carried.module.code.ts"],
  ])
})

test("a page carrying the slug asked for is carried into the folder that slug names", async () => {
  const value = { id: idOf("f"), pageTypeSlug: "module", slug: OTHER_SLUG, code: "ts" }
  const root = indexedRepo({
    [OTHER_PAGE]: statedAs(value, "otherOne"),
    [OTHER_CODE]: "export const kept = 2\n",
  })
  const said = await renamePage(worldIn(root, textIn(root)), { at: OTHER_PAGE, to: OTHER_SLUG })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [OTHER_PAGE, `akasha/${OTHER_SLUG}/${OTHER_SLUG}.module.ts`],
    [OTHER_CODE, `akasha/${OTHER_SLUG}/${OTHER_SLUG}.module.code.ts`],
  ])
})

test("a page carrying the slug asked for, in the folder that slug names, is refused", async () => {
  const root = indexedRepo({
    [SEATED_PAGE]: pageOf({
      id: idOf("e"),
      pageTypeSlug: "module",
      slug: SEATED_SLUG,
      code: "ts",
    }),
    [SEATED_CODE]: "export const kept = 5\n",
  })
  const said = await renamePage(worldIn(root, textIn(root)), { at: SEATED_PAGE, to: SEATED_SLUG })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${SEATED_SLUG}\` is the slug this page carries, in the folder that slug names`
  )
})

test("a page exporting a type named from its slug has that type spelled anew", async () => {
  const root = typedRepo()
  const said = await renamePage(worldIn(root, textIn(root)), { at: TYPED_PAGE, to: CARRIED })
  const bodies = bodiesIn(said, textIn(root))
  expect(said.refused).toBe(null)
  expect(bodies.get(TYPED_LANDS) ?? "").toContain("export type Carried = string")
  expect(bodies.get(READER_CODE)).toBe(readerBody("Carried", `../five/${CARRIED}.module.ts`))
})

test("a page exporting no type named from its slug leaves that file's type alone", async () => {
  const root = typedRepo()
  const said = await renamePage(worldIn(root, textIn(root)), { at: PLAIN_PAGE, to: CARRIED })
  const body = bodiesIn(said, textIn(root)).get(PLAIN_LANDS) ?? ""
  expect(said.refused).toBe(null)
  expect(body).toContain("export type Kept = string")
  expect(body).toContain(`export const ${CARRIED} =`)
})

test("the const and the type a page exports are spelled anew in one answer", async () => {
  const root = typedRepo()
  const said = await renamePage(worldIn(root, textIn(root)), { at: TYPED_PAGE, to: CARRIED })
  const body = bodiesIn(said, textIn(root)).get(TYPED_LANDS) ?? ""
  expect(said.refused).toBe(null)
  expect(body).toContain(`export const ${CARRIED} =`)
  expect(body).toContain("export type Carried = string")
  expect(body).not.toContain("TypedOne")
})

test("a page renamed over a ledger is carried once rather than a second time", async () => {
  const root = indexedRepo()
  const was = textIn(root)
  const said = await renamePage(ledgerAt(root, was, RUNS), { at: HELD_PAGE, to: CARRIED })
  expect(said.refused).toBe(null)
  expect(movesOf(said)).toEqual([
    [HELD_PAGE, CARRIED_PAGE],
    [HELD_CODE, CARRIED_CODE],
  ])
  expect(bodiesIn(said, was).get(CARRIED_PAGE) ?? "").toContain(`"slug": "${CARRIED}"`)
})
