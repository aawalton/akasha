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
import { ownedRefused } from "akasha/page/service/modules/owned-puts/owned-puts.module.code.ts"
import { appending } from "akasha/page/service/modules/page-appending/page-appending.module.code.ts"
import {
  answeringWithin,
  askingAt,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { foldedFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  EVENTS_AT,
  FOLLOW_AT,
  type Following,
  said,
} from "akasha/page/service/modules/page-following/page-following.module.code.ts"
import {
  incrementIn,
  incrementing,
} from "akasha/page/service/modules/page-incrementing/page-incrementing.module.code.ts"
import { placing } from "akasha/page/service/modules/page-placing/page-placing.module.code.ts"
import { reading } from "akasha/page/service/modules/page-reading/page-reading.module.code.ts"
import {
  shaping,
  shapingEvery,
} from "akasha/page/service/modules/page-shaping/page-shaping.module.code.ts"
import type {
  Asked,
  Fresh,
  Kept,
  Put,
  Writer,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { keptReads } from "akasha/page/service/modules/reads-keeping/reads-keeping.module.code.ts"
import {
  type Refusal,
  STATUS_FOR,
} from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"
import { withheldFor } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

export const ASK_AT = "/ask"

export const READ_AT = "/read"

export const WRITE_AT = "/write"

const SHAPE_AT = "/shape"

export const FILE_AT = "/file"

export const APPEND_AT = "/append"

const PLACE_AT = "/place"

export const INCREMENT_AT = "/increment"

export const ASKING_AGENT = "akasha-agent-id"

const OCTETS = "application/octet-stream"

function askerOf(request: Request): string | null {
  const named = request.headers.get(ASKING_AGENT)?.trim() ?? ""
  return named === "" ? null : named
}

export type Serving = {
  readonly root: string
  readonly writer: Writer
  readonly answeredAtMost?: number
  readonly following?: Following
}

type Shaping =
  | { readonly pageTypeSlug: string }
  | { readonly pageTypeSlugs: readonly string[] }
  | { readonly refused: string }

function shapeIn(given: unknown): Shaping {
  const held = objectIn(given)
  if (held === null) return { refused: "a shape is asked for by a JSON object" }
  const pageTypeSlugs = held.pageTypeSlugs
  if (pageTypeSlugs !== undefined) {
    if (
      !Array.isArray(pageTypeSlugs) ||
      !pageTypeSlugs.every((one): one is string => typeof one === "string" && one !== "")
    ) {
      return { refused: "shapes name their page types as a list of slugs under `pageTypeSlugs`" }
    }
    return { pageTypeSlugs }
  }
  const pageTypeSlug = held.pageTypeSlug
  if (typeof pageTypeSlug !== "string" || pageTypeSlug === "") {
    return { refused: "a shape names a page type as `pageTypeSlug`" }
  }
  return { pageTypeSlug }
}

type Filed = { readonly named: FileNamed } | { readonly refused: string }

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
  removes: readonly string[] = [],
  keptPuts: readonly Put[] = [],
  keptRemoves: readonly string[] = [],
  fresh: readonly Fresh[] = []
): Asked {
  const outside = keptPuts.length + keptRemoves.length
  if (puts.length === 0 && kept.length === 0 && removes.length === 0 && outside === 0) return asked
  const claimed: Asked = fresh.length === 0 ? asked : { ...asked, fresh }
  const put: Asked = { ...claimed, puts: [...(asked.puts ?? []), ...puts] }
  const held: Asked =
    removes.length === 0 ? put : { ...put, removes: [...(asked.removes ?? []), ...removes] }
  const keeping: Asked =
    kept.length === 0 ? held : { ...held, kept: [...(asked.kept ?? []), ...kept] }
  if (outside === 0) return keeping
  return {
    ...keeping,
    keptPuts: [...(asked.keptPuts ?? []), ...keptPuts],
    keptRemoves: [...(asked.keptRemoves ?? []), ...keptRemoves],
  }
}

function refusedAs(refusal: Refusal): Response {
  return said({ refused: refusal.refused }, STATUS_FOR[refusal.fault])
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
  if (given.following !== undefined && at === EVENTS_AT) {
    if (request.method !== "GET") {
      return said({ refused: `a stream is opened by GET rather than by ${request.method}` }, 405)
    }
    return given.following.opened(request)
  }
  if (given.following !== undefined && at === FOLLOW_AT) {
    if (request.method !== "POST") {
      return said({ refused: `a follow arrives by POST rather than by ${request.method}` }, 405)
    }
    const body = await bodyIn(request)
    if (body === undefined) return said({ refused: "the body did not parse as JSON" }, 400)
    return given.following.followed(body)
  }
  if (
    at !== ASK_AT &&
    at !== READ_AT &&
    at !== WRITE_AT &&
    at !== SHAPE_AT &&
    at !== FILE_AT &&
    at !== APPEND_AT &&
    at !== PLACE_AT &&
    at !== INCREMENT_AT
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
    if ("pageTypeSlugs" in sought) {
      const every = shapingEvery(given.root, sought.pageTypeSlugs)
      if ("refused" in every) return refusedAs(every)
      return said(every, 200)
    }
    const found = shaping(given.root, sought.pageTypeSlug)
    if ("refused" in found) return refusedAs(found)
    return said(found, 200)
  }
  if (at === FILE_AT) {
    const sought = fileIn(body)
    if ("refused" in sought) return said({ refused: sought.refused }, 400)
    const found = filing(given.root, sought.named, withheldFor(given.root, askerOf(request)))
    if ("refused" in found && found.withheld) return said({ refused: found.refused }, 403)
    if ("refused" in found) return refusedAs(found)
    return new Response(found.bytes, { status: 200, headers: { "content-type": OCTETS } })
  }
  if (at === APPEND_AT) {
    const sought = appendIn(body)
    if ("refused" in sought) return said({ refused: sought.refused }, 400)
    const done = appending(given.root, sought.appending)
    if ("refused" in done) return refusedAs(done)
    return said(done, 200)
  }
  if (at === PLACE_AT) {
    const sought = placeIn(body)
    if ("refused" in sought) return said({ refused: sought.refused }, 400)
    const done = placing(given.root, sought.placing)
    if ("refused" in done) return refusedAs(done)
    return said(done, 200)
  }
  if (at === INCREMENT_AT) {
    const sought = incrementIn(body)
    if ("refused" in sought) return said({ refused: sought.refused }, 400)
    const done = await incrementing(given.root, given.writer, sought.incrementing)
    if ("refused" in done) return refusedAs(done)
    return said(done, 200)
  }
  if (at === READ_AT) {
    const sought = readIn(body)
    if ("refused" in sought) return said({ refused: sought.refused }, 400)
    const found = reading({ root: given.root, asking: askerOf(request) }, sought.asked)
    if ("refused" in found && found.withheld) return said({ refused: found.refused }, 403)
    if ("refused" in found) return refusedAs(found)
    return said(found, 200)
  }
  if (at === WRITE_AT) {
    const read = writeIn(body)
    if ("refused" in read) return said({ refused: read.refused }, 400)
    const reached = [
      ...(read.asked.puts ?? []).map((one) => one.path),
      ...(read.asked.removes ?? []),
    ]
    const owned = ownedRefused(given.root, reached, read.writtenBy ?? null)
    if (owned !== null) return said({ refused: owned }, 400)
    const folded = foldedFor(given.root, read.pages)
    if ("refused" in folded) return refusedAs(folded)
    const wrote = await given.writer.writing(
      foldedInto(
        read.asked,
        folded.puts,
        folded.kept,
        folded.removes,
        folded.keptPuts,
        folded.keptRemoves,
        folded.fresh
      )
    )
    if ("refused" in wrote) return refusedAs(wrote)
    return said(wrote, 200)
  }
  const read = queryIn(body)
  if ("refused" in read) return said({ refused: read.refused }, 400)
  const answered = askingAt(given.root, read.query, askerOf(request))
  if ("refused" in answered && answered.withheld) return said({ refused: answered.refused }, 403)
  if ("refused" in answered) return refusedAs(answered)
  if (answered.read !== undefined) keptReads(given.root, answered.read)
  const within = answeringWithin(read.query, answered, given.answeredAtMost)
  if ("refused" in within) return refusedAs(within)
  return new Response(within.said, {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
