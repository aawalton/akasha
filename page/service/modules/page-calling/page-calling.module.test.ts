import { expect, test } from "bun:test"
import {
  APPEND_AT as APPENDS,
  ASK_AT as ASKS,
  ATTEMPTS,
  appendingFor,
  askingFor,
  backoffFor,
  bytesSaid,
  type Fetcher,
  FILE_AT as FILES,
  filingFor,
  INCREMENT_AT as INCREMENTS,
  incrementingFor,
  originOf,
  READ_AT as READS,
  refusedIn,
  type Sleeper,
  shapesFor,
  WRITE_AT as WRITES,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  APPEND_AT,
  ASK_AT,
  FILE_AT,
  INCREMENT_AT,
  READ_AT,
  WRITE_AT,
} from "akasha/page/service/modules/page-serving/page-serving.module.code.ts"
import { z } from "zod"

const APPEND_SENT = z.looseObject({ under: z.string(), lines: z.array(z.string()) })

const PAGES_SENT = z.looseObject({ pages: z.array(z.looseObject({ pageTypeSlug: z.string() })) })

const KEPT_SENT = z.looseObject({ kept: z.array(z.unknown()) })

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
  expect([ASKS, READS, WRITES, APPENDS]).toEqual([ASK_AT, READ_AT, WRITE_AT, APPEND_AT])
})

test("an append hands over its lines and names the file part they landed in", async () => {
  let sent = ""
  const said = await appendingFor(
    { path: "akasha/a.check.ts", under: "audit-logs", lines: ["{}"] },
    (_url, init) => {
      sent = String(init.body)
      return Promise.resolve(
        new Response(JSON.stringify({ appended: "akasha/a.check.audit-logs.1.uncommitted.jsonl" }))
      )
    },
    neverNaps
  )
  const asked = APPEND_SENT.parse(JSON.parse(sent))
  expect(asked.under).toBe("audit-logs")
  expect(asked.lines).toEqual(["{}"])
  expect("appended" in said && said.appended).toBe("akasha/a.check.audit-logs.1.uncommitted.jsonl")
})

test("an append answered with no file part is refused rather than read as landed", async () => {
  const said = await appendingFor(
    { path: "akasha/a.check.ts", lines: ["{}"] },
    answering(200, { held: 1 }),
    neverNaps
  )
  expect("refused" in said && said.refused).toContain("naming no file part")
})

test("an append the service refuses for its own reasons is not sent again", async () => {
  const held = counting(answering(400, { refused: "`akasha/a.check.ts` names no page here" }))
  const said = await appendingFor(
    { path: "akasha/a.check.ts", lines: ["{}"] },
    held.fetcher,
    neverNaps
  )
  expect("refused" in said && said.refused).toContain("names no page here")
  expect(held.spent()).toBe(1)
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

test("the commit the rows were read at is carried back beside the rows", async () => {
  const said = await askingFor(
    { pageTypeSlug: "role" },
    answering(200, { rows: [], n: 0, at: "abc" }),
    neverNaps
  )
  expect("at" in said && said.at).toBe("abc")
})

test("an answer naming no commit carries none back", async () => {
  const said = await askingFor({ pageTypeSlug: "role" }, answering(200, { rows: [] }), neverNaps)
  expect("rows" in said && !("at" in said)).toBe(true)
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
  expect(PAGES_SENT.parse(JSON.parse(sent)).pages[0]?.pageTypeSlug).toBe("role")
  expect("commit" in said && said.commit).toBe("abc")
})

test("a write may keep values outside the commit", async () => {
  let sent = ""
  await writingFor(
    {
      writer: "Amy <amy@alanwalton.com>",
      message: "a message",
      kept: [{ path: "akasha/a.ts", values: { one: "abc" } }],
    },
    (_url, init) => {
      sent = String(init.body)
      return Promise.resolve(new Response(JSON.stringify({ commit: null, wrote: [], took: [] })))
    },
    neverNaps
  )
  expect(KEPT_SENT.parse(JSON.parse(sent)).kept).toEqual([
    { path: "akasha/a.ts", values: { one: "abc" } },
  ])
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

const AN_INCREMENT = {
  writer: "Amy <amy@alanwalton.com>",
  message: "a tap",
  pageTypeSlug: "readout-widget",
  slug: "one",
  key: "taps",
  by: 1,
  set: {},
}

test("the path an increment is called at is the path the service answers an increment at", () => {
  expect(INCREMENTS).toBe(INCREMENT_AT)
})

test("an increment carries back the count the service answered", async () => {
  expect(await incrementingFor(AN_INCREMENT, answering(200, { value: 7 }))).toEqual({ value: 7 })
})

test("an increment reaching no page carries back no count", async () => {
  expect(await incrementingFor(AN_INCREMENT, answering(200, { value: null }))).toEqual({
    value: null,
  })
})

test("an increment answered with no count is refused rather than read as landed", async () => {
  const said = await incrementingFor(AN_INCREMENT, answering(200, { held: 1 }))
  expect("refused" in said && said.refused).toContain("naming no count")
})

test("an increment that answers nothing is sent once rather than tried again", async () => {
  const held = counting(() => Promise.reject(new Error("nothing came back")))
  const said = await incrementingFor(AN_INCREMENT, held.fetcher)
  expect(held.spent()).toBe(1)
  expect("refused" in said && said.refused).toContain("counted twice")
})

test("the shapes of many page types are asked for in one question and carried back", async () => {
  const held = counting(answering(200, { shapes: { nav: null, role: { pageType: "role" } } }))
  const said = await shapesFor(["nav", "role"], held.fetcher, neverNaps)
  expect(held.spent()).toBe(1)
  const shapes = "shapes" in said ? said.shapes : {}
  expect(Object.keys(shapes)).toEqual(["nav", "role"])
  expect(shapes.nav).toBeNull()
  expect(shapes.role?.pageType).toBe("role")
})

test("shapes answered without a page type asked for are refused", async () => {
  const said = await shapesFor(
    ["nav", "role"],
    answering(200, { shapes: { nav: null } }),
    neverNaps
  )
  expect("refused" in said && said.refused).toContain("`role`")
})
