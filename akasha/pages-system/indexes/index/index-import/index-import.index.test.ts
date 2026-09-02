import { expect, test } from "bun:test"
import { edgesIn, importIn } from "./index-import.index.code.ts"

const READING = "akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"

const NAMING = new Map([["@akasha/indexes", READING]])

test("a relative specifier is filed under the path it reaches, against the path importing it", () => {
  const body = 'import { one } from "../one.module.code.ts"\nexport * from "./two.module.code.ts"\n'

  expect(importIn(body, "/repo/akasha/deep/a.module.code.ts", "/repo")).toEqual([
    {
      at: "import/path/akasha/one.module.code.ts.jsonl",
      line: '{"path":"akasha/deep/a.module.code.ts"}',
    },
    {
      at: "import/path/akasha/deep/two.module.code.ts.jsonl",
      line: '{"path":"akasha/deep/a.module.code.ts"}',
    },
  ])
})

test("a type-only import files the same edge as any other import", () => {
  const filed = importIn(
    'import type { One } from "./one.module.ts"\n',
    "akasha/a.module.code.ts",
    "/repo"
  )

  expect(filed.map((one) => one.at)).toEqual(["import/path/akasha/one.module.ts.jsonl"])
})

test("a specifier no naming resolves files no edge, and a file that does not stand files one", () => {
  const body =
    'import ts from "typescript"\nimport { x } from "node:fs"\nimport { y } from "./gone.ts"\n'

  expect(importIn(body, "akasha/a.module.code.ts", "/repo").map((one) => one.at)).toEqual([
    "import/path/akasha/gone.ts.jsonl",
  ])
})

test("a specifier naming a package files an edge at the file the manifest names", () => {
  const body = 'import { readingIn } from "@akasha/indexes"\n'

  expect(importIn(body, "akasha/a.module.code.ts", "/repo", NAMING)).toEqual([
    { at: `import/path/${READING}.jsonl`, line: '{"path":"akasha/a.module.code.ts"}' },
  ])
})

test("a package specifier the naming holds nothing for files no edge", () => {
  const body = 'import { pagesSystem } from "@akasha/pages-system"\n'

  expect(importIn(body, "akasha/a.module.code.ts", "/repo", NAMING)).toEqual([])
})

test("the edges a body makes are read against the naming handed in", () => {
  const body = 'import { readingIn } from "@akasha/indexes"\nimport { y } from "./two.ts"\n'

  expect(edgesIn(body, "akasha/a.module.code.ts")).toEqual(["akasha/two.ts"])
  expect(edgesIn(body, "akasha/a.module.code.ts", NAMING)).toEqual([READING, "akasha/two.ts"])
})

test("a specifier reaching above the repository root files no edge", () => {
  expect(
    importIn('import { x } from "../../../away.ts"\n', "akasha/a.module.code.ts", "/repo")
  ).toEqual([])
})

test("a body held as TSX files an edge as any TypeScript body does", () => {
  const body =
    'import { one } from "./one.module.code.ts"\n\nexport const Two = () => <p>{one}</p>\n'

  expect(importIn(body, "akasha/a.module.code.tsx", "/repo")).toEqual([
    {
      at: "import/path/akasha/one.module.code.ts.jsonl",
      line: '{"path":"akasha/a.module.code.tsx"}',
    },
  ])
})

test("a file that is not TypeScript files no edge whatever its body says", () => {
  expect(importIn('import { x } from "./one.ts"\n', "akasha/a.module.md", "/repo")).toEqual([])
})
