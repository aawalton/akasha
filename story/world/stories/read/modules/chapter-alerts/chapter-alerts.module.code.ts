"use client"

import {
  type GameAlerts,
  resolveAlertPrefs,
} from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import {
  type AlertPermission,
  fireContentNotification,
  notificationPermission,
  requestNotificationPermission,
} from "akasha/story/ui/modules/alert-notification/alert-notification.module.code.ts"
import {
  playAlertSound,
  primeAudio,
} from "akasha/story/ui/modules/alert-sound/alert-sound.module.code.ts"
import type { SessionEnvelope } from "akasha/story/ui/modules/client-envelope/client-envelope.module.code.ts"
import {
  decideFrontierAdvance,
  deriveContentFrontier,
} from "akasha/story/ui/modules/content-frontier/content-frontier.module.code.ts"
import { useCallback, useEffect, useRef, useState } from "react"

const UNFOLLOWED: GameAlerts = { sound: "off", desktop: false }

export interface ChapterAlerts {
  readonly needsPermissionPrompt: boolean
  readonly enableAlerts: () => void
}

export function useChapterAlerts({
  envelope,
  storyTitle,
  storyId,
  following,
}: {
  envelope: SessionEnvelope
  storyTitle: string
  storyId: string
  following: boolean
}): ChapterAlerts {
  const prefs = resolveAlertPrefs(following ? undefined : UNFOLLOWED)
  const frontierRef = useRef<string | undefined>(undefined)
  const [permission, setPermission] = useState<AlertPermission>("default")

  useEffect(() => {
    setPermission(notificationPermission())
  }, [])

  useEffect(() => {
    if (prefs.sound === "off") return
    const prime = () => {
      primeAudio()
      window.removeEventListener("pointerdown", prime)
      window.removeEventListener("keydown", prime)
    }
    window.addEventListener("pointerdown", prime)
    window.addEventListener("keydown", prime)
    return () => {
      window.removeEventListener("pointerdown", prime)
      window.removeEventListener("keydown", prime)
    }
  }, [prefs.sound])

  useEffect(() => {
    const next = deriveContentFrontier(envelope)
    const seen = frontierRef.current
    frontierRef.current = next
    if (seen === undefined) return
    if (!decideFrontierAdvance(seen, next)) return
    if (prefs.sound !== "off") playAlertSound(prefs.sound)
    if (prefs.desktop) fireContentNotification(storyTitle, storyId)
  }, [envelope, prefs.sound, prefs.desktop, storyTitle, storyId])

  const enableAlerts = useCallback(() => {
    primeAudio()
    void requestNotificationPermission().then(setPermission)
  }, [])

  return { needsPermissionPrompt: prefs.desktop && permission === "default", enableAlerts }
}
