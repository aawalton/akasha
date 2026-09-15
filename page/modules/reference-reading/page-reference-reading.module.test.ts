import { expect, test } from "bun:test"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  idsNaming,
  importersOf,
} from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"

const NAMED_AT = "akasha/b.domain.ts"

const NAMER_AT = "akasha/a.module.ts"

const NAMED_ID = "01a0a2e9-c513-7eed-aa47-000000000002"

const NAMER_ID = "01a0a2e9-c513-7eed-aa47-000000000001"

const HELD: Record<string, string> = {
  "identity/page/id/01a0a2e9-c513-7eed-aa47-000000000002.jsonl": `{"path":"${NAMED_AT}","id":"${NAMED_ID}"}`,
  "akasha/b.domain.referenced-by.jsonl": [
    '{"propertySlug":"import","fileName":"b.domain.code.ts","path":"akasha/a.module.code.ts"}',
    `{"propertySlug":"parts","path":"${NAMER_AT}","id":"${NAMER_ID}"}`,
    "",
  ].join("\n"),
}

function worldOf(held: Record<string, string>): Reading {
  return {
    holds: (at) => at === "" || at in held,
    listing: () => [],
    lines: (at) => (held[at] ?? "").split("\n").filter((one) => one !== ""),
    read: (path) => held[path] ?? null,
  }
}

test("the pages naming a page through one property are answered by id", () => {
  expect(idsNaming(worldOf(HELD), NAMED_ID, "parts")).toEqual([NAMER_ID])
  expect(idsNaming(worldOf(HELD), NAMED_ID, "domain")).toEqual([])
})

test("who imports a file beside a page is read from that page's file", () => {
  expect(importersOf(worldOf(HELD), "akasha/b.domain.code.ts")).toEqual(["akasha/a.module.code.ts"])
})

test("a file nothing imports answers nothing, though its page is referenced", () => {
  expect(importersOf(worldOf(HELD), NAMED_AT)).toEqual([])
})

test("a page no id reaches is referenced by nothing", () => {
  expect(idsNaming(worldOf(HELD), NAMER_ID, "parts")).toEqual([])
})

test("a page whose file is missing is referenced by nothing", () => {
  expect(importersOf(worldOf(HELD), "akasha/a.module.code.ts")).toEqual([])
})

test("a path that is no page file belongs to no page", () => {
  expect(importersOf(worldOf(HELD), "akasha/notes.md")).toEqual([])
})
