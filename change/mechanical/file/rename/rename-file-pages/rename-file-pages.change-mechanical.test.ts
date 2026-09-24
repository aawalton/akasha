import { afterAll, expect, test } from "bun:test"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { renameFilePage } from "akasha/change/mechanical/file/rename/rename-file-page/rename-file-page.change-mechanical.ts"
import {
  addressesIn,
  runChange,
} from "akasha/change/mechanical/file/rename/rename-file-pages/rename-file-pages.change-mechanical.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import {
  idOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

const PAGE_AT = `${pageType.slug}/${page.slug}` as const

const KEPT_AT = `${pageType.slug}/kept` as const

const MODULE_AT = `${pageType.slug}/${module.slug}` as const

const KEPT_TYPE = "akasha/kept.page-type.ts"

const ONE_PAGE = "akasha/kept/one.kept.ts"

const TWO_PAGE = "akasha/kept/two.kept.ts"

const ONE_LANDS = "akasha/kept/first.kept.ts"

const TWO_LANDS = "akasha/kept/second.kept.ts"

const SPELLER_PAGE = "akasha/speller.module.ts"

const SPELLER_CODE = "akasha/speller.module.code.ts"

const LEFTOVER = "akasha/left.module.code.ts"

const RENAME_FILE_PAGE = `${changeMechanical.slug}/${renameFilePage.slug}` as const

const TYPE_BODY = `export type Kept = { readonly id: string }

${pageOf({
  id: idOf("d"),
  type: `${pageType.slug}/${pageType.slug}`,
  slug: "kept",
  pluralSlug: "kepts",
  extends: [PAGE_AT],
})}`

function repoIn(): string {
  return indexedRepo({
    [KEPT_TYPE]: TYPE_BODY,
    [ONE_PAGE]: pageOf({ id: idOf("e"), type: KEPT_AT, slug: "one" }),
    [TWO_PAGE]: pageOf({ id: idOf("f"), type: KEPT_AT, slug: "two" }),
    [SPELLER_PAGE]: pageOf({
      id: idOf("c"),
      type: MODULE_AT,
      slug: "speller",
      code: "ts",
    }),
    [SPELLER_CODE]: `export const at = ["kept/one", "kept/two"]\n`,
    [LEFTOVER]: `export const named = ["one", "two"]\n`,
  })
}

function worldIn(root: string, reaching: Reaching = running): World {
  return worldAt(root, textIn(root), reaching)
}

type Traced = { readonly at: string; readonly given: unknown }

function tracing(): { readonly runs: Reaching; readonly reached: readonly Traced[] } {
  const reached: Traced[] = []
  return {
    runs: async (world, at, given) => {
      reached.push({ at, given })
      return await running(world, at, given)
    },
    reached,
  }
}

const TYPED_PAGE = "akasha/kept/typed.kept.ts"

const TYPER_PAGE = "akasha/typer.module.ts"

const TYPER_CODE = "akasha/typer.module.code.ts"

const KEPT_ROOT = repoIn()

const TYPED_ROOT = indexedRepo({
  [KEPT_TYPE]: TYPE_BODY,
  [TYPED_PAGE]: pageOf({ id: idOf("g"), type: KEPT_AT, slug: "typed" }),
  [TYPER_PAGE]: pageOf({
    id: idOf("h"),
    type: MODULE_AT,
    slug: "typer",
    code: "ts",
  }),
  [TYPER_CODE]: `export const at = ["kept/typed"]\n`,
})

const ASKED = { moved: { [ONE_PAGE]: "first", [TWO_PAGE]: "second" } }

test("every page handed in is renamed and every address it carried is restated", async () => {
  const root = KEPT_ROOT
  const said = await runChange(worldIn(root), ASKED)
  const paths = pathsIn(said)

  expect(said.refused).toBe(null)
  expect(paths).toContain(ONE_LANDS)
  expect(paths).toContain(TWO_LANDS)
  expect(bodiesIn(said, textIn(root)).get(SPELLER_CODE) ?? "").toBe(
    `export const at = ["kept/first", "kept/second"]\n`
  )
})

test("the addresses are restated by the module before any page's rename is reached", async () => {
  const traced = tracing()
  const said = await runChange(worldIn(KEPT_ROOT, traced.runs), ASKED)
  const renaming = traced.reached.filter((one) => one.at === RENAME_FILE_PAGE)

  expect(said.refused).toBe(null)
  expect(traced.reached[0]?.at).toBe(RENAME_FILE_PAGE)
  expect(traced.reached.some((one) => one.at.endsWith("/rename-page-addresses"))).toBe(false)
  expect(traced.reached.some((one) => one.at.endsWith("/rename-page-address"))).toBe(false)
  expect(renaming.length).toBe(2)
})

test("each page's rename is told the addresses and the old spellings are answered already", async () => {
  const traced = tracing()
  await runChange(worldIn(KEPT_ROOT, traced.runs), ASKED)
  const renaming = traced.reached.filter((one) => one.at === RENAME_FILE_PAGE)

  expect(renaming.map((one) => one.given)).toEqual([
    { at: ONE_PAGE, to: "first", addressesRestated: true, spellingsNamed: true },
    { at: TWO_PAGE, to: "second", addressesRestated: true, spellingsNamed: true },
  ])
})

test("every old spelling a body still holds is named over one search", async () => {
  const traced = tracing()
  const said = await runChange(worldIn(KEPT_ROOT, traced.runs), ASKED)
  const told = (said.told ?? []).join("\n")

  expect(told).toContain("`one` is still written in")
  expect(told).toContain("`two` is still written in")
  expect(told.split(LEFTOVER).length - 1).toBe(2)
})

test("a page whose body cannot be read refuses the whole answer", async () => {
  const traced = tracing()
  const said = await runChange(worldIn(KEPT_ROOT, traced.runs), {
    moved: { [ONE_PAGE]: "first", "akasha/kept/three.kept.ts": "third" },
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`akasha/kept/three.kept.ts` could not be read, so no page is renamed")
  expect(traced.reached).toEqual([])
})

test("a call handing in no page is refused", async () => {
  const traced = tracing()
  const said = await runChange(worldIn(KEPT_ROOT, traced.runs), { moved: {} })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("no page was handed in, so no page is renamed")
  expect(traced.reached).toEqual([])
})

test("a page handed in under the slug that page carries has no address restated", () => {
  const found = addressesIn(worldIn(KEPT_ROOT).index.knownIn(), [
    { at: ONE_PAGE, slug: "one", to: "one", pageTypeSlug: "kept", said: new Map() },
    { at: TWO_PAGE, slug: "two", to: "second", pageTypeSlug: "kept", said: new Map() },
  ])

  expect(found).toEqual({ "kept/two": "kept/second" })
})

test("a page stating its page type as an address has that address restated", async () => {
  const said = await runChange(worldIn(TYPED_ROOT), { moved: { [TYPED_PAGE]: "third" } })

  expect(said.refused).toBe(null)
  expect(bodiesIn(said, textIn(TYPED_ROOT)).get(TYPER_CODE) ?? "").toBe(
    `export const at = ["kept/third"]\n`
  )
})
