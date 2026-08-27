import { afterEach, describe, expect, test } from "bun:test"
import { z } from "zod"
import { forgetFileBackedPageTypes, setFileBackedPageTypes } from "./file-read"
import { forgetFileShapes } from "./file-shape"
import { forgetFileBackings, setFileBackings } from "./file-write-backing"
import { valuesToWrite } from "./file-write-values"
import { patchPage } from "./patch"
import type { PageWhere } from "@shared/pages-core/page-types"

const HOLDER = "fixture-holder"
const TARGET = "fixture-account"
const READ_ONLY = "fixture-read-only"
const TARGET_NAME = "by-name-01"
const HOLDER_NAME = "holder-01"
const HOLDER_ID = "019f0000-0000-7000-8000-000000000001"
const TARGET_AT = `memory:fixture-2999-13-45-accounts/${TARGET_NAME}.md`
const ROSTER_DOWN = "the roster endpoint answered 503"

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

function parseQueryWhere(where: unknown): Record<string, { is?: unknown }> {
  return QUERY_WHERE.parse(where) ?? {}
}

function shaped(slug: string): unknown {
  const declarations =
    slug === HOLDER
      ? [
          { key: "note", type: "text", title: "note", pageId: "d1", on: HOLDER },
          {
            key: "owner-account",
            type: "relation-slug",
            title: "owner-account",
            pageId: "d2",
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
    n: 2,
    rows: [
      { at: "d1", values: { key: "note", type: "text", "defined-on-slug": HOLDER, id: "d1" } },
      {
        at: "d2",
        values: {
          key: "owner-account",
          type: "relation-slug",
          "defined-on-slug": HOLDER,
          id: "d2",
          "target-slug": TARGET,
          "slug-property": null,
          "may-be-gone": "false",
        },
      },
    ],
  }
}

function answered(query: Record<string, unknown>): unknown {
  const type = query["page-type"]
  if (type === "page-type") {
    return {
      n: 3,
      rows: [HOLDER, TARGET, READ_ONLY].map((slug) => ({
        at: `instructions:page-types/${slug}.md`,
        values: { slug, id: `019f0000-0000-7000-9000-${slug}`, "extends-slug": null },
      })),
    }
  }
  if (type === "page-property-definition") return definitions()
  if (type === HOLDER) {
    return {
      n: 1,
      rows: [
        {
          at: `memory:fixture-2999-13-45/${HOLDER_NAME}.md`,
          values: {
            id: HOLDER_ID,
            "page-type-slug": HOLDER,
            title: "Holder 1",
            note: "untouched",
            "owner-account": TARGET_NAME,
          },
        },
      ],
    }
  }
  if (type === TARGET) {
    const where = parseQueryWhere(query.where)
    const wanted = where.slug?.is
    const hit = wanted === undefined || wanted === TARGET_NAME
    return {
      n: hit ? 1 : 0,
      rows: hit ? [{ at: TARGET_AT, values: { id: "t", "page-type-slug": TARGET } }] : [],
    }
  }
  return { n: 0, rows: [] }
}

let stop: (() => void) | null = null
let patched: string[] = []

function serve(rosterUp: boolean): undefined {
  const real = globalThis.fetch
  patched = []
  forgetFileBackedPageTypes()
  forgetFileBackings()
  forgetFileShapes()
  setFileBackedPageTypes([HOLDER, TARGET, READ_ONLY])
  if (rosterUp) {
    setFileBackings([
      {
        slug: HOLDER,
        repo: "memory",
        glob: "fixture-2999-13-45/*.md",
        heldBy: [],
        namedFor: null,
      },
      {
        slug: TARGET,
        repo: "memory",
        glob: "fixture-2999-13-45-accounts/*.md",
        heldBy: [],
        namedFor: null,
      },
    ])
  }
  globalThis.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url
    const path = new URL(url, "http://fixture.invalid").pathname
    if (path === "/page-types") return reply({ error: ROSTER_DOWN }, 503)
    const page = parsePagePath(path)
    if (page !== null) {
      if (page.type === TARGET && page.name === TARGET_NAME) {
        return reply({
          pageType: page.type,
          name: page.name,
          at: TARGET_AT,
          values: {},
          relations: {},
        })
      }
      return reply({ error: "no page stands there" }, 404)
    }
    const shape = /^\/shape\/(.+)$/.exec(path)
    if (shape !== null) return reply(shaped(String(shape[1])))
    if (path === "/q") {
      return reply(answered(parseQueryBody(init)))
    }
    const act = parseActPath(path)
    if (act !== null) {
      patched.push(act.name)
      return reply({ ok: true, at: `memory:fixture-2999-13-45/${HOLDER_NAME}.md` })
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

const ONE: PageWhere = [{ key: "id", eq: HOLDER_ID }]

describe("a roster that went unread is named as unread, never as a page type with no backing", () => {
  test("a write against an unread roster names the service, not the page type", async () => {
    serve(false)
    const going = patchPage({ pageTypeSlug: HOLDER, where: ONE, set: { note: "x" } })
    await expect(going).rejects.toThrow(/roster of file-backed page types went unread/)
    expect(patched).toEqual([])
  })

  test("it carries the reason the roster gave", async () => {
    serve(false)
    const going = patchPage({ pageTypeSlug: HOLDER, where: ONE, set: { note: "x" } })
    await expect(going).rejects.toThrow(/503/)
  })

  test("it does not claim the page type is unbacked", async () => {
    serve(false)
    const going = patchPage({ pageTypeSlug: HOLDER, where: ONE, set: { note: "x" } })
    await expect(going).rejects.toThrow(/not this page type having no backing/)
  })

  test("a roster that was read and names no backing still says so", async () => {
    serve(true)
    const going = patchPage({ pageTypeSlug: READ_ONLY, where: ONE, set: { note: "x" } })
    await expect(going).rejects.toThrow(/names no backing for it/)
  })

  test("the read-and-unbacked message never claims the roster went unread", async () => {
    serve(true)
    const going = patchPage({ pageTypeSlug: READ_ONLY, where: ONE, set: { note: "x" } })
    await expect(going).rejects.not.toThrow(/went unread/)
  })
})

describe("the relation guard refuses an unread roster rather than skipping itself", () => {
  test("a name that stands nowhere is refused while the roster stands", async () => {
    serve(true)
    const going = valuesToWrite("probe", HOLDER, { "owner-account": "stands-nowhere" })
    await expect(going).rejects.toThrow(/no `fixture-account` page stands under/)
  })

  test("a name that stands is taken while the roster stands", async () => {
    serve(true)
    const values = await valuesToWrite("probe", HOLDER, { "owner-account": TARGET_NAME })
    expect(values["owner-account"]).toBe(TARGET_NAME)
  })

  test("the same unstanding name is refused when the roster went unread", async () => {
    serve(false)
    const going = valuesToWrite("probe", HOLDER, { "owner-account": "stands-nowhere" })
    await expect(going).rejects.toThrow(/roster of file-backed page types went unread/)
  })

  test("an unread roster refuses even a name that would have stood", async () => {
    serve(false)
    const going = valuesToWrite("probe", HOLDER, { "owner-account": TARGET_NAME })
    await expect(going).rejects.toThrow(/roster of file-backed page types went unread/)
  })

  test("a write stating no relation is untouched by an unread roster", async () => {
    serve(false)
    const values = await valuesToWrite("probe", HOLDER, { note: "kept" })
    expect(values).toEqual({ note: "kept" })
  })
})
