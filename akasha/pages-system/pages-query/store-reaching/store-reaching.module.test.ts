import { expect, test } from "bun:test"
import {
  ATTEMPTS,
  BACKOFF_CEILING_MS,
  backoffFor,
  type Fetcher,
  fetchThrough,
  pageStoreOrigin,
  pagesFetcher,
  postingTo,
  worthRetrying,
} from "./store-reaching.module.code.ts"
import { noNap } from "./store-reaching.module.test-fixtures.ts"

function answering(status: number, body: unknown): Fetcher {
  return async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    })
}

function counting(status: number, body: unknown): { fetcher: Fetcher; calls: () => number } {
  let calls = 0
  const fetcher: Fetcher = async (url, init) => {
    calls += 1
    return answering(status, body)(url, init)
  }
  return { fetcher, calls: () => calls }
}

test("the origin is read from the environment before anything else", () => {
  const held = process.env.PAGE_STORE_ORIGIN
  process.env.PAGE_STORE_ORIGIN = "http://127.0.0.1:8787/"
  expect(pageStoreOrigin()).toBe("http://127.0.0.1:8787")
  if (held === undefined) delete process.env.PAGE_STORE_ORIGIN
  else process.env.PAGE_STORE_ORIGIN = held
})

test("a caller may put its own fetcher in place of the global one", () => {
  const mine: Fetcher = async () => new Response("{}")
  fetchThrough(mine)
  expect(pagesFetcher()).toBe(mine)
  fetchThrough(null)
  expect(pagesFetcher()).not.toBe(mine)
})

test("a body the store answers with is given back", async () => {
  const reached = await postingTo(
    "/ask",
    "a question",
    {},
    answering(200, { rows: [{ slug: "one" }] }),
    50,
    noNap
  )
  expect(reached).toEqual({ ok: true, body: { rows: [{ slug: "one" }] } })
})

test("a refusal the store states is carried into the reason given back", async () => {
  const reached = await postingTo(
    "/ask",
    "a question",
    {},
    answering(400, { refused: "a question names a page type" }),
    50,
    noNap
  )
  expect(reached.ok).toBe(false)
  if (reached.ok) return
  expect(reached.why).toContain("a question names a page type")
  expect(reached.status).toBe(400)
})

test("a call the store refuses for its own reasons is not tried again", async () => {
  const { fetcher, calls } = counting(400, { refused: "no" })
  await postingTo("/ask", "a question", {}, fetcher, 50, noNap)
  expect(calls()).toBe(1)
})

test("a call that answers nothing is tried again", async () => {
  const { fetcher, calls } = counting(503, { refused: "away" })
  const reached = await postingTo("/ask", "a question", {}, fetcher, 50, noNap)
  expect(calls()).toBe(ATTEMPTS)
  expect(reached.ok).toBe(false)
})

test("a reason names how many attempts were spent", async () => {
  const reached = await postingTo("/ask", "a question", {}, answering(503, {}), 50, noNap)
  expect(reached.ok).toBe(false)
  if (reached.ok) return
  expect(reached.why).toContain(`${ATTEMPTS} attempts were spent`)
})

test("a reason for a refusal names the one attempt it took", async () => {
  const held = await postingTo(
    "/ask",
    "a question",
    {},
    answering(400, { refused: "no" }),
    50,
    noNap
  )
  expect(held.ok).toBe(false)
  if (held.ok) return
  expect(held.why).toContain("one attempt was spent")
})

test("a reason says nothing came back only where nothing did", async () => {
  const answered = await postingTo(
    "/ask",
    "a question",
    {},
    answering(400, { refused: "no" }),
    50,
    noNap
  )
  expect(answered.ok ? "" : answered.why).not.toContain("nothing came back")
  const away: Fetcher = async () => {
    throw new Error("away")
  }
  const gone = await postingTo("/ask", "a question", {}, away, 50, noNap)
  expect(gone.ok ? "" : gone.why).toContain(`${ATTEMPTS} attempts were spent and nothing came back`)
})

test("an answer that is not JSON is a reason rather than a throw", async () => {
  const fetcher: Fetcher = async () => new Response("<html>")
  const reached = await postingTo("/ask", "a question", {}, fetcher, 50, noNap)
  expect(reached.ok).toBe(false)
  if (reached.ok) return
  expect(reached.why).toContain("not JSON")
})

test("a status the store never sends is worth trying again only above five hundred", () => {
  expect(worthRetrying(undefined)).toBe(true)
  expect(worthRetrying(503)).toBe(true)
  expect(worthRetrying(429)).toBe(true)
  expect(worthRetrying(400)).toBe(false)
  expect(worthRetrying(404)).toBe(false)
})

test("backing off never climbs past its ceiling", () => {
  for (let attempt = 1; attempt < 12; attempt += 1) {
    expect(backoffFor(attempt)).toBeLessThanOrEqual(BACKOFF_CEILING_MS * 1.5)
  }
})
