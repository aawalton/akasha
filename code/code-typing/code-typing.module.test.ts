import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import {
  compiled,
  insideOf,
  linkedOf,
  manifested,
  manifestOf,
  NOWHERE,
  readingOf,
  servedOf,
} from "akasha/code/code-typing/code-typing.module.code.ts"
import {
  linked,
  MANIFEST,
  MANIFEST_AT,
  MOVED_AT,
  moving,
  PACKAGED,
  placing,
  scratch,
  TWO,
  TWO_AT,
} from "akasha/code/code-typing/code-typing.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a body reached through the packages folder is served from inside the akasha folder", () => {
  const root = linked({ [MANIFEST_AT]: MANIFEST }, "one")

  expect(servedOf(root, join(root, PACKAGED, "one/two/two.module.code.ts"), NOWHERE)).toBe(
    "akasha/one/two/two.module.code.ts"
  )
})

test("a body the change brings is served through the packages folder though no disk holds it", () => {
  const root = linked({ [MANIFEST_AT]: MANIFEST }, "one")
  const read = readingOf(root, (rel) => (rel === TWO_AT ? TWO : null), NOWHERE)

  expect(read(join(root, PACKAGED, "one/two.module.code.ts"))).toBe(TWO)
})

test("a package a manifest places is reached there though no link points at it", () => {
  const { root, placed, at, read } = placing()

  expect(servedOf(root, at, NOWHERE)).toBe(null)
  expect(servedOf(root, at, placed)).toBe(MANIFEST_AT)
  expect(read(join(root, PACKAGED, "one/two.module.code.ts"))).toBe(TWO)
  expect(linkedOf(root, join(root, PACKAGED, "one"), placed)).toBe(join(root, "akasha/one"))
})

test("a moved package is reached where it lands rather than where the link points", () => {
  const { root, placed, at, read } = moving()

  expect(servedOf(root, at, NOWHERE)).toBe(MANIFEST_AT)
  expect(servedOf(root, at, placed)).toBe(MOVED_AT)
  expect(read(join(root, PACKAGED, "one/two.module.code.ts"))).toBe(TWO)
})

test("a body the change takes away reads as nothing through the packages folder", () => {
  const root = linked({ [TWO_AT]: TWO }, "one")
  const read = readingOf(root, () => null, NOWHERE)

  expect(read(join(root, PACKAGED, "one/two.module.code.ts"))).toBe(undefined)
})

test("a manifest is known by the name of the file holding it wherever it sits", () => {
  expect(manifested("package.json")).toBe(true)
  expect(manifested("akasha/one/package.json")).toBe(true)
  expect(manifested("akasha/one/one.module.code.ts")).toBe(false)
  expect(manifested("akasha/one/my-package.json")).toBe(false)
})

test("a manifest reached through the packages folder is answered where it links to", () => {
  const root = linked({ [MANIFEST_AT]: MANIFEST }, "one")

  expect(manifestOf(root, join(root, PACKAGED, "one/package.json"), NOWHERE)).toBe(MANIFEST_AT)
  expect(manifestOf(root, join(root, MANIFEST_AT), NOWHERE)).toBe(MANIFEST_AT)
  expect(manifestOf(root, join(root, "package.json"), NOWHERE)).toBe("package.json")
  expect(manifestOf(root, join(root, "akasha/one/one.module.code.ts"), NOWHERE)).toBe(null)
})

test("the program is served a body it compiles and a manifest reaching one alike", () => {
  const root = linked({ [MANIFEST_AT]: MANIFEST }, "one")

  expect(servedOf(root, join(root, "akasha/one/one.module.code.ts"), NOWHERE)).toBe(
    "akasha/one/one.module.code.ts"
  )
  expect(servedOf(root, join(root, PACKAGED, "one/package.json"), NOWHERE)).toBe(MANIFEST_AT)
  expect(servedOf(root, join(root, "tools/one.ts"), NOWHERE)).toBe("tools/one.ts")
})

test("a manifest the change carries is read from the change where resolution asks for it", () => {
  const root = linked({ [MANIFEST_AT]: MANIFEST }, "one")
  const carried = '{ "name": "@akasha/one", "exports": { ".": "./one.module.code.ts" } }\n'
  const read = readingOf(root, (rel) => (rel === MANIFEST_AT ? carried : null), NOWHERE)

  expect(read(join(root, PACKAGED, "one/package.json"))).toBe(carried)
})

test("a manifest the change does not carry is read as the disk holds it", () => {
  const root = linked({ [MANIFEST_AT]: MANIFEST }, "one")
  const read = readingOf(root, () => null, NOWHERE)

  expect(read(join(root, PACKAGED, "one/package.json"))).toBe(MANIFEST)
  expect(read(join(root, MANIFEST_AT))).toBe(MANIFEST)
})

test("a path under the root compiles unless it is no TypeScript or is an installed dependency", () => {
  expect(compiled("akasha/one/one.module.code.ts")).toBe(true)
  expect(compiled("tools/one.ts")).toBe(true)
  expect(compiled("akasha/one/one.module.json")).toBe(false)
  expect(compiled("akasha/node_modules/one/one.ts")).toBe(false)
})

test("a path under the root is answered relative and one outside the root is not", () => {
  expect(insideOf("/at", "/at/akasha/one.ts")).toBe("akasha/one.ts")
  expect(insideOf("/at", "/at/tools/one.ts")).toBe("tools/one.ts")
  expect(insideOf("/at", "/elsewhere/akasha/one.ts")).toBe(null)
})
