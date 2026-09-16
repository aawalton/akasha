import { expect, test } from "bun:test"
import {
  importingIn,
  importsIn,
} from "akasha/code/reading/modules/code-importing/code-importing.module.code.ts"

const READING = "akasha/pages-system/index/index-reading/index-reading.module.code.ts"

const NAMING = new Map([["@akasha/index", READING]])

test("a relative specifier imports the path it reaches", () => {
  const body = 'import { one } from "../one.module.code.ts"\nexport * from "./two.module.code.ts"\n'

  expect(importsIn(body, "akasha/deep/a.module.code.ts")).toEqual([
    "akasha/one.module.code.ts",
    "akasha/deep/two.module.code.ts",
  ])
})

test("a type-only import is an import like any other", () => {
  const body = 'import type { One } from "./one.module.ts"\n'

  expect(importsIn(body, "akasha/a.module.code.ts")).toEqual(["akasha/one.module.ts"])
})

test("a specifier no naming resolves imports nothing, and a file that is not there is imported", () => {
  const body =
    'import ts from "typescript"\nimport { x } from "node:fs"\nimport { y } from "./gone.ts"\n'

  expect(importsIn(body, "akasha/a.module.code.ts")).toEqual(["akasha/gone.ts"])
})

test("a specifier naming a package is read against the naming handed in", () => {
  const body = 'import { readingIn } from "@akasha/index"\nimport { y } from "./two.ts"\n'

  expect(importsIn(body, "akasha/a.module.code.ts")).toEqual(["akasha/two.ts"])
  expect(importsIn(body, "akasha/a.module.code.ts", NAMING)).toEqual([READING, "akasha/two.ts"])
})

test("a package specifier the naming holds nothing for imports nothing", () => {
  const body = 'import { pagesSystem } from "@akasha/pages"\n'

  expect(importsIn(body, "akasha/a.module.code.ts", NAMING)).toEqual([])
})

test("a specifier reaching above the repository root imports nothing", () => {
  const body = 'import { x } from "../../../away.ts"\n'

  expect(importsIn(body, "akasha/a.module.code.ts")).toEqual([])
})

test("an import says whether that import names a type or names code", () => {
  const body = 'import type { One } from "./one.ts"\nimport { two } from "./two.ts"\n'

  expect(importingIn(body, "akasha/a.module.code.ts")).toEqual([
    { at: "akasha/one.ts", typed: true, deferred: false },
    { at: "akasha/two.ts", typed: false, deferred: false },
  ])
})

test("an import says whether that import is read as the file loads or only later", () => {
  const body = 'import { one } from "./one.ts"\nconst two = await import("./two.ts")\n'

  expect(importingIn(body, "akasha/a.module.code.ts")).toEqual([
    { at: "akasha/one.ts", typed: false, deferred: false },
    { at: "akasha/two.ts", typed: false, deferred: true },
  ])
})

test("what a body imports is what it names a type and what it names code together", () => {
  const body = 'import type { One } from "./one.ts"\nimport { two } from "./two.ts"\n'
  const at = "akasha/a.module.code.ts"

  expect(importsIn(body, at)).toEqual(importingIn(body, at).map((one) => one.at))
})
