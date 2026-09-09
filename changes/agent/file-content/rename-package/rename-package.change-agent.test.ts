import { afterAll, expect, test } from "bun:test"
import { bodyOf, indexedRepo, pageOf, scratch, textIn } from "@akasha/indexes/indexing/testing"
import type { Said } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  bodiesIn,
  type World,
  worldAt,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { renamePackage, runChange } from "./rename-package.change-agent.code.ts"

afterAll(scratch.sweep)

const INNER = "@akasha/inner"

const HELD = "@akasha/held"

const ABSENT = "@akasha/absent"

const INNER_MANIFEST = "akasha/inner/package.json"

const OUTER_MANIFEST = "akasha/outer/package.json"

const ROOT_MANIFEST = "akasha/root/package.json"

const READER_CODE = "akasha/outer/reader.module.code.ts"

const idAt = (one: string): string => `01a04a4a-0002-7000-8000-00000000000${one}`

const INNER_BODY = `{
  "name": "${INNER}",
  "exports": {
    ".": "./one.ts",
    "./two": "./two.ts"
  }
}
`

const INNER_CARRIED = INNER_BODY.replace(`"${INNER}"`, `"${HELD}"`)

const OUTER_BODY = `{
  "name": "@akasha/outer",
  "exports": {
    ".": "./reader.module.code.ts"
  },
  "dependencies": {
    "${INNER}": "workspace:*"
  }
}
`

const ROOT_BODY = `{
  "name": "@akasha/root",
  "dependencies": {
    "${INNER}": "workspace:${HELD}@*",
    "@akasha/stale": "workspace:${INNER}@*",
    "typescript": "npm:typescript@5.9.3"
  },
  "trustedDependencies": ["${INNER}"]
}
`

const ROOT_WANTED = `{
  "name": "@akasha/root",
  "dependencies": {
    "${INNER}": "workspace:${HELD}@*",
    "@akasha/stale": "workspace:${HELD}@*",
    "typescript": "npm:typescript@5.9.3"
  },
  "trustedDependencies": ["${HELD}"]
}
`

const READER_BODY = `import { one } from "${INNER}"
import { two } from "${INNER}/two"

export const spoken = "${INNER}"

export const reader = one + two + spoken.length
`

const READER_WANTED = `import { one } from "${HELD}"
import { two } from "${HELD}/two"

export const spoken = "${INNER}"

export const reader = one + two + spoken.length
`

const VOCABULARY: Readonly<Record<string, string>> = {
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
  "akasha/name-format.page-type.ts": bodyOf({
    id: idAt("5"),
    pageTypeSlug: "page-type",
    slug: "name-format",
    extendsSlug: ["page-type/module"],
  }),
  "akasha/lower-kebab-case.name-format.ts": pageOf({
    id: idAt("6"),
    pageTypeSlug: "name-format",
    slug: "lower-kebab-case",
    code: "ts",
  }),
  "akasha/lower-kebab-case.name-format.code.ts":
    "export const lowerKebabCase = (name: string): boolean => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)\n",
}

const PACKAGES: Readonly<Record<string, string>> = {
  "akasha/inner/inner.workspace-package.ts": pageOf({
    id: idAt("7"),
    pageTypeSlug: "workspace-package",
    slug: "inner",
    manifest: "json",
  }),
  [INNER_MANIFEST]: INNER_BODY,
  "akasha/inner/one.ts": "export const one = 1\n",
  "akasha/inner/two.ts": "export const two = 2\n",
  "akasha/outer/outer.workspace-package.ts": pageOf({
    id: idAt("8"),
    pageTypeSlug: "workspace-package",
    slug: "outer",
    manifest: "json",
  }),
  [OUTER_MANIFEST]: OUTER_BODY,
  "akasha/outer/reader.module.ts": pageOf({
    id: idAt("9"),
    pageTypeSlug: "module",
    slug: "reader",
    code: "ts",
  }),
  [READER_CODE]: READER_BODY,
  "akasha/root/root.workspace-package.ts": pageOf({
    id: idAt("a"),
    pageTypeSlug: "workspace-package",
    slug: "root",
    manifest: "json",
  }),
  [ROOT_MANIFEST]: ROOT_BODY,
}

const saying =
  (body: string) =>
  (path: string): string | null =>
    path === INNER_MANIFEST ? body : null

function bare(body: string): World {
  return worldAt(scratch.rootFor("package-"), saying(body))
}

function packaged(): World {
  const root = indexedRepo({ ...VOCABULARY, ...PACKAGES })
  return worldAt(root, textIn(root))
}

function carried(): World {
  const root = indexedRepo({ ...VOCABULARY, ...PACKAGES, [INNER_MANIFEST]: INNER_CARRIED })
  return worldAt(root, textIn(root))
}

function renamed(): ReadonlyMap<string, string | null> {
  const world = packaged()
  const said = renamePackage(world, { at: INNER_MANIFEST, to: HELD })
  expect(said.refused).toBe(null)
  return bodiesIn(said, world.base)
}

function resumed(): ReadonlyMap<string, string | null> {
  const world = carried()
  const said = renamePackage(world, { at: INNER_MANIFEST, to: HELD, from: INNER })
  expect(said.refused).toBe(null)
  return bodiesIn(said, world.base)
}

function pathsIn(world: World, said: Said): readonly string[] {
  return [...bodiesIn(said, world.base).keys()].sort()
}

test("a manifest that could not be read is refused", () => {
  const world = worldAt(scratch.rootFor("package-"), () => null)
  const said = renamePackage(world, { at: INNER_MANIFEST, to: HELD })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${INNER_MANIFEST}\` could not be read`)
})

test("a body that is no JSON is refused", () => {
  const said = renamePackage(bare("nothing here\n"), { at: INNER_MANIFEST, to: HELD })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${INNER_MANIFEST}\` reads as no JSON object, so no package is renamed`
  )
})

test("a body reading as a JSON list is refused", () => {
  const said = renamePackage(bare("[1, 2]\n"), { at: INNER_MANIFEST, to: HELD })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${INNER_MANIFEST}\` reads as no JSON object, so no package is renamed`
  )
})

test("a manifest stating no name is refused", () => {
  const said = renamePackage(bare('{ "exports": {} }\n'), { at: INNER_MANIFEST, to: HELD })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${INNER_MANIFEST}\` states no \`name\`, so no package is renamed`)
})

test("the name the package already carries is refused", () => {
  const said = renamePackage(bare(INNER_BODY), { at: INNER_MANIFEST, to: INNER })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${INNER}\` is the name this package carries`)
})

test("a name that is no package name is refused", () => {
  const said = renamePackage(packaged(), { at: INNER_MANIFEST, to: "one/two/three" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "the manifest calls this package `one/two/three`, which is no `package-name`, " +
      "so no package is renamed"
  )
})

test("a scope written in no lower kebab case is refused", () => {
  const said = renamePackage(packaged(), { at: INNER_MANIFEST, to: "@Akasha/held" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "the manifest calls this package `@Akasha/held`, whose `Akasha` is not written in " +
      "`lower-kebab-case`, so no package is renamed"
  )
})

test("the package's own manifest states the new name and keeps its spacing", () => {
  expect(renamed().get(INNER_MANIFEST)).toBe(INNER_CARRIED)
})

test("a manifest naming the package among its dependencies is restated", () => {
  expect(renamed().get(OUTER_MANIFEST)).toBe(OUTER_BODY.replace(`"${INNER}"`, `"${HELD}"`))
})

test("an entry whose value names the package under the new name is left as it is", () => {
  expect(renamed().get(ROOT_MANIFEST)).toContain(`"${INNER}": "workspace:${HELD}@*"`)
})

test("an entry whose value names the package under the old name states the new name", () => {
  expect(renamed().get(ROOT_MANIFEST)).toContain(`"@akasha/stale": "workspace:${HELD}@*"`)
})

test("a manifest carrying an alias is restated whole", () => {
  expect(renamed().get(ROOT_MANIFEST)).toBe(ROOT_WANTED)
})

test("a body reaching the package has each specifier naming it rewritten", () => {
  expect(renamed().get(READER_CODE)).toBe(READER_WANTED)
})

test("only the manifests and the bodies reaching the package are answered", () => {
  const world = packaged()
  const said = renamePackage(world, { at: INNER_MANIFEST, to: HELD })
  expect(said.refused).toBe(null)
  expect(pathsIn(world, said)).toEqual([INNER_MANIFEST, OUTER_MANIFEST, READER_CODE, ROOT_MANIFEST])
})

test("a package no manifest and no body names is answered with its own manifest alone", () => {
  const world = packaged()
  const said = renamePackage(world, { at: OUTER_MANIFEST, to: "@akasha/wider" })
  expect(said.refused).toBe(null)
  expect(pathsIn(world, said)).toEqual([OUTER_MANIFEST])
})

test("every body the rename touches is stated as a replace", () => {
  const said = renamePackage(packaged(), { at: INNER_MANIFEST, to: HELD })

  expect(new Set(said.edits.map((one) => one.kind))).toEqual(new Set(["replace"]))
})

test("each passage sits in the body it was worked out from and is not that body", () => {
  const world = packaged()
  const said = renamePackage(world, { at: INNER_MANIFEST, to: HELD })
  const replacing = said.edits.flatMap((one) => (one.kind === "replace" ? [one] : []))
  expect(said.refused).toBe(null)
  expect(replacing.length).toBe(said.edits.length)
  for (const one of replacing) {
    const body = world.textOf(one.path) ?? ""
    expect(body).toContain(one.contentFrom)
    expect(one.contentFrom.length).toBeLessThan(body.length)
  }
})

test("a call handing over no path is refused by the key naming it", () => {
  const said = runChange(packaged(), { to: HELD })
  expect(said.edits).toEqual([])
  expect(said.refused).toContain("`at`")
})

test("a call handing over no name is refused by the key naming it", () => {
  const said = runChange(packaged(), { at: INNER_MANIFEST })
  expect(said.edits).toEqual([])
  expect(said.refused).toContain("`to`")
})

test("a manifest already carrying the new name is answered with no edit of its own", () => {
  expect([...resumed().keys()].sort()).toEqual([OUTER_MANIFEST, READER_CODE, ROOT_MANIFEST])
})

test("a manifest naming the old name is restated though the package carries the new name", () => {
  expect(resumed().get(OUTER_MANIFEST)).toBe(OUTER_BODY.replace(`"${INNER}"`, `"${HELD}"`))
})

test("a manifest aliasing the old name is restated though the package carries the new name", () => {
  expect(resumed().get(ROOT_MANIFEST)).toBe(ROOT_WANTED)
})

test("a body reaching under the old name is rewritten though the package carries the new name", () => {
  expect(resumed().get(READER_CODE)).toBe(READER_WANTED)
})

test("an old name equal to the new name is refused", () => {
  const said = renamePackage(carried(), { at: INNER_MANIFEST, to: HELD, from: HELD })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`from` and `to` name one package, so no package is renamed")
})

test("an old name nothing names is refused", () => {
  const said = renamePackage(packaged(), { at: INNER_MANIFEST, to: HELD, from: ABSENT })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`nothing names \`${ABSENT}\`, so no package is renamed`)
})

test("an old name that is no package name is refused", () => {
  const said = renamePackage(packaged(), { at: INNER_MANIFEST, to: HELD, from: "one/two/three" })
  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "the manifest calls this package `one/two/three`, which is no `package-name`, " +
      "so no package is renamed"
  )
})

test("a call handing over an old name renames from that name", () => {
  const world = carried()
  const said = runChange(world, { at: INNER_MANIFEST, to: HELD, from: INNER })
  expect(said.refused).toBe(null)
  expect(pathsIn(world, said)).toEqual([OUTER_MANIFEST, READER_CODE, ROOT_MANIFEST])
})
