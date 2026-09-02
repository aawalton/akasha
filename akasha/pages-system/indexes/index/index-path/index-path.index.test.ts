import { expect, test } from "bun:test"
import type { SidecarsBy } from "../../index-entries/index-entries.module.code.ts"
import { A } from "../../index-entries/index-entries.module.test-fixtures.ts"
import { pathIn } from "./index-path.index.code.ts"

const NONE: SidecarsBy = new Map()

const SECRET: SidecarsBy = new Map([["domain", { secret: true, uncommitted: false }]])

const UNCOMMITTED: SidecarsBy = new Map([["domain", { secret: false, uncommitted: true }]])

test("a path is filed under the path alone, with no scope or property above it", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", new Map(), NONE)).toEqual([
    { at: "path/a.domain.ts.jsonl", line },
  ])
})

test("a page whose type declares a secret claims the sops file beside it", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", new Map(), SECRET)).toEqual([
    { at: "path/a.domain.ts.jsonl", line },
    { at: "path/a.domain.sops.yaml.jsonl", line },
  ])
})

test("a page whose type declares an uncommitted value claims the file beside it", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", new Map(), UNCOMMITTED)).toEqual([
    { at: "path/a.domain.ts.jsonl", line },
    { at: "path/a.domain.uncommitted.ts.jsonl", line },
  ])
})

test("a file a page property holds is filed under its own path, naming the page stating it", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", test: "ts" }
  const line = `{"path":"deep/a.module.ts","id":"${A}"}`
  const filed = new Map<string, string | null>([
    ["code", null],
    ["test", null],
  ])

  expect(pathIn(value, "/repo/deep/a.module.ts", "/repo", filed, NONE)).toEqual([
    { at: "path/deep/a.module.ts.jsonl", line },
    { at: "path/deep/a.module.code.ts.jsonl", line },
    { at: "path/deep/a.module.test.ts.jsonl", line },
  ])
})

test("a value carrying no slug is filed under no path, as it is filed under no identifier", () => {
  const value = { id: A, pageTypeSlug: "domain" }

  expect(pathIn(value, "/repo/a.domain.ts", "/repo", new Map(), NONE)).toEqual([])
})
