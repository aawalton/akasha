import { isMainThread, parentPort, workerData } from "node:worker_threads"
import {
  readingIn,
  slugsOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  objectIn,
  queryIn,
  readIn,
} from "akasha/page/service/modules/call-reading/call-reading.module.code.ts"
import {
  type Named as FileNamed,
  filing,
} from "akasha/page/service/modules/file-answering/file-answering.module.code.ts"
import type { Reads } from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import {
  answeringWithin,
  askingAt,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { reading } from "akasha/page/service/modules/page-reading/page-reading.module.code.ts"
import {
  shaping,
  shapingEvery,
} from "akasha/page/service/modules/page-shaping/page-shaping.module.code.ts"
import { settledApart } from "akasha/page/service/modules/read-settling/read-settling.module.code.ts"
import {
  type Refusal,
  STATUS_FOR,
} from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"
import { withholdingFor } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

export type ReadKind = "ask" | "read" | "shape" | "file"

export type Answer = {
  readonly status: number
  readonly type: string
  readonly body: string | Uint8Array<ArrayBuffer>
  readonly read?: Reads
}

export type Asked = {
  readonly id: number
  readonly kind: ReadKind
  readonly text: string
  readonly asker: string | null
}

export type Told =
  | { readonly id: number; readonly answer: Answer }
  | { readonly id: number; readonly wide: true }
  | { readonly heapMb: number }

export type Threaded = {
  readonly root: string
  readonly apart: Int32Array
  readonly at: number
  readonly lane: boolean
  readonly widePages: number
}

export const THREADED = "read-answering"

export const WIDE_PAGES = 20_000

export const UNPARSED = "the body did not parse as JSON"

const JSON_TYPE = "application/json"

const OCTETS = "application/octet-stream"

const MB = 1024 * 1024

const HEAP_TOLD_MS = 10_000

function saidAs(body: unknown, status: number): Answer {
  return { status, type: JSON_TYPE, body: JSON.stringify(body) }
}

function refusedAs(refusal: Refusal): Answer {
  return saidAs({ refused: refusal.refused }, STATUS_FOR[refusal.fault])
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

function shapeAnswered(root: string, body: unknown): Answer {
  const sought = shapeIn(body)
  if ("refused" in sought) return saidAs({ refused: sought.refused }, 400)
  if ("pageTypeSlugs" in sought) {
    const every = shapingEvery(root, sought.pageTypeSlugs)
    if ("refused" in every) return refusedAs(every)
    return saidAs(every, 200)
  }
  const found = shaping(root, sought.pageTypeSlug)
  if ("refused" in found) return refusedAs(found)
  return saidAs(found, 200)
}

function fileAnswered(root: string, body: unknown, asker: string | null): Answer {
  const sought = fileIn(body)
  if ("refused" in sought) return saidAs({ refused: sought.refused }, 400)
  const found = filing(root, sought.named, withholdingFor(root, asker) ?? [])
  if ("refused" in found && found.withheld) return saidAs({ refused: found.refused }, 403)
  if ("refused" in found) return refusedAs(found)
  return { status: 200, type: OCTETS, body: found.bytes }
}

function readAnswered(root: string, body: unknown, asker: string | null): Answer {
  const sought = readIn(body)
  if ("refused" in sought) return saidAs({ refused: sought.refused }, 400)
  const found = reading({ root, asking: asker }, sought.asked)
  if ("refused" in found && found.withheld) return saidAs({ refused: found.refused }, 403)
  if ("refused" in found) return refusedAs(found)
  return saidAs(found, 200)
}

function askAnswered(
  root: string,
  body: unknown,
  asker: string | null,
  answeredAtMost?: number
): Answer {
  const read = queryIn(body)
  if ("refused" in read) return saidAs({ refused: read.refused }, 400)
  const answered = askingAt(root, read.query, asker)
  if ("refused" in answered && answered.withheld) return saidAs({ refused: answered.refused }, 403)
  if ("refused" in answered) return refusedAs(answered)
  const kept = answered.read === undefined ? {} : { read: answered.read }
  const within = answeringWithin(read.query, answered, answeredAtMost)
  if ("refused" in within) return { ...refusedAs(within), ...kept }
  return { status: 200, type: JSON_TYPE, body: within.said, ...kept }
}

export function answeredRead(
  root: string,
  kind: ReadKind,
  body: unknown,
  asker: string | null,
  answeredAtMost?: number
): Answer {
  if (kind === "shape") return shapeAnswered(root, body)
  if (kind === "file") return fileAnswered(root, body, asker)
  if (kind === "read") return readAnswered(root, body, asker)
  return askAnswered(root, body, asker, answeredAtMost)
}

function parsedIn(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return undefined
  }
}

export function wideAt(
  root: string,
  kind: ReadKind,
  body: unknown,
  most: number = WIDE_PAGES
): boolean {
  if (kind !== "ask") return false
  const pageTypeSlug = objectIn(body)?.pageTypeSlug
  if (typeof pageTypeSlug !== "string") return false
  try {
    const held = readingIn(root)
    let pages = 0
    for (const one of kindsUnder(pageTypeSlug, held)) {
      pages += slugsOfType(held, one).length
      if (pages > most) return true
    }
  } catch {
    return false
  }
  return false
}

type Placed = Pick<Threaded, "root" | "apart" | "at">

export async function answeredApart(placed: Placed, asked: Asked, body: unknown): Promise<Answer> {
  if (body === undefined) return saidAs({ refused: UNPARSED }, 400)
  const { root, apart, at } = placed
  const settled = await settledApart(root, apart, at, () =>
    answeredRead(root, asked.kind, body, asked.asker)
  )
  if ("settled" in settled) return settled.settled
  return saidAs({ refused: settled.refused }, STATUS_FOR.race)
}

function threadedIn(given: unknown): Threaded | null {
  if (typeof given !== "object" || given === null) return null
  const held = (given as Readonly<Record<string, unknown>>)[THREADED]
  if (typeof held !== "object" || held === null) return null
  const { root, apart, at, lane, widePages } = held as Readonly<Record<string, unknown>>
  if (typeof root !== "string" || !(apart instanceof Int32Array)) return null
  if (typeof at !== "number" || typeof lane !== "boolean" || typeof widePages !== "number") {
    return null
  }
  return { root, apart, at, lane, widePages }
}

export function answeringOnThread(): undefined {
  const port = parentPort
  const threaded = threadedIn(workerData)
  if (isMainThread || port === null || threaded === null) return undefined
  const heapTold = (): undefined => {
    port.postMessage({ heapMb: Math.round(process.memoryUsage().heapUsed / MB) } satisfies Told)
    return undefined
  }
  heapTold()
  setInterval(heapTold, HEAP_TOLD_MS).unref()
  port.on("message", (asked: Asked) => {
    const body = parsedIn(asked.text)
    const wide = wideAt(threaded.root, asked.kind, body, threaded.widePages)
    if (wide && !threaded.lane) {
      port.postMessage({ id: asked.id, wide: true } satisfies Told)
      return
    }
    answeredApart(threaded, asked, body)
      .catch((thrown: unknown) => saidAs({ refused: String(thrown) }, STATUS_FOR.service))
      .then((answer) => {
        port.postMessage({ id: asked.id, answer } satisfies Told)
        if (!wide) return
        Bun.gc(true)
        heapTold()
      })
  })
  return undefined
}
