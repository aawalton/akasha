import { expect, test } from "bun:test"
import { ASK_AT, FILE_AT, READ_AT, WRITE_AT } from "../page-serving/page-serving.module.code.ts"
import {
  ASK_AT as ASKS,
  ATTEMPTS,
  askingFor,
  backoffFor,
  bytesSaid,
  type Fetcher,
  FILE_AT as FILES,
  filingFor,
  originOf,
  READ_AT as READS,
  refusedIn,
  type Sleeper,
  WRITE_AT as WRITES,
  writingFor,
} from "./page-calling.module.code.ts"

const A_FILE = { pageTypeSlug: "persona", slug: "amy", key: "mobileWallpaper" }

const A_PICTURE = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0xff, 0xfe, 0x00])

function handing(bytes: Uint8Array<ArrayBuffer>): Fetcher {
  return () => Promise.resolve(new Response(bytes, { status: 200 }))
}

const neverNaps: Sleeper = () => Promise.resolve()

function answering(status: number, body: unknown): Fetcher {
  return () => Promise.resolve(new Response(JSON.stringify(body), { status }))
}

const GARBLED = '{"rows":[{"id":"one"'

function garbling(status: number, body: string, headers: Record<string, string> = {}): Fetcher {
  return () => Promise.resolve(new Response(body, { status, headers }))
}

function whyOf(said: unknown): string {
  return refusedIn(said) ?? ""
}

function counting(said: Fetcher): { readonly fetcher: Fetcher; readonly spent: () => number } {
  let spent = 0
  return {
    fetcher: (url, init) => {
      spent += 1
      return said(url, init)
    },
    spent: () => spent,
  }
}

test("an answer that is no object is refused rather than read into", async () => {
  const said = await askingFor({ pageTypeSlug: "role" }, answering(200, null), neverNaps)
  expect(whyOf(said)).toContain("no rows can be read out of")
})

test("a body that will not read as JSON is refused rather than answered as nothing", async () => {
  const said = await askingFor({ pageTypeSlug: "role" }, garbling(200, GARBLED), neverNaps)
  expect("rows" in said).toBe(false)
  expect(whyOf(said)).toContain("would not read as JSON")
})

test("a refusal over a body that will not read carries what the parser said", async () => {
  const said = await askingFor({ pageTypeSlug: "role" }, garbling(200, GARBLED), neverNaps)
  expect(whyOf(said).split("would not read as JSON: ")[1]).toBeTruthy()
})

test("a refusal over a body that will not read names how many bytes came back", async () => {
  const headers = { "content-length": String(GARBLED.length) }
  const said = await askingFor({ pageTypeSlug: "role" }, garbling(200, GARBLED, headers), neverNaps)
  expect(whyOf(said)).toContain(`${GARBLED.length} bytes`)
})

test("a body whose length nothing states is refused without a byte count made up", () => {
  expect(bytesSaid(new Response(GARBLED))).toBe("body of a length nothing stated")
  expect(bytesSaid(new Response(GARBLED, { headers: { "content-length": "20" } }))).toBe("20 bytes")
})

test("a body that will not read as JSON is not tried again", async () => {
  const held = counting(garbling(200, GARBLED))
  await askingFor({ pageTypeSlug: "role" }, held.fetcher, neverNaps)
  expect(held.spent()).toBe(1)
})

test("the paths this calls are the paths the service answers at", () => {
  expect([ASKS, READS, WRITES]).toEqual([ASK_AT, READ_AT, WRITE_AT])
})

test("the origin is read from the environment before anything else", () => {
  process.env.PAGES_SERVICE_ORIGIN = "http://held.invalid:8787"
  expect(originOf()).toBe("http://held.invalid:8787")
  process.env.PAGES_SERVICE_ORIGIN = "http://held.invalid:8787/"
  expect(originOf()).toBe("http://held.invalid:8787")
  delete process.env.PAGES_SERVICE_ORIGIN
})

test("rows the service answers are carried back", async () => {
  process.env.PAGES_SERVICE_ORIGIN = "http://held.invalid:8787"
  const said = await askingFor(
    { pageTypeSlug: "role", keys: ["slug"] },
    answering(200, { rows: [{ slug: "definer" }], n: 1 }),
    neverNaps
  )
  expect("rows" in said && said.rows).toEqual([{ slug: "definer" }])
  delete process.env.PAGES_SERVICE_ORIGIN
})

test("the count of what matched is carried back beside the rows", async () => {
  const said = await askingFor(
    { pageTypeSlug: "role", limit: 1 },
    answering(200, { rows: [{ slug: "definer" }], n: 12 }),
    neverNaps
  )
  expect("n" in said && said.n).toBe(12)
})

test("a limit answered with no count is refused rather than read as the whole", async () => {
  const said = await askingFor(
    { pageTypeSlug: "role", limit: 1 },
    answering(200, { rows: [{ slug: "definer" }] }),
    neverNaps
  )
  expect("refused" in said && said.refused).toContain("no count of what matched")
})

test("a question skipping and taking nothing needs no count from the service", async () => {
  const said = await askingFor(
    { pageTypeSlug: "role" },
    answering(200, { rows: [{ slug: "definer" }, { slug: "worker" }] }),
    neverNaps
  )
  expect("n" in said && said.n).toBe(2)
})

test("a call the service refuses for its own reasons is not tried again", async () => {
  const held = counting(answering(400, { refused: "`nav` names no page type the index holds" }))
  const said = await askingFor({ pageTypeSlug: "nav" }, held.fetcher, neverNaps)
  expect("refused" in said && said.refused).toContain("names no page type")
  expect(held.spent()).toBe(1)
})

test("a call that answers nothing is tried again", async () => {
  const held = counting(() => Promise.reject(new Error("nothing came back")))
  const said = await askingFor({ pageTypeSlug: "role" }, held.fetcher, neverNaps)
  expect(held.spent()).toBe(ATTEMPTS)
  expect("refused" in said && said.refused).toContain(`${ATTEMPTS} attempts`)
})

test("an answer whose shape is not the one asked for is refused", async () => {
  const said = await askingFor({ pageTypeSlug: "role" }, answering(200, { held: 1 }), neverNaps)
  expect("refused" in said && said.refused).toContain("no rows")
})

test("a write hands over values under pages and carries the commit back", async () => {
  let sent = ""
  const said = await writingFor(
    {
      writer: "Amy <amy@alanwalton.com>",
      message: "a message",
      pages: [{ pageTypeSlug: "role", slug: "one", values: { slug: "one" } }],
    },
    (_url, init) => {
      sent = String(init.body)
      return Promise.resolve(
        new Response(JSON.stringify({ commit: "abc", wrote: ["akasha/a.ts"], took: [] }))
      )
    },
    neverNaps
  )
  expect(JSON.parse(sent).pages[0].pageTypeSlug).toBe("role")
  expect("commit" in said && said.commit).toBe("abc")
})

test("a refusal is told apart from an answer by the key it carries", () => {
  expect(refusedIn({ refused: "why" })).toBe("why")
  expect(refusedIn({ rows: [] })).toBe(null)
  expect(refusedIn(null)).toBe(null)
})

test("the wait between attempts grows", () => {
  expect(backoffFor(1)).toBeLessThan(backoffFor(2))
  expect(backoffFor(2)).toBeLessThan(backoffFor(3))
})

test("a file answered well is taken as bytes rather than read as JSON", async () => {
  const said = await filingFor(A_FILE, handing(A_PICTURE), neverNaps)
  expect("bytes" in said).toBe(true)
  if (!("bytes" in said)) return
  expect(Array.from(said.bytes)).toEqual(Array.from(A_PICTURE))
})

test("a file the service refuses for its own reasons is not asked for again", async () => {
  const held = counting(answering(400, { refused: "`persona` carries no `nope`" }))
  const said = await filingFor({ ...A_FILE, key: "nope" }, held.fetcher, neverNaps)
  expect("refused" in said && said.refused).toContain("carries no")
  expect(held.spent()).toBe(1)
})

test("a file answered badly on the way is asked for again", async () => {
  const held = counting(answering(502, { refused: "the store is gone" }))
  await filingFor(A_FILE, held.fetcher, neverNaps)
  expect(held.spent()).toBe(ATTEMPTS)
})

test("the path a file is called at is the path the service answers a file at", () => {
  expect(FILES).toBe(FILE_AT)
})
