import { listedAt } from "@akasha/indexes"
import type { Value } from "@akasha/pages-system/page-value"
import { numberAt, textsAt, valueAt } from "@akasha/pages-system/page-value"
import { answering } from "../page-serving/page-serving.module.code.ts"
import { writerFor } from "../page-writing/page-writing.module.code.ts"

export const SERVICE_SLUG = "pages-system-service"
export const SERVICE_PAGE_TYPE = "workstation-service"
export const LOOPBACK = "127.0.0.1"

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

export type Bound = {
  readonly servers: readonly ReturnType<typeof boundAt>[]
  readonly refused: readonly string[]
}

function statedFor(root: string): Value | null {
  const listed = listedAt(root, SERVICE_PAGE_TYPE, SERVICE_SLUG)
  const one = listed[0]
  if (one === undefined) return null
  return valueAt(one.path, root)
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

export function serversFor(given: Listening): Bound {
  const writer = writerFor({ root: given.root })
  const servers: ReturnType<typeof boundAt>[] = []
  const refused: string[] = []
  for (const hostname of given.binds) {
    try {
      servers.push(boundAt(given.root, given.port, hostname, writer))
    } catch (why) {
      refused.push(`${hostname}: ${why instanceof Error ? why.message : String(why)}`)
    }
  }
  return { servers, refused }
}

if (import.meta.main) {
  const root = process.cwd()
  const port = portFor(root)
  if (port === null) {
    process.stderr.write(
      `no page is slugged ${SERVICE_SLUG} under ${SERVICE_PAGE_TYPE}, or it states no port\n`
    )
    process.exit(2)
  }
  const bound = serversFor({ root, port, binds: bindsFor(root) })
  for (const one of bound.refused) {
    process.stderr.write(`nothing is listening at ${port} for ${one}\n`)
  }
  if (bound.servers.length === 0) {
    process.stderr.write(`no host name the page states could be bound at ${port}\n`)
    process.exit(2)
  }
  process.stdout.write(
    `page queries are answered at ${bound.servers.map((one) => one.url.href).join(" ")}\n`
  )
}
