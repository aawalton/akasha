import { expect, test } from "bun:test"
import { ASK_AT, READ_AT, WRITE_AT } from "../page-serving/page-serving.module.code.ts"
import {
  ASK_AT as ASKS,
  ATTEMPTS,
  askingFor,
  backoffFor,
  type Fetcher,
  originOf,
  READ_AT as READS,
  refusedIn,
  type Sleeper,
  WRITE_AT as WRITES,
  writingFor,
} from "./page-calling.module.code.ts"

const neverNaps: Sleeper = () => Promise.resolve()

function answering(status: number, body: unknown): Fetcher {
  return () => Promise.resolve(new Response(JSON.stringify(body), { status }))
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
    answering(200, { rows: [{ slug: "definer" }] }),
    neverNaps
  )
  expect("rows" in said && said.rows).toEqual([{ slug: "definer" }])
  delete process.env.PAGES_SERVICE_ORIGIN
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
