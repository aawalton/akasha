import { afterEach, describe, expect, test } from "bun:test"
import { z } from "zod"
import { forgetFileBackedPageTypes, setFileBackedPageTypes } from "./file-read"
import { forgetFileShapes } from "./file-shape"
import { forgetFileBackings, setFileBackings } from "./file-write-backing"
import { patchPages } from "./patch"
import type { PageWhere } from "@shared/pages-core/page-types"

const OWNED = "fixture-owned-card"
const PLAIN = "fixture-plain-card"
const OWNER_KEY = "player-id"

const ALAN = "9ba554f7-cb18-48bb-a709-ec935a895ca7"
const SECOND = "4ee54543-cb30-4f47-a8d0-9269b4b7df76"
const NOBODY = "e62e5a30-9879-40dd-be89-27b17f89ddd5"

const idOf = (at: number): string => `019f0000-0000-7000-8000-${String(at).padStart(12, "0")}`

const OWNERS: readonly string[] = [ALAN, ALAN, SECOND]

function reply(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function pagesOf(slug: string): unknown {
  return {
    n: OWNERS.length,
    rows: OWNERS.map((owner, at) => ({
      at: `memory:fixture-2999-13-45-${slug}/card-${at}.md`,
      values: {
        id: idOf(at),
        "page-type-slug": slug,
        title: `Card ${at}`,
        note: "untouched",
        [OWNER_KEY]: owner,
      },
    })),
  }
}

const ACT_PATH = /^\/(remove|patch|write)\/([^/]+)\/(.+)$/

const ACT_PATH_CAPTURE = z.tuple([z.string(), z.string(), z.string(), z.string()]).nullable()
const QUERY_BODY = z.record(z.string(), z.unknown())
const QUERY_WHERE = z.record(z.string(), z.object({ is: z.unknown().optional() })).optional()

function parseActPath(path: string): { verb: string; name: string } | null {
  const captured = ACT_PATH_CAPTURE.parse(ACT_PATH.exec(path))
  if (captured === null) return null
  return { verb: captured[1], name: decodeURIComponent(captured[3]) }
}

function parseQueryBody(init: RequestInit | undefined): Record<string, unknown> {
  return QUERY_BODY.parse(JSON.parse(String(init?.body ?? "{}")))
}

function parseQueryWhere(where: unknown): Record<string, { is?: unknown }> {
  return QUERY_WHERE.parse(where) ?? {}
}

function shaped(slug: string): unknown {
  return {
    pageType: slug,
    pageTypeId: `019f0000-0000-7000-9000-00000000000${slug === OWNED ? 1 : 2}`,
    ownerSlug: slug === OWNED ? OWNER_KEY : null,
    declarations: [
      { key: "note", type: "text", title: "note", pageId: `${slug}-note`, on: slug },
      { key: OWNER_KEY, type: "text", title: OWNER_KEY, pageId: `${slug}-owner`, on: slug },
    ],
  }
}

function answered(query: Record<string, unknown>): unknown {
  const type = query["page-type"]
  if (type === "page-type") {
    const want = parseQueryWhere(query.where).slug?.is
    const rows = [OWNED, PLAIN]
      .filter((slug) => want === undefined || slug === want)
      .map((slug) => ({
        at: `instructions:page-types/${slug}.md`,
        values: {
          slug,
          id: `019f0000-0000-7000-9000-00000000000${slug === OWNED ? 1 : 2}`,
          "extends-slug": null,
          "owner-slug": slug === OWNED ? OWNER_KEY : null,
        },
      }))
    return { n: rows.length, rows }
  }
  if (type === "page-property-definition") {
    return {
      n: 2,
      rows: [OWNED, PLAIN].flatMap((slug) => [
        {
          at: `${slug}-note`,
          values: { key: "note", type: "text", "defined-on-slug": slug, id: `${slug}-note` },
        },
        {
          at: `${slug}-owner`,
          values: { key: OWNER_KEY, type: "text", "defined-on-slug": slug, id: `${slug}-owner` },
        },
      ]),
    }
  }
  if (type === OWNED || type === PLAIN) return pagesOf(String(type))
  return { n: 0, rows: [] }
}

let stop: (() => void) | null = null
let patched: string[] = []

function serve(): undefined {
  const real = globalThis.fetch
  patched = []
  forgetFileBackedPageTypes()
  forgetFileBackings()
  forgetFileShapes()
  setFileBackedPageTypes([OWNED, PLAIN])
  setFileBackings([
    {
      slug: OWNED,
      repo: "memory",
      glob: `fixture-2999-13-45-${OWNED}/*.md`,
      heldBy: [],
      namedFor: null,
    },
    {
      slug: PLAIN,
      repo: "memory",
      glob: `fixture-2999-13-45-${PLAIN}/*.md`,
      heldBy: [],
      namedFor: null,
    },
  ])
  globalThis.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url
    const path = new URL(url, "http://fixture.invalid").pathname
    const shape = /^\/shape\/(.+)$/.exec(path)
    if (shape !== null) return reply(shaped(String(shape[1])))
    if (path === "/q") {
      return reply(answered(parseQueryBody(init)))
    }
    const act = parseActPath(path)
    if (act !== null) {
      const name = act.name
      patched.push(name)
      return reply({ ok: true, at: `memory:fixture-2999-13-45-${OWNED}/${name}.md` })
    }
    return reply({ error: "no page stands there" }, 404)
  }
  stop = () => {
    globalThis.fetch = real
    forgetFileBackedPageTypes()
    forgetFileBackings()
    forgetFileShapes()
  }
}

afterEach(() => {
  stop?.()
  stop = null
})

const by = (userId: string): PageWhere => [{ key: "userId", eq: userId }]

describe("a write narrowed by user over a page type that states its owner key", () => {
  test("takes the narrow and scopes it to the pages that owner holds", async () => {
    serve()
    const done = await patchPages({
      pageTypeSlug: OWNED,
      where: by(ALAN),
      set: { note: "scoped" },
    })
    expect(done.length).toBe(2)
    expect(patched).toEqual(["card-0", "card-1"])
  })

  test("scopes to a different owner's pages rather than to everything", async () => {
    serve()
    await patchPages({ pageTypeSlug: OWNED, where: by(SECOND), set: { note: "scoped" } })
    expect(patched).toEqual(["card-2"])
  })

  test("an owner holding no page here matches none, never all", async () => {
    serve()
    const done = await patchPages({
      pageTypeSlug: OWNED,
      where: by(NOBODY),
      set: { note: "scoped" },
    })
    expect(done).toEqual([])
    expect(patched).toEqual([])
  })

  test("a garbage string matches none, never all", async () => {
    serve()
    await patchPages({
      pageTypeSlug: OWNED,
      where: by("not-a-uuid-at-all"),
      set: { note: "scoped" },
    })
    expect(patched).toEqual([])
  })
})

describe("a write narrowed by user over a page type that states no owner key", () => {
  test("is refused loudly rather than matching every page", async () => {
    serve()
    const going = patchPages({
      pageTypeSlug: PLAIN,
      where: by(ALAN),
      set: { note: "clobbered" },
    })
    await expect(going).rejects.toThrow(/narrows by `userId`/)
    expect(patched).toEqual([])
  })

  test("the refusal names a file carrying no owner of its own as the reason", async () => {
    serve()
    const going = patchPages({
      pageTypeSlug: PLAIN,
      where: by(ALAN),
      set: { note: "clobbered" },
    })
    await expect(going).rejects.toThrow(/carries no owner of its own/)
  })
})

describe("the other synthetic keys stay refused whatever the owner key says", () => {
  test("seq is refused on a page type that states an owner key", async () => {
    serve()
    const going = patchPages({
      pageTypeSlug: OWNED,
      where: [{ key: "seq", eq: 0 }],
      set: { note: "x" },
    })
    await expect(going).rejects.toThrow(/narrows by `seq`/)
  })
})
