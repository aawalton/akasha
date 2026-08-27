import { afterEach, describe, expect, test } from "bun:test"
import { Page } from "@shared/pages-core/page-types"
import { type ContentPagePersistencePort } from "@shared/pages-ui-store/collection/content-persistence"
import { configureContentPersistence } from "@shared/pages-ui-store/singleton"
import type { RelatedIdGroup } from "./collect-related-ids"
import { getRelatedPagesByIdCoalesced, type RelatedPagesReader } from "./related-pages-coalesce"

interface Asked {
  readonly pageTypeSlug: string
  readonly ids: readonly string[]
}

function recordingReader(answer: (asked: Asked) => Promise<{ rows: readonly Page[] }>): {
  read: RelatedPagesReader
  asked: readonly Asked[]
} {
  const asked: Asked[] = []
  const read: RelatedPagesReader = (args) => {
    const one = { pageTypeSlug: args.pageTypeSlug, ids: args.where[0].in }
    asked.push(one)
    return answer(one)
  }
  return { read, asked }
}

const NO_ROWS = (): Promise<{ rows: readonly Page[] }> => Promise.resolve({ rows: [] })
const REFUSES = () => Promise.reject(new Error("boom"))

const DOMAINS: RelatedIdGroup = { pageTypeSlug: "domain", ids: ["a", "b"] }
const PERSONAS: RelatedIdGroup = { pageTypeSlug: "persona", ids: ["c"] }

describe("getRelatedPagesByIdCoalesced reads each group under its own page type", () => {
  test("a group is asked for by its page type, never by ids alone", async () => {
    const r = recordingReader(NO_ROWS)

    await getRelatedPagesByIdCoalesced([DOMAINS, PERSONAS], r.read)

    expect(r.asked).toEqual([
      { pageTypeSlug: "domain", ids: ["a", "b"] },
      { pageTypeSlug: "persona", ids: ["c"] },
    ])
  })

  test("ids sharing a value across two page types are asked for under each", async () => {
    const r = recordingReader(NO_ROWS)

    await getRelatedPagesByIdCoalesced(
      [
        { pageTypeSlug: "domain", ids: ["shared"] },
        { pageTypeSlug: "persona", ids: ["shared"] },
      ],
      r.read
    )

    expect(r.asked.map((a) => a.pageTypeSlug)).toEqual(["domain", "persona"])
  })

  test("the rows of every group arrive as one list", async () => {
    const r = recordingReader((asked) =>
      Promise.resolve({ rows: asked.ids.map((id) => Page({ id })) })
    )

    const rows = await getRelatedPagesByIdCoalesced([DOMAINS, PERSONAS], r.read)

    expect(rows.length).toBe(3)
  })
})

describe("getRelatedPagesByIdCoalesced shares one flight (#13855)", () => {
  test("concurrent identical reads share ONE read per group", async () => {
    const r = recordingReader(NO_ROWS)

    await Promise.all([
      getRelatedPagesByIdCoalesced([DOMAINS], r.read),
      getRelatedPagesByIdCoalesced([DOMAINS], r.read),
      getRelatedPagesByIdCoalesced([DOMAINS], r.read),
    ])

    expect(r.asked.length).toBe(1)
  })

  test("distinct groups do NOT coalesce", async () => {
    const r = recordingReader(NO_ROWS)

    await Promise.all([
      getRelatedPagesByIdCoalesced([DOMAINS], r.read),
      getRelatedPagesByIdCoalesced([PERSONAS], r.read),
    ])

    expect(r.asked.length).toBe(2)
  })

  test("the same ids under a different page type do NOT coalesce", async () => {
    const r = recordingReader(NO_ROWS)

    await Promise.all([
      getRelatedPagesByIdCoalesced([{ pageTypeSlug: "domain", ids: ["a"] }], r.read),
      getRelatedPagesByIdCoalesced([{ pageTypeSlug: "persona", ids: ["a"] }], r.read),
    ])

    expect(r.asked.length).toBe(2)
  })

  test("a failing read rejects all coalesced callers and clears the latch", async () => {
    let refuse = true
    const r = recordingReader(() => (refuse ? REFUSES() : NO_ROWS()))

    const settled = await Promise.allSettled([
      getRelatedPagesByIdCoalesced([DOMAINS], r.read),
      getRelatedPagesByIdCoalesced([DOMAINS], r.read),
    ])
    expect(settled[0]?.status).toBe("rejected")
    expect(settled[1]?.status).toBe("rejected")
    expect(r.asked.length).toBe(1)

    refuse = false
    await getRelatedPagesByIdCoalesced([DOMAINS], r.read)
    expect(r.asked.length).toBe(2)
  })

  test("a settled read does not coalesce a later sequential read", async () => {
    const r = recordingReader(NO_ROWS)

    await getRelatedPagesByIdCoalesced([DOMAINS], r.read)
    await getRelatedPagesByIdCoalesced([DOMAINS], r.read)

    expect(r.asked.length).toBe(2)
  })
})

describe("getRelatedPagesByIdCoalesced content-persistence wiring (#14799)", () => {
  afterEach(() => {
    configureContentPersistence(null)
  })

  function recordingPort(loadResult: readonly Page[]) {
    const saved: (readonly Page[])[] = []
    const port: ContentPagePersistencePort = {
      loadPages: () => Promise.resolve(loadResult),
      savePages: (pages) => {
        saved.push([...pages])
      },
      pinPages: () => undefined,
      cachedIds: () => Promise.resolve([]),
      clear: () => undefined,
    }
    return { port, saved }
  }

  test("a successful read write-throughs the related pages to the port", async () => {
    const rec = recordingPort([])
    configureContentPersistence(rec.port)
    const r = recordingReader((asked) =>
      Promise.resolve({ rows: asked.ids.map((id) => Page({ id })) })
    )

    await getRelatedPagesByIdCoalesced([DOMAINS], r.read)

    expect(rec.saved.length).toBe(1)
    expect(rec.saved[0]?.length).toBe(2)
  })

  test("a refused read falls back to the port, asked for every id across groups", async () => {
    const rec = recordingPort([Page({ id: "cached" })])
    configureContentPersistence(rec.port)
    const r = recordingReader(REFUSES)

    const rows = await getRelatedPagesByIdCoalesced([DOMAINS, PERSONAS], r.read)

    expect(rows.map((p) => p.id)).toEqual(["cached"])
  })
})
