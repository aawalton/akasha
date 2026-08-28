import { describe, expect, it } from "bun:test"
import type { ComposedQuery } from "@shared/pages-query/ask"
import type { QueryRow } from "../../pages-query/src/answer-schema"
import type { Asked } from "../../pages-query/src/index"
import { z } from "zod"
import { narrowing } from "./file-narrow"
import { getFilePage, getFilePages } from "./file-read"
import { idDerivedFrom } from "../../../page/name/naming/naming.ts"

const PAGE_TYPE = "claude-account"
const PAGE_TYPE_ID = "019db533-f381-7454-a6e4-fed5397cfd84"
const SHAPE = { pageTypeId: PAGE_TYPE_ID, definitions: [] }
const args = { pageTypeSlug: PAGE_TYPE, shape: SHAPE }

const atOf = (name: string): string => `instructions:claude-accounts/${name}.md`

const STATED_ID = "019eb7f9-816c-7d5a-bf13-8f40b5e7ec79"
const ROWS: readonly QueryRow[] = [
  { at: atOf("aine"), values: { slug: "aine", note: "one" } },
  { at: atOf("amy"), values: { slug: "amy", note: "two" } },
  { at: atOf("abby"), values: { slug: "abby", note: "three", id: STATED_ID } },
]

const AskedTest = z.object({
  is: z.string().optional(),
  in: z.array(z.string()).optional(),
  has: z.string().optional(),
  empty: z.boolean().optional(),
})

const AskedWhere = z.record(z.string(), AskedTest)

type Narrowed = {
  readonly key: string
  readonly is?: string
  readonly in?: readonly string[]
  readonly has?: string
  readonly empty?: boolean
}

function passes(values: QueryRow["values"], test: Narrowed): boolean {
  const held = values[test.key]
  if (test.is !== undefined) return held !== undefined && String(held) === test.is
  if (test.in !== undefined) return test.in.some((one) => String(held) === one)
  if (test.has !== undefined) return Array.isArray(held) && held.includes(test.has)
  if (test.empty !== undefined) return (held === undefined || held === null) === test.empty
  return true
}

function settled(row: QueryRow): QueryRow {
  const id = row.values.id ?? idDerivedFrom(row.at ?? "")
  return { at: row.at, values: { ...row.values, id } }
}

function asking(settlesId = true): {
  readonly deps: {
    ask: (query: ComposedQuery) => Promise<Asked>
    roster: () => Promise<ReadonlySet<string>>
  }
  readonly seen: readonly ComposedQuery[]
} {
  const seen: ComposedQuery[] = []
  return {
    seen,
    deps: {
      ask: (query) => {
        seen.push(query)
        const where = AskedWhere.parse(query.where ?? {})
        const tests: readonly Narrowed[] = Object.entries(where).map(([key, one]) => ({
          key,
          ...one,
        }))
        const answering = settlesId ? ROWS.map(settled) : ROWS
        const rows = answering.filter((row) => tests.every((test) => passes(row.values, test)))
        return Promise.resolve({
          ok: true as const,
          answer: { n: rows.length, rows, value: null, over: null },
        })
      },
      roster: () => Promise.resolve(new Set([PAGE_TYPE])),
    },
  }
}

describe("a page whose file states no `id:`", () => {
  it("takes the id derived from the file it stands in", async () => {
    const { deps } = asking()
    const got = await getFilePages(args, deps)
    expect(got.rows.find((row) => row.slug === "aine")?.id).toBe(idDerivedFrom(atOf("aine")))
    expect(got.rows.find((row) => row.slug === "abby")?.id).toBe(STATED_ID)
  })

  it("is read back by that derived id, which is how the write seam confirms a write landed", async () => {
    const { deps } = asking()
    const page = await getFilePage(
      { ...args, where: [{ key: "id", eq: idDerivedFrom(atOf("aine")) }] },
      deps
    )
    expect(page?.slug).toBe("aine")
  })

  it("is still not matched by an id no page carries", async () => {
    const { deps } = asking()
    const page = await getFilePage(
      { ...args, where: [{ key: "id", eq: "00000000-dead-7000-8000-000000000000" }] },
      deps
    )
    expect(page).toBeNull()
  })

  it("is found alongside a page whose file does state one", async () => {
    const { deps } = asking()
    const page = await getFilePage({ ...args, where: [{ key: "id", eq: STATED_ID }] }, deps)
    expect(page?.slug).toBe("abby")
  })

  it("asks the query service for the id test rather than fetching the whole population", async () => {
    const { deps, seen } = asking()
    const wanted = idDerivedFrom(atOf("aine"))
    const got = await getFilePages({ ...args, where: [{ key: "id", eq: wanted }] }, deps)
    expect(seen[0]).toEqual({ "page-type": PAGE_TYPE, where: { id: { is: wanted } } })
    expect(got.rows).toHaveLength(1)
  })

  it("is lost where the query service tests frontmatter alone, which is why it must settle the id", async () => {
    const { deps } = asking(false)
    const page = await getFilePage(
      { ...args, where: [{ key: "id", eq: idDerivedFrom(atOf("aine")) }] },
      deps
    )
    expect(page).toBeNull()
  })
})

describe("narrowing, which says what the query service is asked to test", () => {
  it("asks for a narrow on id, which the query service settles for every page", () => {
    expect(narrowing([{ key: "id", eq: STATED_ID }])).toEqual({ id: { is: STATED_ID } })
    expect(narrowing([{ key: "id", in: [STATED_ID] }])).toEqual({ id: { in: [STATED_ID] } })
  })

  it("still asks for a narrow on a key the file itself states", () => {
    expect(narrowing([{ key: "slug", eq: "aine" }])).toEqual({ slug: { is: "aine" } })
  })

  it("asks the service to rule out what a narrow rules out, which it tests the same way", () => {
    expect(narrowing([{ key: "slug", notIn: ["aine", "amy"] }])).toEqual({
      slug: { "not-in": ["aine", "amy"] },
    })
  })

  it("leaves a narrow the service tests differently for this side to test", () => {
    expect(narrowing([{ key: "note", isEmpty: true }])).toBeNull()
    expect(narrowing([{ key: "note", contains: "one" }])).toBeNull()
    expect(narrowing([{ key: "note", gte: "2026-01-01" }])).toBeNull()
  })

  it("asks for both tests of a narrow naming id beside a stated key", () => {
    expect(
      narrowing([
        { key: "id", eq: STATED_ID },
        { key: "slug", eq: "aine" },
      ])
    ).toEqual({ id: { is: STATED_ID }, slug: { is: "aine" } })
  })
})
