"use client"

import { resolveAlertPrefs } from "@akasha/story-engine-core/game-schema"
import {
  type AlertPermission,
  fireContentNotification,
  notificationPermission,
  requestNotificationPermission,
} from "@akasha/story-reader/alert-notification"
import { playAlertSound, primeAudio } from "@akasha/story-reader/alert-sound"
import type { SessionEnvelope } from "@akasha/story-reader/client-envelope"
import { decideFrontierAdvance, deriveContentFrontier } from "@akasha/story-reader/content-frontier"
import { useCallback, useEffect, useRef, useState } from "react"
import type { AwenGame } from "../components/awen-display"

export interface ContentAlerts {
  readonly needsPermissionPrompt: boolean
  readonly enableAlerts: () => void
}

export function useContentAlerts(envelope: SessionEnvelope, game: AwenGame): ContentAlerts {
  const prefs = resolveAlertPrefs(game.display.alerts)
  const frontierRef = useRef<string | undefined>(deriveContentFrontier(envelope))
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
    if (decideFrontierAdvance(frontierRef.current, next)) {
      if (prefs.sound !== "off") playAlertSound(prefs.sound)
      if (prefs.desktop) fireContentNotification(game.title, game.externalId)
    }
    frontierRef.current = next
  }, [envelope, prefs.sound, prefs.desktop, game.title, game.externalId])

  const enableAlerts = useCallback(() => {
    primeAudio()
    void requestNotificationPermission().then(setPermission)
  }, [])

  const needsPermissionPrompt = prefs.desktop && permission === "default"

  return { needsPermissionPrompt, enableAlerts }
}
