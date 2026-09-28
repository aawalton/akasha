import { type FSWatcher, watch } from "node:fs"
import { join } from "node:path"
import { pathWrittenBeside } from "akasha/file/system/modules/atomic-write/atomic-write.module.code.ts"
import {
  listedAt,
  listedById,
  readingIn,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askedIn,
  type Follow,
  type Since,
} from "akasha/page/service/modules/follow-asking/follow-asking.module.code.ts"
import {
  narrowedOver,
  valuedOnce,
  within,
} from "akasha/page/service/modules/follow-narrowing/follow-narrowing.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"
import {
  type Held,
  type Planned,
  pagesOf,
  plannedFor,
  type Target,
} from "akasha/page/service/modules/follow-planning/follow-planning.module.code.ts"
import { marked } from "akasha/page/service/modules/hold-naming/hold-naming.module.code.ts"
import type { Reads } from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import {
  type Readers,
  readersFor,
} from "akasha/page/service/modules/reads-keeping/reads-keeping.module.code.ts"

export const EVENTS_AT = "/events"

export const FOLLOW_AT = "/follow"

const BEAT_MS = 5_000

const UNREAD_BEATS = 3

const UNREAD = "nothing read this stream for three beats, so it was closed and what it held let go"

const SPACED_MS = 500

const PLANNED_AFTER_MS = 250

const COUNTED_MS = 60_000

const MB = 1024 * 1024

const SLOW_MS = 1_000

const RECENT_MS = 600_000

const RECENT_MOST = 50_000

function timedAs<T>(named: () => string, act: () => T): T {
  const started = performance.now()
  const done = marked(named(), act)
  const spent = performance.now() - started
  if (spent >= SLOW_MS) process.stdout.write(`slow: ${named()} took ${Math.round(spent)} ms\n`)
  return done
}

type Changed = {
  readonly pageTypeSlug: string
  readonly slug?: string
}

type Stream = {
  readonly send: (text: string) => boolean
  helds: readonly Held[]
  taken: boolean
}

export type Sent = {
  readonly mark: number
  readonly at: number
  readonly one: Changed
  readonly id?: string
}

export function replayOf(
  recent: readonly Sent[],
  since: Since,
  epoch: string,
  mark: number
): readonly Sent[] | null {
  if (since.epoch !== epoch || since.mark > mark) return null
  if (since.mark + 1 < (recent[0]?.mark ?? mark + 1)) return null
  const last = new Map<string, Sent>()
  for (const one of recent) {
    if (one.mark > since.mark) last.set(`${one.one.pageTypeSlug}/${one.one.slug ?? ""}`, one)
  }
  return [...last.values()]
}

function pushedOf(one: Sent, keys: readonly string[]): unknown {
  return { ...one.one, ...(one.id === undefined ? {} : { id: one.id }), keys, mark: one.mark }
}

export type Following = {
  readonly opened: (request: Request) => Response
  readonly followed: (given: unknown) => Response
  readonly changed: (one: Changed) => undefined
  readonly kept: (read: Reads) => undefined
}

export function said(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function kindsOf(root: string, pageTypeSlug: string): ReadonlySet<string> {
  try {
    return kindsUnder(pageTypeSlug, root)
  } catch {
    return new Set([pageTypeSlug])
  }
}

function slugById(root: string, id: string): string | null {
  try {
    const listed = listedById(root, id)
    return listed === null ? null : (partedIn(listed.path)?.slug ?? null)
  } catch {
    return null
  }
}

function slugsFor(root: string, follow: Follow): ReadonlySet<string> | null {
  if (follow.by === undefined) return null
  const values = follow.values ?? []
  if (follow.by === "slug") return new Set(values)
  const slugs = new Set<string>()
  for (const id of values) {
    const slug = slugById(root, id)
    if (slug !== null) slugs.add(slug)
  }
  return slugs
}

function heldFor(root: string, follow: Follow): Held {
  const kinds = kindsOf(root, follow.pageTypeSlug)
  const slugs = slugsFor(root, follow)
  const held = { key: follow.key, kinds, slugs }
  if (follow.where === undefined) return held
  const reading = readingIn(root)
  const pages = [...kinds].flatMap((kind) => pagesOf(reading, kind, slugs))
  return { ...held, narrowed: narrowedOver(reading, pages, follow.where) }
}

export function keysFor(
  helds: readonly Held[],
  one: Changed,
  valued: () => Value | null = () => null
): readonly string[] {
  const keys: string[] = []
  for (const held of helds) {
    if (!held.kinds.has(one.pageTypeSlug)) continue
    const slug = one.slug
    if (held.slugs !== null && (slug === undefined || !held.slugs.has(slug))) continue
    if (held.narrowed !== undefined && slug !== undefined && !within(held.narrowed, slug, valued)) {
      continue
    }
    keys.push(held.key)
  }
  return keys
}

export function nameHeard(name: string): string {
  return pathWrittenBeside(name) ?? name
}

export function changedAt(path: string): Changed | null {
  const parted = partedIn(path)
  return parted === null ? null : { pageTypeSlug: parted.pageType, slug: parted.slug }
}

export function eventSaid(name: string, body: unknown): string {
  return `event: ${name}\ndata: ${JSON.stringify(body)}\n\n`
}

function idOf(root: string, one: Changed): string | undefined {
  if (one.slug === undefined) return undefined
  try {
    return listedAt(root, one.pageTypeSlug, one.slug)[0]?.id
  } catch {
    return undefined
  }
}

export function changesFor(one: Target, heard: string, readers: Readers): readonly Changed[] {
  if (one.slugs !== null) return [...one.slugs].map((slug) => ({ pageTypeSlug: one.kind, slug }))
  const pages = readers.reading(one.computed, heard)
  if (pages === null) return [{ pageTypeSlug: one.kind }]
  const found: Changed[] = []
  for (const page of pages) {
    const parted = partedIn(page)
    if (parted?.pageType === one.kind) found.push({ pageTypeSlug: one.kind, slug: parted.slug })
  }
  return found
}

export function followingFor(
  root: string,
  beatMs: number = BEAT_MS,
  besideSaid: () => string = () => "",
  readers: Readers = readersFor(root)
): Following {
  const streams = new Map<string, Stream>()
  const watchers = new Map<string, FSWatcher>()
  const sentAt = new Map<string, number>()
  const owed = new Map<string, ReturnType<typeof setTimeout>>()
  let hearing = new Map<string, readonly ((name: string) => undefined)[]>()
  let planning: ReturnType<typeof setTimeout> | null = null
  const counted = { plans: 0, heard: 0, pushed: 0 }
  const epoch = crypto.randomUUID()
  let mark = 0
  let recent: Sent[] = []

  const trimmed = (now: number): undefined => {
    const kept = recent.findIndex((one) => one.at >= now - RECENT_MS)
    recent = recent.slice(kept === -1 ? recent.length : kept).slice(-RECENT_MOST)
    return undefined
  }

  setInterval(() => {
    trimmed(Date.now())
    const memory = process.memoryUsage()
    const helds = [...streams.values()].reduce((sum, one) => sum + one.helds.length, 0)
    const beside = besideSaid()
    process.stdout.write(
      `following: ${streams.size} streams, ${helds} follows, ${watchers.size} folders watched, ` +
        `${sentAt.size} pages spaced, ${counted.plans} plans, ${counted.heard} changes heard, ` +
        `${counted.pushed} pushes in the last minute; heap ${Math.round(memory.heapUsed / MB)} MB, ` +
        `rss ${Math.round(memory.rss / MB)} MB${beside === "" ? "" : `, ${beside}`}\n`
    )
    counted.plans = 0
    counted.heard = 0
    counted.pushed = 0
  }, COUNTED_MS).unref()

  const send = (one: Changed): undefined =>
    timedAs(
      () => `pushing ${one.pageTypeSlug}/${one.slug ?? ""} to ${streams.size} streams`,
      () => sent(one)
    )

  const sent = (one: Changed): undefined => {
    const id = idOf(root, one)
    mark += 1
    const made: Sent = { mark, at: Date.now(), one, ...(id === undefined ? {} : { id }) }
    recent.push(made)
    if (recent.length > RECENT_MOST * 2) trimmed(made.at)
    const valued = valuedOnce(root, one.pageTypeSlug, one.slug)
    for (const stream of streams.values()) {
      const keys = keysFor(stream.helds, one, valued)
      if (keys.length === 0) continue
      counted.pushed += 1
      stream.send(eventSaid("page", pushedOf(made, keys)))
    }
    return undefined
  }

  const changed = (one: Changed): undefined => {
    counted.heard += 1
    const named = `${one.pageTypeSlug}/${one.slug ?? ""}`
    if (owed.has(named)) return undefined
    const wait = (sentAt.get(named) ?? 0) + SPACED_MS - Date.now()
    const fire = (): undefined => {
      owed.delete(named)
      sentAt.set(named, Date.now())
      send(one)
      return undefined
    }
    if (wait <= 0) return fire()
    owed.set(named, setTimeout(fire, wait))
    return undefined
  }

  const plan = (): undefined => {
    counted.plans += 1
    const helds = [...streams.values()].flatMap((one) => one.helds)
    let planned: Planned
    try {
      planned = timedAs(
        () => `planning ${helds.length} follows`,
        () => plannedFor(root, helds)
      )
    } catch (thrown) {
      process.stderr.write(`the pages followed could not be planned: ${String(thrown)}\n`)
      return undefined
    }
    const wanted = new Map<string, ((name: string) => undefined)[]>()
    const hear = (folder: string, heard: (name: string) => undefined): undefined => {
      const held = wanted.get(folder) ?? []
      held.push(heard)
      wanted.set(folder, held)
      return undefined
    }
    for (const folder of planned.pages) {
      hear(folder, (name) => {
        const one = changedAt(join(folder, name))
        if (one !== null) changed(one)
        return undefined
      })
    }
    for (const [folder, kind] of planned.listed) {
      hear(folder, () => {
        changed({ pageTypeSlug: kind })
        planSoon()
        return undefined
      })
    }
    for (const [folder, names] of planned.read) {
      hear(folder, (name) => {
        const heard = join(folder, name)
        for (const targets of [...(names.get(name) ?? []), ...(names.get(null) ?? [])]) {
          for (const one of targets)
            for (const each of changesFor(one, heard, readers)) changed(each)
        }
        return undefined
      })
    }
    for (const [folder, names] of planned.keeping) {
      hear(folder, (name) => (names.has(name) ? planSoon() : undefined))
    }
    hearing = wanted
    for (const [folder, watcher] of watchers) {
      if (wanted.has(folder)) continue
      watcher.close()
      watchers.delete(folder)
    }
    for (const folder of wanted.keys()) {
      if (watchers.has(folder)) continue
      try {
        const watcher = watch(folder, (_, name) => {
          if (typeof name !== "string" || name === "") return
          const named = nameHeard(name)
          for (const heard of hearing.get(folder) ?? []) heard(named)
        })
        watcher.on("error", () => {
          watcher.close()
          watchers.delete(folder)
        })
        watchers.set(folder, watcher)
      } catch {}
    }
    return undefined
  }

  function planSoon(): undefined {
    if (planning !== null) return undefined
    planning = setTimeout(() => {
      planning = null
      plan()
    }, PLANNED_AFTER_MS)
    return undefined
  }

  const opened = (request: Request): Response => {
    const id = crypto.randomUUID()
    const encoder = new TextEncoder()
    let beat: ReturnType<typeof setInterval> | null = null
    let unpulled = 0
    const closed = (): undefined => {
      if (beat !== null) clearInterval(beat)
      beat = null
      if (streams.delete(id)) planSoon()
      return undefined
    }
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        const put = (text: string): boolean => {
          try {
            controller.enqueue(encoder.encode(text))
            return true
          } catch {
            closed()
            return false
          }
        }
        const unread = (): undefined => {
          closed()
          try {
            controller.error(new Error(UNREAD))
          } catch {}
          return undefined
        }
        const held: Stream = { send: put, helds: [], taken: false }
        streams.set(id, held)
        put(eventSaid("stream", { stream: id }))
        beat = setInterval(() => {
          if (unpulled >= UNREAD_BEATS) return unread()
          unpulled += 1
          put(held.taken ? eventSaid("mark", { epoch, mark }) : ": beat\n\n")
        }, beatMs)
        request.signal.addEventListener("abort", () => {
          closed()
          try {
            controller.close()
          } catch {}
        })
      },
      pull() {
        unpulled = 0
      },
      cancel() {
        closed()
      },
    })
    return new Response(body, {
      status: 200,
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache, no-transform",
        "x-accel-buffering": "no",
      },
    })
  }

  const followed = (given: unknown): Response => {
    const asked = askedIn(given)
    if ("refused" in asked) return said({ refused: asked.refused }, 400)
    const stream = streams.get(asked.stream)
    if (stream === undefined) {
      return said({ refused: `no stream is open as \`${asked.stream}\`` }, 404)
    }
    stream.helds = asked.follows.map((one) => heldFor(root, one))
    plan()
    const replay = asked.since === undefined ? null : replayOf(recent, asked.since, epoch, mark)
    const loose = stream.helds.map((one) => ({ key: one.key, kinds: one.kinds, slugs: one.slugs }))
    for (const one of replay ?? []) {
      const keys = keysFor(loose, one.one)
      if (keys.length > 0) stream.send(eventSaid("page", pushedOf(one, keys)))
    }
    stream.taken = true
    stream.send(eventSaid("mark", { epoch, mark }))
    const following = stream.helds.map((one) => one.key)
    return said({ following, epoch, mark, caughtUp: replay !== null }, 200)
  }

  return { opened, followed, changed, kept: readers.kept }
}
