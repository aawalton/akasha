import { expect, test } from "bun:test"
import { alanwaltonWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/alanwalton-web.web-app.ts"
import { webApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  askingAgain,
  deliveredWithin,
  filePagesPath,
  planFetchedRows,
  readAnswerRows,
  retryAfter,
} from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"
import {
  asPageRow,
  type PageRow,
} from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import { createPagesCollection } from "akasha/page/ui-store/collection/modules/pages-collection/pages-collection.module.code.ts"
import { createRegularPipeline } from "akasha/page/ui-store/query/modules/regular-pipeline/regular-pipeline.module.code.ts"

const ONE = {
  id: "01a06577-2613-700d-a041-62a4896e80cc",
  page_type_id: "01a0680e-5e00-7007-a253-4c7d9b1a5108",
  title: "Home",
  icon: "home",
  attributes: { navPlace: 0, app: namedAs(webApp.slug, alanwaltonWeb.slug, null) },
  page_type_slug: "nav",
  unique_key: null,
  status: null,
  completed_at: null,
  slug: "home",
  favorited_at: null,
  last_viewed_at: null,
}

test("a row the answer carries is read", () => {
  const rows = readAnswerRows({ rows: [ONE] })
  expect(rows?.length).toBe(1)
  expect(rows?.[0]?.slug).toBe("home")
})

test("a whole page type is asked for with nothing named", () => {
  expect(filePagesPath("image")).toBe("/api/pages/image")
})

test("pages named by slug are asked for by those slugs", () => {
  expect(filePagesPath("image", [], { by: "slug", values: ["image-one", "image-two"] })).toBe(
    "/api/pages/image?slug=image-one%2Cimage-two"
  )
})

test("carried keys and named pages are asked for together", () => {
  expect(filePagesPath("seat", ["conversation"], { by: "id", values: ["one"] })).toBe(
    "/api/pages/seat?carry=conversation&id=one"
  )
})

test("a whole page type pushed a change to one page asks for that page alone", () => {
  expect(askingAgain("seat", ["conversation"], undefined, ["one"])).toEqual({
    at: "/api/pages/seat?carry=conversation&id=one",
    only: new Set(["one"]),
  })
  expect(askingAgain("seat", [], undefined, undefined)).toEqual({
    at: "/api/pages/seat",
    only: null,
  })
})

test("a shape naming its own pages asks for the pushed pages within what it names", () => {
  expect(askingAgain("seat", [], { by: "slug", values: ["a"] }, ["one"])).toEqual({
    at: "/api/pages/seat?slug=a&id=one",
    only: new Set(["one"]),
  })
  expect(
    askingAgain("character-player", [], { by: "where", key: "story", values: ["s1"] }, ["one"])
  ).toEqual({
    at: "/api/pages/character-player?where.story=s1&id=one",
    only: new Set(["one"]),
  })
  expect(askingAgain("seat", [], { by: "slug", values: ["a"] }, undefined)).toEqual({
    at: "/api/pages/seat?slug=a",
    only: null,
  })
})

test("a shape naming its pages by id asks only for the pushed ids it names, and nothing when it names none", () => {
  const named = { by: "id", values: ["one", "two"] } as const
  expect(askingAgain("seat", [], named, ["two", "three"])).toEqual({
    at: "/api/pages/seat?id=two",
    only: new Set(["two"]),
  })
  expect(askingAgain("seat", [], named, ["three"])).toBeNull()
})

function row(id: string, title: string, story = "s1"): PageRow {
  return asPageRow({ id, title, page_type_slug: "story-turn-played", attributes: { story } })
}

function planOver(
  held: readonly PageRow[],
  delivered: readonly string[],
  only: readonly string[] | null,
  fetched: readonly PageRow[]
) {
  const byId = new Map(held.map((one) => [one.id, one]))
  const within = deliveredWithin(new Set(delivered), only === null ? null : new Set(only))
  return planFetchedRows(fetched, within, (id) => byId.get(id), "story-turn-played")
}

test("a pushed page the shape does not hold is inserted, and nothing else is touched", () => {
  const a = row("a", "Alpha")
  const b = row("b", "Bravo")
  expect(planOver([a], ["a"], ["b"], [b])).toEqual({ inserts: [b], updates: [], deletes: [] })
})

test("a pushed page the shape holds is updated where it changed, and left where it did not", () => {
  const a = row("a", "Alpha")
  const moved = row("a", "Alpha, moved")
  expect(planOver([a], ["a"], ["a"], [moved])).toEqual({
    inserts: [],
    updates: [moved],
    deletes: [],
  })
  expect(planOver([a], ["a"], ["a"], [a])).toEqual({ inserts: [], updates: [], deletes: [] })
})

test("a pushed page that moved out of the shape's narrowing leaves the shape, and its neighbours stay", () => {
  const a = row("a", "Alpha")
  const b = row("b", "Bravo")
  expect(planOver([a, b], ["a", "b"], ["b"], [])).toEqual({
    inserts: [],
    updates: [],
    deletes: ["b"],
  })
})

test("a pushed page that is gone leaves the shape; a whole read drops every page it no longer answers", () => {
  const a = row("a", "Alpha")
  const b = row("b", "Bravo")
  const c = row("c", "Charlie")
  expect(planOver([a, b, c], ["a", "b", "c"], ["c"], []).deletes).toEqual(["c"])
  expect(planOver([a, b, c], ["a", "b", "c"], null, [a]).deletes).toEqual(["b", "c"])
})

test("a patched page takes its place in an ordered, narrowed view of the store", async () => {
  const { collection, controller } = createPagesCollection()
  collection.startSyncImmediate()
  const held = [row("a", "Alpha"), row("b", "Bravo"), row("c", "Charlie"), row("x", "X-ray", "s2")]
  controller.seed(held)
  const view = createRegularPipeline(collection, {
    pageTypeSlug: "story-turn-played",
    where: [{ key: "story", eq: "s1" }],
    order: [{ by: "title", dir: "asc" }],
  })
  const titles = async (): Promise<readonly string[]> => {
    await new Promise((settled) => setImmediate(settled))
    return view.read().rows.map((one) => one.title ?? "")
  }
  expect(await titles()).toEqual(["Alpha", "Bravo", "Charlie"])
  const patch = (only: readonly string[], fetched: readonly PageRow[]): undefined => {
    const plan = planOver(
      [...collection.values()],
      [...collection.values()].map((one) => one.id),
      only,
      fetched
    )
    if (plan.inserts.length > 0) controller.seed(plan.inserts)
    if (plan.updates.length > 0) controller.applyUpserts(plan.updates)
    if (plan.deletes.length > 0) controller.applyDeletes(plan.deletes)
    return undefined
  }
  patch(["a"], [row("a", "Delta")])
  expect(await titles()).toEqual(["Bravo", "Charlie", "Delta"])
  patch(["d"], [row("d", "Aardvark")])
  expect(await titles()).toEqual(["Aardvark", "Bravo", "Charlie", "Delta"])
  patch(["x"], [row("x", "Bravo, too")])
  expect(await titles()).toEqual(["Aardvark", "Bravo", "Bravo, too", "Charlie", "Delta"])
  patch(["b"], [row("b", "Bravo", "s2")])
  expect(await titles()).toEqual(["Aardvark", "Bravo, too", "Charlie", "Delta"])
  patch(["c"], [])
  expect(await titles()).toEqual(["Aardvark", "Bravo, too", "Delta"])
  view.dispose()
})

test("only the pages asked for can leave the shape", () => {
  const delivered = new Set(["one", "two"])
  expect(deliveredWithin(delivered, null)).toBe(delivered)
  expect(deliveredWithin(delivered, new Set(["two", "three"]))).toEqual(new Set(["two"]))
})

test("an answer holding one row this reader cannot read carries none of them", () => {
  expect(readAnswerRows({ rows: [ONE, { ...ONE, id: "not a uuid" }] })).toBe(null)
})

test("a shape never yet read is asked again within seconds, doubling up to the timer", () => {
  expect(retryAfter(1, 30_000)).toBe(1_000)
  expect(retryAfter(2, 30_000)).toBe(2_000)
  expect(retryAfter(3, 30_000)).toBe(4_000)
  expect(retryAfter(9, 30_000)).toBe(30_000)
})
