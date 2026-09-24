import { type FSWatcher, watch } from "node:fs"
import { basename, dirname, isAbsolute, join } from "node:path"
import {
  everyOfType,
  type Listed,
  listedAt,
  listedById,
  slugFoldersOf,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { uncommittedIn } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import {
  COMPUTED,
  carriedFor,
} from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import {
  type Kept,
  keptIn,
} from "akasha/page/service/modules/reads-keeping/reads-keeping.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

export const EVENTS_AT = "/events"

export const FOLLOW_AT = "/follow"

export const BEAT_MS = 5_000

export const SPACED_MS = 500

const PLANNED_AFTER_MS = 250

const BY: ReadonlySet<string> = new Set(["id", "slug"])

export type Follow = {
  readonly key: string
  readonly pageTypeSlug: string
  readonly by?: "id" | "slug"
  readonly values?: readonly string[]
}

export type Changed = {
  readonly pageTypeSlug: string
  readonly slug?: string
}

export type Held = {
  readonly key: string
  readonly kinds: ReadonlySet<string>
  readonly slugs: ReadonlySet<string> | null
}

type Stream = {
  readonly send: (text: string) => boolean
  helds: readonly Held[]
}

export type Following = {
  readonly opened: (request: Request) => Response
  readonly followed: (given: unknown) => Response
  readonly changed: (one: Changed) => undefined
}

export function said(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function textsIn(held: unknown): readonly string[] | null {
  if (!Array.isArray(held)) return null
  const found: string[] = []
  for (const one of held) {
    if (typeof one !== "string" || one === "") return null
    found.push(one)
  }
  return found
}

function followIn(held: unknown): Follow | null {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const one = held as Readonly<Record<string, unknown>>
  if (typeof one.key !== "string" || one.key === "") return null
  if (typeof one.pageTypeSlug !== "string" || one.pageTypeSlug === "") return null
  if (one.by === undefined) return { key: one.key, pageTypeSlug: one.pageTypeSlug }
  if (typeof one.by !== "string" || !BY.has(one.by)) return null
  const values = textsIn(one.values)
  if (values === null) return null
  return {
    key: one.key,
    pageTypeSlug: one.pageTypeSlug,
    by: one.by as "id" | "slug",
    values,
  }
}

export type Asked =
  | { readonly stream: string; readonly follows: readonly Follow[] }
  | { readonly refused: string }

export function askedIn(given: unknown): Asked {
  if (given === null || typeof given !== "object" || Array.isArray(given)) {
    return { refused: "a follow is asked for by a JSON object" }
  }
  const held = given as Readonly<Record<string, unknown>>
  if (typeof held.stream !== "string" || held.stream === "") {
    return { refused: "a follow names the stream it is for as `stream`" }
  }
  if (!Array.isArray(held.follows)) {
    return { refused: "a follow names what it follows as `follows`" }
  }
  const follows: Follow[] = []
  for (const one of held.follows) {
    const follow = followIn(one)
    if (follow === null) {
      return {
        refused:
          "each follow names a `key` and a `pageTypeSlug`, and names pages only `by` `id` or `slug` with their `values`",
      }
    }
    follows.push(follow)
  }
  return { stream: held.stream, follows }
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

export function heldFor(root: string, follow: Follow): Held {
  const kinds = kindsOf(root, follow.pageTypeSlug)
  if (follow.by === undefined) return { key: follow.key, kinds, slugs: null }
  const values = follow.values ?? []
  if (follow.by === "slug") return { key: follow.key, kinds, slugs: new Set(values) }
  const slugs = new Set<string>()
  for (const id of values) {
    const slug = slugById(root, id)
    if (slug !== null) slugs.add(slug)
  }
  return { key: follow.key, kinds, slugs }
}

export function keysFor(helds: readonly Held[], one: Changed): readonly string[] {
  const keys: string[] = []
  for (const held of helds) {
    if (!held.kinds.has(one.pageTypeSlug)) continue
    if (held.slugs === null) {
      keys.push(held.key)
      continue
    }
    if (one.slug !== undefined && held.slugs.has(one.slug)) keys.push(held.key)
  }
  return keys
}

export function changedAt(path: string): Changed | null {
  const parted = partedIn(path)
  return parted === null ? null : { pageTypeSlug: parted.pageType, slug: parted.slug }
}

export function eventSaid(name: string, body: unknown): string {
  return `event: ${name}\ndata: ${JSON.stringify(body)}\n\n`
}

export type Heard = {
  readonly folder: string
  readonly name: string | null
  readonly kind: string
  readonly slugs: ReadonlySet<string> | null
}

export type Planned = {
  readonly pages: ReadonlySet<string>
  readonly listed: ReadonlyMap<string, string>
  readonly read: readonly Heard[]
  readonly keeping: ReadonlySet<string>
}

const UNCOMMITTED = ".uncommitted."

function pagesOf(root: string, kind: string, slugs: ReadonlySet<string> | null): readonly Listed[] {
  if (slugs === null) return everyOfType(root, kind)
  return [...slugs].flatMap((slug) => listedAt(root, kind, slug))
}

function fullAt(root: string, at: string): string {
  return isAbsolute(at) ? at : join(root, at)
}

export function heardOf(
  root: string,
  kind: string,
  slugs: ReadonlySet<string> | null,
  kept: Kept
): readonly Heard[] {
  return [
    ...kept.files.map((one) => ({
      folder: dirname(fullAt(root, one)),
      name: basename(one),
      kind,
      slugs,
    })),
    ...kept.folders.map((one) => ({ folder: fullAt(root, one), name: null, kind, slugs })),
  ]
}

function readsFor(
  root: string,
  kind: string,
  slugs: ReadonlySet<string> | null,
  keeping: Set<string>
): readonly Heard[] {
  const found: Heard[] = []
  for (const one of carriedFor(root, kind)) {
    if (one.pageTypeSlug !== COMPUTED) continue
    const page = listedAt(root, COMPUTED, one.pagePropertySlug)[0]
    if (page === undefined) continue
    keeping.add(dirname(join(root, page.path)))
    found.push(...heardOf(root, kind, slugs, keptIn(uncommittedIn(root, page.path))))
  }
  return found
}

export function plannedFor(root: string, helds: readonly Held[]): Planned {
  const pages = new Set<string>()
  const listed = new Map<string, string>()
  const read: Heard[] = []
  const keeping = new Set<string>()
  for (const held of helds) {
    for (const kind of held.kinds) {
      for (const one of pagesOf(root, kind, held.slugs)) pages.add(dirname(join(root, one.path)))
      try {
        read.push(...readsFor(root, kind, held.slugs, keeping))
      } catch {}
      if (held.slugs !== null) continue
      for (const at of slugFoldersOf(root, kind)) listed.set(join(root, at), kind)
    }
  }
  return { pages, listed, read, keeping }
}

function idOf(root: string, one: Changed): string | undefined {
  if (one.slug === undefined) return undefined
  try {
    return listedAt(root, one.pageTypeSlug, one.slug)[0]?.id
  } catch {
    return undefined
  }
}

export function followingFor(root: string): Following {
  const streams = new Map<string, Stream>()
  const watchers = new Map<string, FSWatcher>()
  const sentAt = new Map<string, number>()
  const owed = new Map<string, ReturnType<typeof setTimeout>>()
  let hearing = new Map<string, readonly ((name: string) => undefined)[]>()
  let planning: ReturnType<typeof setTimeout> | null = null

  const send = (one: Changed): undefined => {
    const id = idOf(root, one)
    for (const stream of streams.values()) {
      const keys = keysFor(stream.helds, one)
      if (keys.length === 0) continue
      stream.send(eventSaid("page", { ...one, ...(id === undefined ? {} : { id }), keys }))
    }
    return undefined
  }

  const changed = (one: Changed): undefined => {
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
    const helds = [...streams.values()].flatMap((one) => one.helds)
    let planned: Planned
    try {
      planned = plannedFor(root, helds)
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
    for (const one of planned.read) {
      hear(one.folder, (name) => {
        if (one.name !== null && name !== one.name) return undefined
        if (one.slugs === null) return changed({ pageTypeSlug: one.kind })
        for (const slug of one.slugs) changed({ pageTypeSlug: one.kind, slug })
        return undefined
      })
    }
    for (const folder of planned.keeping) {
      hear(folder, (name) => (name.includes(UNCOMMITTED) ? planSoon() : undefined))
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
          for (const heard of hearing.get(folder) ?? []) heard(name)
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
        streams.set(id, { send: put, helds: [] })
        put(eventSaid("stream", { stream: id }))
        beat = setInterval(() => put(": beat\n\n"), BEAT_MS)
        request.signal.addEventListener("abort", () => {
          closed()
          try {
            controller.close()
          } catch {}
        })
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
    return said({ following: stream.helds.map((one) => one.key) }, 200)
  }

  return { opened, followed, changed }
}
