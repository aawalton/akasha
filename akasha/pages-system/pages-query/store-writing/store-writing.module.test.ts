import { expect, test } from "bun:test"
import type { Fetcher } from "../store-reaching/store-reaching.module.code.ts"
import {
  patchPage,
  patchPageIfMatch,
  patchRow,
  patchRows,
  patchState,
  removeFiles,
  removePage,
  removeRow,
  writeFiles,
  writePage,
  writeRow,
  writeRows,
} from "./store-writing.module.code.ts"

const WRITER = "Amy <amy@alanwalton.com>"

const noNap = async () => undefined

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

test("a write naming a page by page type and name is refused rather than placed", async () => {
  const refusals = await Promise.all([
    writePage("workout-session", "one", {}, WRITER),
    removePage("workout-session", "one", WRITER),
    writeRow("set-log", "one", {}, WRITER),
    writeRows("set-log", "one", [], WRITER),
    removeRow("set-log", "one", "two", WRITER),
  ])
  for (const one of refusals) {
    expect(one.ok).toBe(false)
    if (one.ok) continue
    expect(one.why).toContain("nothing here can place this write")
  }
})

test("a patch is refused rather than read and written back", async () => {
  const refusals = await Promise.all([
    patchPage("workout-session", "one", {}, WRITER),
    patchState("workout-session", "one", {}, WRITER),
    patchRow("set-log", "one", {}, WRITER),
    patchRows("set-log", "one", [], WRITER),
  ])
  for (const one of refusals) {
    expect(one.ok).toBe(false)
    if (one.ok) continue
    expect(one.why).toContain("would be lost without a word")
  }
})

test("a compare-and-set is never answered as won", async () => {
  const compared = await patchPageIfMatch("web-app", "one", "k", null, {}, WRITER)
  expect(compared.outcome).toBe("failed")
  if (compared.outcome !== "failed") return
  expect(compared.why).toContain("takes no compare-and-set")
})
