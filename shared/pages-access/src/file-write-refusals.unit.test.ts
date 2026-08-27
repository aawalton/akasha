import { afterEach, describe, expect, test } from "bun:test"
import { z } from "zod"
import { hardDeletePage, hardDeletePageById, hardDeletePages, softDeletePage } from "./delete"
import { forgetFileBackedPageTypes, setFileBackedPageTypes } from "./file-read"
import { forgetFileShapes } from "./file-shape"
import { forgetFileBackings, setFileBackings } from "./file-write-backing"
import { patchPage, patchPageById, patchPages } from "./patch"
import type { PageWhere } from "@shared/pages-core/page-types"
import { upsertPage } from "./upsert"

const HOLDER = "fixture-holder"
const TARGET = "fixture-account"
const TARGET_NAME = "by-name-01"
const TARGET_ID = "019f0000-0000-7000-a000-00000000aaaa"
const HOLDER_GLOB = "fixture-2999-13-45/*.md"
const TARGET_GLOB = "fixture-2999-13-45-accounts/*.md"
const COUNT = 30

const idOfPage = (at: number): string => `019f0000-0000-7000-8000-${String(at).padStart(12, "0")}`

const nameOfPage = (at: number): string => `holder-${String(at).padStart(2, "0")}`

type Corpus = {
  readonly files: Map<string, Record<string, unknown>>
  removed: readonly string[]
  patched: readonly string[]
  written: readonly string[]
}

function makeCorpus(ownerAccount: string = TARGET_NAME): Corpus {
  const files = new Map<string, Record<string, unknown>>()
  for (let at = 1; at <= COUNT; at += 1) {
    files.set(nameOfPage(at), {
      id: idOfPage(at),
      "page-type-slug": HOLDER,
      title: `Holder ${at}`,
      note: "untouched",
      "owner-account": ownerAccount,
    })
  }
  return { files, removed: [], patched: [], written: [] }
}

const TARGET_AT = `memory:fixture-2999-13-45-accounts/${TARGET_NAME}.md`

const TARGET_VALUES: Record<string, unknown> = {
  id: TARGET_ID,
  "page-type-slug": TARGET,
  title: TARGET_NAME,
  slug: null,
}

function reply(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

const PAGE_PATH = /^\/page\/([^/]+)\/(.+)$/
const ACT_PATH = /^\/(remove|patch|write)\/([^/]+)\/(.+)$/

const PAGE_PATH_CAPTURE = z.tuple([z.string(), z.string(), z.string()]).nullable()
const ACT_PATH_CAPTURE = z.tuple([z.string(), z.string(), z.string(), z.string()]).nullable()
const QUERY_BODY = z.record(z.string(), z.unknown())
const QUERY_WHERE = z.record(z.string(), z.object({ is: z.unknown().optional() })).optional()
const WRITE_BODY = z.object({ values: z.record(z.string(), z.unknown()).optional() })

function parsePagePath(path: string): { type: string; name: string } | null {
  const captured = PAGE_PATH_CAPTURE.parse(PAGE_PATH.exec(path))
  if (captured === null) return null
  return { type: decodeURIComponent(captured[1]), name: decodeURIComponent(captured[2]) }
}

function parseActPath(path: string): { verb: string; name: string } | null {
  const captured = ACT_PATH_CAPTURE.parse(ACT_PATH.exec(path))
  if (captured === null) return null
  return { verb: captured[1], name: decodeURIComponent(captured[3]) }
}

function parseQueryBody(init: RequestInit | undefined): Record<string, unknown> {
  return QUERY_BODY.parse(JSON.parse(String(init?.body ?? "{}")))
}

function parseWriteBody(init: RequestInit | undefined): { values?: Record<string, unknown> } {
  return WRITE_BODY.parse(JSON.parse(String(init?.body ?? "{}")))
}

function parseQueryWhere(where: unknown): Record<string, { is?: unknown }> {
  return QUERY_WHERE.parse(where) ?? {}
}

function shaped(slug: string): unknown {
  const declarations =
    slug === HOLDER
      ? [
          { key: "title", type: "text", title: "title", pageId: "d1", on: HOLDER },
          { key: "note", type: "text", title: "note", pageId: "d2", on: HOLDER },
          {
            key: "owner-account",
            type: "relation-slug",
            title: "owner-account",
            pageId: "d3",
            on: HOLDER,
            targetSlug: TARGET,
            slugProperty: null,
            mayBeGone: false,
          },
        ]
      : []
  return {
    pageType: slug,
    pageTypeId: `019f0000-0000-7000-9000-${slug}`,
    ownerSlug: null,
    declarations,
  }
}

function definitions(): unknown {
  return {
    n: 3,
    rows: [
      {
        at: "d1",
        values: { key: "title", type: "text", "defined-on-slug": HOLDER, id: "d1" },
      },
      {
        at: "d2",
        values: { key: "note", type: "text", "defined-on-slug": HOLDER, id: "d2" },
      },
      {
        at: "d3",
        values: {
          key: "owner-account",
          type: "relation-slug",
          "defined-on-slug": HOLDER,
          id: "d3",
          "target-slug": TARGET,
          "slug-property": null,
          "may-be-gone": "false",
        },
      },
    ],
  }
}

function answered(corpus: Corpus, query: Record<string, unknown>): unknown {
  const type = query["page-type"]
  const where = parseQueryWhere(query.where)
  if (type === "page-type") {
    const rows = [HOLDER, TARGET].map((slug) => ({
      at: `instructions:page-types/${slug}.md`,
      values: { slug, id: `019f0000-0000-7000-9000-${slug}`, "extends-slug": null },
    }))
    const wanted = where.slug?.is
    return {
      n: rows.length,
      rows: wanted === undefined ? rows : rows.filter((one) => one.values.slug === wanted),
    }
  }
  if (type === "page-property-definition") return definitions()
  if (type === HOLDER) {
    const rows = [...corpus.files.entries()].map(([name, values]) => ({
      at: `memory:fixture-2999-13-45/${name}.md`,
      values,
    }))
    return { n: rows.length, rows }
  }
  if (type === TARGET) {
    const hit =
      (where.id?.is === undefined || where.id.is === TARGET_ID) &&
      (where.slug?.is === undefined || where.slug.is === null)
    return { n: hit ? 1 : 0, rows: hit ? [{ at: TARGET_AT, values: TARGET_VALUES }] : [] }
  }
  return { n: 0, rows: [] }
}

let stop: (() => void) | null = null

function serve(corpus: Corpus): undefined {
  const real = globalThis.fetch
  forgetFileBackedPageTypes()
  forgetFileBackings()
  forgetFileShapes()
  setFileBackedPageTypes([HOLDER, TARGET])
  setFileBackings([
    { slug: HOLDER, repo: "memory", glob: HOLDER_GLOB, heldBy: [], namedFor: null },
    { slug: TARGET, repo: "memory", glob: TARGET_GLOB, heldBy: [], namedFor: null },
  ])
  globalThis.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url
    const path = new URL(url, "http://fixture.invalid").pathname
    const page = parsePagePath(path)
    if (page !== null) {
      if (page.type === TARGET && page.name === TARGET_NAME) {
        return reply({
          pageType: page.type,
          name: page.name,
          at: TARGET_AT,
          values: TARGET_VALUES,
          relations: {},
        })
      }
      return reply({ error: "no page stands there" }, 404)
    }
    if (path === "/q") {
      return reply(answered(corpus, parseQueryBody(init)))
    }
    const shape = /^\/shape\/(.+)$/.exec(path)
    if (shape !== null) return reply(shaped(String(shape[1])))
    const act = parseActPath(path)
    if (act !== null) {
      const name = act.name
      const body = parseWriteBody(init)
      if (act.verb === "remove") {
        corpus.files.delete(name)
        corpus.removed = [...corpus.removed, name]
      } else if (act.verb === "patch") {
        corpus.patched = [...corpus.patched, name]
        const held = corpus.files.get(name)
        if (held !== undefined) corpus.files.set(name, { ...held, ...body.values })
      } else {
        corpus.written = [...corpus.written, name]
        corpus.files.set(name, { ...body.values })
      }
      return reply({ ok: true, at: `memory:fixture-2999-13-45/${name}.md` })
    }
    return reply({ n: 0, rows: [] })
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

const ONE: PageWhere = [{ key: "id", eq: idOfPage(7) }]

const EVERY: PageWhere = [{ key: "note", eq: "untouched" }]

describe("a singular write verb refuses a many-page match before it writes anything", () => {
  test("hardDeletePage matching every page removes nothing and names every match", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    const going = hardDeletePage({ pageTypeSlug: HOLDER, where: EVERY })
    await expect(going).rejects.toThrow(/matches 30 pages/)
    expect(corpus.removed).toEqual([])
    expect(corpus.files.size).toBe(COUNT)
  })

  test("hardDeletePage with an empty where removes nothing", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    await expect(hardDeletePage({ pageTypeSlug: HOLDER, where: [] })).rejects.toThrow(
      /Nothing has been written/
    )
    expect(corpus.removed).toEqual([])
  })

  test("softDeletePage matching every page removes nothing", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    await expect(softDeletePage({ pageTypeSlug: HOLDER, where: EVERY })).rejects.toThrow(
      /matches 30 pages/
    )
    expect(corpus.removed).toEqual([])
  })

  test("patchPage matching every page patches nothing", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    const going = patchPage({
      pageTypeSlug: HOLDER,
      where: EVERY,
      set: { note: "clobbered" },
    })
    await expect(going).rejects.toThrow(/matches 30 pages/)
    expect(corpus.patched).toEqual([])
  })

  test("upsertPage matching every page writes nothing", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    const going = upsertPage({
      pageTypeSlug: HOLDER,
      where: EVERY,
      set: { note: "clobbered" },
    })
    await expect(going).rejects.toThrow(/matches 30 pages/)
    expect(corpus.patched).toEqual([])
    expect(corpus.written).toEqual([])
  })

  test("hardDeletePage addressing one page still removes that one", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    const gone = await hardDeletePage({ pageTypeSlug: HOLDER, where: ONE })
    expect(gone?.id).toBe(idOfPage(7))
    expect(corpus.removed).toEqual([nameOfPage(7)])
  })

  test("hardDeletePageById still removes that one", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    await hardDeletePageById({ pageTypeSlug: HOLDER, id: idOfPage(7) })
    expect(corpus.removed).toEqual([nameOfPage(7)])
  })

  test("patchPage addressing one page still patches that one", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    await patchPage({ pageTypeSlug: HOLDER, where: ONE, set: { note: "kept" } })
    expect(corpus.patched).toEqual([nameOfPage(7)])
  })

  test("patchPageById still patches that one", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    await patchPageById({ pageTypeSlug: HOLDER, id: idOfPage(7), set: { note: "kept" } })
    expect(corpus.patched).toEqual([nameOfPage(7)])
  })

  test("hardDeletePage matching nothing removes nothing and answers null", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    const gone = await hardDeletePage({
      pageTypeSlug: HOLDER,
      where: [{ key: "id", eq: "no-such-id" }],
    })
    expect(gone).toBeNull()
    expect(corpus.removed).toEqual([])
  })

  test("the plural verbs still take every match", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    const gone = await hardDeletePages({ pageTypeSlug: HOLDER, where: [] })
    expect(gone.length).toBe(COUNT)
    expect(corpus.files.size).toBe(0)
  })

  test("patchPages still takes every match", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    const done = await patchPages({
      pageTypeSlug: HOLDER,
      where: [{ key: "note", eq: "untouched" }],
      set: { note: "swept" },
    })
    expect(done.length).toBe(COUNT)
    expect(corpus.patched.length).toBe(COUNT)
  })
})

describe("a write refuses a relation value no target page stands under", () => {
  test("patchPage refuses the target's id and names the target's file instead", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    const going = patchPage({
      pageTypeSlug: HOLDER,
      where: ONE,
      set: { ownerAccount: TARGET_ID },
    })
    await expect(going).rejects.toThrow(new RegExp(`is the id of \`${TARGET_NAME}\``))
    expect(corpus.patched).toEqual([])
  })

  test("upsertPage refuses the target's id", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    const going = upsertPage({
      pageTypeSlug: HOLDER,
      where: ONE,
      set: { ownerAccount: TARGET_ID },
    })
    await expect(going).rejects.toThrow(/points at a `fixture-account` page by name/)
    expect(corpus.patched).toEqual([])
  })

  test("patchPage refuses a name no target page stands under", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    const going = patchPage({
      pageTypeSlug: HOLDER,
      where: ONE,
      set: { ownerAccount: "not-a-page-at-all" },
    })
    await expect(going).rejects.toThrow(/Name it as its file is named/)
    expect(corpus.patched).toEqual([])
  })

  test("patchPage takes the target's name", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    await patchPage({ pageTypeSlug: HOLDER, where: ONE, set: { ownerAccount: TARGET_NAME } })
    expect(corpus.patched).toEqual([nameOfPage(7)])
  })

  test("patchPage leaves a relation the write does not state alone", async () => {
    const corpus = makeCorpus("whatever-stands-there")
    serve(corpus)
    await patchPage({ pageTypeSlug: HOLDER, where: ONE, set: { note: "kept" } })
    expect(corpus.patched).toEqual([nameOfPage(7)])
  })
})
