import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type { FetchImpl } from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"
import {
  type NamedPages,
  namedShapeKey,
} from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

export const SETTLE_MS = 50

export const RETRY_MS = 2_000

export const RETRY_CEILING_MS = 60_000

export interface Followed {
  readonly pageTypeSlug: string
  readonly by?: "id" | "slug"
  readonly values?: readonly string[]
}

export interface Pushed {
  readonly pageTypeSlug: string
  readonly slug?: string
  readonly id?: string
  readonly keys: readonly string[]
}

export interface StreamLike {
  readonly on: (name: string, heard: (data: unknown) => undefined) => undefined
  readonly closed: () => boolean
  readonly close: () => undefined
}

export interface ChangeFollowingDeps {
  readonly open: () => StreamLike
  readonly send: (body: unknown) => Promise<boolean>
  readonly pushed: (one: Pushed) => undefined
  readonly caughtUp: () => undefined
  readonly settleMs?: number
  readonly retryMs?: number
}

export interface ChangeFollowing {
  readonly start: () => undefined
  readonly follow: (key: string, followed: Followed) => undefined
  readonly unfollow: (key: string) => undefined
  readonly live: (key: string) => boolean
  readonly stop: () => undefined
}

export interface FollowingAt {
  readonly events: string
  readonly follow: string
}

export interface PageWatch {
  readonly live: () => boolean
  readonly release: () => undefined
}

export interface StoreFollowing {
  readonly follow: (key: string, followed: Followed) => undefined
  readonly unfollow: (key: string) => undefined
  readonly live: (key: string) => boolean
  readonly followPages: (at: FollowingAt) => undefined
  readonly watchPage: (pageTypeSlug: string, id: string, told: () => undefined) => PageWatch
}

export function streamAt(at: string): StreamLike {
  const source = new EventSource(at)
  return {
    on: (name, heard) => {
      source.addEventListener(name, (event) => {
        heard(event instanceof MessageEvent ? event.data : undefined)
      })
      return undefined
    },
    closed: () => source.readyState === EventSource.CLOSED,
    close: () => {
      source.close()
      return undefined
    },
  }
}

function parsed(data: unknown): Readonly<Record<string, unknown>> | null {
  if (typeof data !== "string") return null
  try {
    const said: unknown = JSON.parse(data)
    return isRecord(said) ? said : null
  } catch {
    return null
  }
}

export function streamNamedIn(data: unknown): string | null {
  return textIn(parsed(data)?.stream)
}

export function pushedIn(data: unknown): Pushed | null {
  const said = parsed(data)
  if (said === null) return null
  const pageTypeSlug = textIn(said.pageTypeSlug)
  if (pageTypeSlug === null || !Array.isArray(said.keys)) return null
  const keys = said.keys.filter((one): one is string => typeof one === "string")
  const slug = textIn(said.slug)
  const id = textIn(said.id)
  return {
    pageTypeSlug,
    keys,
    ...(slug === null ? {} : { slug }),
    ...(id === null ? {} : { id }),
  }
}

export function followedOf(pageTypeSlug: string, named: NamedPages | undefined): Followed {
  return named === undefined ? { pageTypeSlug } : { pageTypeSlug, ...named }
}

export function createChangeFollowing(deps: ChangeFollowingDeps): ChangeFollowing {
  const settleMs = deps.settleMs ?? SETTLE_MS
  const retryMs = deps.retryMs ?? RETRY_MS
  const held = new Map<string, { readonly followed: Followed; count: number }>()
  let taken: ReadonlySet<string> = new Set()
  let stream: StreamLike | null = null
  let named: string | null = null
  let followedOn: string | null = null
  let started = false
  let settling: ReturnType<typeof setTimeout> | null = null
  let reopening: ReturnType<typeof setTimeout> | null = null
  let waited = retryMs

  const lost = (): undefined => {
    named = null
    taken = new Set()
    return undefined
  }

  const said = async (): Promise<void> => {
    const at = named
    if (at === null) return
    const follows = [...held].map(([key, one]) => ({ key, ...one.followed }))
    let took = false
    try {
      took = await deps.send({ stream: at, follows })
    } catch {
      took = false
    }
    if (at !== named) return
    if (!took) {
      reopen()
      return
    }
    taken = new Set(follows.map((one) => one.key))
    if (followedOn === at) return
    if (followedOn !== null) deps.caughtUp()
    followedOn = at
  }

  const settle = (): undefined => {
    if (settling !== null) clearTimeout(settling)
    settling = setTimeout(() => {
      settling = null
      void said()
    }, settleMs)
    return undefined
  }

  function reopen(): undefined {
    stream?.close()
    stream = null
    lost()
    if (!started || reopening !== null) return undefined
    reopening = setTimeout(() => {
      reopening = null
      open()
    }, waited)
    waited = Math.min(waited * 2, RETRY_CEILING_MS)
    return undefined
  }

  function open(): undefined {
    let opened: StreamLike
    try {
      opened = deps.open()
    } catch {
      return reopen()
    }
    stream = opened
    opened.on("stream", (data) => {
      const at = streamNamedIn(data)
      if (at === null) return undefined
      named = at
      waited = retryMs
      if (settling !== null) clearTimeout(settling)
      settling = null
      void said()
      return undefined
    })
    opened.on("page", (data) => {
      const one = pushedIn(data)
      if (one !== null) deps.pushed(one)
      return undefined
    })
    opened.on("error", () => {
      lost()
      if (opened.closed()) reopen()
      return undefined
    })
    return undefined
  }

  return {
    start: () => {
      if (started) return undefined
      started = true
      return open()
    },
    follow: (key, followed) => {
      const one = held.get(key)
      if (one !== undefined) {
        one.count += 1
        return undefined
      }
      held.set(key, { followed, count: 1 })
      return settle()
    },
    unfollow: (key) => {
      const one = held.get(key)
      if (one === undefined) return undefined
      one.count -= 1
      if (one.count > 0) return undefined
      held.delete(key)
      return settle()
    },
    live: (key) => named !== null && taken.has(key),
    stop: () => {
      started = false
      if (settling !== null) clearTimeout(settling)
      if (reopening !== null) clearTimeout(reopening)
      settling = null
      reopening = null
      stream?.close()
      stream = null
      return lost()
    },
  }
}

export function createStoreFollowing(
  readingAgain: ReadonlyMap<string, () => Promise<void>>,
  fetchImpl: FetchImpl | null,
  open: (at: string) => StreamLike = streamAt,
  canStream: boolean = typeof EventSource === "function"
): StoreFollowing {
  const heardBy = new Map<string, Set<() => undefined>>()
  const readingNow = new Map<string, { owed: boolean }>()
  let followingAt: FollowingAt | null = null

  const readAgainNow = (key: string): undefined => {
    const reading = readingAgain.get(key)
    if (reading === undefined) return undefined
    const running = readingNow.get(key)
    if (running !== undefined) {
      running.owed = true
      return undefined
    }
    const state = { owed: false }
    readingNow.set(key, state)
    void reading().finally(() => {
      readingNow.delete(key)
      if (state.owed) readAgainNow(key)
    })
    return undefined
  }

  const heard = (key: string): undefined => {
    readAgainNow(key)
    for (const one of heardBy.get(key) ?? []) one()
    return undefined
  }

  const following = createChangeFollowing({
    open: () => open(followingAt?.events ?? ""),
    send: async (body) => {
      if (fetchImpl === null || followingAt === null) return false
      const answered = await fetchImpl(followingAt.follow, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(body),
      })
      return answered.ok
    },
    pushed: (one) => {
      for (const key of one.keys) heard(key)
      return undefined
    },
    caughtUp: () => {
      for (const key of new Set([...readingAgain.keys(), ...heardBy.keys()])) heard(key)
      return undefined
    },
  })

  return {
    follow: following.follow,
    unfollow: following.unfollow,
    live: following.live,
    followPages: (at) => {
      if (followingAt !== null || !canStream) return undefined
      followingAt = at
      return following.start()
    },
    watchPage: (pageTypeSlug, id, told) => {
      const key = `page:${namedShapeKey(pageTypeSlug, { by: "id", values: [id] })}`
      const held = heardBy.get(key) ?? new Set<() => undefined>()
      heardBy.set(key, held)
      const listener = (): undefined => told()
      held.add(listener)
      following.follow(key, { pageTypeSlug, by: "id", values: [id] })
      let released = false
      return {
        live: () => following.live(key),
        release: () => {
          if (released) return undefined
          released = true
          following.unfollow(key)
          held.delete(listener)
          if (held.size === 0) heardBy.delete(key)
          return undefined
        },
      }
    },
  }
}
