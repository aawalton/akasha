import { expect, test } from "bun:test"
import type {
  Beside,
  FilePropertiesBy,
  SidecarsBy,
} from "../index-entries/index-entries.module.code.ts"
import { A } from "../index-entries/index-entries.module.test-fixtures.ts"
import { pathIn } from "./index-path.index.code.ts"

const BESIDES: ReadonlyMap<string, Beside> = new Map()

const NO_FILES: FilePropertiesBy = new Map()

const NONE: SidecarsBy = new Map()

const SECRET: SidecarsBy = new Map([
  ["domain", { secret: true, uncommitted: false, besides: BESIDES }],
])

const UNCOMMITTED: SidecarsBy = new Map([
  ["domain", { secret: false, uncommitted: true, besides: BESIDES }],
])

test("a path is filed under the path alone, with no scope or property above it", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", NO_FILES, NONE)).toEqual([
    { at: "path/a.domain.ts.jsonl", line },
  ])
})

test("a page whose type declares a secret claims the sops file beside it", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", NO_FILES, SECRET)).toEqual([
    { at: "path/a.domain.ts.jsonl", line },
    { at: "path/a.domain.sops.yaml.jsonl", line },
  ])
})

test("a page whose type declares an uncommitted value claims the file beside it", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", NO_FILES, UNCOMMITTED)).toEqual([
    { at: "path/a.domain.ts.jsonl", line },
    { at: "path/a.domain.uncommitted.ts.jsonl", line },
  ])
})

test("a page whose type declares a file property with a default claims that file beside it", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`
  const drafting: SidecarsBy = new Map([
    [
      "domain",
      {
        secret: false,
        uncommitted: true,
        besides: new Map([["patch", { held: "diff", uncommitted: false }]]),
      },
    ],
  ])
  const filed: FilePropertiesBy = new Map([["domain", new Map([["patch", null]])]])

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", filed, drafting)).toEqual([
    { at: "path/a.domain.ts.jsonl", line },
    { at: "path/a.domain.uncommitted.ts.jsonl", line },
    { at: "path/a.domain.patch.diff.jsonl", line },
  ])
})

test("a page stating the property its type defaults claims that file once", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a", patch: "diff" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`
  const drafting: SidecarsBy = new Map([
    [
      "domain",
      {
        secret: false,
        uncommitted: false,
        besides: new Map([["patch", { held: "diff", uncommitted: false }]]),
      },
    ],
  ])
  const filed: FilePropertiesBy = new Map([["domain", new Map([["patch", null]])]])

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", filed, drafting)).toEqual([
    { at: "path/a.domain.ts.jsonl", line },
    { at: "path/a.domain.patch.diff.jsonl", line },
  ])
})

test("an uncommitted value held in no file claims no file beside the page", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`
  const held: SidecarsBy = new Map([
    [
      "domain",
      {
        secret: false,
        uncommitted: true,
        besides: new Map([["model", { held: "ts", uncommitted: false }]]),
      },
    ],
  ])

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", NO_FILES, held)).toEqual([
    { at: "path/a.domain.ts.jsonl", line },
    { at: "path/a.domain.uncommitted.ts.jsonl", line },
  ])
})

test("a property naming its file outright claims no uncommitted file beside it", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`
  const held: SidecarsBy = new Map([
    [
      "domain",
      {
        secret: false,
        uncommitted: false,
        besides: new Map([["manifest", { held: "json", uncommitted: false }]]),
      },
    ],
  ])
  const filed: FilePropertiesBy = new Map([["domain", new Map([["manifest", "package.json"]])]])

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", filed, held)).toEqual([
    { at: "path/a.domain.ts.jsonl", line },
  ])
})

test("a file a page property holds is filed under its own path, naming the page stating it", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", test: "ts" }
  const line = `{"path":"deep/a.module.ts","id":"${A}"}`
  const filed: FilePropertiesBy = new Map([
    [
      "module",
      new Map([
        ["code", null],
        ["test", null],
      ]),
    ],
  ])

  expect(pathIn(value, "/repo/deep/a.module.ts", "/repo", filed, NONE)).toEqual([
    { at: "path/deep/a.module.ts.jsonl", line },
    { at: "path/deep/a.module.code.ts.jsonl", line },
    { at: "path/deep/a.module.test.ts.jsonl", line },
  ])
})

test("a value carrying no slug is filed under no path, as it is filed under no identifier", () => {
  const value = { id: A, pageTypeSlug: "domain" }

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", NO_FILES, NONE)).toEqual([])
})
