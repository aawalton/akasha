import { afterEach, describe, expect, test } from "bun:test"
import { z } from "zod"
import { hardDeletePage, hardDeletePages } from "./delete"
import { askableNarrows } from "./file-narrow"
import { forgetFileBackedPageTypes, setFileBackedPageTypes } from "./file-read"
import { forgetFileShapes } from "./file-shape"
import { forgetFileBackings, setFileBackings } from "./file-write-backing"
import { patchPages } from "./patch"
import type { PageWhere } from "@shared/pages-core/page-types"

const HOLDER = "fixture-3999-12-31-holder"
const GLOB = "fixture-3999-12-31/*.md"
const OWNER = "019f0000-0000-7000-b000-00000000ffff"
const COUNT = 4

const idOfPage = (at: number): string => `019f0000-0000-7000-8000-${String(at).padStart(12, "0")}`
const nameOfPage = (at: number): string => `holder-${String(at).padStart(2, "0")}`

type Corpus = {
  readonly files: Map<string, Record<string, unknown>>
  removed: readonly string[]
  patched: readonly string[]
}

function makeCorpus(count: number): Corpus {
  const files = new Map<string, Record<string, unknown>>()
  for (let at = 1; at <= count; at += 1) {
    files.set(nameOfPage(at), {
      id: idOfPage(at),
      "page-type-slug": HOLDER,
      title: `Holder ${at}`,
      note: "untouched",
    })
  }
  return { files, removed: [], patched: [] }
}

function reply(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}

const ACT_PATH = /^\/(remove|patch|write)\/([^/]+)\/(.+)$/

const ACT_PATH_CAPTURE = z.tuple([z.string(), z.string(), z.string(), z.string()]).nullable()
const QUERY_BODY = z.record(z.string(), z.unknown())

function parseActPath(path: string): { verb: string; name: string } | null {
  const captured = ACT_PATH_CAPTURE.parse(ACT_PATH.exec(path))
  if (captured === null) return null
  return { verb: captured[1], name: decodeURIComponent(captured[3]) }
}

function parseQueryBody(init: RequestInit | undefined): Record<string, unknown> {
  return QUERY_BODY.parse(JSON.parse(String(init?.body ?? "{}")))
}

function answered(corpus: Corpus, query: Record<string, unknown>): unknown {
  const type = query["page-type"]
  if (type === "page-type") {
    return {
      n: 1,
      rows: [
        {
          at: `instructions:page-types/${HOLDER}.md`,
          values: {
            slug: HOLDER,
            id: "019f0000-0000-7000-9000-000000000001",
            "extends-slug": null,
          },
        },
      ],
    }
  }
  if (type === "page-property-definition") {
    return {
      n: 1,
      rows: [
        { at: "d1", values: { key: "note", type: "text", "defined-on-slug": HOLDER, id: "d1" } },
      ],
    }
  }
  if (type === HOLDER) {
    return {
      n: corpus.files.size,
      rows: [...corpus.files.entries()].map(([name, values]) => ({
        at: `memory:fixture-3999-12-31/${name}.md`,
        values,
      })),
    }
  }
  return { n: 0, rows: [] }
}

let stop: (() => void) | null = null

function serve(corpus: Corpus): undefined {
  const real = globalThis.fetch
  forgetFileBackedPageTypes()
  forgetFileBackings()
  forgetFileShapes()
  setFileBackedPageTypes([HOLDER])
  setFileBackings([{ slug: HOLDER, repo: "memory", glob: GLOB, heldBy: [], namedFor: null }])
  globalThis.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url
    const path = new URL(url, "http://fixture.invalid").pathname
    if (path === "/q") {
      return reply(answered(corpus, parseQueryBody(init)))
    }
    if (path === `/shape/${HOLDER}`) {
      return reply({
        pageType: HOLDER,
        pageTypeId: "019f0000-0000-7000-9000-000000000001",
        ownerSlug: null,
        declarations: [{ key: "note", type: "text", title: "note", pageId: "d1", on: HOLDER }],
      })
    }
    const act = parseActPath(path)
    if (act !== null) {
      const name = act.name
      if (act.verb === "remove") {
        corpus.files.delete(name)
        corpus.removed = [...corpus.removed, name]
      } else corpus.patched = [...corpus.patched, name]
      return reply({ ok: true, at: `memory:fixture-3999-12-31/${name}.md` })
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

const NESTED: PageWhere = [{ or: [{ or: [{ key: "userId", eq: OWNER }] }] }]

describe("askableNarrows hands back what it dropped rather than dropping it silently", () => {
  test("a userId narrow on a page type stating no owner key is named as dropped", () => {
    const asked = askableNarrows([{ key: "userId", eq: OWNER }], null)
    expect(asked.dropped).toEqual(["userId"])
    expect(asked.where).toEqual([])
  })

  test("a userId narrow nested two ors deep is named just the same", () => {
    expect(askableNarrows(NESTED, null).dropped).toEqual(["userId"])
  })

  test("an owner key rewrites the narrow onto it and drops nothing", () => {
    const asked = askableNarrows([{ key: "userId", eq: OWNER }], "owner-account")
    expect(asked.dropped).toEqual([])
    expect(asked.where).toEqual([{ key: "ownerAccount", eq: OWNER }])
  })

  test("a narrow the repo does not settle is handed back untouched", () => {
    const where: PageWhere = [{ key: "note", eq: "untouched" }]
    const asked = askableNarrows(where, null)
    expect(asked.dropped).toEqual([])
    expect(asked.where).toBe(where)
  })

  test("no where at all drops nothing", () => {
    expect(askableNarrows(undefined, null)).toEqual({ where: undefined, dropped: [] })
  })
})

describe("a write narrowed by a key a file cannot answer touches no page", () => {
  test("a plural hard delete under a nested userId narrow removes nothing", async () => {
    const corpus = makeCorpus(COUNT)
    serve(corpus)
    await expect(hardDeletePages({ pageTypeSlug: HOLDER, where: NESTED })).rejects.toThrow(
      /narrows by `userId`/
    )
    expect(corpus.removed).toEqual([])
    expect(corpus.files.size).toBe(COUNT)
  })

  test("a single hard delete over a lone page removes nothing", async () => {
    const corpus = makeCorpus(1)
    serve(corpus)
    await expect(hardDeletePage({ pageTypeSlug: HOLDER, where: NESTED })).rejects.toThrow(
      /narrows by `userId`/
    )
    expect(corpus.removed).toEqual([])
    expect(corpus.files.size).toBe(1)
  })

  test("a narrow a file can answer still reaches exactly its own pages", async () => {
    const corpus = makeCorpus(COUNT)
    serve(corpus)
    const gone = await hardDeletePages({
      pageTypeSlug: HOLDER,
      where: [{ key: "id", eq: idOfPage(2) }],
    })
    expect(gone.length).toBe(1)
    expect(corpus.removed).toEqual([nameOfPage(2)])
    expect(corpus.files.size).toBe(COUNT - 1)
  })
})
