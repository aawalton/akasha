import { afterAll, expect, test } from "bun:test"
import { runChange } from "akasha/change/agent/file/move-pages-under/move-pages-under.change-agent.code.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { MOVING } from "akasha/change/mechanical/file/move/move-file-of-any-kind/move-file-of-any-kind.change-mechanical.test-fixtures.ts"
import { moveFilePage } from "akasha/change/mechanical/file/move/move-file-page/move-file-page.change-mechanical-file.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type World,
  worldAt,
  worldOver,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  indexedRepo,
  NAMER_PAGE,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const GIVEN: Readonly<Record<string, string>> = {
  "page-type": "module",
  by: "part-slugs",
  under: "parts",
}

const HELD_AT = "module/held"

const BORNE_PAGE = "akasha/one/borne.module.ts"

const BORNE_CODE = "akasha/one/borne.module.code.ts"

const BORNE_TEXT = "akasha/one/borne.module.test.md"

const BORNE_LANDS = "akasha/one/parts/borne.module.ts"

const BORNE_TEXT_LANDS = "akasha/one/parts/borne.module.test.md"

const NAMER_LANDS = "akasha/one/parts/namer.module.ts"

const NAMER_CODE_LANDS = "akasha/one/parts/namer.module.code.ts"

const BORNE_FILES = [BORNE_CODE, BORNE_PAGE, BORNE_TEXT].sort()

const ASTRAY_PAGE = "akasha/one/astray.module.ts"

const BESIDE: Readonly<Record<string, string>> = {
  [BORNE_PAGE]: pageOf({
    id: "01a04a4a-0000-7000-8000-00000000000f",
    pageTypeSlug: "module",
    slug: "borne",
    definition: "a page an indexed repository carries beside prose",
    code: "ts",
    test: "md",
    partSlugs: [HELD_AT],
  }),
  [BORNE_CODE]: "export const carried = 2\n",
  [BORNE_TEXT]: "borne\n",
}

const ASTRAY: Readonly<Record<string, string>> = {
  [ASTRAY_PAGE]: pageOf({
    id: "01a04a4a-0000-7000-8000-00000000001a",
    pageTypeSlug: "module",
    slug: "astray",
    definition: "a page naming a page no page answers",
    partSlugs: ["module/nobody"],
  }),
}

const TWOFOLD: Readonly<Record<string, string>> = {
  "akasha/one/twofold.module.ts": pageOf({
    id: "01a04a4a-0000-7000-8000-00000000001b",
    pageTypeSlug: "module",
    slug: "twofold",
    definition: "a page naming two pages where one page is carried under one",
    partSlugs: [HELD_AT, "module/namer"],
  }),
}

function repo(): string {
  return indexedRepo(BESIDE)
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root), MOVING)
}

test("every page naming a page is carried under the page that page names", async () => {
  const said = await runChange(worldIn(repo()), GIVEN)
  const landed = said.edits.flatMap((one) => (one.kind === "move" ? [one.pathTo] : []))

  expect(said.refused).toBeNull()
  expect(landed).toContain(BORNE_LANDS)
  expect(landed).toContain(NAMER_LANDS)
})

test("a file beside a page that is not code is carried with that page", async () => {
  const said = await runChange(worldIn(repo()), GIVEN)

  expect(pathsIn(said)).toContain(BORNE_TEXT_LANDS)
})

test("a body naming a path that moved is repointed in the same answer", async () => {
  const world = worldIn(repo())
  const said = await runChange(world, GIVEN)

  expect(bodiesIn(said, world.base).get(NAMER_CODE_LANDS) ?? "").toContain("../held.module.code.ts")
})

test("each carry is left to the change reached at its address", async () => {
  const reached: string[] = []
  const root = repo()
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await runChange(world, GIVEN)

  const moving = `${changeMechanicalFile.slug}/${moveFilePage.slug}`

  expect(reached).toEqual([moving, moving])
})

test("a count handed in holds how many pages one call carries", async () => {
  const said = await runChange(worldIn(repo()), { ...GIVEN, "at-most": "1" })
  const came = said.edits.flatMap((one) => (one.kind === "move" ? [one.pathFrom] : []))

  expect([...came].sort()).toEqual(BORNE_FILES)
})

test("a page already sitting where that page lands is read over", async () => {
  const world = worldIn(repo())
  const first = await runChange(world, { ...GIVEN, "at-most": "1" })
  const next = await runChange(worldOver(world, first), { ...GIVEN, "at-most": "1" })
  const came = next.edits.flatMap((one) => (one.kind === "move" ? [one.pathFrom] : []))

  expect(next.refused).toBeNull()
  expect(came).toContain(NAMER_PAGE)
})

test("a call carrying no page at all is refused, saying both counts", async () => {
  const world = worldIn(repo())
  const first = await runChange(world, GIVEN)
  const next = await runChange(worldOver(world, first), GIVEN)

  expect(next.edits).toEqual([])
  expect(next.refused ?? "").toContain("carried 0, passed over ")
})

test("a page stating nothing at the property is passed over and counted", async () => {
  const said = await runChange(worldIn(repo()), { ...GIVEN, by: "part-slug" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/carried 0, passed over [1-9]/)
})

test("a value that is no page type and slug parted by a slash is refused", async () => {
  const said = await runChange(worldIn(repo()), { ...GIVEN, by: "note" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("parted by a slash")
})

test("a value no page answers is refused, naming the page that states it", async () => {
  const said = await runChange(worldIn(indexedRepo({ ...BESIDE, ...ASTRAY })), GIVEN)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("reaches no page")
  expect(said.refused ?? "").toContain(ASTRAY_PAGE)
})

test("a value naming more than one page is refused", async () => {
  const said = await runChange(worldIn(indexedRepo({ ...BESIDE, ...TWOFOLD })), GIVEN)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names more than one page")
})

test("a page the tree holds no body at is refused", async () => {
  const root = repo()
  const read = textIn(root)
  const world = worldAt(root, read, MOVING, (path) => (path === BORNE_PAGE ? null : read(path)))
  const said = await runChange(world, GIVEN)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("holds no body")
})

test("a page type named here that is no page type is refused", async () => {
  const said = await runChange(worldIn(repo()), { ...GIVEN, "page-type": "modules" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page type")
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const said = await runChange(worldIn(repo()), {})

  expect(said.refused ?? "").toContain("`page-type`")
})

test("a count that is no whole number above nothing is refused", async () => {
  const said = await runChange(worldIn(repo()), { ...GIVEN, "at-most": "0" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("no count of pages")
})
