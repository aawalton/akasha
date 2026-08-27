import { describe, expect, it } from "bun:test"
import type { ComposedQuery } from "@shared/pages-query/ask"
import type { QueryRow } from "../../pages-query/src/answer-schema"
import type { Asked } from "../../pages-query/src/index"
import { matches } from "./file-narrow"
import { forgetOmittedWarnings, getFilePage, getFilePages } from "./file-read"
import { camelizeKey } from "./file-rows"
import type { PropertyDefinition } from "./page-type-config"
import { type PageOrder } from "./types"
import { Page } from "@shared/pages-core/page-types"

const PAGE_TYPE_ID = "019db533-f381-7454-a6e4-fed5397cfd84"

const def = (id: string, type: string): PropertyDefinition => ({
  id,
  title: id,
  type,
  pageId: PAGE_TYPE_ID,
})

const SHAPE = {
  pageTypeId: PAGE_TYPE_ID,
  definitions: [def("aliasIndex", "number"), def("live", "boolean"), def("tags", "multi-select")],
}

const ROWS: readonly QueryRow[] = [
  {
    at: "fixture:zoo/animals/lion.md",
    values: { slug: "lion", title: "Lion", "alias-index": "2", live: "true", tags: ["one"] },
  },
  {
    at: "fixture:zoo/animals/otter.md",
    values: {
      slug: "otter",
      title: "Otter",
      "alias-index": "1",
      live: "false",
      tags: ["one", "two"],
    },
  },
  {
    at: "fixture:zoo/animals/heron.md",
    values: { slug: "heron", title: "Heron", "alias-index": "3", live: "true" },
  },
]

function asking(held: readonly QueryRow[] = ROWS): {
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
          answer: { n: held.length, rows: [...held], value: null, over: null },
        })
      },
      roster: () => Promise.resolve(new Set(["claude-account"])),
    },
  }
}

const args = {
  pageTypeSlug: "claude-account",
  shape: SHAPE,
}

const camelDef = (key: string, type: string): PropertyDefinition => ({
  id: camelizeKey(key),
  key,
  title: key,
  type,
  pageId: PAGE_TYPE_ID,
})

const CAMEL_SHAPE = {
  pageTypeId: PAGE_TYPE_ID,
  definitions: [camelDef("sortOrder", "number")],
}

const CAMEL_ROWS: readonly QueryRow[] = [
  { at: "fixture:zoo/animals/otter.md", values: { slug: "otter", sortOrder: "1" } },
  { at: "fixture:zoo/animals/lion.md", values: { slug: "lion", sortOrder: "2" } },
]

function askingCamel(): {
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
        const asked = query.keys
        const rows = CAMEL_ROWS.map((row) => ({
          at: row.at,
          values:
            asked === undefined
              ? row.values
              : Object.fromEntries(
                  Object.entries(row.values).filter(([key]) => asked.includes(key))
                ),
        }))
        const answered: Asked = {
          ok: true,
          answer: {
            n: rows.length,
            rows,
            value: null,
            over: null,
            faults: [],
            omitted: [],
            unfound: [],
          },
        }
        return Promise.resolve(answered)
      },
      roster: () => Promise.resolve(new Set(["claude-account"])),
    },
  }
}

describe("a read of a file-backed page type", () => {
  it("answers a page carrying every value the file states, under the key a definition names", async () => {
    const { deps } = asking()
    const got = await getFilePages({ ...args, order: [{ by: "aliasIndex", dir: "asc" }] }, deps)
    expect(got.rows.map((row) => row.slug)).toEqual(["otter", "lion", "heron"])
    expect(got.rows[0]?.aliasIndex).toBe(1)
    expect(got.rows[0]?.live).toBe(false)
  })

  it("sorts by a declared number as a number rather than as text", async () => {
    const many = [
      { at: "a", values: { slug: "a", "alias-index": "10" } },
      { at: "b", values: { slug: "b", "alias-index": "9" } },
    ]
    const { deps } = asking(many)
    const got = await getFilePages({ ...args, order: [{ by: "aliasIndex", dir: "asc" }] }, deps)
    expect(got.rows.map((row) => row.slug)).toEqual(["b", "a"])
  })

  it("filters on every condition the caller stated, whatever the service could narrow", async () => {
    const { deps } = asking()
    const got = await getFilePages(
      { ...args, where: [{ key: "live", eq: true }], order: [{ by: "aliasIndex", dir: "asc" }] },
      deps
    )
    expect(got.rows.map((row) => row.slug)).toEqual(["lion", "heron"])
  })

  it("narrows at the service only where the narrowing cannot drop a page the caller wanted", async () => {
    const { deps, seen } = asking()
    await getFilePages(
      {
        ...args,
        where: [
          { key: "status", eq: "open" },
          { key: "aliasIndex", eq: 2 },
        ],
      },
      deps
    )
    expect(seen[0]?.where).toEqual({ status: { is: "open" } })
  })

  it("keeps a value the file states under a key no promoted column names", async () => {
    const { deps } = asking([
      { at: "one", values: { slug: "one", status: "done" } },
      { at: "two", values: { slug: "two", status: "open" } },
    ])
    const got = await getFilePages({ ...args, where: [{ key: "status", eq: "done" }] }, deps)
    expect(got.rows.map((row) => row.slug)).toEqual(["one"])
  })

  it("counts every page that matched rather than the page it handed back", async () => {
    const { deps } = asking()
    const got = await getFilePages({ ...args, limit: 1, withCount: true }, deps)
    expect(got.rows.length).toBe(1)
    expect(got.count).toBe(3)
  })

  it("takes an offset past the pages it would otherwise have answered", async () => {
    const { deps } = asking()
    const got = await getFilePages(
      { ...args, order: [{ by: "aliasIndex", dir: "asc" }], offset: 2 },
      deps
    )
    expect(got.rows.map((row) => row.slug)).toEqual(["heron"])
  })

  it("answers nothing rather than raising where one page was asked for and none matched", async () => {
    const { deps } = asking()
    expect(await getFilePage({ ...args, where: [{ key: "slug", eq: "nobody" }] }, deps)).toBeNull()
  })

  it("raises where one page was asked for and several matched, rather than picking one", async () => {
    const { deps } = asking()
    await expect(
      getFilePage({ ...args, where: [{ key: "live", eq: true }] }, deps)
    ).rejects.toThrow(/expected at most one page/)
  })

  it("says what went unanswered rather than reporting a page type with nothing in it", async () => {
    const deps = {
      ask: () => Promise.resolve({ ok: false, why: "the service gave no answer" } as const),
      roster: () => Promise.resolve(new Set<string>()),
    }
    await expect(getFilePages(args, deps)).rejects.toThrow(/gave no answer/)
  })
})

describe("a condition judged against a page the files answered", () => {
  const page = Page({ slug: "alpha", tags: ["one", "two"], title: null, count: 3 })

  it.each([
    [{ key: "count", gte: 3 }, true],
    [{ key: "count", gt: 3 }, false],
    [{ key: "count", lt: 10 }, true],
    [{ key: "tags", includes: "two" }, true],
    [{ key: "tags", includes: "three" }, false],
    [{ key: "title", isNull: true }, true],
    [{ key: "title", isEmpty: true }, true],
    [{ key: "tags", isNotEmpty: true }, true],
    [{ key: "slug", in: ["alpha", "beta"] }, true],
    [{ key: "slug", notIn: ["alpha"] }, false],
    [{ key: "slug", contains: "LPH" }, true],
    [{ key: "slug", notContains: "zzz" }, true],
    [
      {
        or: [
          { key: "slug", eq: "nobody" },
          { key: "count", eq: 3 },
        ],
      },
      true,
    ],
  ] as const)("judges %o", (condition, verdict) => {
    expect(matches(page, condition)).toBe(verdict)
  })
})

describe("the spelling this reader answers to", () => {
  it("answers a kebab key in `select` with the value its camelCase spelling carries", async () => {
    const { deps } = asking()
    const got = await getFilePages(
      { ...args, select: ["slug", "alias-index"], order: [{ by: "aliasIndex", dir: "asc" }] },
      deps
    )
    expect(got.rows.map((row) => row["alias-index"])).toEqual([1, 2, 3])
  })

  it("answers a camelCase key in `select`, which is the spelling of its own boundary", async () => {
    const { deps } = asking()
    const got = await getFilePages(
      { ...args, select: ["slug", "aliasIndex"], order: [{ by: "aliasIndex", dir: "asc" }] },
      deps
    )
    expect(got.rows.map((row) => row.aliasIndex)).toEqual([1, 2, 3])
  })

  it("leaves a key no definition declares alone, kebab or not", async () => {
    const { deps } = asking()
    const got = await getFilePages({ ...args, select: ["slug", "no-such-key"] }, deps)
    expect(got.rows[0]?.["no-such-key"]).toBeNull()
  })

  it("says nothing about a camelCase key a definition declares camelCase, which is not this mistake", async () => {
    const { deps } = asking()
    const got = await getFilePages(
      { pageTypeSlug: "claude-account", shape: CAMEL_SHAPE, select: ["sortOrder"] },
      deps
    )
    expect(got.rows).toHaveLength(3)
  })
})

describe("a property whose own declaration spells it camelCase", () => {
  const camel = { pageTypeSlug: "claude-account", shape: CAMEL_SHAPE }
  const ascending: PageOrder = [{ by: "sortOrder", dir: "asc" }]

  it("asks the service under the spelling that declaration states, not a kebab guess", async () => {
    const { deps, seen } = askingCamel()
    await getFilePages({ ...camel, select: ["slug", "sortOrder"], order: ascending }, deps)
    expect(seen[0]?.keys).toContain("sortOrder")
    expect(seen[0]?.keys).not.toContain("sort-order")
  })

  it("answers its value under the key the caller named, rather than a silent null", async () => {
    const { deps } = askingCamel()
    const got = await getFilePages(
      { ...camel, select: ["slug", "sortOrder"], order: ascending },
      deps
    )
    expect(got.rows.map((row) => row.sortOrder)).toEqual([1, 2])
  })

  it("asks for a key it narrows on even where the `select` never names it", async () => {
    const { deps, seen } = askingCamel()
    await getFilePages({ ...camel, where: [{ key: "sortOrder", eq: 2 }], select: ["slug"] }, deps)
    expect(seen[0]?.keys).toContain("sortOrder")
  })

  it("keeps matching a narrow on it once a `select` is given, rather than answering zero", async () => {
    const { deps } = askingCamel()
    const got = await getFilePages(
      { ...camel, where: [{ key: "sortOrder", eq: 2 }], select: ["slug"] },
      deps
    )
    expect(got.rows.map((row) => row.slug)).toEqual(["lion"])
  })

  it("answers nothing where that narrow names a value no page carries", async () => {
    const { deps } = askingCamel()
    const got = await getFilePages(
      { ...camel, where: [{ key: "sortOrder", eq: 99 }], select: ["slug"] },
      deps
    )
    expect(got.rows).toHaveLength(0)
  })

  it("answers its kebab spelling in `select` with the value the declaration carries", async () => {
    const { deps } = askingCamel()
    const got = await getFilePages({ ...camel, select: ["sort-order"], order: ascending }, deps)
    expect(got.rows.map((row) => row["sort-order"])).toEqual([1, 2])
  })

  it("leaves a key no definition declares as a null, so a wrong name stays visible", async () => {
    const { deps } = askingCamel()
    const got = await getFilePages({ ...camel, select: ["slug", "nosuchKey"] }, deps)
    expect(got.rows[0]?.nosuchKey).toBeNull()
  })
})

describe("a select-less read and the large properties it leaves behind", () => {
  it("names every large key the answer omitted, rather than passing a zero on in silence", async () => {
    forgetOmittedWarnings()
    const said: string[] = []
    const held = console.warn
    console.warn = (...parts: readonly unknown[]) => said.push(parts.join(" "))
    try {
      const { deps } = asking()
      const answered: Asked = {
        ok: true,
        answer: {
          n: ROWS.length,
          rows: [...ROWS],
          value: null,
          over: null,
          faults: [],
          omitted: ["passage-text"],
          unfound: [],
        },
      }
      await getFilePages(args, {
        ...deps,
        ask: () => Promise.resolve(answered),
      })
    } finally {
      console.warn = held
    }
    expect(said).toHaveLength(1)
    expect(said[0]).toContain("passage-text")
    expect(said[0]).toContain("select")
  })

  it("says nothing where the answer omitted no large value", async () => {
    forgetOmittedWarnings()
    const said: string[] = []
    const held = console.warn
    console.warn = (...parts: readonly unknown[]) => said.push(parts.join(" "))
    try {
      const { deps } = asking()
      await getFilePages(args, deps)
    } finally {
      console.warn = held
    }
    expect(said).toEqual([])
  })
})
