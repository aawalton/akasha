import { expect, test } from "bun:test"
import { definer } from "akasha/agent/role/pages/definer.role.ts"
import { role } from "akasha/agent/role/role.page-type.ts"
import { interactive } from "akasha/agent/seat/mode/pages/interactive.seat-mode.ts"
import { seatMode } from "akasha/agent/seat/mode/seat-mode.page-type.ts"
import { module as modulePageType } from "akasha/code/module/module.page-type.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  readingIn,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  asking,
  type Query,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  pickingFor,
  type Where,
} from "akasha/page/service/modules/page-picking/page-picking.module.code.ts"
import { pagePicking } from "akasha/page/service/modules/page-picking/page-picking.module.ts"

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

function stating(kind: string, key: string, said: unknown): readonly string[] {
  const found: string[] = []
  for (const one of valuesOfType(readingIn(root), kind)) {
    const held = one.value[key]
    if (held === said || (Array.isArray(held) && held.includes(said))) found.push(one.path)
  }
  return found.sort()
}

function sorted(paths: readonly string[] | null): readonly string[] | null {
  return paths === null ? null : [...new Set(paths)].sort()
}

const DEFINER = `${role.slug}/${definer.slug}`

const PICKING = `${modulePageType.slug}/${pagePicking.slug}`

test("a relation names every page the index files as naming its target", () => {
  const every = stating("persona", "role", DEFINER)
  expect(every.length).toBeGreaterThan(0)
  expect(sorted(picked({ role: { is: DEFINER } }, "persona"))).toEqual(every)
  expect(sorted(picked({ role: { in: [DEFINER] } }, "persona"))).toEqual(every)
  expect(sorted(picked({ role: { is: definer.id } }, "persona"))).toEqual(every)
})

test("a relation holding many names every page naming one target among them", () => {
  const every = stating("service-workstation", "parts", PICKING)
  expect(every.length).toBe(1)
  const where = { parts: { has: PICKING } }
  expect(sorted(picked(where, "service-workstation"))).toEqual(every)
  const among = { parts: { contains: [PICKING] } }
  expect(sorted(picked(among, "service-workstation"))).toEqual(every)
})

test("a relation spelled no way the index files names no page", () => {
  expect(picked({ role: { is: definer.slug } }, "persona")).toBeNull()
  expect(picked({ role: { contains: definer.slug } }, "persona")).toBeNull()
  expect(picked({ role: { "ends-with": `/${definer.slug}` } }, "persona")).toBeNull()
})

test("a relation held outside the commit names no page", () => {
  const where = { mode: { is: `${seatMode.slug}/${interactive.slug}` } }
  expect(picked(where, "seat")).toBeNull()
})

function askedOf(query: Query): { readonly rows: readonly unknown[]; readonly n: number } {
  const asked = asking(root, query)
  if ("refused" in asked) throw new Error(asked.refused)
  return { rows: asked.rows, n: asked.n }
}

test("a question naming no where and no order is paged off the index", () => {
  const every = askedOf({ pageTypeSlug: KIND, keys: ["slug"] })
  expect(every.n).toBeGreaterThan(3)
  expect(askedOf({ pageTypeSlug: KIND, keys: ["slug"], limit: 2 })).toEqual({
    rows: every.rows.slice(0, 2),
    n: every.n,
  })
  expect(askedOf({ pageTypeSlug: KIND, keys: ["slug"], offset: 1, limit: 2 })).toEqual({
    rows: every.rows.slice(1, 3),
    n: every.n,
  })
  expect(askedOf({ pageTypeSlug: KIND, keys: ["slug"], limit: 0 })).toEqual({
    rows: [],
    n: every.n,
  })
  const down = askedOf({ pageTypeSlug: KIND, keys: ["slug"], descending: true, limit: 2 })
  expect(down.rows).toEqual([...every.rows].reverse().slice(0, 2))
})

test("a question under a page type many extend is paged across every one of them", () => {
  const keys = ["slug", "type"]
  const every = askedOf({ pageTypeSlug: "collection", keys })
  expect(askedOf({ pageTypeSlug: "collection", keys, offset: 3, limit: 4 })).toEqual({
    rows: every.rows.slice(3, 7),
    n: every.n,
  })
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
