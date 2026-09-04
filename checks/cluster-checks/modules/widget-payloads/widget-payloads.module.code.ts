import { z } from "zod"

export interface SwiftField {
  readonly name: string
  readonly type: string
}

export interface SwiftStruct {
  readonly name: string
  readonly file: string
  readonly fields: readonly SwiftField[]
}

export interface WidgetFeedSite {
  readonly feed: string
  readonly file: string
  readonly payload: string | undefined
}

export interface WidgetPayloads {
  readonly feeds: readonly WidgetFeedSite[]
  readonly payloadStructs: readonly SwiftStruct[]
}

const ACCESS_LEVEL = "(?:open|public|package|internal|fileprivate|private)"

const FEED_RE = /enum\s+(\w+)\s*:\s*WidgetFeed\s*\{/g
const PREVIEW_TYPED_RE = /static\s+(?:let|var)\s+previewPayload\s*:\s*(\w+)/
const PREVIEW_CALLED_RE = /static\s+(?:let|var)\s+previewPayload\s*=\s*(\w+)\s*\(/

const PREVIEW_MATCH_SCHEMA = z.tuple([z.string(), z.string()])
const STRUCT_RE = new RegExp(`(?:^|\\n)(?:${ACCESS_LEVEL}\\s+)?struct\\s+(\\w+)\\b[^\\n{]*\\{`, "g")

const FIELD_RE = new RegExp(
  `^ {4}(?:${ACCESS_LEVEL}\\s+)?let\\s+(\\w+)\\s*:\\s*(\\S.*?)\\s*$`,
  "gm"
)

function blockFrom(source: string, open: number): string | undefined {
  const close = source.indexOf("\n}", open)
  if (close === -1) return undefined
  return source.slice(open, close)
}

export function elementTypeOf(declared: string): string {
  return declared.replace(/[[\]?!]/g, "").trim()
}

function fieldsIn(block: string): readonly SwiftField[] {
  const fields: SwiftField[] = []
  for (const match of block.matchAll(FIELD_RE)) {
    const name = match[1]
    const type = match[2]
    if (name === undefined || type === undefined) continue
    fields.push({ name, type })
  }
  return fields
}

function declaredStructs(sources: ReadonlyMap<string, string>): ReadonlyMap<string, SwiftStruct> {
  const structs = new Map<string, SwiftStruct>()
  for (const [file, source] of sources) {
    for (const match of source.matchAll(STRUCT_RE)) {
      const name = match[1]
      if (name === undefined) continue
      const block = blockFrom(source, match.index + match[0].length)
      if (block === undefined) continue
      if (structs.has(name)) continue
      structs.set(name, { name, file, fields: fieldsIn(block) })
    }
  }
  return structs
}

function feedSites(sources: ReadonlyMap<string, string>): readonly WidgetFeedSite[] {
  const feeds: WidgetFeedSite[] = []
  for (const [file, source] of sources) {
    for (const match of source.matchAll(FEED_RE)) {
      const feed = match[1]
      if (feed === undefined) continue
      const block = blockFrom(source, match.index + match[0].length) ?? ""
      const typed = PREVIEW_MATCH_SCHEMA.safeParse(PREVIEW_TYPED_RE.exec(block))
      const called = PREVIEW_MATCH_SCHEMA.safeParse(PREVIEW_CALLED_RE.exec(block))
      const typedPayload = typed.success ? typed.data[1] : undefined
      const calledPayload = called.success ? called.data[1] : undefined
      feeds.push({ feed, file, payload: typedPayload ?? calledPayload })
    }
  }
  return feeds
}

export function readWidgetPayloads(sources: ReadonlyMap<string, string>): WidgetPayloads {
  const structs = declaredStructs(sources)
  const feeds = feedSites(sources)

  const reached = new Map<string, SwiftStruct>()
  const queue: string[] = []
  for (const feed of feeds) {
    if (feed.payload !== undefined) queue.push(feed.payload)
  }
  while (queue.length > 0) {
    const name = queue.shift()
    if (name === undefined) continue
    if (reached.has(name)) continue
    const struct = structs.get(name)
    if (struct === undefined) continue
    reached.set(name, struct)
    for (const field of struct.fields) queue.push(elementTypeOf(field.type))
  }

  return { feeds, payloadStructs: [...reached.values()] }
}
