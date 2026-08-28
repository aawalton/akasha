import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import type { ComposedQuery, NamingAsk, NamingAsked } from "@shared/pages-query/ask"
import { fetchThrough } from "@shared/pages-query/fetcher"
import type { QueryRow } from "../../pages-query/src/answer-schema.ts"
import type { Asked, Fetcher } from "../../pages-query/src/index.ts"
import type { FileReadDeps } from "./file-read.ts"
import { forgetFilePageRuns, setFileBackedPageTypes } from "./file-read.ts"
import type { FileRelationDeps } from "./file-relation.ts"
import { forgetFileShapes } from "./file-shape.ts"
import { getPagesByRelation } from "./get-by-relation.ts"
import { getPagesForView } from "./get-for-view.ts"
import type { PageCursor } from "./types.ts"
import type { Page } from "@shared/pages-core/page-types"

const TASK_TYPE_ID = "019db533-f381-7454-a6e4-fed5397cfd84"
const CATEGORY_UUID = "019eb8cb-0098-722b-8580-9fd4e057b09a"

type Held = Readonly<Record<string, readonly QueryRow[]>>

type Narrow = {
  readonly is?: unknown
  readonly in?: readonly unknown[]
  readonly has?: unknown
}

function isNarrow(value: unknown): value is Narrow {
  if (typeof value !== "object" || value === null) return false
  if ("in" in value && !Array.isArray(value.in)) return false
  return true
}

function narrowed(row: QueryRow, where: Readonly<Record<string, unknown>> | undefined): boolean {
  if (where === undefined) return true
  for (const [key, test] of Object.entries(where)) {
    const held = row.values[key]
    if (!isNarrow(test)) {
      throw new Error(`the stub was handed a narrow it cannot read at '${key}'`)
    }
    if ("is" in test && held !== test.is) return false
    if ("in" in test && !(test.in ?? []).includes(held)) return false
    if ("has" in test && !(Array.isArray(held) && held.includes(test.has))) return false
  }
  return true
}

function serving(held: Held): FileReadDeps & FileRelationDeps {
  return {
    roster: () => Promise.resolve(new Set(Object.keys(held))),
    ask: (query: ComposedQuery): Promise<Asked> => {
      const rows = held[query["page-type"]]
      if (rows === undefined) {
        return Promise.resolve({ ok: false, why: `no page type '${query["page-type"]}'` })
      }
      const kept = rows.filter((row) => narrowed(row, query.where))
      const cut = query.limit === undefined ? kept : kept.slice(0, query.limit)
      return Promise.resolve({
        ok: true,
        answer: { n: cut.length, rows: cut, value: null, over: null },
      })
    },
  }
}

function taskRows(howMany: number): readonly QueryRow[] {
  return Array.from({ length: howMany }, (_unused, at) => ({
    at: `instructions:tasks/task-${String(at).padStart(5, "0")}.md`,
    values: {
      id: `task-${String(at).padStart(5, "0")}`,
      slug: `task-${String(at).padStart(5, "0")}`,
      title: `Task ${String(at).padStart(5, "0")}`,
      "category-slug": at % 3 === 0 ? "tithing" : "shopping",
      "tag-slugs": at % 5 === 0 ? ["ai", "work"] : ["work"],
      merchant: at % 7 === 0 ? "L D S Tithing" : "Somewhere Else",
      inferenceRun: at % 11 === 0 ? "run-one" : "run-two",
    },
  }))
}

const PROPERTY_DEFINITIONS: readonly QueryRow[] = [
  {
    at: "fixture:zoo/traits/task-category-slug.md",
    values: {
      key: "category-slug",
      type: "relation-slug",
      "defined-on-slug": "task",
      "target-slug": "category",
    },
  },
  {
    at: "fixture:zoo/traits/task-tag-slugs.md",
    values: {
      key: "tag-slugs",
      type: "list(relation-slug)",
      "defined-on-slug": "task",
      "target-slug": "tag",
    },
  },
  {
    at: "fixture:zoo/traits/task-merchant.md",
    values: { key: "merchant", type: "text", "defined-on-slug": "task", "target-slug": null },
  },
  {
    at: "fixture:zoo/traits/task-inference-run.md",
    values: {
      key: "inferenceRun",
      type: "relation-id",
      "defined-on-slug": "task",
      "target-slug": "inference-run",
    },
  },
]

const CATEGORY_ROWS: readonly QueryRow[] = [
  {
    at: "fixture:zoo/habitats/tithing.md",
    values: { id: CATEGORY_UUID, slug: "tithing", title: "Tithing" },
  },
]

const PAGE_TYPE_ROWS: readonly QueryRow[] = [
  { at: "fixture:zoo/kinds/task.md", values: { slug: "task", id: TASK_TYPE_ID } },
]

function declaredBy(row: QueryRow): Record<string, unknown> {
  const key = String(row.values.key)
  return {
    key,
    type: String(row.values.type),
    title: key,
    pageId: String(row.at),
    on: String(row.values["defined-on-slug"]),
    values: null,
    targetSlug: row.values["target-slug"] ?? null,
    slugProperty: null,
    mayBeGone: false,
  }
}

function shapeOf(pageTypeSlug: string): Record<string, unknown> | null {
  const stated = PAGE_TYPE_ROWS.find((row) => row.values.slug === pageTypeSlug)
  if (stated === undefined) return null
  return {
    pageType: pageTypeSlug,
    pageTypeId: String(stated.values.id),
    ownerSlug: null,
    declarations: PROPERTY_DEFINITIONS.filter(
      (row) => row.values["defined-on-slug"] === pageTypeSlug
    ).map(declaredBy),
  }
}

const answered = (body: unknown, status: number): Promise<Response> =>
  Promise.resolve(
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    })
  )

const servingShapes: Fetcher = (url: string) => {
  const asked = /^\/shape\/(.+)$/.exec(new URL(url).pathname)
  if (asked === null) return answered({ why: `this world answers only a shape ask, not ${url}` }, 501)
  const shape = shapeOf(decodeURIComponent(asked[1] ?? ""))
  if (shape === null) return answered({ why: "no page type stands there" }, 404)
  return answered(shape, 200)
}

function world(howMany: number): Held {
  return {
    task: taskRows(howMany),
    "page-property-definition": PROPERTY_DEFINITIONS,
    "page-type": PAGE_TYPE_ROWS,
    category: CATEGORY_ROWS,
    tag: [],
    "inference-run": [],
  }
}

function idsOf(rows: readonly Page[]): readonly string[] {
  return rows.map((row) => String(row.id))
}

afterEach(() => {
  fetchThrough(null)
})

beforeEach(() => {
  fetchThrough(servingShapes)
  forgetFilePageRuns()
  forgetFileShapes()
  setFileBackedPageTypes(["task"])
})

describe("a view whose page type is file-backed", () => {
  it("draws its pages from files rather than from the rpc", async () => {
    const got = await getPagesForView(
      { pageTypeId: TASK_TYPE_ID, pageTypeSlug: "task", limit: 1000, withCount: true },
      serving(world(37))
    )
    expect(got.rows.length).toBe(37)
    expect(got.count).toBe(37)
  })

  it("yields every page exactly once where the page size does not divide the population", async () => {
    const deps = serving(world(1573))
    const seen: string[] = []
    let cursor: PageCursor | undefined
    let requests = 0
    while (requests < 500) {
      const got = await getPagesForView(
        {
          pageTypeId: TASK_TYPE_ID,
          pageTypeSlug: "task",
          sorts: [{ by: "title", dir: "asc" }],
          limit: 24,
          cursor,
        },
        deps
      )
      requests++
      seen.push(...idsOf(got.rows))
      if (got.nextCursor === null) break
      cursor = got.nextCursor
    }
    expect(seen.length).toBe(1573)
    expect(new Set(seen).size).toBe(1573)
    expect(requests).toBe(66)
  })

  it("narrows by a filter the way the rpc does", async () => {
    const got = await getPagesForView(
      {
        pageTypeId: TASK_TYPE_ID,
        pageTypeSlug: "task",
        filters: [{ key: "categorySlug", eq: "tithing" }],
        limit: 1000,
        withCount: true,
      },
      serving(world(30))
    )
    expect(got.count).toBe(10)
  })

  it("finds its page type by id where the view names no slug", async () => {
    const got = await getPagesForView(
      { pageTypeId: TASK_TYPE_ID, limit: 1000, withCount: true },
      serving(world(12))
    )
    expect(got.count).toBe(12)
  })
})

describe("a relation read against files", () => {
  const naming = (rows: readonly QueryRow[]) => (): Promise<NamingAsked> =>
    Promise.resolve({ ok: true, naming: [{ pageType: "task", key: "category-slug", rows }] })

  const asking = (held: Held, rows: readonly QueryRow[]): FileReadDeps & FileRelationDeps => ({
    ...serving(held),
    naming: naming(rows),
  })

  it("builds a page of the holder's own type from each row the service named", async () => {
    const rows = await getPagesByRelation(
      { relationKey: "category", relationValue: "tithing", pageTypeSlugs: ["task"] },
      asking(world(30), taskRows(30).slice(0, 10))
    )
    expect(rows.length).toBe(10)
    expect(new Set(rows.map((row) => String(row.slug)))).toEqual(
      new Set(taskRows(10).map((row) => String(row.values.slug)))
    )
  })

  it("honours a limit that stops short of what the service named", async () => {
    const rows = await getPagesByRelation(
      { relationKey: "category", relationValue: "tithing", pageTypeSlugs: ["task"], limit: 4 },
      asking(world(30), taskRows(30))
    )
    expect(rows.length).toBe(4)
    expect(new Set(idsOf(rows)).size).toBe(4)
  })

  it("asks for nothing at all where the limit leaves no room", async () => {
    const rows = await getPagesByRelation(
      { relationKey: "category", relationValue: "tithing", pageTypeSlugs: ["task"], limit: 0 },
      asking(world(30), taskRows(30))
    )
    expect(rows).toEqual([])
  })

  it("passes the key, the name, the page types and the limit to the service as asked", async () => {
    let asked: NamingAsk | null = null
    await getPagesByRelation(
      { relationKey: "inferenceRun", relationValue: "run-one", pageTypeSlugs: ["task"], limit: 5 },
      {
        ...serving(world(30)),
        naming: (one: NamingAsk) => {
          asked = one
          return Promise.resolve({ ok: true, naming: [] })
        },
      }
    )
    expect(asked).toEqual({
      key: "inferenceRun",
      name: "run-one",
      pageTypes: ["task"],
      limit: 5,
    })
  })

  it("throws with what the service said where the ask is refused", async () => {
    const refused = getPagesByRelation(
      { relationKey: "category", relationValue: "tithing", pageTypeSlugs: ["task"] },
      {
        ...serving(world(30)),
        naming: () => Promise.resolve({ ok: false, why: "nothing answered" }),
      }
    )
    expect(refused).rejects.toThrow("nothing answered")
  })
})
