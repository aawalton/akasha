"use client"

import {
  createChangeFollowing,
  streamAt,
} from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"
import { useEffect, useRef } from "react"
import { useRevalidator } from "react-router"

const EVENTS_AT = "/api/page-events"

const FOLLOW_AT = "/api/page-follow"

const BETWEEN = ","

export function useLoaderFollowing(pageTypeSlugs: readonly string[]): undefined {
  const revalidator = useRevalidator()
  const again = useRef(revalidator.revalidate)
  again.current = revalidator.revalidate
  const named = pageTypeSlugs.join(BETWEEN)
  useEffect(() => {
    if (typeof EventSource !== "function") return undefined
    const told = (): undefined => {
      void again.current()
      return undefined
    }
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
    for (const pageTypeSlug of named.split(BETWEEN)) {
      if (pageTypeSlug !== "") following.follow(pageTypeSlug, { pageTypeSlug })
    }
    return () => following.stop()
  }, [named])
  return undefined
}
