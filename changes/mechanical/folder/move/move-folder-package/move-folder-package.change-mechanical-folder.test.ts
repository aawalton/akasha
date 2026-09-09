import { afterAll, expect, test } from "bun:test"
import {
  aType,
  bodyOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { pathsIn, refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
  worldAt,
} from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange as moveFile } from "../../../file/move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as moveFileCode } from "../../../file/move/move-file-code/move-file-code.change-mechanical.code.ts"
import { runChange as renameFilePage } from "../../../file/rename/rename-file-page/rename-file-page.change-mechanical.code.ts"
import { runChange as changeImports } from "../../../file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { runChange as renameExport } from "../../../file-content/rename/rename-export/rename-export.change-mechanical-file-content.code.ts"
import { runChange as renamePageAddress } from "../../../file-content/rename/rename-page-address/rename-page-address.change-mechanical-file-content.code.ts"
import { runChange as renamePageSlug } from "../../../file-content/rename/rename-page-slug/rename-page-slug.change-mechanical-file-content.code.ts"
import { runChange as moveFolderChange } from "../move-folder/move-folder.change-mechanical-folder.code.ts"
import {
  landingFor,
  runChange,
  slugNaming,
} from "./move-folder-package.change-mechanical-folder.code.ts"

afterAll(scratch.sweep)

const FROM = "akasha/code-system"

const INTO = "akasha/code"

const PACKAGE_PAGE = `${FROM}/code-system.workspace-package.ts`

const HELD_PAGE = `${FROM}/modules/holder/holder.module.ts`

const HELD_CODE = `${FROM}/modules/holder/holder.module.code.ts`

const OUTER_CODE = "akasha/other/outer.module.code.ts"

const PACKAGE_ID = "01a07c60-0003-7000-8000-000000000001"

const HOLDER_ID = "01a07c60-0003-7000-8000-000000000002"

const OUTER_ID = "01a07c60-0003-7000-8000-000000000003"

const [PACKAGE_TYPE_AT, PACKAGE_TYPE] = aType(
  "01a07c60-0003-7000-8000-000000000009",
  "workspace-package",
  ["page-type/domain"]
)

const HELD: Readonly<Record<string, string>> = {
  [`akasha/${PACKAGE_TYPE_AT}`]: bodyOf(PACKAGE_TYPE),
  [PACKAGE_PAGE]: pageOf({
    id: PACKAGE_ID,
    pageTypeSlug: "workspace-package",
    slug: "code-system",
    definition: "a package whose folder is carried",
  }),
  [HELD_PAGE]: pageOf({
    id: HOLDER_ID,
    pageTypeSlug: "module",
    slug: "holder",
    definition: "a page the carried folder holds",
    code: "ts",
  }),
  [HELD_CODE]: "export const holder = 1\n",
  "akasha/other/outer.module.ts": pageOf({
    id: OUTER_ID,
    pageTypeSlug: "module",
    slug: "outer",
    definition: "a page reaching into the carried folder",
    code: "ts",
  }),
  [OUTER_CODE]:
    'import { holder } from "../code-system/modules/holder/holder.module.code.ts"\n\nexport const outer = holder + 1\n',
}

const REACHED = {
  "change-mechanical/rename-file-page": renameFilePage,
  "change-mechanical-folder/move-folder": moveFolderChange,
  "change-mechanical-file-content/change-imports": changeImports,
  "change-mechanical-file-content/rename-export": renameExport,
  "change-mechanical-file-content/rename-page-address": renamePageAddress,
  "change-mechanical-file-content/rename-page-slug": renamePageSlug,
  "change-mechanical-file/move-file": moveFile,
  "change-mechanical/move-file-code": moveFileCode,
} as const

const RUNS: Reaching = async (world, at, given) => {
  const run = REACHED[at as keyof typeof REACHED]
  if (run === undefined) return refusing(`\`${at}\` is reached by nothing here`)
  return await run(world, given as never)
}

function worldIn(): World {
  const root = indexedRepo(HELD)
  return worldAt(root, textIn(root), RUNS)
}

const PLURAL_INTO = "akasha/carriers"

const TYPED: Readonly<Record<string, string>> = {
  ...HELD,
  [`${FROM}/carried.page-type.ts`]: pageOf({
    id: "01a07c60-0003-7000-8000-000000000004",
    pageTypeSlug: "page-type",
    slug: "carried",
    definition: "a type the folder is named for",
    pluralSlug: "carriers",
    extendsSlug: ["page-type/page"],
  }),
  [`${FROM}/modules/holder/deep.page-type.ts`]: pageOf({
    id: "01a07c60-0003-7000-8000-000000000005",
    pageTypeSlug: "page-type",
    slug: "deep",
    definition: "a type sitting beneath the folder rather than in it",
    pluralSlug: "deeps",
    extendsSlug: ["page-type/page"],
  }),
}

function typedWorld(): World {
  const root = indexedRepo(TYPED)
  return worldAt(root, textIn(root), RUNS)
}

test("a path beneath the folder lands beneath the folder that path moved to", () => {
  expect(landingFor(PACKAGE_PAGE, FROM, INTO)).toBe(`${INTO}/code-system.workspace-package.ts`)
})

test("every file beneath the package folder is carried", async () => {
  const said = await runChange(worldIn(), { at: PACKAGE_PAGE, to: INTO })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(`${INTO}/modules/holder/holder.module.ts`)
  expect(pathsIn(said)).toContain(`${INTO}/modules/holder/holder.module.code.ts`)
})

test("the package takes the slug naming the folder that package landed in", async () => {
  const world = worldIn()
  const said = await runChange(world, { at: PACKAGE_PAGE, to: INTO })
  const landed = bodiesIn(said, world.base).get(`${INTO}/code.workspace-package.ts`) ?? ""

  expect(said.refused).toBeNull()
  expect(landed).toContain('"slug": "code"')
  expect(landed).toContain("export const code = {")
})

test("no body is left at the path the package page carried", async () => {
  const world = worldIn()
  const said = await runChange(world, { at: PACKAGE_PAGE, to: INTO })
  const bodies = bodiesIn(said, world.base)

  expect(said.refused).toBeNull()
  expect(bodies.get(PACKAGE_PAGE)).toBe(null)
  expect(bodies.get(`${INTO}/code-system.workspace-package.ts`)).toBe(null)
  expect(bodies.get(`${INTO}/code.workspace-package.ts`)).not.toBe(null)
})

test("a body outside reaching in by a relative address is repointed", async () => {
  const world = worldIn()
  const said = await runChange(world, { at: PACKAGE_PAGE, to: INTO })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(OUTER_CODE) ?? "").toContain(
    "../code/modules/holder/holder.module.code.ts"
  )
})

test("a page that is no workspace package is refused", async () => {
  const said = await runChange(worldIn(), { at: HELD_PAGE, to: INTO })

  expect(said.refused).toContain("workspace-package")
  expect(said.edits).toHaveLength(0)
})

test("a path naming no page is refused", async () => {
  const said = await runChange(worldIn(), { at: `${FROM}/readme`, to: INTO })

  expect(said.refused).toContain("workspace-package")
})

test("a folder landing under the name that folder carries leaves the slug alone", async () => {
  const said = await runChange(worldIn(), {
    at: PACKAGE_PAGE,
    to: "akasha/deep/code-system",
  })
  const landed = pathsIn(said)

  expect(said.refused).toBeNull()
  expect(landed).toContain("akasha/deep/code-system/code-system.workspace-package.ts")
})

test("a folder named for a page type's plural hands the package that page type's slug", async () => {
  const said = await runChange(typedWorld(), { at: PACKAGE_PAGE, to: PLURAL_INTO })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(`${PLURAL_INTO}/carried.workspace-package.ts`)
})

test("a folder whose name no page type states as a plural hands that name itself", () => {
  expect(slugNaming(typedWorld(), FROM, "widgets")).toBe("widgets")
})

test("a page type beneath the folder rather than in it hands its slug to nothing", () => {
  expect(slugNaming(typedWorld(), FROM, "deeps")).toBe("deeps")
})
