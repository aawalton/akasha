import { expect, test } from "bun:test"
import type { Fetcher } from "akasha/page/query/modules/store-reaching/store-reaching.module.code.ts"
import { noNap } from "akasha/page/query/modules/store-reaching/store-reaching.module.test-fixtures.ts"
import {
  readFiles,
  readPages,
  writeFiles,
  writePages,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import { z } from "zod"

const WRITER = "Amy <amy@alanwalton.com>"

const SENT_BODY = z.record(z.string(), z.unknown())

type Sent = { url: string; body: z.infer<typeof SENT_BODY> }

function recording(answer: unknown, status = 200): { fetcher: Fetcher; sent: () => Sent } {
  let held: Sent | null = null
  const fetcher: Fetcher = async (url, init) => {
    held = { url, body: SENT_BODY.parse(JSON.parse(String(init.body))) }
    return new Response(JSON.stringify(answer), {
      status,
      headers: { "content-type": "application/json" },
    })
  }
  return {
    fetcher,
    sent: () => {
      if (held === null) throw new Error("nothing was sent")
      return held
    },
  }
}

test("a write names a path and the whole body standing at it", async () => {
  const { fetcher, sent } = recording({ commit: "abc123", wrote: ["akasha/one.txt"], took: [] })
  const written = await writeFiles(
    [{ path: "akasha/one.txt", content: "a body" }],
    WRITER,
    "why",
    fetcher,
    noNap
  )
  expect(written).toEqual({ ok: true, at: "abc123" })
  const held = sent()
  expect(held.url).toEndWith("/write")
  expect(held.body.puts).toEqual([{ path: "akasha/one.txt", content: "a body" }])
  expect(held.body.writer).toBe(WRITER)
  expect(held.body.message).toBe("why")
})

test("a write of files may name the module that alone writes them", async () => {
  const { fetcher, sent } = recording({ commit: "abc123", wrote: ["akasha/one.txt"], took: [] })
  const put = { path: "akasha/one.txt", content: "a" }
  await writeFiles([put], WRITER, "why", fetcher, noNap, "r1", "tally-landing")
  expect(sent().body.writtenBy).toBe("tally-landing")
  expect(sent().body.read).toBe("r1")
})

test("a write of files naming no module sends none", async () => {
  const { fetcher, sent } = recording({ commit: "abc123", wrote: ["akasha/one.txt"], took: [] })
  await writeFiles([{ path: "akasha/one.txt", content: "a" }], WRITER, "why", fetcher, noNap)
  expect(sent().body).not.toHaveProperty("writtenBy")
})

test("a write that committed nothing is answered as not written", async () => {
  const { fetcher } = recording({ commit: null, wrote: [], took: [] })
  const written = await writeFiles(
    [{ path: "akasha/one.txt", content: "a" }],
    WRITER,
    "why",
    fetcher,
    noNap
  )
  expect(written.ok).toBe(false)
  if (written.ok) return
  expect(written.why).toContain("committed")
})

test("a writer shaped otherwise is refused before the store is reached", async () => {
  let reached = false
  const fetcher: Fetcher = async () => {
    reached = true
    return new Response("{}")
  }
  const written = await writeFiles(
    [{ path: "akasha/one.txt", content: "a" }],
    "Amy",
    "why",
    fetcher,
    noNap
  )
  expect(reached).toBe(false)
  expect(written.ok).toBe(false)
  if (written.ok) return
  expect(written.why).toContain("a name and an address")
})

test("a write carrying no path is refused", async () => {
  const { fetcher } = recording({ commit: "x", wrote: [], took: [] })
  expect((await writeFiles([], WRITER, "why", fetcher, noNap)).ok).toBe(false)
})

test("a refusal the store states is carried back", async () => {
  const { fetcher } = recording({ refused: "`x` stands outside `akasha/`" }, 400)
  const written = await writeFiles([{ path: "x", content: "a" }], WRITER, "why", fetcher, noNap)
  expect(written.ok).toBe(false)
  if (written.ok) return
  expect(written.why).toContain("stands outside")
})

test("a write of pages names each page's type and slug and the values it states", async () => {
  const { fetcher, sent } = recording({ commit: "abc123", wrote: ["akasha/one.ts"], took: [] })
  const written = await writePages(
    [{ pageTypeSlug: "great-course", slug: "one", values: { title: "One" } }],
    WRITER,
    "why",
    fetcher,
    noNap
  )
  expect(written).toEqual({ ok: true, at: "abc123" })
  const held = sent()
  expect(held.url).toEndWith("/write")
  expect(held.body.puts).toBeUndefined()
  expect(held.body.pages).toEqual([
    { pageTypeSlug: "great-course", slug: "one", values: { title: "One" } },
  ])
})

test("a write of pages may send the commit it read and pages written as new", async () => {
  const { fetcher, sent } = recording({ commit: "abc123", wrote: ["akasha/one.ts"], took: [] })
  const page = { pageTypeSlug: "great-course", slug: "one", values: {}, fresh: true }
  await writePages([page], WRITER, "why", fetcher, noNap, "r1")
  expect(sent().body.read).toBe("r1")
  expect(sent().body.pages).toEqual([page])
})

test("a write of pages stating no commit sends none", async () => {
  const { fetcher, sent } = recording({ commit: "abc123", wrote: ["akasha/one.ts"], took: [] })
  await writePages([{ pageTypeSlug: "a", slug: "b", values: {} }], WRITER, "why", fetcher, noNap)
  expect(sent().body).not.toHaveProperty("read")
})

test("a write of pages carrying no page is refused", async () => {
  const { fetcher } = recording({ commit: "x", wrote: [], took: [] })
  expect((await writePages([], WRITER, "why", fetcher, noNap)).ok).toBe(false)
})

test("a read answers with a whole body and the commit it was read at", async () => {
  const { fetcher, sent } = recording({
    at: "abc123",
    bodies: [{ path: "akasha/one.txt", content: "a body" }],
    unplaced: [],
  })
  const found = await readFiles(["akasha/one.txt"], fetcher, noNap)
  expect(found.ok).toBe(true)
  if (!found.ok) return
  expect(found.at).toBe("abc123")
  expect(found.bodies[0]?.content).toBe("a body")
  expect(sent().url).toEndWith("/read")
})

test("a path the store does not carry answers as nothing", async () => {
  const { fetcher } = recording({
    at: "abc123",
    bodies: [{ path: "akasha/gone.txt", content: null }],
    unplaced: [],
  })
  const found = await readFiles(["akasha/gone.txt"], fetcher, noNap)
  expect(found.ok && found.bodies[0]?.content).toBe(null)
})

test("a read names a page by its page type and its slug", async () => {
  const { fetcher, sent } = recording({ at: "abc", bodies: [], unplaced: ["module/nowhere"] })
  const found = await readPages([{ pageTypeSlug: "module", slug: "nowhere" }], fetcher, noNap)
  expect(found.ok && found.unplaced).toEqual(["module/nowhere"])
  expect(sent().body.pages).toEqual([{ pageTypeSlug: "module", slug: "nowhere" }])
})

test("a read carrying no path is refused", async () => {
  const { fetcher } = recording({ at: "abc", bodies: [], unplaced: [] })
  expect((await readFiles([], fetcher, noNap)).ok).toBe(false)
  expect((await readPages([], fetcher, noNap)).ok).toBe(false)
})
