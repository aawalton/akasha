import { expect, test } from "bun:test"
import { namingIn, type Package, reasonsIn } from "./package-reached-where-named.code-check.code.ts"

const FOLDER = "akasha/pages-system/indexes"

const READING = `${FOLDER}/index-reading/index-reading.module.code.ts`

const SHAPE = `${FOLDER}/index-shape/index-shape.module.code.ts`

const SURFACE = `${FOLDER}/index-surface/index-surface.module.code.ts`

const OUTSIDE = "akasha/pages-system/shadow/shadow.module.test.ts"

const INSIDE = `${FOLDER}/indexing/indexing.module.code.ts`

const AT_READING = "../indexes/index-reading/index-reading.module.code.ts"

const AT_SURFACE = "../indexes/index-surface/index-surface.module.code.ts"

const MANIFEST = JSON.stringify({
  name: "@akasha/indexes",
  exports: {
    ".": "./index-reading/index-reading.module.code.ts",
    "./shape": "./index-shape/index-shape.module.code.ts",
  },
})

function declaring(text: string): readonly Package[] {
  const said = namingIn(FOLDER, text)
  return said === null ? [] : [said]
}

const NAMED = declaring(MANIFEST)

test("each target a manifest names is resolved against the package's folder", () => {
  expect(namingIn(FOLDER, MANIFEST)?.reached).toEqual(new Set([READING, SHAPE]))
})

test("a reach at a path the manifest names is let through", () => {
  expect(reasonsIn(NAMED, OUTSIDE, `import { readingIn } from "${AT_READING}"\n`)).toEqual([])
})

test("a reach at a path the manifest does not name is refused, naming where it landed", () => {
  const said = reasonsIn(NAMED, OUTSIDE, `import { beneath } from "${AT_SURFACE}"\n`)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(`\`${AT_SURFACE}\``)
  expect(said[0]).toContain(SURFACE)
  expect(said[0]).toContain("@akasha/indexes")
  expect(said[0]).toContain("does not name among its exports")
})

test("a file inside the package reaches a module its manifest does not name", () => {
  const body = 'import { beneath } from "../index-surface/index-surface.module.code.ts"\n'
  expect(reasonsIn(NAMED, INSIDE, body)).toEqual([])
})

test("an export from an unnamed path is refused as an import is", () => {
  expect(reasonsIn(NAMED, OUTSIDE, `export { beneath } from "${AT_SURFACE}"\n`)).toHaveLength(1)
})

test("a dynamic import at an unnamed path is refused", () => {
  expect(reasonsIn(NAMED, OUTSIDE, `const held = import("${AT_SURFACE}")\n`)).toHaveLength(1)
})

test("a require of an unnamed path is refused", () => {
  expect(reasonsIn(NAMED, OUTSIDE, `const held = require("${AT_SURFACE}")\n`)).toHaveLength(1)
})

test("a type-only import of an unnamed path is refused", () => {
  expect(reasonsIn(NAMED, OUTSIDE, `import type { Held } from "${AT_SURFACE}"\n`)).toHaveLength(1)
})

test("a manifest naming no exports declares no interface", () => {
  expect(namingIn(FOLDER, JSON.stringify({ name: "@akasha/indexes" }))).toBe(null)
})

test("a package declaring no interface is not enforced", () => {
  const held = declaring(JSON.stringify({ name: "@akasha/indexes" }))
  expect(reasonsIn(held, OUTSIDE, `import { beneath } from "${AT_SURFACE}"\n`)).toEqual([])
})

test("a manifest that will not parse leaves its package declaring nothing", () => {
  expect(namingIn(FOLDER, "{ this is not json\n")).toBe(null)
})

test("a manifest stating an empty exports map names no way in", () => {
  const held = declaring(JSON.stringify({ name: "@akasha/indexes", exports: {} }))
  expect(reasonsIn(held, OUTSIDE, `import { readingIn } from "${AT_READING}"\n`)).toHaveLength(1)
})

test("a target that is not a string names no way in", () => {
  const said = namingIn(FOLDER, JSON.stringify({ exports: { ".": { import: "./a.ts" } } }))
  expect(said?.reached).toEqual(new Set())
})

test("a package whose manifest calls it nothing is named by its folder", () => {
  const held = declaring(JSON.stringify({ exports: {} }))
  expect(reasonsIn(held, OUTSIDE, `import { readingIn } from "${AT_READING}"\n`)[0]).toContain(
    `\`${FOLDER}\``
  )
})

test("a file reaching into no package at all is untouched", () => {
  const body = 'import { held } from "../../code-system/held/held.module.code.ts"\n'
  expect(reasonsIn(NAMED, OUTSIDE, body)).toEqual([])
})

test("a specifier naming the package rather than a path is the way in", () => {
  expect(reasonsIn(NAMED, OUTSIDE, 'import { readingIn } from "@akasha/indexes"\n')).toEqual([])
})
