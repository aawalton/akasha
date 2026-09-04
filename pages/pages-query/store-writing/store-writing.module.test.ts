import { expect, test } from "bun:test"
import type { Fetcher } from "../store-reaching/store-reaching.module.code.ts"
import { noNap } from "../store-reaching/store-reaching.module.test-fixtures.ts"
import {
  askNamed,
  askTaking,
  patchFiles,
  patchPage,
  patchPageIfMatch,
  patchRow,
  patchRows,
  patchState,
  readFiles,
  readPages,
  removeFiles,
  removePage,
  removeRow,
  writeFiles,
  writePage,
  writeRow,
  writeRows,
} from "./store-writing.module.code.ts"

const WRITER = "Amy <amy@alanwalton.com>"

type Sent = { url: string; body: Record<string, unknown> }

function recording(answer: unknown, status = 200): { fetcher: Fetcher; sent: () => Sent } {
  let held: Sent | null = null
  const fetcher: Fetcher = async (url, init) => {
    held = { url, body: JSON.parse(String(init.body)) }
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

test("a taking names the paths it takes away", async () => {
  const { fetcher, sent } = recording({ commit: "def456", wrote: [], took: ["akasha/one.txt"] })
  const written = await removeFiles(["akasha/one.txt"], WRITER, "why", fetcher, noNap)
  expect(written).toEqual({ ok: true, at: "def456" })
  expect(sent().body.removes).toEqual(["akasha/one.txt"])
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
  expect((await removeFiles([], WRITER, "why", fetcher, noNap)).ok).toBe(false)
})

test("a refusal the store states is carried back", async () => {
  const { fetcher } = recording({ refused: "`x` stands outside `akasha/`" }, 400)
  const written = await writeFiles([{ path: "x", content: "a" }], WRITER, "why", fetcher, noNap)
  expect(written.ok).toBe(false)
  if (written.ok) return
  expect(written.why).toContain("stands outside")
})

test("a write stating the keys a page would carry is refused for want of a renderer", async () => {
  const refusals = await Promise.all([
    writePage("workout-session", "one", {}, WRITER),
    patchPage("workout-session", "one", {}, WRITER),
    patchState("workout-session", "one", {}, WRITER),
  ])
  for (const one of refusals) {
    expect(one.ok).toBe(false)
    if (one.ok) continue
    expect(one.why).toContain("renders a page's body")
  }
})

test("a write naming a row inside a page is refused for want of a way to address one", async () => {
  const refusals = await Promise.all([
    writeRow("set-log", "one", {}, WRITER),
    writeRows("set-log", "one", [], WRITER),
    patchRow("set-log", "one", {}, WRITER),
    patchRows("set-log", "one", [], WRITER),
    removeRow("set-log", "one", "two", WRITER),
  ])
  for (const one of refusals) {
    expect(one.ok).toBe(false)
    if (one.ok) continue
    expect(one.why).toContain("nothing here can reach the row")
  }
})

test("a compare-and-set over keys is refused for want of a renderer", async () => {
  const compared = await patchPageIfMatch("web-app", "one", "k", null, {}, WRITER)
  expect(compared.outcome).toBe("failed")
  if (compared.outcome !== "failed") return
  expect(compared.why).toContain("renders a page's body")
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

test("a patch states the commit its bodies were read at", async () => {
  const sends: Record<string, unknown>[] = []
  const fetcher: Fetcher = async (url, init) => {
    const body = JSON.parse(String(init.body)) as Record<string, unknown>
    sends.push(body)
    const answer = url.endsWith("/read")
      ? { at: "base99", bodies: [{ path: "akasha/one.txt", content: "was" }], unplaced: [] }
      : { commit: "next11", wrote: ["akasha/one.txt"], took: [] }
    return new Response(JSON.stringify(answer), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  }
  const written = await patchFiles(
    ["akasha/one.txt"],
    (bodies) => [{ path: "akasha/one.txt", content: `${String(bodies[0]?.content)} and now` }],
    WRITER,
    "why",
    fetcher,
    noNap
  )
  expect(written).toEqual({ ok: true, at: "next11" })
  expect(sends[1]?.read).toBe("base99")
  expect(JSON.stringify(sends[1]?.puts)).toContain("was and now")
})

test("a patch a write landed under is refused rather than told it won", async () => {
  const fetcher: Fetcher = async (url) => {
    const answer = url.endsWith("/read")
      ? { at: "base99", bodies: [{ path: "akasha/one.txt", content: "was" }], unplaced: [] }
      : { refused: "akasha/one.txt — read against `base99`, and what stands is not what was read" }
    return new Response(JSON.stringify(answer), {
      status: url.endsWith("/read") ? 200 : 400,
      headers: { "content-type": "application/json" },
    })
  }
  const written = await patchFiles(
    ["akasha/one.txt"],
    () => [{ path: "akasha/one.txt", content: "now" }],
    WRITER,
    "why",
    fetcher,
    noNap
  )
  expect(written.ok).toBe(false)
  if (written.ok) return
  expect(written.why).toContain("not what was read")
})

test("a patch leaving every body as it stood writes nothing", async () => {
  let wrote = false
  const fetcher: Fetcher = async (url) => {
    if (!url.endsWith("/read")) wrote = true
    return new Response(
      JSON.stringify({
        at: "base99",
        bodies: [{ path: "akasha/one.txt", content: "was" }],
        unplaced: [],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    )
  }
  const written = await patchFiles(["akasha/one.txt"], () => null, WRITER, "why", fetcher, noNap)
  expect(wrote).toBe(false)
  expect(written.ok).toBe(false)
  if (written.ok) return
  expect(written.why).toContain("left every body as it stood")
})

test("a page is taken away by the page type and the name it is reached by", async () => {
  const sends: Record<string, unknown>[] = []
  const fetcher: Fetcher = async (url, init) => {
    sends.push(JSON.parse(String(init.body)) as Record<string, unknown>)
    const answer = url.endsWith("/read")
      ? { at: "base99", bodies: [{ path: "akasha/a/one.finding.ts", content: "x" }], unplaced: [] }
      : { commit: "gone11", wrote: [], took: ["akasha/a/one.finding.ts"] }
    return new Response(JSON.stringify(answer), {
      status: 200,
      headers: { "content-type": "application/json" },
    })
  }
  const written = await removePage("finding", "one", WRITER, fetcher, noNap)
  expect(written).toEqual({ ok: true, at: "gone11" })
  expect(sends[1]?.removes).toEqual(["akasha/a/one.finding.ts"])
  expect(sends[1]?.read).toBe("base99")
})

test("a page standing nowhere is not taken away", async () => {
  const { fetcher } = recording({ at: "base99", bodies: [], unplaced: ["finding/nowhere"] })
  const written = await removePage("finding", "nowhere", WRITER, fetcher, noNap)
  expect(written.ok).toBe(false)
  if (written.ok) return
  expect(written.why).toContain("no page stands at finding/nowhere")
})

test("a query asked for by name is refused", async () => {
  const named = await askNamed("some-saved-query")
  expect(named.ok).toBe(false)
  if (named.ok) return
  expect(named.why).toContain("holds no page under `page-query`")
  const taking = await askTaking("some-saved-query", { day: "2026-08-31" })
  expect(taking.ok).toBe(false)
})
