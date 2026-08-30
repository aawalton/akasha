import { expect, test } from "bun:test"
import type { Identifier } from "../../index-entries/index-entries.module.code.ts"
import { A } from "../../index-entries/index-entries.module.test-fixtures.ts"
import { identityIn } from "./index-identity.index.code.ts"

const UNIQUE = new Map<string, Identifier>([
  ["id", { key: "id", reach: "always" }],
  ["slug", { key: "slug", reach: "page-type" }],
])

test("a value carrying its two identifiers is filed under its id and under its page type and slug", () => {
  const value = { id: A, pageTypeSlug: "domain", slug: "a" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(identityIn(value, "/repo/a.domain.ts", "/repo", UNIQUE)).toEqual([
    { at: `identity/page/id/${A}.jsonl`, line },
    { at: "identity/domain/slug/a.jsonl", line },
  ])
})

test("a page holding files is filed under no path here, a path being no identifier", () => {
  const value = { id: A, pageTypeSlug: "module", slug: "a", code: "ts", test: "ts" }
  const line = `{"path":"deep/a.module.ts","id":"${A}"}`

  expect(identityIn(value, "/repo/deep/a.module.ts", "/repo", UNIQUE)).toEqual([
    { at: `identity/page/id/${A}.jsonl`, line },
    { at: "identity/module/slug/a.jsonl", line },
  ])
})

test("a value carrying no identifier at all is filed nowhere", () => {
  expect(
    identityIn({ pageTypeSlug: "domain", slug: "a" }, "/repo/a.domain.ts", "/repo", UNIQUE)
  ).toEqual([])
})

test("an identifier is read by the key its property states rather than by its slug", () => {
  const keyed = new Map<string, Identifier>([["held-name", { key: "named", reach: "page-type" }]])
  const value = { id: A, pageTypeSlug: "domain", slug: "a", named: "n", heldName: "s" }
  const line = `{"path":"a.domain.ts","id":"${A}"}`

  expect(identityIn(value, "/repo/a.domain.ts", "/repo", keyed)).toEqual([
    { at: "identity/domain/held-name/n.jsonl", line },
  ])
})
