import { describe, expect, it } from "bun:test"
import type { ComposedQuery } from "@shared/pages-query/ask"
import type { QueryRow } from "../../pages-query/src/answer-schema"
import type { Asked } from "../../pages-query/src/index"
import { z } from "zod"
import { getFilePages } from "./file-read"
import type { PropertyDefinition } from "./page-type-config"

const PAGE_TYPE_ID = "019f1a5a-e6e0-7f71-a278-e0d8c5e0b5db"

const ALAN = "9ba554f7-cb18-48bb-a709-ec935a895ca7"
const SECOND = "4ee54543-cb30-4f47-a8d0-9269b4b7df76"
const THIRD = "e62e5a30-9879-40dd-be89-27b17f89ddd5"

const OWNER_SLUG = "player-id"

const def = (id: string): PropertyDefinition => ({
  id,
  title: id,
  type: "text",
  pageId: PAGE_TYPE_ID,
})

const DEFINITIONS = [def("playerId"), def("cardSlug")]

const UNOWNED = { pageTypeId: PAGE_TYPE_ID, definitions: DEFINITIONS }
const OWNED = { ...UNOWNED, ownerSlug: OWNER_SLUG }

const CARDS: readonly QueryRow[] = [ALAN, SECOND, THIRD].flatMap((player) =>
  ["abby", "amy", "nimue"].map((card) => ({
    at: `memory:idle-persona-cards/${player}/${card}.md`,
    values: { slug: card, title: card, "player-id": player, "card-slug": card },
  }))
)

const WhereTests = z.record(z.string(), z.object({ is: z.unknown().optional() }))

function isTests(query: ComposedQuery): readonly (readonly [string, string])[] {
  return Object.entries(WhereTests.parse(query.where ?? {}))
    .map(([key, test]) => [key, test.is] as const)
    .filter((one): one is readonly [string, string] => typeof one[1] === "string")
}

function firstAsked(seen: readonly ComposedQuery[]): ComposedQuery {
  const first = seen[0]
  if (first === undefined) throw new Error("the query service was never asked anything")
  return first
}

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
        const tests = isTests(query)
        const rows = CARDS.filter((row) => tests.every(([key, want]) => row.values[key] === want))
        return Promise.resolve({
          ok: true,
          answer: { n: rows.length, rows, value: null, over: null },
        })
      },
      roster: () => Promise.resolve(new Set(["idle-persona-card"])),
    },
  }
}

const order = [{ by: "slug", dir: "asc" }] as const

const OF = "idle-persona-card"

function playersIn(rows: readonly { readonly playerId?: unknown }[]): readonly string[] {
  return [...new Set(rows.map((row) => String(row.playerId)))].sort()
}

describe("a file read narrowed by userId over a type that states who owns each page", () => {
  it("answers with that owner's pages alone", async () => {
    const { deps } = asking()
    const got = await getFilePages(
      { pageTypeSlug: OF, shape: OWNED, order, where: [{ key: "userId", eq: ALAN }] },
      deps
    )
    expect(got.rows).toHaveLength(3)
    expect(playersIn(got.rows)).toEqual([ALAN])
  })

  it("asks the service under the key the files spell, never `user-id`", async () => {
    const { deps, seen } = asking()
    await getFilePages(
      { pageTypeSlug: OF, shape: OWNED, order, where: [{ key: "userId", eq: ALAN }] },
      deps
    )
    expect(isTests(firstAsked(seen))).toEqual([[OWNER_SLUG, ALAN]])
    expect(JSON.stringify(seen)).not.toContain("user-id")
  })

  it("redirects a userId leg standing inside an or", async () => {
    const { deps } = asking()
    const got = await getFilePages(
      {
        pageTypeSlug: OF,
        shape: OWNED,
        order,
        where: [{ or: [{ key: "userId", eq: SECOND }] }],
      },
      deps
    )
    expect(playersIn(got.rows)).toEqual([SECOND])
  })

  it("lets every condition standing beside it decide as before", async () => {
    const { deps } = asking()
    const got = await getFilePages(
      {
        pageTypeSlug: OF,
        shape: OWNED,
        order,
        where: [
          { key: "userId", eq: THIRD },
          { key: "cardSlug", eq: "amy" },
        ],
      },
      deps
    )
    expect(got.rows).toHaveLength(1)
    expect(got.rows[0]?.playerId).toBe(THIRD)
    expect(got.rows[0]?.cardSlug).toBe("amy")
  })

  it("carries a where naming no user through untouched", async () => {
    const { deps, seen } = asking()
    await getFilePages(
      { pageTypeSlug: OF, shape: OWNED, order, where: [{ key: "cardSlug", eq: "abby" }] },
      deps
    )
    expect(isTests(firstAsked(seen))).toEqual([["card-slug", "abby"]])
  })
})

describe("the same read over a type stating no owner slug", () => {
  it("drops the narrow and answers with the whole repo, as it did before the redirect", async () => {
    const { deps, seen } = asking()
    const got = await getFilePages(
      { pageTypeSlug: OF, shape: UNOWNED, order, where: [{ key: "userId", eq: ALAN }] },
      deps
    )
    expect(got.rows).toHaveLength(CARDS.length)
    expect(playersIn(got.rows)).toEqual([SECOND, ALAN, THIRD].sort())
    expect(isTests(firstAsked(seen))).toEqual([])
  })

  it("is the only thing separating the two answers over one corpus", async () => {
    const where = [{ key: "userId", eq: ALAN }]
    const owned = await getFilePages(
      { pageTypeSlug: OF, shape: OWNED, order, where },
      asking().deps
    )
    const unowned = await getFilePages(
      { pageTypeSlug: OF, shape: UNOWNED, order, where },
      asking().deps
    )
    expect(owned.rows).toHaveLength(3)
    expect(unowned.rows).toHaveLength(9)
  })
})
