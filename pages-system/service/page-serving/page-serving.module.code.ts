import {
  asking,
  type Query,
  shaping,
  TESTS_RUN,
  type Test,
} from "../page-asking/page-asking.module.code.ts"
import { foldedFor, type Naming } from "../page-composing/page-composing.module.code.ts"
import {
  type Named,
  reading,
  type Asked as Sought,
} from "../page-reading/page-reading.module.code.ts"
import type { Asked, Kept, Put, Writer } from "../page-writing/page-writing.module.code.ts"

export const ASK_AT = "/ask"

export const READ_AT = "/read"

export const WRITE_AT = "/write"

export const SHAPE_AT = "/shape"

const ORDERING_TESTS = ["at-or-after", "after", "before", "at-or-before"]

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

function boundRefused(at: string, name: string, bound: unknown): string | null {
  if (name === "empty") {
    return typeof bound === "boolean" ? null : `${at} takes true or false`
  }
  if (name === "in" || name === "not-in") {
    return stringsIn(bound) === null ? `${at} takes a list of strings` : null
  }
  if (name === "contains") {
    if (typeof bound === "string" || stringsIn(bound) !== null) return null
    return `${at} takes a string or a list of strings`
  }
  if (ORDERING_TESTS.includes(name)) {
    if (typeof bound === "string" || typeof bound === "number") return null
    return `${at} takes a string or a number`
  }
  return typeof bound === "string" ? null : `${at} takes a string`
}

export type Took = { readonly test: Test } | { readonly refused: string }

export function testIn(key: string, given: unknown): Took {
  const held = objectIn(given)
  if (held === null) return { refused: `\`where.${key}\` is no test this takes` }
  if (Object.keys(held).length === 0) return { refused: `\`where.${key}\` states no test` }
  const test: Record<string, unknown> = {}
  for (const [name, bound] of Object.entries(held)) {
    const at = `\`where.${key}.${name}\``
    if (!TESTS_RUN.includes(name)) {
      return { refused: `${at} is no test this runs. the tests are ${TESTS_RUN.join(", ")}` }
    }
    const refused = boundRefused(at, name, bound)
    if (refused !== null) return { refused }
    test[name] = bound
  }
  return { test: test as Test }
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
      const took = testIn(key, one)
      if ("refused" in took) return { refused: took.refused }
      every[key] = took.test
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

export type Shaping = { readonly pageTypeSlug: string } | { readonly refused: string }

export function shapeIn(given: unknown): Shaping {
  const held = objectIn(given)
  if (held === null) return { refused: "a shape is asked for by a JSON object" }
  const pageTypeSlug = held.pageTypeSlug
  if (typeof pageTypeSlug !== "string" || pageTypeSlug === "") {
    return { refused: "a shape names a page type as `pageTypeSlug`" }
  }
  return { pageTypeSlug }
}

export type Found = { readonly asked: Sought } | { readonly refused: string }

export function readIn(given: unknown): Found {
  const held = objectIn(given)
  if (held === null) return { refused: "a read is a JSON object" }
  const asked: { paths?: readonly string[]; pages?: readonly Named[] } = {}
  if (held.paths !== undefined) {
    const paths = stringsIn(held.paths)
    if (paths === null) return { refused: "`paths` is a list of strings" }
    asked.paths = paths
  }
  if (held.pages !== undefined) {
    if (!Array.isArray(held.pages)) return { refused: "`pages` is a list" }
    const pages: Named[] = []
    for (const one of held.pages) {
      const page = objectIn(one)
      if (page === null) return { refused: "`pages` holds JSON objects" }
      if (typeof page.pageTypeSlug !== "string") {
        return { refused: "a page names its page type as `pageTypeSlug`" }
      }
      if (typeof page.slug !== "string") return { refused: "a page names itself as `slug`" }
      pages.push({ pageTypeSlug: page.pageTypeSlug, slug: page.slug })
    }
    asked.pages = pages
  }
  return { asked }
}

export type Written =
  | { readonly asked: Asked; readonly pages: readonly Naming[] }
  | { readonly refused: string }

function namingsIn(given: unknown): readonly Naming[] | string {
  if (!Array.isArray(given)) return "`pages` is a list"
  const pages: Naming[] = []
  for (const one of given) {
    const page = objectIn(one)
    if (page === null) return "`pages` holds JSON objects"
    if (typeof page.pageTypeSlug !== "string") {
      return "a page names its page type as `pageTypeSlug`"
    }
    if (typeof page.slug !== "string") return "a page names itself as `slug`"
    const values = objectIn(page.values)
    if (values === null) return "a page hands over its `values` as a JSON object"
    const naming: {
      pageTypeSlug: string
      slug: string
      values: Record<string, unknown>
      merge?: boolean
    } = { pageTypeSlug: page.pageTypeSlug, slug: page.slug, values }
    if (page.merge !== undefined) {
      if (typeof page.merge !== "boolean") {
        return "a page says whether it merges as `merge`, written as true or false"
      }
      naming.merge = page.merge
    }
    pages.push(naming)
  }
  return pages
}

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
    read?: string
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
  if (held.read !== undefined) {
    if (typeof held.read !== "string") {
      return { refused: "a write states the commit it read as `read`, written as a string" }
    }
    asked.read = held.read
  }
  if (held.pages === undefined) return { asked, pages: [] }
  const pages = namingsIn(held.pages)
  if (typeof pages === "string") return { refused: pages }
  return { asked, pages }
}

export function foldedInto(asked: Asked, puts: readonly Put[], kept: readonly Kept[]): Asked {
  if (puts.length === 0 && kept.length === 0) return asked
  const held: Asked = { ...asked, puts: [...(asked.puts ?? []), ...puts] }
  return kept.length === 0 ? held : { ...held, kept }
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
  if (at !== ASK_AT && at !== READ_AT && at !== WRITE_AT && at !== SHAPE_AT) {
    return said({ refused: `nothing is asked at ${at}` }, 404)
  }
  if (request.method !== "POST") {
    return said({ refused: `a question arrives by POST rather than by ${request.method}` }, 405)
  }
  const body = await bodyIn(request)
  if (body === undefined) return said({ refused: "the body did not parse as JSON" }, 400)
  if (at === SHAPE_AT) {
    const sought = shapeIn(body)
    if ("refused" in sought) return said({ refused: sought.refused }, 400)
    const found = shaping(given.root, sought.pageTypeSlug)
    if ("refused" in found) return said({ refused: found.refused }, 400)
    return said(found, 200)
  }
  if (at === READ_AT) {
    const sought = readIn(body)
    if ("refused" in sought) return said({ refused: sought.refused }, 400)
    const found = reading({ root: given.root }, sought.asked)
    if ("refused" in found) return said({ refused: found.refused }, 400)
    return said(found, 200)
  }
  if (at === WRITE_AT) {
    const read = writeIn(body)
    if ("refused" in read) return said({ refused: read.refused }, 400)
    const folded = foldedFor(given.root, read.pages)
    if ("refused" in folded) return said({ refused: folded.refused }, 400)
    const wrote = await given.writer.writing(foldedInto(read.asked, folded.puts, folded.kept))
    if ("refused" in wrote) return said({ refused: wrote.refused }, 400)
    return said(wrote, 200)
  }
  const read = queryIn(body)
  if ("refused" in read) return said({ refused: read.refused }, 400)
  const answered = asking(given.root, read.query)
  if ("refused" in answered) return said({ refused: answered.refused }, 400)
  return said({ rows: answered.rows }, 200)
}
