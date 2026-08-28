import { afterEach, expect, test } from "bun:test"
import { z } from "zod"
import { forgetFileBackedPageTypes, setFileBackedPageTypes } from "./file-read.ts"
import { forgetFileShapes } from "./file-shape.ts"
import { createFilePage, upsertFilePage } from "./file-write.ts"
import { forgetFileBackings, setFileBackings } from "./file-write-backing.ts"

const SLUG = "fixture-2999-13-45-idled"
const GLOB = "fixture-2999-13-45-idled/*.md"
const STATED_ID = "019f0000-0000-7000-a000-0000000000id".replace("id", "01")

const ACT = /^\/(remove|patch|write)\/([^/]+)\/(.+)$/
const PAGE = /^\/page\/([^/]+)\/(.+)$/
const ACT_CAPTURE = z.tuple([z.string(), z.string(), z.string(), z.string()]).nullable()
const PAGE_CAPTURE = z.tuple([z.string(), z.string(), z.string()]).nullable()
const BODY = z.object({ values: z.record(z.string(), z.unknown()).optional() })

type Landed = { readonly name: string; readonly values: Record<string, unknown> }

function reply(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

let stop: (() => void) | null = null

function serve(): Landed[] {
  const written: Landed[] = []
  const real = globalThis.fetch
  forgetFileBackedPageTypes()
  forgetFileBackings()
  forgetFileShapes()
  setFileBackedPageTypes([SLUG])
  setFileBackings([{ slug: SLUG, repo: "memory", glob: GLOB, heldBy: [], namedFor: "{id}" }])
  globalThis.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url
    const path = new URL(url, "http://fixture.invalid").pathname
    const shape = /^\/shape\/(.+)$/.exec(path)
    if (shape !== null) {
      return reply({
        pageType: SLUG,
        pageTypeId: "019f0000-0000-7000-9000-000000000001",
        ownerSlug: null,
        declarations: [{ key: "note", type: "text", title: "note", pageId: "d1", on: SLUG }],
      })
    }
    const page = PAGE_CAPTURE.parse(PAGE.exec(path))
    if (page !== null) {
      const name = decodeURIComponent(page[2])
      const landed = written.find((one) => one.name === name)
      if (landed === undefined) return reply({ error: "no page stands there" }, 404)
      return reply({
        pageType: SLUG,
        name,
        at: `memory:fixture-2999-13-45-idled/${name}.md`,
        values: landed.values,
        relations: {},
      })
    }
    if (path === "/q") {
      const asked = z.record(z.string(), z.unknown()).parse(JSON.parse(String(init?.body ?? "{}")))
      if (asked["page-type"] === "page-property-definition") {
        return reply({
          n: 1,
          rows: [
            { at: "d1", values: { key: "note", type: "text", "defined-on-slug": SLUG, id: "d1" } },
          ],
        })
      }
      if (asked["page-type"] === SLUG) {
        return reply({
          n: written.length,
          rows: written.map((one) => ({
            at: `memory:fixture-2999-13-45-idled/${one.name}.md`,
            values: one.values,
          })),
        })
      }
      return reply({ n: 0, rows: [] })
    }
    const act = ACT_CAPTURE.parse(ACT.exec(path))
    if (act !== null) {
      const name = decodeURIComponent(act[3])
      const values = BODY.parse(JSON.parse(String(init?.body ?? "{}"))).values ?? {}
      written.push({ name, values })
      return reply({ ok: true, at: `memory:fixture-2999-13-45-idled/${name}.md` })
    }
    return reply({ n: 0, rows: [] })
  }
  stop = () => {
    globalThis.fetch = real
    forgetFileBackedPageTypes()
    forgetFileBackings()
    forgetFileShapes()
  }
  return written
}

afterEach(() => {
  stop?.()
  stop = null
})

test("a create under a rule naming `{id}` lands on the id that create settled", async () => {
  const written = serve()
  const page = await createFilePage({
    pageTypeSlug: SLUG,
    properties: { note: "a page whose type is named for its id" },
    id: STATED_ID,
  })
  expect(written.map((one) => one.name)).toEqual([STATED_ID])
  expect(page.id).toBe(STATED_ID)
})

test("a create that mints its own id lands on that id, the file and the page agreeing", async () => {
  const written = serve()
  const page = await createFilePage({ pageTypeSlug: SLUG, properties: { note: "minted" } })
  expect(written).toHaveLength(1)
  expect(written[0]?.name).toBe(String(page.id))
  expect(written[0]?.values.id).toBe(String(page.id))
})

test("an upsert finding nothing creates under the same id it named the file for", async () => {
  const written = serve()
  const { page, created } = await upsertFilePage({
    pageTypeSlug: SLUG,
    where: [{ key: "note", eq: "nothing stands here" }],
    set: { note: "upserted" },
  })
  expect(created).toBe(true)
  expect(written).toHaveLength(1)
  expect(written[0]?.name).toBe(String(page.id))
  expect(written[0]?.values.id).toBe(String(page.id))
})
