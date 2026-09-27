import { expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  asking,
  type Query,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  pickingFor,
  type Where,
} from "akasha/page/service/modules/page-picking/page-picking.module.code.ts"

const root = rootOf(import.meta.dir)

const KIND = "decision-kind"

const GAP_AT = "domain/decision-kind/pages/gap.decision-kind.ts"

function picked(where: Where | undefined, kind: string = KIND): readonly string[] | null {
  const picking = pickingFor(readingIn(root), where)
  return picking === null ? null : picking(kind)
}

function rowsOf(query: Query): readonly Record<string, unknown>[] {
  const asked = asking(root, query)
  if ("refused" in asked) throw new Error(asked.refused)
  return asked.rows
}

function gapId(): string {
  const where = { slug: { is: "gap" } }
  return String(rowsOf({ pageTypeSlug: KIND, where, keys: ["id"] })[0]?.id)
}

test("a where naming no slug, id or page type names no page", () => {
  expect(picked(undefined)).toBeNull()
  expect(picked({ definition: { empty: false } })).toBeNull()
  expect(picked({ slug: { "starts-with": "g" } })).toBeNull()
  expect(picked({ type: { in: [KIND] } })).toBeNull()
})

test("a slug names the pages filed under that slug", () => {
  expect(picked({ slug: { is: "gap" } })).toEqual([GAP_AT])
  expect(picked({ slug: { in: ["gap", "no-such-slug"] } })).toEqual([GAP_AT])
  expect(picked({ slug: { is: "no-such-slug" } })).toEqual([])
})

test("an id names the page filed under it, within that page's own page type", () => {
  const id = gapId()
  expect(picked({ id: { is: id } })).toEqual([GAP_AT])
  expect(picked({ id: { in: [id, "no-such-id"] } })).toEqual([GAP_AT])
  expect(picked({ id: { is: id } }, "domain")).toEqual([])
})

test("a row's page type names no page of any other page type", () => {
  expect(picked({ type: { is: "book" }, slug: { is: "gap" } })).toEqual([])
})

test("a slug or an id holding a slash names no page", () => {
  expect(picked({ slug: { is: "../gap" } })).toEqual([])
  expect(picked({ id: { in: ["../gap"] } })).toEqual([])
})

test("a question narrowed this way still runs every test it states", () => {
  const none = { slug: { in: ["gap", "absence"] }, id: { is: "no-such-id" } }
  expect(rowsOf({ pageTypeSlug: KIND, where: none, keys: ["slug"] })).toEqual([])
  const held = { slug: { is: "gap" }, definition: { empty: false } }
  expect(rowsOf({ pageTypeSlug: KIND, where: held, keys: ["slug"] })).toEqual([{ slug: "gap" }])
})

test("a question narrowed to a page type below answers that page type's pages alone", () => {
  const where = {
    slug: { in: ["a-thousand-li-the-first-step", "ariana-grande-7-rings"] },
    type: { is: "book" },
  }
  expect(rowsOf({ pageTypeSlug: "collection", where, keys: ["slug", "type"] })).toEqual([
    { slug: "a-thousand-li-the-first-step", type: "book" },
  ])
})
