import { expect, test } from "bun:test"
import { rootOf } from "@akasha/command-system/rooting"
import { matchingIn } from "@akasha/pages-system/name-format/format-reaching"
import { lowerKebabCase } from "@akasha/pages-system/name-format/lower-kebab-case"
import { shadowAt } from "@akasha/pages-system/shadow"
import {
  holdingIn,
  nameIn,
  namingIn,
  type Package,
  partsIn,
  reasonsIn,
  refusalOf,
} from "./package-reached-where-named.code-check.code.ts"

const FOLDER = "akasha/pages-system/indexes"

const READING = `${FOLDER}/index-reading/index-reading.module.code.ts`

const SHAPE = `${FOLDER}/index-shape/index-shape.module.code.ts`

const SURFACE = `${FOLDER}/index-surface/index-surface.module.code.ts`

const PAGE = `${FOLDER}/index/index-import/index-import.index.ts`

const OUTSIDE = "akasha/pages-system/shadow/shadow.module.test.ts"

const INSIDE = `${FOLDER}/indexing/indexing.module.code.ts`

const AT_READING = "../indexes/index-reading/index-reading.module.code.ts"

const AT_SURFACE = "../indexes/index-surface/index-surface.module.code.ts"

const AT_PAGE = "../indexes/index/index-import/index-import.index.ts"

const REPO_AT = rootOf(import.meta.dir)

const KEBAB = matchingIn(REPO_AT, shadowAt(REPO_AT).index)(lowerKebabCase.slug)

const MANIFEST = JSON.stringify({
  name: "@akasha/indexes",
  exports: {
    ".": "./index-reading/index-reading.module.code.ts",
    "./shape": "./index-shape/index-shape.module.code.ts",
  },
})

function nothingIsAPage(): boolean {
  return false
}

function onlyThePage(at: string): boolean {
  return at === PAGE
}

function declaring(text: string): readonly Package[] {
  const said = namingIn(FOLDER, text)
  return said === null ? [] : [said]
}

function refusing(named: string): string {
  return refusalOf(named, KEBAB) ?? ""
}

const NAMED = declaring(MANIFEST)

test("each target a manifest names is resolved against the package's folder", () => {
  expect(namingIn(FOLDER, MANIFEST)?.reached).toEqual(new Set([READING, SHAPE]))
})

test("a reach at a path the manifest names is let through", () => {
  expect(
    reasonsIn(NAMED, OUTSIDE, `import { readingIn } from "${AT_READING}"\n`, nothingIsAPage)
  ).toEqual([])
})

test("a reach at a path the manifest does not name is refused, naming where it landed", () => {
  const said = reasonsIn(
    NAMED,
    OUTSIDE,
    `import { beneath } from "${AT_SURFACE}"\n`,
    nothingIsAPage
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(`\`${AT_SURFACE}\``)
  expect(said[0]).toContain(SURFACE)
  expect(said[0]).toContain("@akasha/indexes")
  expect(said[0]).toContain("does not name among its exports")
})

test("a file inside the package reaches a module its manifest does not name", () => {
  const body = 'import { beneath } from "../index-surface/index-surface.module.code.ts"\n'
  expect(reasonsIn(NAMED, INSIDE, body, nothingIsAPage)).toEqual([])
})

test("an export from an unnamed path is refused as an import is", () => {
  expect(
    reasonsIn(NAMED, OUTSIDE, `export { beneath } from "${AT_SURFACE}"\n`, nothingIsAPage)
  ).toHaveLength(1)
})

test("a dynamic import at an unnamed path is refused", () => {
  expect(
    reasonsIn(NAMED, OUTSIDE, `const held = import("${AT_SURFACE}")\n`, nothingIsAPage)
  ).toHaveLength(1)
})

test("a require of an unnamed path is refused", () => {
  expect(
    reasonsIn(NAMED, OUTSIDE, `const held = require("${AT_SURFACE}")\n`, nothingIsAPage)
  ).toHaveLength(1)
})

test("a type-only import of an unnamed path is refused", () => {
  expect(
    reasonsIn(NAMED, OUTSIDE, `import type { Held } from "${AT_SURFACE}"\n`, nothingIsAPage)
  ).toHaveLength(1)
})

test("a reach at a page the manifest does not name is let through", () => {
  expect(
    reasonsIn(NAMED, OUTSIDE, `import { indexImport } from "${AT_PAGE}"\n`, onlyThePage)
  ).toEqual([])
})

test("a reach at a code file the manifest does not name is refused while a page is not", () => {
  const body = `import { beneath } from "${AT_SURFACE}"\nimport { indexImport } from "${AT_PAGE}"\n`
  const said = reasonsIn(NAMED, OUTSIDE, body, onlyThePage)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(SURFACE)
})

const OUTER = "akasha/pages-system"

const OUTER_MANIFEST = JSON.stringify({
  name: "@akasha/pages-system",
  exports: { "./shadow": "./shadow/shadow.module.code.ts" },
})

const NESTED: readonly Package[] = [
  namingIn(OUTER, OUTER_MANIFEST) as Package,
  namingIn(FOLDER, MANIFEST) as Package,
]

test("a package standing inside another holds the files under it, so the outer one answers for none", () => {
  expect(holdingIn(NESTED, READING)?.named).toBe("@akasha/indexes")
  expect(holdingIn(NESTED, `${OUTER}/shadow/shadow.module.code.ts`)?.named).toBe(
    "@akasha/pages-system"
  )
  expect(holdingIn(NESTED, "akasha/code-system/held.ts")).toBe(null)
})

test("a reach the inner manifest names is let through though the outer one never names it", () => {
  const body = `import { readingIn } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"\n`
  const at = "akasha/checks-system/held/held.module.code.ts"
  expect(reasonsIn(NESTED, at, body, nothingIsAPage)).toEqual([])
})

test("a reach neither manifest names is refused once, by the inner package alone", () => {
  const body = `import { beneath } from "../../pages-system/indexes/index-surface/index-surface.module.code.ts"\n`
  const at = "akasha/checks-system/held/held.module.code.ts"
  const said = reasonsIn(NESTED, at, body, nothingIsAPage)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("@akasha/indexes")
})

test("a manifest naming no exports declares no interface", () => {
  expect(namingIn(FOLDER, JSON.stringify({ name: "@akasha/indexes" }))).toBe(null)
})

test("a package declaring no interface is not enforced", () => {
  const held = declaring(JSON.stringify({ name: "@akasha/indexes" }))
  expect(
    reasonsIn(held, OUTSIDE, `import { beneath } from "${AT_SURFACE}"\n`, nothingIsAPage)
  ).toEqual([])
})

test("a manifest that will not parse leaves its package declaring nothing", () => {
  expect(namingIn(FOLDER, "{ this is not json\n")).toBe(null)
})

test("a manifest stating an empty exports map names no way in", () => {
  const held = declaring(JSON.stringify({ name: "@akasha/indexes", exports: {} }))
  expect(
    reasonsIn(held, OUTSIDE, `import { readingIn } from "${AT_READING}"\n`, nothingIsAPage)
  ).toHaveLength(1)
})

test("a target that is not a string names no way in", () => {
  const said = namingIn(FOLDER, JSON.stringify({ exports: { ".": { import: "./a.ts" } } }))
  expect(said?.reached).toEqual(new Set())
})

test("a package whose manifest calls it nothing is named by its folder", () => {
  const held = declaring(JSON.stringify({ exports: {} }))
  expect(
    reasonsIn(held, OUTSIDE, `import { readingIn } from "${AT_READING}"\n`, nothingIsAPage)[0]
  ).toContain(`\`${FOLDER}\``)
})

test("a file reaching into no package at all is untouched", () => {
  const body = 'import { held } from "../../code-system/held/held.module.code.ts"\n'
  expect(reasonsIn(NAMED, OUTSIDE, body, nothingIsAPage)).toEqual([])
})

test("a specifier naming the package rather than a path is the way in", () => {
  expect(
    reasonsIn(NAMED, OUTSIDE, 'import { readingIn } from "@akasha/indexes"\n', nothingIsAPage)
  ).toEqual([])
})

test("the at sign is the registry's mark, so the scope is judged as the bare name past it", () => {
  expect(partsIn("@akasha/indexes")).toEqual(["akasha", "indexes"])
  expect(refusing("@akasha/indexes")).toBe("")
  expect(refusing("@alanwalton/native-shell")).toBe("")
})

test("a name carrying no scope is one slug", () => {
  expect(partsIn("indexes")).toEqual(["indexes"])
  expect(refusing("indexes")).toBe("")
})

test("a scope not written in lower kebab is refused, naming the part and the format", () => {
  const said = refusing("@Akasha/indexes")
  expect(said).toContain("`Akasha`")
  expect(said).toContain(lowerKebabCase.slug)
})

test("a slug not written in lower kebab is refused", () => {
  expect(refusing("@akasha/Indexes")).toContain("`Indexes`")
})

test("a name parted by a slash and opening with no at sign is no package name", () => {
  expect(partsIn("akasha/indexes")).toBe(null)
  expect(refusing("akasha/indexes")).toContain("indexes")
})

test("a name parted by more than one slash is no package name", () => {
  expect(partsIn("@akasha/indexes/deep")).toBe(null)
})

test("a scope carrying nothing past the at sign is refused", () => {
  expect(partsIn("@/indexes")).toEqual(["", "indexes"])
  expect(refusing("@/indexes")).toContain(lowerKebabCase.slug)
})

test("a manifest stating no name states no package name", () => {
  expect(nameIn(JSON.stringify({ exports: {} }))).toBe(null)
  expect(nameIn("{ this is not json\n")).toBe(null)
  expect(nameIn(JSON.stringify({ name: "@akasha/indexes" }))).toBe("@akasha/indexes")
})
