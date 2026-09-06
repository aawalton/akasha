import { describe, expect, test } from "bun:test"
import type { Asked, Query } from "@akasha/pages-service/asking"
import type { Writing } from "@akasha/pages-service/calling"
import type { Read, Asked as Sought } from "@akasha/pages-service/reading"
import type { Wrote } from "@akasha/pages-service/writing"
import {
  createFilePage,
  type FileWriteDeps,
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

describe("a write hands over the body of a file a property is held in", () => {
  test("a patch carries the bodies beside the values", async () => {
    const { deps, taken } = watching([{ slug: "one" }])
    await patchFilePages(
      {
        pageTypeSlug: "thing",
        where: [{ key: "slug", eq: "one" }],
        set: { portrait: "md" },
        bodies: { portrait: "# one" },
      },
      "patchPage",
      deps
    )
    expect(taken.writes[0]?.pages?.[0]?.bodies).toEqual({ portrait: "# one" })
  })

  test("a create carries them too", async () => {
    const { deps, taken } = watching([{ slug: "one" }])
    await createFilePage(
      {
        pageTypeSlug: "thing",
        properties: { slug: "one", portrait: "md" },
        bodies: { portrait: "# one" },
      },
      "createPage",
      deps
    )
    expect(taken.writes[0]?.pages?.[0]?.bodies).toEqual({ portrait: "# one" })
  })

  test("an upsert carries them down whichever branch it takes", async () => {
    const standing = watching([{ slug: "one" }])
    await upsertFilePage(
      {
        pageTypeSlug: "thing",
        where: [{ key: "slug", eq: "one" }],
        set: { portrait: "md" },
        bodies: { portrait: "# one" },
      },
      "upsertPage",
      standing.deps
    )
    expect(standing.taken.writes[0]?.pages?.[0]?.bodies).toEqual({ portrait: "# one" })

    // A CREATE READS ITSELF BACK, so the fresh branch answers empty only until the page is
    // addressed by its slug — the same shape `matching none makes it` already uses.
    const writes: Writing[] = []
    const fresh: FileWriteDeps = {
      ask: (query) =>
        Promise.resolve({
          rows: query.where?.slug === undefined ? [] : [{ slug: "two" }],
        } as Asked),
      read: () => Promise.resolve({ at: "a", bodies: [], unplaced: [] }),
      write: (asked) => {
        writes.push(asked)
        return Promise.resolve({ commit: "c", wrote: [], took: [] })
      },
    }
    await upsertFilePage(
      {
        pageTypeSlug: "thing",
        where: [{ key: "other", eq: "x" }],
        set: { slug: "two", portrait: "md" },
        bodies: { portrait: "# two" },
      },
      "upsertPage",
      fresh
    )
    expect(writes[0]?.pages?.[0]?.bodies).toEqual({ portrait: "# two" })
  })

  test("a write handing over none names no bodies at all", async () => {
    const { deps, taken } = watching([{ slug: "one" }])
    await patchFilePages(
      { pageTypeSlug: "thing", where: [{ key: "slug", eq: "one" }], set: { title: "x" } },
      "patchPage",
      deps
    )
    expect(taken.writes[0]?.pages?.[0]).not.toHaveProperty("bodies")
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
