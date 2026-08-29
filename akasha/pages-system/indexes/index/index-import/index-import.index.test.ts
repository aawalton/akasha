import { expect, test } from "bun:test"
import { importIn } from "./index-import.index.code.ts"

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

test("a package specifier files no edge, and a file it names that does not stand files one", () => {
  const body =
    'import ts from "typescript"\nimport { x } from "node:fs"\nimport { y } from "./gone.ts"\n'

  expect(importIn(body, "akasha/a.module.code.ts", "/repo").map((one) => one.at)).toEqual([
    "import/path/akasha/gone.ts.jsonl",
  ])
})

test("a specifier reaching above the repository root files no edge", () => {
  expect(
    importIn('import { x } from "../../../away.ts"\n', "akasha/a.module.code.ts", "/repo")
  ).toEqual([])
})

test("a file that is not TypeScript files no edge whatever its body says", () => {
  expect(importIn('import { x } from "./one.ts"\n', "akasha/a.module.md", "/repo")).toEqual([])
})
