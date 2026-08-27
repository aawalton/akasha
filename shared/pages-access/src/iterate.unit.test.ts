import { afterAll, describe, expect, mock, test } from "bun:test"
import { pageId } from "./_client-test-helpers"
import type { GetPagesArgs, GetPagesResult } from "./get"
import * as realGet from "./get"

const realGetPages = realGet.getPages
const realGetPage = realGet.getPage
const realGetPageByIdSuffix = realGet.getPageByIdSuffix
const realGetPageByIdSuffixAcrossTypes = realGet.getPageByIdSuffixAcrossTypes
const realShapelessWhy = realGet.shapelessWhy
const realUnfiledWhy = realGet.unfiledWhy

let currentGetPages: typeof realGetPages = realGetPages
let mockInstalled = false

afterAll(() => {
  currentGetPages = realGetPages
})

async function loadIterateWithMock(scripted: readonly GetPagesResult[]) {
  const calls: GetPagesArgs[] = []
  let i = 0
  currentGetPages = async (args: GetPagesArgs) => {
    calls.push(args)
    const page = scripted[i] ?? { rows: [], nextCursor: null }
    i++
    return page
  }
  if (!mockInstalled) {
    mockInstalled = true
    mock.module("./get", () => ({
      getPages: (args: GetPagesArgs) => currentGetPages(args),
      getPage: realGetPage,
      getPageByIdSuffix: realGetPageByIdSuffix,
      getPageByIdSuffixAcrossTypes: realGetPageByIdSuffixAcrossTypes,
      shapelessWhy: realShapelessWhy,
      unfiledWhy: realUnfiledWhy,
    }))
  }
  const mod = await import(`./iterate?mock-bound`)
  return {
    streamPages: mod.streamPages,
    collectPages: mod.collectPages,
    calls,
  }
}

describe("streamPages / collectPages", () => {
  test("chains pages and yields rows in arrival order, stopping on null cursor", async () => {
    const { streamPages, calls } = await loadIterateWithMock([
      { rows: [{ id: "a" }, { id: "b" }], nextCursor: "c1" },
      { rows: [{ id: "c" }, { id: "d" }], nextCursor: "c2" },
      { rows: [{ id: "e" }], nextCursor: null },
    ])
    const seen: string[] = []
    for await (const row of streamPages({ pageTypeSlug: "task" })) {
      seen.push(pageId(row))
    }
    expect(seen).toEqual(["a", "b", "c", "d", "e"])
    expect(calls.map((c) => c.cursor)).toEqual([undefined, "c1", "c2"])
    expect(calls.every((c) => c.limit === 24)).toBe(true)
  })

  test("default pageSize is 24", async () => {
    const { streamPages, calls } = await loadIterateWithMock([
      { rows: [{ id: "a" }], nextCursor: null },
    ])
    for await (const _ of streamPages({ pageTypeSlug: "task" })) {
    }
    expect(calls[0]?.limit).toBe(24)
  })

  test("clamps pageSize below MIN to 1 and above MAX to 2500", async () => {
    {
      const { streamPages, calls } = await loadIterateWithMock([{ rows: [], nextCursor: null }])
      for await (const _ of streamPages({
        pageTypeSlug: "task",
        pageSize: 0,
      })) {
      }
      expect(calls[0]?.limit).toBe(1)
    }
    {
      const { streamPages, calls } = await loadIterateWithMock([{ rows: [], nextCursor: null }])
      for await (const _ of streamPages({
        pageTypeSlug: "task",
        pageSize: 9999,
      })) {
      }
      expect(calls[0]?.limit).toBe(2500)
    }
    {
      const { streamPages, calls } = await loadIterateWithMock([{ rows: [], nextCursor: null }])
      for await (const _ of streamPages({
        pageTypeSlug: "task",
        pageSize: -50,
      })) {
      }
      expect(calls[0]?.limit).toBe(1)
    }
  })

  test("respects max — stops mid-stream once cap reached", async () => {
    const { streamPages, calls } = await loadIterateWithMock([
      { rows: [{ id: "a" }, { id: "b" }, { id: "c" }], nextCursor: "c1" },
      { rows: [{ id: "d" }, { id: "e" }], nextCursor: null },
    ])
    const seen: string[] = []
    for await (const row of streamPages({
      pageTypeSlug: "task",
      max: 4,
    })) {
      seen.push(pageId(row))
    }
    expect(seen).toEqual(["a", "b", "c", "d"])
    expect(calls.length).toBe(2)
  })

  test("max=0 yields nothing", async () => {
    const { streamPages } = await loadIterateWithMock([{ rows: [{ id: "a" }], nextCursor: "c1" }])
    const seen: string[] = []
    for await (const row of streamPages({
      pageTypeSlug: "task",
      max: 0,
    })) {
      seen.push(pageId(row))
    }
    expect(seen).toEqual([])
  })

  test("collectPages materializes the whole stream", async () => {
    const { collectPages } = await loadIterateWithMock([
      { rows: [{ id: "a" }], nextCursor: "c1" },
      { rows: [{ id: "b" }, { id: "c" }], nextCursor: null },
    ])
    const all = await collectPages({ pageTypeSlug: "task" })
    expect(all.map((r) => r.id)).toEqual(["a", "b", "c"])
  })

  test("collectPages honors max", async () => {
    const { collectPages } = await loadIterateWithMock([
      { rows: [{ id: "a" }, { id: "b" }, { id: "c" }], nextCursor: "c1" },
    ])
    const all = await collectPages({
      pageTypeSlug: "task",
      max: 2,
    })
    expect(all.map((r) => r.id)).toEqual(["a", "b"])
  })

  test("flows where, order, select through to getPages", async () => {
    const { streamPages, calls } = await loadIterateWithMock([{ rows: [], nextCursor: null }])
    for await (const _ of streamPages({
      pageTypeSlug: "task",
      where: [{ key: "userId", eq: "u1" }],
      order: [{ by: "seq", dir: "desc" }],
      select: ["id", "title"],
      pageSize: 50,
      max: 10,
    })) {
    }
    expect(calls.length).toBe(1)
    expect(calls[0]).toMatchObject({
      pageTypeSlug: "task",
      where: [{ key: "userId", eq: "u1" }],
      order: [{ by: "seq", dir: "desc" }],
      select: ["id", "title"],
      limit: 50,
    })
    expect("pageSize" in (calls[0] ?? {})).toBe(false)
    expect("max" in (calls[0] ?? {})).toBe(false)
  })
})
