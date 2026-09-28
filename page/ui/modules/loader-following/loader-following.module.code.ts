"use client"

import type { PageWatch } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"
import { inABrowser } from "akasha/page/ui-store/collection/modules/event-source-stream/event-source-stream.module.code.ts"
import { getPagesStore } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { useEffect, useRef } from "react"
import { useRevalidator } from "react-router"

const FOLLOWING_AT = { events: "/api/page-events", follow: "/api/page-follow" }

export type Followed = string | { readonly pageTypeSlug: string; readonly id: string }

export function notFollowing(): undefined {
  return undefined
}

export function followChanges(
  followed: readonly Followed[],
  told: () => undefined
): () => undefined {
  if (!inABrowser()) return notFollowing
  const watches: PageWatch[] = []
  let released = false
  void getPagesStore().then((store) => {
    if (released) return
    store.followPages(FOLLOWING_AT)
    for (const one of followed) {
      if (typeof one !== "string") watches.push(store.watchPage(one.pageTypeSlug, one.id, told))
      else if (one !== "") watches.push(store.watchPages(one, told))
    }
  })
  return () => {
    released = true
    for (const one of watches) one.release()
    return undefined
  }
}

const SETTLE_MS = 1_000

const LONGEST_MS = 3_000

export type Later = (ms: number, then: () => undefined) => () => undefined

interface RevalidationPacingDeps {
  readonly run: () => Promise<unknown>
  readonly later?: Later
  readonly now?: () => number
  readonly settleMs?: number
  readonly longestMs?: number
}

interface RevalidationPacing {
  readonly told: () => undefined
  readonly stop: () => undefined
}

function laterOnTheClock(ms: number, then: () => undefined): () => undefined {
  const held = setTimeout(then, ms)
  return () => {
    clearTimeout(held)
    return undefined
  }
}

export function paceRevalidation(deps: RevalidationPacingDeps): RevalidationPacing {
  const settleMs = deps.settleMs ?? SETTLE_MS
  const longestMs = deps.longestMs ?? LONGEST_MS
  const later = deps.later ?? laterOnTheClock
  const now = deps.now ?? Date.now
  let waiting: (() => undefined) | null = null
  let firstTold: number | null = null
  let running = false
  let owed = false
  let stopped = false

  const run = (): undefined => {
    waiting = null
    firstTold = null
    running = true
    void deps.run().finally(() => {
      running = false
      if (stopped || !owed) return
      owed = false
      arm()
    })
    return undefined
  }

  function arm(): undefined {
    const at = now()
    if (firstTold === null) firstTold = at
    const wait = Math.max(0, Math.min(settleMs, firstTold + longestMs - at))
    waiting?.()
    waiting = later(wait, run)
    return undefined
  }

  return {
    told: () => {
      if (stopped) return undefined
      if (running) {
        owed = true
        return undefined
      }
      return arm()
    },
    stop: () => {
      stopped = true
      owed = false
      waiting?.()
      waiting = null
      return undefined
    },
  }
}

type Revalidate = { current: () => Promise<unknown> }

const revalidators = new Set<Revalidate>()

let tabPacing: RevalidationPacing | null = null

function pacingForTab(): RevalidationPacing {
  tabPacing ??= paceRevalidation({
    run: async () => {
      const one = [...revalidators][0]
      if (one !== undefined) await one.current()
    },
  })
  return tabPacing
}

export function useLoaderFollowing(followed: readonly Followed[]): undefined {
  const revalidator = useRevalidator()
  const again = useRef(revalidator.revalidate)
  again.current = revalidator.revalidate
  const named = JSON.stringify(followed)
  useEffect(() => {
    const said: readonly Followed[] = JSON.parse(named)
    const pacing = pacingForTab()
    revalidators.add(again)
    const letGo = followChanges(said, pacing.told)
    return () => {
      revalidators.delete(again)
      return letGo()
    }
  }, [named])
  return undefined
}
