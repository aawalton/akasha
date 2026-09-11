import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { answering } from "akasha/pages/service/page-serving/page-serving.module.code.ts"
import { writerFor } from "akasha/pages/service/page-writing/page-writing.module.code.ts"
import {
  dropUncommitted,
  mergeUncommitted,
} from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { numberAt, textsAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export const SERVICE_SLUG = "pages-service"
export const SERVICE_PAGE_TYPE = "workstation-service"
export const LOOPBACK = "127.0.0.1"
export const UNBOUND = "unbound"
export const TRIED_AGAIN_MS = 30_000

type Writer = ReturnType<typeof writerFor>

export type Listening = {
  readonly root: string
  readonly port: number
  readonly binds: readonly string[]
}

function boundAt(root: string, port: number, hostname: string, writer: Writer) {
  return Bun.serve({
    port,
    hostname,
    fetch: (request) => answering({ root, writer }, request),
  })
}

export type Refusal = {
  readonly hostname: string
  readonly why: string
}

export type Bound = {
  readonly servers: readonly ReturnType<typeof boundAt>[]
  readonly refused: readonly Refusal[]
  readonly writer: Writer
}

export function pagePathFor(root: string): string | null {
  const listed = listedAt(root, SERVICE_PAGE_TYPE, SERVICE_SLUG)
  const one = listed[0]
  return one === undefined ? null : one.path
}

function statedFor(root: string): Value | null {
  const path = pagePathFor(root)
  return path === null ? null : valueAt(path, root)
}

export function portFor(root: string): number | null {
  const value = statedFor(root)
  return value === null ? null : numberAt(value, "port")
}

export function bindsFor(root: string): readonly string[] {
  const value = statedFor(root)
  const stated = value === null ? null : textsAt(value, "binds")
  return stated === null || stated.length === 0 ? [LOOPBACK] : stated
}

export function serversFor(given: Listening, held?: Writer): Bound {
  const writer = held ?? writerFor({ root: given.root })
  const servers: ReturnType<typeof boundAt>[] = []
  const refused: Refusal[] = []
  for (const hostname of given.binds) {
    try {
      servers.push(boundAt(given.root, given.port, hostname, writer))
    } catch (why) {
      refused.push({ hostname, why: why instanceof Error ? why.message : String(why) })
    }
  }
  return { servers, refused, writer }
}

export function unboundIn(bound: Bound): readonly string[] {
  return bound.refused.map((one) => one.hostname)
}

export function boundAgain(given: Listening, had: Bound): Bound {
  if (had.refused.length === 0) return had
  const more = serversFor({ ...given, binds: unboundIn(had) }, had.writer)
  return { servers: [...had.servers, ...more.servers], refused: more.refused, writer: had.writer }
}

export function saying(root: string, page: string, names: readonly string[]): undefined {
  if (names.length === 0) {
    dropUncommitted(root, page, [UNBOUND])
    return
  }
  mergeUncommitted(root, page, { [UNBOUND]: [...names] })
}

function answeredAt(bound: Bound): string {
  return `page queries are answered at ${bound.servers.map((one) => one.url.href).join(" ")}\n`
}

if (import.meta.main) {
  const root = process.cwd()
  const port = portFor(root)
  const page = pagePathFor(root)
  if (port === null || page === null) {
    process.stderr.write(
      `no page is slugged ${SERVICE_SLUG} under ${SERVICE_PAGE_TYPE}, or it states no port\n`
    )
    process.exit(2)
  }
  const stated: Listening = { root, port, binds: bindsFor(root) }
  let bound = serversFor(stated)
  saying(root, page, unboundIn(bound))
  for (const one of bound.refused) {
    process.stderr.write(`nothing is listening at ${port} for ${one.hostname}: ${one.why}\n`)
  }
  if (bound.servers.length === 0) {
    process.stderr.write(`no host name the page states could be bound at ${port}\n`)
    process.exit(2)
  }
  process.stdout.write(answeredAt(bound))
  if (bound.refused.length > 0) {
    const beat = setInterval(() => {
      const before = bound.refused.length
      bound = boundAgain(stated, bound)
      if (bound.refused.length === before) return
      saying(root, page, unboundIn(bound))
      process.stdout.write(answeredAt(bound))
      if (bound.refused.length === 0) clearInterval(beat)
    }, TRIED_AGAIN_MS)
  }
}
