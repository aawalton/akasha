import { expect, test } from "bun:test"
import { missingIn } from "./manifest-lands-on-a-file.code-check.code.ts"

const FOLDER = "akasha/held"

const AT = "akasha/held/one/one.module.code.ts"

const OTHER = "akasha/held/two/two.module.code.ts"

function there(paths: readonly string[]): (path: string) => boolean {
  return (path) => paths.includes(path)
}

function manifest(value: Readonly<Record<string, unknown>>): string {
  return JSON.stringify({ name: "@akasha/held", ...value })
}

const EXPORTS = { "./one": "./one/one.module.code.ts" }

test("a way in landing on a file that is there is let through", () => {
  expect(missingIn(FOLDER, manifest({ exports: EXPORTS }), there([AT]))).toEqual([])
})

test("a way in landing where no file is refuses, naming the specifier and the path", () => {
  const said = missingIn(FOLDER, manifest({ exports: EXPORTS }), there([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("@akasha/held/one")
  expect(said[0]).toContain(AT)
})

test("every way in landing on nothing is refused rather than only the first", () => {
  const said = missingIn(
    FOLDER,
    manifest({
      exports: { "./one": "./one/one.module.code.ts", "./two": "./two/two.module.code.ts" },
    }),
    there([])
  )
  expect(said).toHaveLength(2)
})

test("a way in that is there is passed over while its neighbour is refused", () => {
  const said = missingIn(
    FOLDER,
    manifest({
      exports: { "./one": "./one/one.module.code.ts", "./two": "./two/two.module.code.ts" },
    }),
    there([AT])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(OTHER)
})

test("a manifest stating one string for its exports is judged as stating a lone dot", () => {
  expect(
    missingIn(FOLDER, manifest({ exports: "./one/one.module.code.ts" }), there([]))
  ).toHaveLength(1)
  expect(missingIn(FOLDER, manifest({ exports: "./one/one.module.code.ts" }), there([AT]))).toEqual(
    []
  )
})

test("a manifest naming no way in is judged clean", () => {
  expect(missingIn(FOLDER, manifest({}), there([]))).toEqual([])
})

test("a manifest that will not parse is judged clean", () => {
  expect(missingIn(FOLDER, "{ not json", there([]))).toEqual([])
})

test("a manifest calling its package nothing is judged clean", () => {
  expect(missingIn(FOLDER, JSON.stringify({ exports: EXPORTS }), there([]))).toEqual([])
})

test("a target that is no string names no way in", () => {
  expect(
    missingIn(FOLDER, manifest({ exports: { "./one": { import: "./gone.ts" } } }), there([]))
  ).toEqual([])
})

test("a key that is neither a lone dot nor opens with one names no way in", () => {
  expect(missingIn(FOLDER, manifest({ exports: { one: "./gone.ts" } }), there([]))).toEqual([])
})
