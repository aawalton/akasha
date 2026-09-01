import { expect, test } from "bun:test"
import { join } from "node:path"
import type { Asked, Wrote } from "../page-writing/page-writing.module.code.ts"
import { ASK_AT, answering, queryIn, WRITE_AT, writeIn } from "./page-serving.module.code.ts"

const ROOT = join(import.meta.dir, "..", "..", "..", "..")

const TOLD: Asked[] = []

const NOTHING_LANDS: Wrote = { commit: null, wrote: [], took: [] }

const GIVEN = {
  root: ROOT,
  writer: {
    writing: (asked: Asked) => {
      TOLD.push(asked)
      return Promise.resolve(NOTHING_LANDS)
    },
  },
}

function asking(body: unknown, at: string = ASK_AT, method: string = "POST"): Request {
  return new Request(`http://workstation${at}`, {
    method,
    body: method === "POST" ? JSON.stringify(body) : undefined,
    headers: { "content-type": "application/json" },
  })
}

async function bodyOf(answered: Response): Promise<Record<string, unknown>> {
  return (await answered.json()) as Record<string, unknown>
}

test("a question is answered with rows", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "invariant-kind", keys: ["slug"] })
  )
  expect(answered.status).toBe(200)
  const held = await bodyOf(answered)
  expect(Array.isArray(held.rows)).toBe(true)
  expect(JSON.stringify(held.rows)).toContain("departure")
})

test("nothing is asked at another path", async () => {
  const answered = await answering(GIVEN, asking({ pageTypeSlug: "invariant-kind" }, "/elsewhere"))
  expect(answered.status).toBe(404)
})

test("a question arrives by POST rather than by GET", async () => {
  const answered = await answering(GIVEN, asking(null, ASK_AT, "GET"))
  expect(answered.status).toBe(405)
})

test("a body that will not parse is refused", async () => {
  const request = new Request(`http://workstation${ASK_AT}`, { method: "POST", body: "not json" })
  const answered = await answering(GIVEN, request)
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("JSON")
})

test("a question naming no page type is refused", async () => {
  const answered = await answering(GIVEN, asking({ keys: ["slug"] }))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("pageTypeSlug")
})

test("a where that is no test is refused", async () => {
  const answered = await answering(
    GIVEN,
    asking({ pageTypeSlug: "invariant-kind", where: { slug: 7 } })
  )
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("where.slug")
})

test("keys that are not strings are refused", async () => {
  const answered = await answering(GIVEN, asking({ pageTypeSlug: "invariant-kind", keys: [7] }))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("keys")
})

test("what the pages refuse is carried back", async () => {
  const answered = await answering(GIVEN, asking({ pageTypeSlug: "invariant-kind", limit: -1 }))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("limit")
})

test("a whole question is read off the body", () => {
  const read = queryIn({
    pageTypeSlug: "invariant-kind",
    where: { slug: { is: "gap" } },
    keys: ["slug"],
    sortBy: "slug",
    descending: true,
    limit: 2,
    offset: 1,
  })
  expect("query" in read && read.query.pageTypeSlug).toBe("invariant-kind")
  expect("query" in read && read.query.descending).toBe(true)
})

test("a question that is not an object is refused", () => {
  const read = queryIn([1, 2, 3])
  expect("refused" in read && read.refused).toContain("JSON object")
})

test("a write is handed in at a path of its own", async () => {
  const answered = await answering(
    GIVEN,
    asking(
      {
        writer: "Amy <amy@alanwalton.com>",
        message: "a message",
        puts: [{ path: "akasha/a.ts", content: "x" }],
      },
      WRITE_AT
    )
  )
  expect(answered.status).toBe(200)
  expect(TOLD[TOLD.length - 1]?.writer).toBe("Amy <amy@alanwalton.com>")
})

test("a write stating no writer is refused", async () => {
  const answered = await answering(GIVEN, asking({ message: "a message" }, WRITE_AT))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("writer")
})

test("a write stating no message is refused", async () => {
  const answered = await answering(GIVEN, asking({ writer: "Amy <amy@alanwalton.com>" }, WRITE_AT))
  expect(answered.status).toBe(400)
  expect(String((await bodyOf(answered)).refused)).toContain("message")
})

test("a put holding no content is refused", () => {
  const read = writeIn({
    writer: "Amy <amy@alanwalton.com>",
    message: "a message",
    puts: [{ path: "akasha/a.ts" }],
  })
  expect("refused" in read && read.refused).toContain("content")
})

test("what a write puts and what it takes away are both read off the body", () => {
  const read = writeIn({
    writer: "Amy <amy@alanwalton.com>",
    message: "a message",
    puts: [{ path: "akasha/a.ts", content: "x" }],
    removes: ["akasha/b.ts"],
  })
  expect("asked" in read && read.asked.puts?.[0]?.content).toBe("x")
  expect("asked" in read && read.asked.removes?.[0]).toBe("akasha/b.ts")
})

test("an answer to a write names the commit it landed as", async () => {
  const answered = await answering(
    GIVEN,
    asking(
      {
        writer: "Amy <amy@alanwalton.com>",
        message: "a message",
        puts: [{ path: "akasha/a.ts", content: "x" }],
      },
      WRITE_AT
    )
  )
  const held = await bodyOf(answered)
  expect("commit" in held).toBe(true)
})
