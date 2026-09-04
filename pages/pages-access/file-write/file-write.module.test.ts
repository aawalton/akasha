import { describe, expect, test } from "bun:test"
import type { Asked, Query } from "@akasha/pages-system-service/asking"
import type { Writing } from "@akasha/pages-system-service/calling"
import type { Read, Asked as Sought } from "@akasha/pages-system-service/reading"
import type { Wrote } from "@akasha/pages-system-service/writing"
import {
  createFilePage,
  type FileWriteDeps,
  loweredFrom,
  narrowedFrom,
  patchFilePages,
  removeFilePages,
  slugForNew,
  slugsOf,
  upsertFilePage,
  writerLine,
} from "./file-write.module.code.ts"

type Taken = {
  readonly asks: Query[]
  readonly reads: Sought[]
  readonly writes: Writing[]
}

function watching(
  rows: readonly Record<string, unknown>[],
  over: { readonly read?: Read; readonly wrote?: Wrote } = {}
): { readonly deps: FileWriteDeps; readonly taken: Taken } {
  const taken: Taken = { asks: [], reads: [], writes: [] }
  const deps: FileWriteDeps = {
    ask: (query) => {
      taken.asks.push(query)
      return Promise.resolve({ rows } as Asked)
    },
    read: (sought) => {
      taken.reads.push(sought)
      return Promise.resolve(
        over.read ?? {
          at: "abc",
          bodies: rows.map((one) => ({
            path: `akasha/x/${String(one.slug)}.thing.ts`,
            content: "",
          })),
          unplaced: [],
        }
      )
    },
    write: (asked) => {
      taken.writes.push(asked)
      return Promise.resolve(over.wrote ?? { commit: "c1", wrote: [], took: [] })
    },
  }
  return { deps, taken }
}

describe("a narrow is lowered whole or it refuses", () => {
  test("eq lowers to `is`", () => {
    expect(loweredFrom({ key: "title", eq: "one" })).toEqual({
      key: "title",
      test: { is: "one" },
    })
  })

  test("a number is lowered as its text, because a test carries text", () => {
    expect(loweredFrom({ key: "seq", eq: 3 })).toEqual({ key: "seq", test: { is: "3" } })
  })

  test("in lowers to `in`", () => {
    expect(loweredFrom({ key: "slug", in: ["a", "b"] })).toEqual({
      key: "slug",
      test: { in: ["a", "b"] },
    })
  })

  test("an `or` refuses rather than widening the write", () => {
    const held = loweredFrom({ or: [{ key: "a", eq: "1" }] })
    expect("refused" in held).toBe(true)
  })

  test("notContains refuses, the service running no such test", () => {
    const held = loweredFrom({ key: "a", notContains: "x" })
    expect("refused" in held).toBe(true)
  })

  // THE CONDITION THAT MUST NEVER VANISH. `userId` is the key the old road stripped, which
  // widened a scoped write to every account's pages. Here it is carried through as an ordinary
  // test, and the service refuses it where the page type declares no such property.
  test("a userId condition is carried rather than stripped", () => {
    const held = narrowedFrom([{ key: "userId", eq: "u-1" }])
    expect(held).toEqual({ where: { userId: { is: "u-1" } } })
  })

  test("two conditions on one key are carried together", () => {
    expect(
      narrowedFrom([
        { key: "a", eq: "1" },
        { key: "b", in: ["x"] },
      ])
    ).toEqual({
      where: { a: { is: "1" }, b: { in: ["x"] } },
    })
  })

  test("one key tested twice the same way refuses", () => {
    const held = narrowedFrom([
      { key: "a", eq: "1" },
      { key: "a", eq: "2" },
    ])
    expect("refused" in held).toBe(true)
  })

  test("a narrow it cannot carry refuses the whole write", async () => {
    const { deps, taken } = watching([{ slug: "one" }])
    await expect(
      patchFilePages(
        { pageTypeSlug: "thing", where: [{ or: [{ key: "a", eq: "1" }] }], set: { title: "x" } },
        "patchPage",
        deps
      )
    ).rejects.toThrow(/narrowed by/)
    expect(taken.writes).toHaveLength(0)
  })
})

describe("a patch merges over what the page carries", () => {
  test("it writes every matched slug with merge set", async () => {
    const { deps, taken } = watching([{ slug: "one" }, { slug: "two" }])
    await patchFilePages(
      { pageTypeSlug: "thing", where: [{ key: "kind", eq: "k" }], set: { title: "x" } },
      "patchPage",
      deps
    )
    expect(taken.writes).toHaveLength(1)
    expect(taken.writes[0]?.pages).toEqual([
      { pageTypeSlug: "thing", slug: "one", values: { title: "x" }, merge: true },
      { pageTypeSlug: "thing", slug: "two", values: { title: "x" }, merge: true },
    ])
  })

  test("it answers the rows it wrote", async () => {
    const { deps } = watching([{ slug: "one", title: "x" }])
    const rows = await patchFilePages(
      { pageTypeSlug: "thing", where: [{ key: "slug", eq: "one" }], set: { title: "x" } },
      "patchPage",
      deps
    )
    expect(rows).toHaveLength(1)
    expect(rows[0]?.slug).toBe("one")
  })

  test("matching nothing writes nothing and answers nothing", async () => {
    const { deps, taken } = watching([])
    const rows = await patchFilePages(
      { pageTypeSlug: "thing", where: [{ key: "slug", eq: "gone" }], set: { title: "x" } },
      "patchPage",
      deps
    )
    expect(rows).toEqual([])
    expect(taken.writes).toHaveLength(0)
  })

  test("naming at most one and matching two refuses before writing", async () => {
    const { deps, taken } = watching([{ slug: "one" }, { slug: "two" }])
    await expect(
      patchFilePages(
        { pageTypeSlug: "thing", where: [{ key: "k", eq: "v" }], set: {}, atMostOne: true },
        "patchPage",
        deps
      )
    ).rejects.toThrow(/at most one/)
    expect(taken.writes).toHaveLength(0)
  })

  test("a refused write is raised rather than answered as nothing written", async () => {
    const { deps } = watching([{ slug: "one" }], { wrote: { refused: "no such property" } })
    await expect(
      patchFilePages(
        { pageTypeSlug: "thing", where: [{ key: "slug", eq: "one" }], set: { nope: 1 } },
        "patchPage",
        deps
      )
    ).rejects.toThrow(/no such property/)
  })
})

describe("a create is addressed by its slug", () => {
  test("it takes the slug among its values", async () => {
    const { deps, taken } = watching([{ slug: "one" }])
    await createFilePage({ pageTypeSlug: "thing", properties: { slug: "one" } }, "createPage", deps)
    expect(taken.writes[0]?.pages?.[0]?.slug).toBe("one")
    expect(taken.writes[0]?.pages?.[0]?.merge).toBeUndefined()
  })

  test("it takes a stated name over the values", () => {
    expect(slugForNew("createPage", "thing", "named", { slug: "other" })).toBe("named")
  })

  test("stating no slug at all refuses", () => {
    expect(() => slugForNew("createPage", "thing", undefined, { title: "x" })).toThrow(
      /states none/
    )
  })

  test("no id is minted here, the landing minting it", async () => {
    const { deps, taken } = watching([{ slug: "one" }])
    await createFilePage({ pageTypeSlug: "thing", properties: { slug: "one" } }, "createPage", deps)
    expect(taken.writes[0]?.pages?.[0]?.values.id).toBeUndefined()
  })
})

describe("an upsert writes over what is there or makes it", () => {
  test("matching one merges over it", async () => {
    const { deps, taken } = watching([{ slug: "one" }])
    const held = await upsertFilePage(
      { pageTypeSlug: "thing", where: [{ key: "slug", eq: "one" }], set: { title: "x" } },
      "upsertPage",
      deps
    )
    expect(held.created).toBe(false)
    expect(taken.writes[0]?.pages?.[0]?.merge).toBe(true)
  })

  test("matching none makes it under the slug the where looked for", async () => {
    const deps: FileWriteDeps = {
      ask: (query) =>
        Promise.resolve({
          rows: query.where?.slug === undefined ? [] : [{ slug: "fresh" }],
        } as Asked),
      read: () => Promise.resolve({ at: "a", bodies: [], unplaced: [] }),
      write: () => Promise.resolve({ commit: "c", wrote: [], took: [] }),
    }
    const held = await upsertFilePage(
      { pageTypeSlug: "thing", where: [{ key: "other", eq: "x" }], set: { slug: "fresh" } },
      "upsertPage",
      deps
    )
    expect(held.created).toBe(true)
  })
})

describe("a remove takes the path the service reports", () => {
  test("it removes by path rather than by slug", async () => {
    const { deps, taken } = watching([{ slug: "one" }])
    await removeFilePages(
      { pageTypeSlug: "thing", where: [{ key: "slug", eq: "one" }] },
      "deletePages",
      deps
    )
    expect(taken.writes[0]?.removes).toEqual(["akasha/x/one.thing.ts"])
    expect(taken.writes[0]?.pages).toBeUndefined()
  })

  test("a slug at no path refuses rather than taking away nothing quietly", async () => {
    const { deps, taken } = watching([{ slug: "one" }], {
      read: { at: "a", bodies: [], unplaced: ["thing/one"] },
    })
    await expect(
      removeFilePages({ pageTypeSlug: "thing", where: [{ key: "slug", eq: "one" }] }, "d", deps)
    ).rejects.toThrow(/is at no path/)
    expect(taken.writes).toHaveLength(0)
  })
})

describe("what a write says about itself", () => {
  test("a writer is named as a name and an address", () => {
    expect(writerLine("amy")).toBe("amy <amy@alanwalton.com>")
  })

  test("a row naming no slug refuses, nothing being addressable without one", () => {
    expect(() => slugsOf("patchPage", "thing", [{ id: "x" }])).toThrow(/names no `slug`/)
  })
})
