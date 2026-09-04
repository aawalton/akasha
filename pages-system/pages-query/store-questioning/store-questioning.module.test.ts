import { expect, test } from "bun:test"
import type { Fetcher } from "../store-reaching/store-reaching.module.code.ts"
import { noNap } from "../store-reaching/store-reaching.module.test-fixtures.ts"
import { askComposed, type ComposedQuery } from "./store-questioning.module.code.ts"

const LIVE_ORIGIN = "http://127.0.0.1:8787"

type Sent = { url: string; body: Record<string, unknown> }

function recording(rows: readonly Record<string, unknown>[]): {
  fetcher: Fetcher
  sent: () => Sent
} {
  let held: Sent | null = null
  const fetcher: Fetcher = async (url, init) => {
    held = { url, body: JSON.parse(String(init.body)) }
    return new Response(JSON.stringify({ rows }), {
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

async function asking(
  query: ComposedQuery,
  rows: readonly Record<string, unknown>[]
): Promise<{ sent: Sent; answer: ReturnType<typeof shaped> }> {
  const { fetcher, sent } = recording(rows)
  const asked = await askComposed(query, fetcher, noNap)
  if (!asked.ok) throw new Error(asked.why)
  return { sent: sent(), answer: shaped(asked.answer) }
}

function shaped(answer: {
  n: number
  value: number | null
  rows: readonly { values: Record<string, unknown> }[]
}) {
  return { n: answer.n, value: answer.value, values: answer.rows.map((one) => one.values) }
}

test("a query names its page type as the store spells it", async () => {
  const { sent } = await asking({ "page-type": "finding", keys: ["slug"] }, [])
  expect(sent.url).toEndWith("/ask")
  expect(sent.body.pageTypeSlug).toBe("finding")
  expect(sent.body.keys).toEqual(["slug"])
})

test("a row is answered under values though the store answers it flat", async () => {
  const { answer } = await asking({ "page-type": "finding" }, [{ slug: "one" }])
  expect(answer.values).toEqual([{ slug: "one" }])
})

test("a test the store runs the same way is sent to the store", async () => {
  const { sent } = await asking({ "page-type": "finding", where: { slug: { is: "one" } } }, [])
  expect(sent.body.where).toEqual({ slug: { is: "one" } })
})

test("a test the store does not run is kept back and run here", async () => {
  const { sent, answer } = await asking(
    { "page-type": "finding", where: { slug: { "ends-with": "-two" } } },
    [{ slug: "one-two" }, { slug: "one-three" }]
  )
  expect(sent.body.where).toBeUndefined()
  expect(answer.values).toEqual([{ slug: "one-two" }])
})

test("a test named in no vocabulary is refused rather than dropped", async () => {
  const { fetcher } = recording([{ slug: "one" }, { slug: "two" }])
  const asked = await askComposed(
    { "page-type": "finding", where: { slug: { bogus: "one" } } },
    fetcher,
    noNap
  )
  expect(asked.ok).toBe(false)
  if (asked.ok) return
  expect(asked.why).toContain("`bogus` on `slug` is no test")
})

test("a test stating nothing is refused rather than dropped", async () => {
  const { fetcher } = recording([{ slug: "one" }, { slug: "two" }])
  const asked = await askComposed({ "page-type": "finding", where: { slug: {} } }, fetcher, noNap)
  expect(asked.ok).toBe(false)
  if (asked.ok) return
  expect(asked.why).toContain("`slug`")
})

test("a bare value where a test belongs is refused", async () => {
  const { fetcher } = recording([])
  const asked = await askComposed(
    { "page-type": "finding", where: { slug: "one" } },
    fetcher,
    noNap
  )
  expect(asked.ok).toBe(false)
})

test("an is the store cannot run because it is no string is run here", async () => {
  const { sent, answer } = await asking({ "page-type": "thing", where: { active: { is: true } } }, [
    { slug: "one", active: true },
    { slug: "two", active: false },
  ])
  expect(sent.body.where).toBeUndefined()
  expect(answer.values).toEqual([{ slug: "one", active: true }])
})

test("nothing is skipped or taken by the store where a test still stands here", async () => {
  const { sent, answer } = await asking(
    { "page-type": "thing", where: { name: { contains: "a" } }, limit: 1 },
    [{ name: "za" }, { name: "zb" }, { name: "ya" }]
  )
  expect(sent.body.limit).toBeUndefined()
  expect(answer.values).toEqual([{ name: "za" }])
  expect(answer.n).toBe(2)
})

test("at-or-after and before narrow to a window", async () => {
  const { answer } = await asking(
    {
      "page-type": "sample",
      where: { at: { "at-or-after": "2026-02-01", before: "2026-03-01" } },
      keys: ["at"],
    },
    [{ at: "2026-01-15" }, { at: "2026-02-10" }, { at: "2026-03-02" }]
  )
  expect(answer.values).toEqual([{ at: "2026-02-10" }])
})

test("an emptiness the store tests is sent to the store with the keys asked for", async () => {
  const { sent } = await asking(
    { "page-type": "thing", where: { done: { empty: true } }, keys: ["slug"] },
    []
  )
  expect(sent.body.where).toEqual({ done: { empty: true } })
  expect(sent.body.keys).toEqual(["slug"])
})

test("an emptiness beside a test kept back is run here over the rows", async () => {
  const { sent, answer } = await asking(
    {
      "page-type": "thing",
      where: { done: { empty: true }, slug: { "starts-with": "t" } },
      keys: ["slug"],
    },
    [
      { slug: "one", done: "" },
      { slug: "two", done: "" },
    ]
  )
  expect(sent.body.where).toEqual({ done: { empty: true } })
  expect(sent.body.keys).toBeUndefined()
  expect(answer.values).toEqual([{ slug: "two" }])
})

test("grouping counts the rows falling under each set of keys", async () => {
  const { answer } = await asking({ "page-type": "thing", "count-by": ["kind"] }, [
    { kind: "a" },
    { kind: "b" },
    { kind: "a" },
  ])
  expect(answer.values).toEqual([
    { kind: "a", n: 2 },
    { kind: "b", n: 1 },
  ])
})

test("a sum passes over what holds no number", async () => {
  const { answer } = await asking({ "page-type": "thing", function: "sum", target: "weight" }, [
    { weight: 2 },
    { weight: "3" },
    { weight: null },
    { weight: "heavy" },
  ])
  expect(answer.value).toBe(5)
})

test("a mean is the sum over what carried a number", async () => {
  const { answer } = await asking({ "page-type": "thing", function: "mean", target: "weight" }, [
    { weight: 2 },
    { weight: 4 },
    { weight: "" },
  ])
  expect(answer.value).toBe(3)
})

test("a sum under a grouping is taken for each group", async () => {
  const { answer } = await asking(
    { "page-type": "thing", "count-by": ["kind"], function: "sum", target: "weight" },
    [
      { kind: "a", weight: 1 },
      { kind: "a", weight: 2 },
      { kind: "b", weight: 5 },
    ]
  )
  expect(answer.values).toEqual([
    { kind: "a", n: 2, value: 3 },
    { kind: "b", n: 1, value: 5 },
  ])
})

test("the store standing on this workstation answers a composed query", async () => {
  const held = process.env.PAGE_STORE_ORIGIN
  process.env.PAGE_STORE_ORIGIN = LIVE_ORIGIN
  try {
    const asked = await askComposed({
      "page-type": "page-type",
      where: { slug: { is: "finding" } },
      keys: ["slug", "pluralSlug"],
    })
    if (!asked.ok) throw new Error(asked.why)
    expect(asked.answer.rows.map((one) => one.values)).toEqual([
      { slug: "finding", pluralSlug: "findings" },
    ])
  } finally {
    if (held === undefined) delete process.env.PAGE_STORE_ORIGIN
    else process.env.PAGE_STORE_ORIGIN = held
  }
})

test("the store answers a test it does not run, run here over its rows", async () => {
  const held = process.env.PAGE_STORE_ORIGIN
  process.env.PAGE_STORE_ORIGIN = LIVE_ORIGIN
  try {
    const asked = await askComposed({
      "page-type": "page-type",
      where: { slug: { "ends-with": "-property" } },
      keys: ["slug"],
      "sort-by": "slug",
    })
    if (!asked.ok) throw new Error(asked.why)
    const slugs = asked.answer.rows.map((one) => one.values.slug)
    expect(slugs).toContain("text-property")
    expect(slugs).toContain("relation-property")
    expect(slugs).not.toContain("finding")
    expect(slugs).toEqual([...slugs].sort())
  } finally {
    if (held === undefined) delete process.env.PAGE_STORE_ORIGIN
    else process.env.PAGE_STORE_ORIGIN = held
  }
})
