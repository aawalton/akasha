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

export function useLoaderFollowing(followed: readonly Followed[]): undefined {
  const revalidator = useRevalidator()
  const again = useRef(revalidator.revalidate)
  again.current = revalidator.revalidate
  const named = JSON.stringify(followed)
  useEffect(() => {
    const said: readonly Followed[] = JSON.parse(named)
    return followChanges(said, () => {
      void again.current()
      return undefined
    })
  }, [named])
  return undefined
}
