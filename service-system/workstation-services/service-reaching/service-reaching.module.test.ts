import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  importsIn,
  insideRepo,
  localClosure,
  realPathOf,
  withoutShebang,
} from "./service-reaching.module.code.ts"

const ROOT = mkdtempSync("/var/tmp/service-reaching-")

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

function fileAt(rel: string, text: string): string {
  const at = join(ROOT, rel)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, text)
  return at
}

test("a file standing under the root is reached and one standing outside it is not", () => {
  expect(insideRepo("/a/b", "/a/b/c.ts")).toBe(true)
  expect(insideRepo("/a/b", "/a/c.ts")).toBe(false)
  expect(insideRepo("/a/b", "/a/bc/d.ts")).toBe(false)
})

test("a file standing in a vendor folder is reached by nothing", () => {
  expect(insideRepo("/a/b", "/a/b/node_modules/x/i.ts")).toBe(false)
  expect(insideRepo("/a/b", "/a/b/src/node_modules_of_ours/i.ts")).toBe(true)
})

test("a shebang is taken off before the body is scanned", () => {
  expect(withoutShebang("#!/usr/bin/env bun\nconst a = 1\n")).toBe("const a = 1\n")
  expect(withoutShebang("const a = 1\n")).toBe("const a = 1\n")
})

test("what a file imports is answered as the files it resolves to", () => {
  fileAt("one.ts", "export const ONE = 1\n")
  const two = fileAt("two.ts", "import { ONE } from './one.ts'\nexport const TWO = ONE\n")
  const reached = importsIn(two, ROOT)
  expect(reached).not.toBe(null)
  expect(reached?.files).toEqual([realPathOf(join(ROOT, "one.ts"))])
})

test("an import naming no file is reported rather than throwing", () => {
  const at = fileAt("bad.ts", "import { X } from './nowhere.ts'\nexport const BAD = 1\n")
  const reached = importsIn(at, ROOT)
  expect(reached?.files).toEqual([])
  expect(reached?.unresolved.length).toBe(1)
  expect(reached?.unresolved[0]?.path).toBe("./nowhere.ts")
})

test("a file that is not there is answered with nothing rather than throwing", () => {
  expect(importsIn(join(ROOT, "missing.ts"), ROOT)).toBe(null)
})

test("an import reaching outside the root is followed by nothing", () => {
  const at = fileAt(
    "out.ts",
    "import { readFileSync } from 'node:fs'\nexport const OUT = readFileSync\n"
  )
  expect(importsIn(at, ROOT)?.files).toEqual([])
})

test("the closure of an entry is every file it reaches by import", () => {
  fileAt("deep/c.ts", "export const C = 3\n")
  fileAt("deep/b.ts", "import { C } from './c.ts'\nexport const B = C\n")
  const a = fileAt("deep/a.ts", "import { B } from './b.ts'\nexport const A = B\n")
  const closure = localClosure(a, ROOT)
  expect(closure.files.size).toBe(3)
  expect(closure.stopped).toBe(false)
  expect(closure.unscanned).toEqual([])
  expect([...closure.files].sort()).toEqual(
    ["deep/a.ts", "deep/b.ts", "deep/c.ts"].map((one) => realPathOf(join(ROOT, one))).sort()
  )
})

test("a cycle is walked once rather than forever", () => {
  fileAt("ring/x.ts", "import { Y } from './y.ts'\nexport const X = 1\n")
  fileAt("ring/y.ts", "import { X } from './x.ts'\nexport const Y = 2\n")
  const closure = localClosure(join(ROOT, "ring/x.ts"), ROOT)
  expect(closure.files.size).toBe(2)
})
