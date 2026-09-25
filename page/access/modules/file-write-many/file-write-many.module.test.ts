import { describe, expect, test } from "bun:test"
import type { FileWriteDeps } from "akasha/page/access/modules/file-write/file-write.module.code.ts"
import { upsertFilePages } from "akasha/page/access/modules/file-write-many/file-write-many.module.code.ts"
import type {
  Asked,
  Query,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

type Taken = {
  readonly asks: Query[]
  readonly writes: Writing[]
}

type Rows = readonly Record<string, unknown>[]

function watching(answers: readonly Rows[]): {
  readonly deps: FileWriteDeps
  readonly taken: Taken
} {
  const taken: Taken = { asks: [], writes: [] }
  let at = 0
  const deps: FileWriteDeps = {
    ask: (query) => {
      taken.asks.push(query)
      const rows = answers[at] ?? answers.at(-1) ?? []
      at += 1
      return Promise.resolve({ rows, n: rows.length } as Asked)
    },
    read: () => Promise.resolve({ at: "a", bodies: [], unplaced: [] }),
    write: (asked) => {
      taken.writes.push(asked)
      return Promise.resolve({ commit: "c", wrote: [], took: [] })
    },
  }
  return { deps, taken }
}

const BOTH: Rows = [{ slug: "one" }, { slug: "two" }]

describe("many upserts are one question, one write and one reading back", () => {
  test("pages named by one key each are asked for together", async () => {
    const { deps, taken } = watching([BOTH, BOTH])
    await upsertFilePages(
      {
        pageTypeSlug: "thing",
        items: [
          { where: [{ key: "slug", eq: "one" }], set: { title: "a" } },
          { where: [{ key: "slug", eq: "two" }], set: { title: "b" } },
        ],
      },
      "upsertPages",
      deps
    )
    expect(taken.asks).toHaveLength(2)
    expect(taken.asks[0]?.where).toEqual({ slug: { in: ["one", "two"] } })
    expect(taken.writes).toHaveLength(1)
    expect(taken.writes[0]?.pages).toEqual([
      { pageTypeSlug: "thing", slug: "one", values: { title: "a" }, merge: true },
      { pageTypeSlug: "thing", slug: "two", values: { title: "b" }, merge: true },
    ])
  })

  test("a page the store has not got is made in that same write", async () => {
    const { deps, taken } = watching([[{ slug: "one" }], BOTH])
    await upsertFilePages(
      {
        pageTypeSlug: "thing",
        items: [
          { where: [{ key: "slug", eq: "one" }], set: { title: "a" } },
          { where: [{ key: "slug", eq: "two" }], set: { title: "b" } },
        ],
      },
      "upsertPages",
      deps
    )
    expect(taken.writes).toHaveLength(1)
    expect(taken.writes[0]?.pages?.[1]).toEqual({
      pageTypeSlug: "thing",
      slug: "two",
      values: { title: "b", slug: "two" },
    })
  })

  test("the keys an item clears reach only a page the store has", async () => {
    const { deps, taken } = watching([[{ slug: "one" }], BOTH])
    await upsertFilePages(
      {
        pageTypeSlug: "thing",
        items: [
          { where: [{ key: "slug", eq: "one" }], set: {}, clears: ["title"] },
          { where: [{ key: "slug", eq: "two" }], set: {}, clears: ["title"] },
        ],
      },
      "upsertPages",
      deps
    )
    expect(taken.writes[0]?.pages?.[0]?.clears).toEqual(["title"])
    expect(taken.writes[0]?.pages?.[1]?.clears).toBeUndefined()
  })

  test("a row comes back for each item, in the order the items came", async () => {
    const { deps } = watching([BOTH, BOTH])
    const rows = await upsertFilePages(
      {
        pageTypeSlug: "thing",
        items: [
          { where: [{ key: "slug", eq: "two" }], set: { title: "b" } },
          { where: [{ key: "slug", eq: "one" }], set: { title: "a" } },
        ],
      },
      "upsertPages",
      deps
    )
    expect(rows.map((one) => one.slug)).toEqual(["two", "one"])
  })

  test("items narrowed by different keys are asked after one at a time", async () => {
    const { deps, taken } = watching([[{ slug: "one" }], [{ slug: "two" }], BOTH])
    await upsertFilePages(
      {
        pageTypeSlug: "thing",
        items: [
          { where: [{ key: "slug", eq: "one" }], set: { title: "a" } },
          { where: [{ key: "kind", eq: "k" }], set: { title: "b" } },
        ],
      },
      "upsertPages",
      deps
    )
    expect(taken.asks[0]?.where).toEqual({ slug: { is: "one" } })
    expect(taken.asks[1]?.where).toEqual({ kind: { is: "k" } })
    expect(taken.writes).toHaveLength(1)
  })

  test("an item matching several pages refuses before anything is written", async () => {
    const { deps, taken } = watching([
      [
        { slug: "one", kind: "k" },
        { slug: "two", kind: "k" },
      ],
    ])
    await expect(
      upsertFilePages(
        { pageTypeSlug: "thing", items: [{ where: [{ key: "kind", eq: "k" }], set: {} }] },
        "upsertPages",
        deps
      )
    ).rejects.toThrow(/at most one/)
    expect(taken.writes).toHaveLength(0)
  })

  test("no item asks nothing and writes nothing", async () => {
    const { deps, taken } = watching([])
    expect(
      await upsertFilePages({ pageTypeSlug: "thing", items: [] }, "upsertPages", deps)
    ).toEqual([])
    expect(taken.asks).toHaveLength(0)
    expect(taken.writes).toHaveLength(0)
  })

  test("a narrow the service cannot carry refuses the whole batch", async () => {
    const { deps, taken } = watching([[{ slug: "one" }]])
    await expect(
      upsertFilePages(
        {
          pageTypeSlug: "thing",
          items: [{ where: [{ or: [{ key: "a", eq: "1" }] }], set: { title: "x" } }],
        },
        "upsertPages",
        deps
      )
    ).rejects.toThrow(/narrowed by/)
    expect(taken.writes).toHaveLength(0)
  })
})
