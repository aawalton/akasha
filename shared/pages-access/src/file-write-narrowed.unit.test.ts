import { afterEach, describe, expect, test } from "bun:test"
import { z } from "zod"
import { forgetFileBackedPageTypes, setFileBackedPageTypes } from "./file-read.ts"
import { forgetFileShapes } from "./file-shape.ts"
import { forgetFileBackings, setFileBackings } from "./file-write-backing.ts"
import { patchPage } from "./patch.ts"
import { upsertPage } from "./upsert.ts"

const TYPE = "fixture-note"
const GLOB = "fixture-2999-13-46/*.md"
const KEY = "owner-tag"
const ONE = "note-01"
const TWO = "note-02"
const ONE_ID = "019f0000-0000-7000-8000-000000000001"
const TWO_ID = "019f0000-0000-7000-8000-000000000002"

type Corpus = {
  readonly files: Map<string, Record<string, unknown>>
  patched: readonly string[]
  written: readonly string[]
}

function makeCorpus(): Corpus {
  const files = new Map<string, Record<string, unknown>>()
  files.set(ONE, {
    id: ONE_ID,
    "page-type-slug": TYPE,
    title: "One",
    note: "untouched",
    [KEY]: "alpha",
  })
  files.set(TWO, {
    id: TWO_ID,
    "page-type-slug": TYPE,
    title: "Two",
    note: "untouched",
    [KEY]: "beta",
  })
  return { files, patched: [], written: [] }
}

const DECLARED = [
  { key: "title", type: "text", title: "title", pageId: "d1", on: TYPE },
  { key: "note", type: "text", title: "note", pageId: "d2", on: TYPE },
  { key: KEY, type: "text", title: KEY, pageId: "d3", on: TYPE },
]

const QUERY_BODY = z.object({
  "page-type": z.string().optional(),
  where: z.record(z.string(), z.object({ is: z.unknown().optional() })).optional(),
})

const WRITE_BODY = z.object({ values: z.record(z.string(), z.unknown()).optional() })

const ACT_PATH = /^\/(remove|patch|write)\/([^/]+)\/(.+)$/
const ACT_CAPTURE = z.tuple([z.string(), z.string(), z.string(), z.string()]).nullable()

function reply(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function answered(corpus: Corpus, body: string): unknown {
  const query = QUERY_BODY.parse(JSON.parse(body))
  const type = query["page-type"]
  if (type === "page-type") {
    return {
      n: 1,
      rows: [
        {
          at: `instructions:page-types/${TYPE}.md`,
          values: { slug: TYPE, id: `019f0000-0000-7000-9000-note`, "extends-slug": null },
        },
      ],
    }
  }
  if (type === "page-property-definition") {
    return {
      n: DECLARED.length,
      rows: DECLARED.map((one) => ({
        at: one.pageId,
        values: { key: one.key, type: one.type, "defined-on-slug": TYPE, id: one.pageId },
      })),
    }
  }
  if (type !== TYPE) return { n: 0, rows: [] }
  let rows = [...corpus.files.entries()].map(([name, values]) => ({
    at: `memory:fixture-2999-13-46/${name}.md`,
    values,
  }))
  for (const [key, test] of Object.entries(query.where ?? {})) {
    if (test.is === undefined) continue
    rows = rows.filter((one) => one.values[key] === test.is)
  }
  return { n: rows.length, rows }
}

let stop: (() => void) | null = null

function serve(corpus: Corpus): undefined {
  const real = globalThis.fetch
  forgetFileBackedPageTypes()
  forgetFileBackings()
  forgetFileShapes()
  setFileBackedPageTypes([TYPE])
  setFileBackings([{ slug: TYPE, repo: "memory", glob: GLOB, heldBy: [], namedFor: null }])
  globalThis.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url
    const path = new URL(url, "http://fixture.invalid").pathname
    if (path === "/q") return reply(answered(corpus, String(init?.body ?? "{}")))
    if (/^\/shape\/(.+)$/.test(path)) {
      return reply({
        pageType: TYPE,
        pageTypeId: `019f0000-0000-7000-9000-note`,
        ownerSlug: null,
        declarations: DECLARED,
      })
    }
    const act = ACT_CAPTURE.parse(ACT_PATH.exec(path))
    if (act !== null) {
      const name = decodeURIComponent(act[3])
      const body = WRITE_BODY.parse(JSON.parse(String(init?.body ?? "{}")))
      if (act[1] === "patch") {
        corpus.patched = [...corpus.patched, name]
        const held = corpus.files.get(name)
        if (held !== undefined) corpus.files.set(name, { ...held, ...body.values })
      } else {
        corpus.written = [...corpus.written, name]
        corpus.files.set(name, { ...body.values })
      }
      return reply({ ok: true, at: `memory:fixture-2999-13-46/${name}.md` })
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

describe("a write narrowed by a property of more than one word finds the page carrying it", () => {
  test("upsertPage patches the page that stands rather than creating a second over it", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    await upsertPage({
      pageTypeSlug: TYPE,
      where: [{ key: KEY, eq: "alpha" }],
      set: { note: "landed" },
      writer: "fixture",
    })
    expect(corpus.written).toEqual([])
    expect(corpus.patched).toEqual([ONE])
    expect(corpus.files.get(ONE)?.note).toBe("landed")
  })

  test("patchPage reaches the page carrying that value and leaves the other alone", async () => {
    const corpus = makeCorpus()
    serve(corpus)
    await patchPage({
      pageTypeSlug: TYPE,
      where: [{ key: KEY, eq: "alpha" }],
      set: { note: "landed" },
      writer: "fixture",
    })
    expect(corpus.patched).toEqual([ONE])
    expect(corpus.files.get(TWO)?.note).toBe("untouched")
  })
})
