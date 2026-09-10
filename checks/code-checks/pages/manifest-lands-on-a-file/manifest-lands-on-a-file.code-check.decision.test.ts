import { expect, test } from "bun:test"
import type { Asking } from "./manifest-lands-on-a-file.code-check.decision.code.ts"
import { missingIn, refusalsOver } from "./manifest-lands-on-a-file.code-check.decision.code.ts"
import {
  AT,
  EXPORTS,
  FOLDER,
  MANIFEST_AT,
  manifest,
  OTHER,
} from "./manifest-lands-on-a-file.code-check.decision.test-fixtures.ts"

const BOTH = { "./one": "./one/one.module.code.ts", "./two": "./two/two.module.code.ts" }

function there(paths: readonly string[]): (path: string) => boolean {
  return (path) => paths.includes(path)
}

function asking(texts: Readonly<Record<string, string>>, paths: readonly string[]): Asking {
  return { textAt: (path) => texts[path] ?? null, there: there(paths) }
}

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
  expect(missingIn(FOLDER, manifest({ exports: BOTH }), there([]))).toHaveLength(2)
})

test("a way in that is there is passed over while its neighbour is refused", () => {
  const said = missingIn(FOLDER, manifest({ exports: BOTH }), there([AT]))
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

test("a refusal is filed at the manifest rather than at the file that is not there", () => {
  const held = asking({ [MANIFEST_AT]: manifest({ exports: EXPORTS }) }, [])
  const said = refusalsOver([{ folder: FOLDER, at: MANIFEST_AT }], held)
  expect(said.map((one) => one.path)).toEqual([MANIFEST_AT])
  expect(said[0]?.reason).toContain(AT)
})

test("a manifest the reader answers nothing for is judged by nothing", () => {
  const said = refusalsOver([{ folder: FOLDER, at: MANIFEST_AT }], asking({}, []))
  expect(said).toEqual([])
})

test("refusals over many manifests come back sorted by the manifest each is filed at", () => {
  const over = "akasha/over/package.json"
  const held = asking(
    { [MANIFEST_AT]: manifest({ exports: EXPORTS }), [over]: manifest({ exports: EXPORTS }) },
    []
  )
  const said = refusalsOver(
    [
      { folder: "akasha/over", at: over },
      { folder: FOLDER, at: MANIFEST_AT },
    ],
    held
  )
  expect(said.map((one) => one.path)).toEqual([MANIFEST_AT, over])
})
