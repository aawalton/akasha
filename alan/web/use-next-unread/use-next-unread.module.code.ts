"use client"

import { resolveNextUnreadHref } from "akasha/alan/web/next-unread/next-unread.module.code.ts"
import { useEffect, useRef, useState } from "react"

export function useNextUnreadHref(storyId: string | undefined): string | null {
  const [href, setHref] = useState<string | null>(null)
  const reqRef = useRef(0)
  useEffect(() => {
    const reqId = ++reqRef.current
    if (storyId == null) {
      setHref(null)
      return
    }
    void (async () => {
      try {
        const resolved = await resolveNextUnreadHref({ storyId })
        if (reqId === reqRef.current) setHref(resolved)
      } catch {
        if (reqId === reqRef.current) setHref(null)
      }
    })()
  }, [storyId])
  return href
}
