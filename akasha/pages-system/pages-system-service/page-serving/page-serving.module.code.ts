import { asking, type Query, type Test } from "../page-asking/page-asking.module.code.ts"

export const ASK_AT = "/ask"

export type Serving = {
  readonly root: string
}

function said(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function objectIn(given: unknown): Record<string, unknown> | null {
  if (given === null || typeof given !== "object" || Array.isArray(given)) return null
  return given as Record<string, unknown>
}

function stringsIn(given: unknown): readonly string[] | null {
  if (!Array.isArray(given)) return null
  return given.every((one) => typeof one === "string") ? (given as readonly string[]) : null
}

function testIn(given: unknown): Test | null {
  const held = objectIn(given)
  if (held === null) return null
  const test: { is?: string; in?: readonly string[]; has?: string; empty?: boolean } = {}
  if (held.is !== undefined) {
    if (typeof held.is !== "string") return null
    test.is = held.is
  }
  if (held.in !== undefined) {
    const some = stringsIn(held.in)
    if (some === null) return null
    test.in = some
  }
  if (held.has !== undefined) {
    if (typeof held.has !== "string") return null
    test.has = held.has
  }
  if (held.empty !== undefined) {
    if (typeof held.empty !== "boolean") return null
    test.empty = held.empty
  }
  return test
}

export type Read = { readonly query: Query } | { readonly refused: string }

export function queryIn(given: unknown): Read {
  const held = objectIn(given)
  if (held === null) return { refused: "a question is a JSON object" }
  const pageTypeSlug = held.pageTypeSlug
  if (typeof pageTypeSlug !== "string" || pageTypeSlug === "") {
    return { refused: "a question names a page type as `pageTypeSlug`" }
  }
  const query: {
    pageTypeSlug: string
    where?: Record<string, Test>
    keys?: readonly string[]
    sortBy?: string
    descending?: boolean
    limit?: number
    offset?: number
  } = { pageTypeSlug }
  if (held.where !== undefined) {
    const where = objectIn(held.where)
    if (where === null) return { refused: "`where` is a JSON object" }
    const every: Record<string, Test> = {}
    for (const [key, one] of Object.entries(where)) {
      const test = testIn(one)
      if (test === null) return { refused: `\`where.${key}\` is no test this takes` }
      every[key] = test
    }
    query.where = every
  }
  if (held.keys !== undefined) {
    const keys = stringsIn(held.keys)
    if (keys === null) return { refused: "`keys` is a list of strings" }
    query.keys = keys
  }
  if (held.sortBy !== undefined) {
    if (typeof held.sortBy !== "string") return { refused: "`sortBy` is a string" }
    query.sortBy = held.sortBy
  }
  if (held.descending !== undefined) {
    if (typeof held.descending !== "boolean") return { refused: "`descending` is true or false" }
    query.descending = held.descending
  }
  if (held.limit !== undefined) {
    if (typeof held.limit !== "number") return { refused: "`limit` is a number" }
    query.limit = held.limit
  }
  if (held.offset !== undefined) {
    if (typeof held.offset !== "number") return { refused: "`offset` is a number" }
    query.offset = held.offset
  }
  return { query }
}

export async function answering(given: Serving, request: Request): Promise<Response> {
  const at = new URL(request.url).pathname
  if (at !== ASK_AT) return said({ refused: `nothing is asked at ${at}` }, 404)
  if (request.method !== "POST") {
    return said({ refused: `a question arrives by POST rather than by ${request.method}` }, 405)
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return said({ refused: "the body did not parse as JSON" }, 400)
  }
  const read = queryIn(body)
  if ("refused" in read) return said({ refused: read.refused }, 400)
  const answered = asking(given.root, read.query)
  if ("refused" in answered) return said({ refused: answered.refused }, 400)
  return said({ rows: answered.rows }, 200)
}
