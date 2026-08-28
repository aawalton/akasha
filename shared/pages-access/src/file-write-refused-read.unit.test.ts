import { afterEach, describe, expect, test } from "bun:test"
import { z } from "zod"
import { forgetFileBackedPageTypes, setFileBackedPageTypes } from "./file-read"
import { forgetFileShapes } from "./file-shape"
import { forgetFileBackings, setFileBackings } from "./file-write-backing"
import { nameOfPageId } from "./file-page-name"
import { patchPage } from "./patch"
import type { PageWhere } from "@shared/pages-core/page-types"

// WHAT THIS PINS IS THAT A REFUSED LOOKUP AND AN EMPTY ONE DO NOT ARRIVE AS THE SAME VALUE.
// `nameOfPageId` separates them; the write refusal that quotes it must keep them apart, because the
// advice it gives — rename this, it is not an id — is only true when the corpus was actually read.

const HOLDER = "refused-read-holder"
const TARGET = "refused-read-account"
const HOLDER_GLOB = "fixture-2999-13-46/*.md"
const TARGET_GLOB = "fixture-2999-13-46-accounts/*.md"

const HOLDER_NAME = "holder-01"
const HOLDER_ID = "019f0000-0000-7000-8001-000000000001"
// A well-formed uuid that no page carries, so `nameOfPageId` reaches its ask rather than
// answering `malformed` off the shape of the string.
const NOBODYS_ID = "019f0000-0000-7000-a001-0000000000ff"

const QUERY_BODY = z.record(z.string(), z.unknown())
const QUERY_WHERE = z.record(z.string(), z.object({ is: z.unknown().optional() })).optional()
const PAGE_PATH = /^\/page\/([^/]+)\/(.+)$/

function reply(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function parseQueryBody(init: RequestInit | undefined): Record<string, unknown> {
  return QUERY_BODY.parse(JSON.parse(String(init?.body ?? "{}")))
}

function parseQueryWhere(where: unknown): Record<string, { is?: unknown }> {
  return QUERY_WHERE.parse(where) ?? {}
}

const DECLARATIONS = [
  { key: "title", type: "text", title: "title", pageId: "r1", on: HOLDER },
  {
    key: "owner-account",
    type: "relation-slug",
    title: "owner-account",
    pageId: "r2",
    on: HOLDER,
    targetSlug: TARGET,
    slugProperty: null,
    mayBeGone: false,
  },
]

function shaped(slug: string): unknown {
  return {
    pageType: slug,
    pageTypeId: `019f0000-0000-7000-9001-${slug}`,
    ownerSlug: null,
    declarations: slug === HOLDER ? DECLARATIONS : [],
  }
}

function definitions(): unknown {
  return {
    n: 2,
    rows: [
      { at: "r1", values: { key: "title", type: "text", "defined-on-slug": HOLDER, id: "r1" } },
      {
        at: "r2",
        values: {
          key: "owner-account",
          type: "relation-slug",
          "defined-on-slug": HOLDER,
          id: "r2",
          "target-slug": TARGET,
          "slug-property": null,
          "may-be-gone": "false",
        },
      },
    ],
  }
}

const HOLDER_VALUES: Record<string, unknown> = {
  id: HOLDER_ID,
  "page-type-slug": HOLDER,
  title: "Holder 01",
  "owner-account": "someone-who-stands",
}

type Served = { patched: readonly string[] }

let stop: (() => void) | null = null

/**
 * `refuseTheIdAsk` refuses exactly the query `nameOfPageId` makes — the one keyed on `id` against
 * the target type — and nothing else. Refusing every query would trip an earlier guard and prove
 * nothing about this seam.
 *
 * `refuseTheNameAsk` refuses the two lookups `standsUnder` makes for a name — the whole-page read
 * and the query keyed on `slug` — and leaves every other query answering. Off, both are answered
 * and hold nothing, which is a corpus that was read and holds no page under that name.
 */
function serve(refuseTheIdAsk: boolean, refuseTheNameAsk = false): Served {
  const served: Served = { patched: [] }
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
    if (PAGE_PATH.test(path)) {
      if (refuseTheNameAsk) return reply({ error: "the page query service is unreachable" }, 503)
      return reply({ error: "no page stands there" }, 404)
    }
    if (path === "/q") {
      const query = parseQueryBody(init)
      const type = query["page-type"]
      const where = parseQueryWhere(query.where)
      if (type === TARGET && where.id !== undefined) {
        if (refuseTheIdAsk) return reply({ error: "the page query service is unreachable" }, 503)
        return reply({ n: 0, rows: [] })
      }
      if (type === TARGET && where.slug !== undefined) {
        if (refuseTheNameAsk) return reply({ error: "the page query service is unreachable" }, 503)
        return reply({ n: 0, rows: [] })
      }
      if (type === "page-type") {
        const rows = [HOLDER, TARGET].map((slug) => ({
          at: `instructions:page-types/${slug}.md`,
          values: { slug, id: `019f0000-0000-7000-9001-${slug}`, "extends-slug": null },
        }))
        const wanted = where.slug?.is
        return reply({
          n: rows.length,
          rows: wanted === undefined ? rows : rows.filter((one) => one.values.slug === wanted),
        })
      }
      if (type === "page-property-definition") return reply(definitions())
      if (type === HOLDER) {
        return reply({
          n: 1,
          rows: [{ at: `memory:fixture-2999-13-46/${HOLDER_NAME}.md`, values: HOLDER_VALUES }],
        })
      }
      return reply({ n: 0, rows: [] })
    }
    const shape = /^\/shape\/(.+)$/.exec(path)
    if (shape !== null) return reply(shaped(String(shape[1])))
    const act = /^\/(remove|patch|write)\/([^/]+)\/(.+)$/.exec(path)
    if (act !== null) {
      served.patched = [...served.patched, decodeURIComponent(String(act[3]))]
      return reply({ ok: true, at: `memory:fixture-2999-13-46/${HOLDER_NAME}.md` })
    }
    return reply({ n: 0, rows: [] })
  }
  stop = () => {
    globalThis.fetch = real
    forgetFileBackedPageTypes()
    forgetFileBackings()
    forgetFileShapes()
  }
  return served
}

afterEach(() => {
  stop?.()
  stop = null
})

const ONE: PageWhere = [{ key: "id", eq: HOLDER_ID }]

describe("nameOfPageId keeps a refused lookup apart from an empty one", () => {
  test("an ask that was answered and held nothing is `absent`", async () => {
    serve(false)
    const translated = await nameOfPageId(TARGET, NOBODYS_ID)
    expect(translated.outcome).toBe("absent")
  })

  test("an ask the service refused is `unasked`", async () => {
    serve(true)
    const translated = await nameOfPageId(TARGET, NOBODYS_ID)
    expect(translated.outcome).toBe("unasked")
  })
})

describe("a write refusal advises a rename only where the corpus was read", () => {
  // THE ONE THAT MATTERS. A genuine absence must still read as absent: the corpus was reached, it
  // holds no page under that id, so telling the writer to name the page as its file is named is
  // the right advice and must survive.
  test("a genuine absence still advises naming the file", async () => {
    const served = serve(false)
    const going = patchPage({
      pageTypeSlug: HOLDER,
      where: ONE,
      set: { ownerAccount: NOBODYS_ID },
    })
    await expect(going).rejects.toThrow(/Name it as its file is named/)
    expect(served.patched).toEqual([])
  })

  test("a refused lookup refuses the write without advising a rename", async () => {
    const served = serve(true)
    const going = patchPage({
      pageTypeSlug: HOLDER,
      where: ONE,
      set: { ownerAccount: NOBODYS_ID },
    })
    // The write is still refused — that part is `standsUnder`, and is not what this pins.
    await expect(going).rejects.toThrow(/points at a `refused-read-account` page by name/)
    // What it must NOT do is spend the refused lookup as though it had been answered.
    await expect(going).rejects.not.toThrow(/Name it as its file is named/)
    await expect(going).rejects.toThrow(/went unestablished/)
    expect(served.patched).toEqual([])
  })
})

// WHAT A WRITE REFUSAL MAY ASSERT IS BOUNDED BY WHETHER ANYTHING LOOKED. `standsUnder` reads the
// target twice — the page by name, then a query keyed on `slug` — and a refusal of either leaves
// the corpus unread. Spelled as a name that no page stands under, a read that failed sends the
// writer to correct a value that was very likely right.
describe("a write refusal reports a name absent only where the corpus was read", () => {
  test("a corpus that was read and holds no such page says no page stands under the name", async () => {
    const served = serve(false)
    const going = patchPage({
      pageTypeSlug: HOLDER,
      where: ONE,
      set: { ownerAccount: "nobody-at-all" },
    })
    await expect(going).rejects.toThrow(/which no `refused-read-account` page stands under/)
    expect(served.patched).toEqual([])
  })

  test("a target lookup nothing answered does not report the name absent", async () => {
    const served = serve(false, true)
    const going = patchPage({
      pageTypeSlug: HOLDER,
      where: ONE,
      set: { ownerAccount: "nobody-at-all" },
    })
    await expect(going).rejects.not.toThrow(/which no `refused-read-account` page stands under/)
    await expect(going).rejects.toThrow(/went unlooked-for/)
    expect(served.patched).toEqual([])
  })
})
