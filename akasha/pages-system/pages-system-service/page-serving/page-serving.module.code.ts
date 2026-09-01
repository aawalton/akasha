import { asking, type Query, type Test } from "../page-asking/page-asking.module.code.ts"
import type { Asked, Put, Writer } from "../page-writing/page-writing.module.code.ts"

export const ASK_AT = "/ask"

export const WRITE_AT = "/write"

export type Serving = {
  readonly root: string
  readonly writer: Writer
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

export type Written = { readonly asked: Asked } | { readonly refused: string }

export function writeIn(given: unknown): Written {
  const held = objectIn(given)
  if (held === null) return { refused: "a write is a JSON object" }
  const writer = held.writer
  if (typeof writer !== "string") return { refused: "a write names its writer as `writer`" }
  const message = held.message
  if (typeof message !== "string") return { refused: "a write says what it is for as `message`" }
  const asked: {
    writer: string
    message: string
    puts?: readonly Put[]
    removes?: readonly string[]
  } = { writer, message }
  if (held.puts !== undefined) {
    if (!Array.isArray(held.puts)) return { refused: "`puts` is a list" }
    const puts: Put[] = []
    for (const one of held.puts) {
      const put = objectIn(one)
      if (put === null) return { refused: "`puts` holds JSON objects" }
      if (typeof put.path !== "string") return { refused: "a put states its `path` as a string" }
      if (typeof put.content !== "string") {
        return { refused: "a put states its `content` as a string" }
      }
      puts.push({ path: put.path, content: put.content })
    }
    asked.puts = puts
  }
  if (held.removes !== undefined) {
    const removes = stringsIn(held.removes)
    if (removes === null) return { refused: "`removes` is a list of strings" }
    asked.removes = removes
  }
  return { asked }
}

async function bodyIn(request: Request): Promise<unknown> {
  try {
    return await request.json()
  } catch {
    return undefined
  }
}

export async function answering(given: Serving, request: Request): Promise<Response> {
  const at = new URL(request.url).pathname
  if (at !== ASK_AT && at !== WRITE_AT) return said({ refused: `nothing is asked at ${at}` }, 404)
  if (request.method !== "POST") {
    return said({ refused: `a question arrives by POST rather than by ${request.method}` }, 405)
  }
  const body = await bodyIn(request)
  if (body === undefined) return said({ refused: "the body did not parse as JSON" }, 400)
  if (at === WRITE_AT) {
    const read = writeIn(body)
    if ("refused" in read) return said({ refused: read.refused }, 400)
    const wrote = await given.writer.writing(read.asked)
    if ("refused" in wrote) return said({ refused: wrote.refused }, 400)
    return said(wrote, 200)
  }
  const read = queryIn(body)
  if ("refused" in read) return said({ refused: read.refused }, 400)
  const answered = asking(given.root, read.query)
  if ("refused" in answered) return said({ refused: answered.refused }, 400)
  return said({ rows: answered.rows }, 200)
}
