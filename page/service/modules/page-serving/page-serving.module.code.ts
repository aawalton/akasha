import {
  appendIn,
  objectIn,
  placeIn,
  queryIn,
  readIn,
  writeIn,
} from "akasha/page/service/modules/call-reading/call-reading.module.code.ts"
import {
  type Named as FileNamed,
  filing,
} from "akasha/page/service/modules/file-answering/file-answering.module.code.ts"
import { appending } from "akasha/page/service/modules/page-appending/page-appending.module.code.ts"
import {
  answeringWithin,
  asking,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { foldedFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { placing } from "akasha/page/service/modules/page-placing/page-placing.module.code.ts"
import { reading } from "akasha/page/service/modules/page-reading/page-reading.module.code.ts"
import { shaping } from "akasha/page/service/modules/page-shaping/page-shaping.module.code.ts"
import type {
  Asked,
  Kept,
  Put,
  Writer,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

export const ASK_AT = "/ask"

export const READ_AT = "/read"

export const WRITE_AT = "/write"

const SHAPE_AT = "/shape"

export const FILE_AT = "/file"

export const APPEND_AT = "/append"

const PLACE_AT = "/place"

const OCTETS = "application/octet-stream"

export type Serving = {
  readonly root: string
  readonly writer: Writer
  readonly answeredAtMost?: number
}

function said(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

export type Shaping = { readonly pageTypeSlug: string } | { readonly refused: string }

function shapeIn(given: unknown): Shaping {
  const held = objectIn(given)
  if (held === null) return { refused: "a shape is asked for by a JSON object" }
  const pageTypeSlug = held.pageTypeSlug
  if (typeof pageTypeSlug !== "string" || pageTypeSlug === "") {
    return { refused: "a shape names a page type as `pageTypeSlug`" }
  }
  return { pageTypeSlug }
}

export type Filed = { readonly named: FileNamed } | { readonly refused: string }

function fileIn(given: unknown): Filed {
  const held = objectIn(given)
  if (held === null) return { refused: "a file is asked for by a JSON object" }
  const pageTypeSlug = held.pageTypeSlug
  if (typeof pageTypeSlug !== "string" || pageTypeSlug === "") {
    return { refused: "a file names a page type as `pageTypeSlug`" }
  }
  const slug = held.slug
  if (typeof slug !== "string" || slug === "") {
    return { refused: "a file names its page as `slug`" }
  }
  const key = held.key
  if (typeof key !== "string" || key === "") {
    return { refused: "a file names the key its page holds that file under as `key`" }
  }
  return { named: { pageTypeSlug, slug, key } }
}

export function foldedInto(
  asked: Asked,
  puts: readonly Put[],
  kept: readonly Kept[],
  removes: readonly string[] = []
): Asked {
  if (puts.length === 0 && kept.length === 0 && removes.length === 0) return asked
  const put: Asked = { ...asked, puts: [...(asked.puts ?? []), ...puts] }
  const held: Asked =
    removes.length === 0 ? put : { ...put, removes: [...(asked.removes ?? []), ...removes] }
  return kept.length === 0 ? held : { ...held, kept: [...(asked.kept ?? []), ...kept] }
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
  if (
    at !== ASK_AT &&
    at !== READ_AT &&
    at !== WRITE_AT &&
    at !== SHAPE_AT &&
    at !== FILE_AT &&
    at !== APPEND_AT &&
    at !== PLACE_AT
  ) {
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
  if (at === FILE_AT) {
    const sought = fileIn(body)
    if ("refused" in sought) return said({ refused: sought.refused }, 400)
    const found = filing(given.root, sought.named)
    if ("refused" in found) return said({ refused: found.refused }, 400)
    return new Response(found.bytes, { status: 200, headers: { "content-type": OCTETS } })
  }
  if (at === APPEND_AT) {
    const sought = appendIn(body)
    if ("refused" in sought) return said({ refused: sought.refused }, 400)
    const done = appending(given.root, sought.appending)
    if ("refused" in done) return said({ refused: done.refused }, 400)
    return said(done, 200)
  }
  if (at === PLACE_AT) {
    const sought = placeIn(body)
    if ("refused" in sought) return said({ refused: sought.refused }, 400)
    const done = placing(given.root, sought.placing)
    if ("refused" in done) return said({ refused: done.refused }, 400)
    return said(done, 200)
  }
  if (at === READ_AT) {
    const sought = readIn(body)
    if ("refused" in sought) return said({ refused: sought.refused }, 400)
    const found = reading({ root: given.root }, sought.asked)
    if ("refused" in found) return said({ refused: found.refused }, found.withheld ? 403 : 400)
    return said(found, 200)
  }
  if (at === WRITE_AT) {
    const read = writeIn(body)
    if ("refused" in read) return said({ refused: read.refused }, 400)
    const folded = foldedFor(given.root, read.pages)
    if ("refused" in folded) return said({ refused: folded.refused }, 400)
    const wrote = await given.writer.writing(
      foldedInto(read.asked, folded.puts, folded.kept, folded.removes)
    )
    if ("refused" in wrote) return said({ refused: wrote.refused }, 400)
    return said(wrote, 200)
  }
  const read = queryIn(body)
  if ("refused" in read) return said({ refused: read.refused }, 400)
  const answered = asking(given.root, read.query)
  if ("refused" in answered) return said({ refused: answered.refused }, 400)
  const within = answeringWithin(read.query, answered, given.answeredAtMost)
  if ("refused" in within) return said({ refused: within.refused }, 400)
  return new Response(within.said, {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
