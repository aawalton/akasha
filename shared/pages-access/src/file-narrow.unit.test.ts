import { describe, expect, it } from "bun:test"
import type { ComposedQuery } from "@shared/pages-query/ask"
import type { QueryRow } from "../../pages-query/src/answer-schema"
import type { Asked } from "../../pages-query/src/index"
import { getFilePages } from "./file-read"
import type { PropertyDefinition } from "./page-type-config"

const PAGE_TYPE_ID = "019db533-f381-7454-a6e4-fed5397cfd84"
const ALAN = "9ba554f7-cb18-48bb-a709-ec935a895ca7"

const def = (id: string, type: string): PropertyDefinition => ({
  id,
  title: id,
  type,
  pageId: PAGE_TYPE_ID,
})

const SHAPE = { pageTypeId: PAGE_TYPE_ID, definitions: [def("app", "text")] }

const ROWS: readonly QueryRow[] = [
  {
    at: "fixture:zoo/animals/heron.md",
    values: { slug: "heron", title: "Heron", app: "alanwalton" },
  },
  { at: "fixture:zoo/animals/otter.md", values: { slug: "otter", title: "Otter" } },
]

function asking(): {
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
        return Promise.resolve({
          ok: true,
          answer: { n: ROWS.length, rows: [...ROWS], value: null, over: null },
        })
      },
      roster: () => Promise.resolve(new Set(["nav"])),
    },
  }
}

const args = {
  pageTypeSlug: "nav",
  shape: SHAPE,
  order: [{ by: "slug", dir: "asc" }] as const,
}

describe("a file read narrowed by the user a file cannot hold", () => {
  it("answers with the repo's pages, which are the pages the narrow meant", async () => {
    const { deps } = asking()
    const got = await getFilePages({ ...args, where: [{ key: "userId", eq: ALAN }] }, deps)
    expect(got.rows.map((row) => row.slug)).toEqual(["heron", "otter"])
    expect(got.rows[0]?.userId).toBeUndefined()
  })

  it("asks the service for no key a file page cannot carry", async () => {
    const { deps, seen } = asking()
    await getFilePages({ ...args, where: [{ key: "userId", eq: ALAN }], select: ["slug"] }, deps)
    expect(JSON.stringify(seen)).not.toContain("user-id")
  })

  it("applies every other condition standing beside it", async () => {
    const { deps } = asking()
    const kept = await getFilePages(
      {
        ...args,
        where: [
          { key: "userId", eq: ALAN },
          { key: "slug", eq: "heron" },
        ],
      },
      deps
    )
    expect(kept.rows.map((row) => row.slug)).toEqual(["heron"])
    const missed = await getFilePages(
      {
        ...args,
        where: [
          { key: "userId", eq: ALAN },
          { key: "slug", eq: "nope" },
        ],
      },
      deps
    )
    expect(missed.rows).toEqual([])
  })

  it("leaves the other legs of an or to decide it", async () => {
    const { deps } = asking()
    const beside = await getFilePages(
      {
        ...args,
        where: [
          {
            or: [
              { key: "userId", eq: ALAN },
              { key: "slug", eq: "heron" },
            ],
          },
        ],
      },
      deps
    )
    expect(beside.rows.map((row) => row.slug)).toEqual(["heron"])
    const alone = await getFilePages(
      { ...args, where: [{ or: [{ key: "userId", eq: ALAN }] }] },
      deps
    )
    expect(alone.rows.map((row) => row.slug)).toEqual(["heron", "otter"])
  })

})

const CAMEL_ROWS: readonly QueryRow[] = [
  { at: "books:a/chapters/1.md", values: { slug: "apology", partOf: "plato", dueDate: "x" } },
  { at: "books:b/chapters/1.md", values: { slug: "prologue", partOf: "other", dueDate: "y" } },
]

function askingCamel(declared: string): {
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
        return Promise.resolve({
          ok: true,
          answer: { n: CAMEL_ROWS.length, rows: [...CAMEL_ROWS], value: null, over: null },
        })
      },
      roster: () => Promise.resolve(new Set([declared])),
    },
  }
}

describe("a narrow on a page type whose declaration spells its key in camelCase", () => {
  const shape = {
    pageTypeId: PAGE_TYPE_ID,
    definitions: [{ id: "partOf", key: "partOf", title: "Part of", type: "text", pageId: "p" }],
  }
  const camelArgs = { pageTypeSlug: "book-chapter", shape }

  it("asks under the spelling the declaration states, not a kebabized guess", async () => {
    const { deps, seen } = askingCamel("book-chapter")
    await getFilePages({ ...camelArgs, where: [{ key: "partOf", eq: "plato" }] }, deps)
    expect(seen[0]?.where).toEqual({ partOf: { is: "plato" } })
  })

  it("keeps the rows the narrow meant rather than dropping every one", async () => {
    const { deps } = askingCamel("book-chapter")
    const got = await getFilePages({ ...camelArgs, where: [{ key: "partOf", eq: "plato" }] }, deps)
    expect(got.rows.map((row) => row.slug)).toEqual(["apology"])
  })

  it("still kebabizes a key no declaration claims, which is what a kebab type wants", async () => {
    const { deps, seen } = askingCamel("book-chapter")
    await getFilePages({ ...camelArgs, where: [{ key: "dueDate", eq: "x" }] }, deps)
    expect(seen[0]?.where).toEqual({ "due-date": { is: "x" } })
  })
})
