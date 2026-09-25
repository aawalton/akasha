"use client"

import { createChangeFollowing } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"
import { streamAt } from "akasha/page/ui-store/collection/modules/event-source-stream/event-source-stream.module.code.ts"
import { useEffect, useRef } from "react"
import { useRevalidator } from "react-router"

const EVENTS_AT = "/api/page-events"

const FOLLOW_AT = "/api/page-follow"

const BETWEEN = ","

export function notFollowing(): undefined {
  return undefined
}

export function followChanges(
  pageTypeSlugs: readonly string[],
  told: () => undefined
): () => undefined {
  if (typeof EventSource !== "function") return notFollowing
  const following = createChangeFollowing({
    open: () => streamAt(EVENTS_AT),
    send: async (body) => {
      const answered = await fetch(FOLLOW_AT, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(body),
      })
      return answered.ok
    },
    pushed: told,
    caughtUp: told,
  })
  following.start()
  for (const pageTypeSlug of pageTypeSlugs) {
    if (pageTypeSlug !== "") following.follow(pageTypeSlug, { pageTypeSlug })
  }
  return () => {
    following.stop()
    return undefined
  }
}

export function useLoaderFollowing(pageTypeSlugs: readonly string[]): undefined {
  const revalidator = useRevalidator()
  const again = useRef(revalidator.revalidate)
  again.current = revalidator.revalidate
  const named = pageTypeSlugs.join(BETWEEN)
  useEffect(
    () =>
      followChanges(named.split(BETWEEN), () => {
        void again.current()
        return undefined
      }),
    [named]
  )
  return undefined
}
