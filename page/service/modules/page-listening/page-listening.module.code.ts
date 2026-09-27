import { refreshingTurns } from "akasha/agent/seat/observation/seat-turn/modules/turn-refreshing/turn-refreshing.module.code.ts"
import { seat } from "akasha/agent/seat/seat.page-type.ts"
import {
  bindsFor,
  pagePathFor,
  portFor,
  SERVICE_PAGE_TYPE,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-binding/service-binding.module.code.ts"
import {
  dropUncommitted,
  mergeUncommitted,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import {
  type Following,
  followingFor,
} from "akasha/page/service/modules/page-following/page-following.module.code.ts"
import { answering } from "akasha/page/service/modules/page-serving/page-serving.module.code.ts"
import {
  type Threads,
  threadsFor,
} from "akasha/page/service/modules/page-threading/page-threading.module.code.ts"
import { writerFor } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { keptReads } from "akasha/page/service/modules/reads-keeping/reads-keeping.module.code.ts"
import { pageService } from "akasha/page/service/page-service.service-workstation.ts"

export const SERVICE_SLUG = pageService.slug
export const UNBOUND = "unbound"
export const TRIED_AGAIN_MS = 30_000
export const SLOW_MS = 1_000
const LOOKED_MS = 1_000
export const HELD_MS = 2_000
const ASKED_CHARS = 400
const MB = 1024 * 1024

type Writer = ReturnType<typeof writerFor>

export type Listening = {
  readonly root: string
  readonly port: number
  readonly binds: readonly string[]
  readonly following?: Following
  readonly threads?: Threads
}

export function slowSaid(request: Request, spent: number, asked: string): string {
  const at = new URL(request.url).pathname
  const agent = request.headers.get("akasha-agent-id") ?? "no agent"
  return `slow: ${request.method} ${at} took ${Math.round(spent)} ms for ${agent}: ${asked}\n`
}

export async function timed(
  request: Request,
  answered: (one: Request) => Promise<Response>
): Promise<Response> {
  const copy = request.method === "POST" ? request.clone() : null
  const started = performance.now()
  const response = await answered(request)
  const spent = performance.now() - started
  if (spent < SLOW_MS) return response
  const asked = copy === null ? "" : await copy.text().catch(() => "")
  process.stdout.write(slowSaid(request, spent, asked.slice(0, ASKED_CHARS)))
  return response
}

function watchingHeld(): undefined {
  let last = performance.now()
  setInterval(() => {
    const now = performance.now()
    const held = now - last - LOOKED_MS
    last = now
    if (held < HELD_MS) return
    const memory = process.memoryUsage()
    process.stdout.write(
      `stalled: the thread was held ${Math.round(held)} ms; ` +
        `heap ${Math.round(memory.heapUsed / MB)} MB, rss ${Math.round(memory.rss / MB)} MB\n`
    )
  }, LOOKED_MS).unref()
  return undefined
}

function boundAt(given: Listening, hostname: string, writer: Writer) {
  const { root, port, following, threads } = given
  const serving = following === undefined ? { root, writer } : { root, writer, following }
  return Bun.serve({
    port,
    hostname,
    fetch: (request) => timed(request, (one) => threads?.answered(one) ?? answering(serving, one)),
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

export function serversFor(given: Listening, held?: Writer): Bound {
  const writer = held ?? writerFor({ root: given.root })
  const servers: ReturnType<typeof boundAt>[] = []
  const refused: Refusal[] = []
  for (const hostname of given.binds) {
    try {
      servers.push(boundAt(given, hostname, writer))
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

export function runPageListening(root: string): undefined {
  const port = portFor(root, SERVICE_SLUG)
  const page = pagePathFor(root, SERVICE_SLUG)
  if (port === null || page === null) {
    throw new Error(
      `no page is slugged ${SERVICE_SLUG} under ${SERVICE_PAGE_TYPE}, or it states no port`
    )
  }
  watchingHeld()
  const threads = threadsFor(root, { kept: (read) => keptReads(root, read) })
  const following = followingFor(root, undefined, threads.heapsSaid)
  const binds = bindsFor(root, SERVICE_SLUG)
  const stated: Listening = { root, port, binds, following, threads }
  refreshingTurns(root, (sat) => following.changed({ pageTypeSlug: seat.slug, slug: sat.slug }))
  let bound = serversFor(stated)
  saying(root, page, unboundIn(bound))
  for (const one of bound.refused) {
    process.stderr.write(`nothing is listening at ${port} for ${one.hostname}: ${one.why}\n`)
  }
  if (bound.servers.length === 0) {
    throw new Error(`no host name the page states could be bound at ${port}`)
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

if (import.meta.main) {
  try {
    runPageListening(process.cwd())
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(2)
  }
}
