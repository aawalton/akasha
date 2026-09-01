"use client"

import { countOpenQuestions } from "@akasha/open-questions/open-question-count"
import { UserIdContext } from "@akasha/pages-ui/use-user-id"
import { useContext, useEffect } from "react"
import { getBadge, isNativeShell } from "~/lib/capacitor-bridge"
import { OPEN_QUESTIONS_RESYNC_EVENT } from "~/lib/open-questions-resync"

export function BadgeSync() {
  const userID = useContext(UserIdContext)

  useEffect(() => {
    if (!isNativeShell()) return
    const badge = getBadge()
    if (badge == null) {
      console.error(
        "[badge] native shell detected but Badge plugin is missing — the native build predates the badge-set seam (stale packageClassList); the icon badge will not re-sync. Rebuild the shell (npm run ios:sync + TestFlight)."
      )
      return
    }
    if (userID == null) return
    console.info("[badge] ready — native shell with Badge plugin")

    let cancelled = false
    let inFlight = false
    const resync = async () => {
      if (inFlight) return
      inFlight = true
      try {
        const count = await countOpenQuestions()
        if (cancelled) return
        await badge.setCount({ count })
        console.info(`[badge] setCount(${count}) -> resolved`)
      } catch (error: unknown) {
        console.error("[badge] resync failed", error)
      } finally {
        inFlight = false
      }
    }

    void resync()

    const onVisibility = () => {
      if (document.visibilityState === "visible") void resync()
    }
    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener(OPEN_QUESTIONS_RESYNC_EVENT, resync)

    return () => {
      cancelled = true
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener(OPEN_QUESTIONS_RESYNC_EVENT, resync)
    }
  }, [userID])

  return null
}
