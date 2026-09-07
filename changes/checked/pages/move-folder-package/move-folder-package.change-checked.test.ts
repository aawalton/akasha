import { afterAll, expect, test } from "bun:test"
import {
  aType,
  bodyOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { runChange as renamePathChange } from "../../../mechanical/file/rename/rename-path/rename-path.change-mechanical-file.code.ts"
import { runChange as changeImports } from "../../../mechanical/pages/change-imports/change-imports.change-mechanical-code.code.ts"
import { runChange as renameExport } from "../../../mechanical/pages/rename-export/rename-export.change-mechanical-code.code.ts"
import { runChange as renamePageSlug } from "../../../mechanical/pages/rename-page-slug/rename-page-slug.change-mechanical-data.code.ts"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  landingFor,
  moveFolderPackage,
  runChange,
} from "./move-folder-package.change-checked.code.ts"

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
  "change-mechanical-code/change-imports": changeImports,
  "change-mechanical-code/rename-export": renameExport,
  "change-mechanical-data/rename-page-slug": renamePageSlug,
  "change-mechanical-file/rename-path": renamePathChange,
} as const

const RUNS: Reaching = async (_world, at, given) => {
  const run = REACHED[at as keyof typeof REACHED]
  if (run === undefined) return refusing(`\`${at}\` is reached by nothing here`)
  return await run(_world, given as never)
}

function worldIn(): World {
  const root = indexedRepo(HELD)
  return worldAt(root, textIn(root), RUNS)
}

const pathsOf = (edits: readonly { readonly path: string }[]): readonly string[] =>
  edits.map((one) => one.path)

test("a path beneath the folder lands beneath the folder that path moved to", () => {
  expect(landingFor(PACKAGE_PAGE, FROM, INTO)).toBe(`${INTO}/code-system.workspace-package.ts`)
})

test("every file beneath the package folder is carried", async () => {
  const said = await moveFolderPackage(worldIn(), { at: PACKAGE_PAGE, to: INTO })

  expect(said.refused).toBeNull()
  expect(pathsOf(said.edits)).toContain(`${INTO}/modules/holder/holder.module.ts`)
  expect(pathsOf(said.edits)).toContain(`${INTO}/modules/holder/holder.module.code.ts`)
})

test("the package takes the slug naming the folder that package landed in", async () => {
  const said = await moveFolderPackage(worldIn(), { at: PACKAGE_PAGE, to: INTO })
  const landed = said.edits.find((one) => one.path === `${INTO}/code.workspace-package.ts`)

  expect(said.refused).toBeNull()
  expect(landed?.body).toContain('"slug": "code"')
  expect(landed?.body).toContain("export const code = {")
})

test("no body is left at the path the package page carried", async () => {
  const said = await moveFolderPackage(worldIn(), { at: PACKAGE_PAGE, to: INTO })
  const landed = said.edits.find((one) => one.path === `${INTO}/code.workspace-package.ts`)

  expect(said.refused).toBeNull()
  expect(landed?.from).toBe(PACKAGE_PAGE)
  expect(pathsOf(said.edits)).not.toContain(`${INTO}/code-system.workspace-package.ts`)
})

test("a body outside reaching in by a relative address is repointed", async () => {
  const said = await moveFolderPackage(worldIn(), { at: PACKAGE_PAGE, to: INTO })
  const outer = said.edits.find((one) => one.path === OUTER_CODE)

  expect(said.refused).toBeNull()
  expect(outer?.body).toContain("../code/modules/holder/holder.module.code.ts")
})

test("a page that is no workspace package is refused", async () => {
  const said = await moveFolderPackage(worldIn(), { at: HELD_PAGE, to: INTO })

  expect(said.refused).toContain("workspace-package")
  expect(said.edits).toHaveLength(0)
})

test("a path naming no page is refused", async () => {
  const said = await moveFolderPackage(worldIn(), { at: `${FROM}/readme`, to: INTO })

  expect(said.refused).toContain("workspace-package")
})

test("a folder landing under the name that folder carries leaves the slug alone", async () => {
  const said = await moveFolderPackage(worldIn(), {
    at: PACKAGE_PAGE,
    to: "akasha/deep/code-system",
  })
  const landed = pathsOf(said.edits)

  expect(said.refused).toBeNull()
  expect(landed).toContain("akasha/deep/code-system/code-system.workspace-package.ts")
})

test("a call naming no folder to land in is refused", async () => {
  const said = await runChange(worldIn(), { at: PACKAGE_PAGE })

  expect(said.refused).toContain("to")
})

test("a call naming no page is refused", async () => {
  const said = await runChange(worldIn(), { to: INTO })

  expect(said.refused).toContain("at")
})

test("a call naming both lands the same edits the change lands", async () => {
  const said = await runChange(worldIn(), { at: PACKAGE_PAGE, to: INTO })

  expect(said.refused).toBeNull()
  expect(pathsOf(said.edits)).toContain(`${INTO}/code.workspace-package.ts`)
})
