import { afterAll, expect, test } from "bun:test"
import { bodyOf, indexedRepo, pageOf, scratch, textIn } from "@akasha/indexes/indexing/testing"
import {
  NOTHING_OVER,
  type World,
  worldAt,
} from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange } from "./remove-folder-package.change-mechanical-folder.code.ts"

afterAll(scratch.sweep)

const HELD = "@probe/held"

const PACKAGE_PAGE = "akasha/held/held.workspace-package.ts"

const FOLDER = "akasha/held"

const ROOT_MANIFEST = "akasha/root/package.json"

const INNER_MANIFEST = "akasha/held/inner/package.json"

const PAGE = "akasha/held/holder/holder.module.ts"

const PLAIN = "akasha/held/readme"

const REMOVE_FOLDER = "change-mechanical-folder/remove-folder"

const idAt = (one: string): string => `01a0824a-0004-7000-8000-00000000000${one}`

const SPEAKING: Readonly<Record<string, string>> = {
  "akasha/text-property.page-type.ts": bodyOf({
    id: idAt("0"),
    pageTypeSlug: "page-type",
    slug: "text-property",
    extendsSlug: ["page-type/page-property"],
  }),
  "akasha/file-name.text-property.ts": bodyOf({
    id: idAt("1"),
    pageTypeSlug: "text-property",
    slug: "file-name",
    propertySlug: "file-name",
  }),
  "akasha/file-property.page-type.ts": bodyOf({
    id: idAt("2"),
    pageTypeSlug: "page-type",
    slug: "file-property",
    extendsSlug: ["page-type/page-property"],
    properties: [{ pagePropertySlug: "text-property/file-name", required: false, many: false }],
  }),
  "akasha/manifest.file-property.ts": bodyOf({
    id: idAt("3"),
    pageTypeSlug: "file-property",
    slug: "manifest",
    propertySlug: "manifest",
    fileName: "package.json",
  }),
  "akasha/workspace-package.page-type.ts": bodyOf({
    id: idAt("4"),
    pageTypeSlug: "page-type",
    slug: "workspace-package",
    extendsSlug: ["page-type/domain"],
    properties: [{ pagePropertySlug: "file-property/manifest", required: true, many: false }],
  }),
}

const HELD_BODY = `{
  "name": "${HELD}"
}
`

function manifestOf(named: string, depending: Readonly<Record<string, unknown>>): string {
  return `${JSON.stringify({ name: named, ...depending }, null, 2)}\n`
}

const INNER: Readonly<Record<string, string>> = {
  "akasha/held/inner/inner.workspace-package.ts": pageOf({
    id: idAt("7"),
    pageTypeSlug: "workspace-package",
    slug: "inner",
    manifest: "json",
  }),
  [INNER_MANIFEST]: manifestOf("@probe/inner", { dependencies: { [HELD]: "workspace:*" } }),
}

type Taken = { at: string; given: unknown }

function worldOver(
  taken: Taken,
  rootText: string,
  beside: Readonly<Record<string, string>> = {}
): World {
  const repo = indexedRepo({
    ...SPEAKING,
    "akasha/held/held.workspace-package.ts": pageOf({
      id: idAt("5"),
      pageTypeSlug: "workspace-package",
      slug: "held",
      manifest: "json",
    }),
    "akasha/held/package.json": HELD_BODY,
    "akasha/root/root.workspace-package.ts": pageOf({
      id: idAt("6"),
      pageTypeSlug: "workspace-package",
      slug: "root",
      manifest: "json",
    }),
    [ROOT_MANIFEST]: manifestOf("@probe/root", {}),
    ...beside,
  })
  const held: Readonly<Record<string, string>> = { ...beside, [ROOT_MANIFEST]: rootText }
  const text = textIn(repo)
  return worldAt(
    repo,
    (path) => held[path] ?? text(path),
    (_world, at, given) => {
      taken.at = at
      taken.given = given
      return Promise.resolve(NOTHING_OVER)
    }
  )
}

function refusalFor(at: string): string {
  return `\`${at}\` names no \`workspace-package\`, so no folder is taken away`
}

test("the package's folder is taken away by the change this change reaches", async () => {
  const taken: Taken = { at: "", given: null }

  const said = await runChange(worldOver(taken, manifestOf("@probe/root", {})), {
    at: PACKAGE_PAGE,
  })

  expect(said.refused).toBe(null)
  expect(taken.at).toBe(REMOVE_FOLDER)
  expect(taken.given).toEqual({ at: FOLDER })
})

test("a manifest naming the package among what it depends on refuses the removal", async () => {
  const world = worldOver(
    { at: "", given: null },
    manifestOf("@probe/root", { dependencies: { [HELD]: "workspace:*" } })
  )

  const said = await runChange(world, { at: PACKAGE_PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${ROOT_MANIFEST}\` depends on \`${HELD}\`, so no folder is taken away`
  )
})

test("a name under any kind of dependency block refuses the removal", async () => {
  const world = worldOver(
    { at: "", given: null },
    manifestOf("@probe/root", { devDependencies: { [HELD]: "workspace:*" } })
  )

  const said = await runChange(world, { at: PACKAGE_PAGE })

  expect(said.refused).toBe(
    `\`${ROOT_MANIFEST}\` depends on \`${HELD}\`, so no folder is taken away`
  )
})

test("a manifest depending on another name lets the folder go", async () => {
  const taken: Taken = { at: "", given: null }
  const rootText = manifestOf("@probe/root", { dependencies: { "@probe/other": "workspace:*" } })

  const said = await runChange(worldOver(taken, rootText), { at: PACKAGE_PAGE })

  expect(said.refused).toBe(null)
  expect(taken.at).toBe(REMOVE_FOLDER)
})

test("a manifest under the folder going away is no reason for that folder to stay", async () => {
  const taken: Taken = { at: "", given: null }

  const said = await runChange(worldOver(taken, manifestOf("@probe/root", {}), INNER), {
    at: PACKAGE_PAGE,
  })

  expect(said.refused).toBe(null)
  expect(taken.at).toBe(REMOVE_FOLDER)
})

test("a page that is no workspace package is refused", async () => {
  const world = worldOver({ at: "", given: null }, manifestOf("@probe/root", {}))

  const said = await runChange(world, { at: PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PAGE))
})

test("a path naming no page is refused", async () => {
  const world = worldOver({ at: "", given: null }, manifestOf("@probe/root", {}))

  const said = await runChange(world, { at: PLAIN })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PLAIN))
})
