"use client"

import { apiFetch } from "akasha/alan/web/modules/api-fetch/api-fetch.module.code.ts"
import {
  getApp,
  getStoplightsActivity,
  isNativeShell,
  type PluginListenerHandle,
} from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { postDeviceToken } from "akasha/alan/web/modules/push-registration-sync/push-registration-sync.module.code.tsx"
import { UserIdContext } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { useContext, useEffect } from "react"
import { z } from "zod"

const FEED = "/api/stoplights-activity"

const ANSWER = z.record(z.string(), z.unknown())

export function contentIn(body: unknown): string | null {
  const said = ANSWER.safeParse(body)
  return said.success ? JSON.stringify(said.data) : null
}

async function contentRead(): Promise<string | null> {
  try {
    const answer = await apiFetch(FEED)
    if (!answer.ok) return null
    return contentIn(await answer.json())
  } catch {
    return null
  }
}

export function StoplightsActivitySync() {
  const userID = useContext(UserIdContext)

  useEffect(() => {
    if (!isNativeShell()) return
    if (userID == null) return
    const plugin = getStoplightsActivity()

    let cancelled = false
    let handle: PluginListenerHandle | null = null
    let carrying: PluginListenerHandle | null = null

    const carry = async (): Promise<void> => {
      if (plugin == null) {
        throw new Error("the native shell carries no stoplights activity plugin")
      }
      const content = await contentRead()
      if (cancelled) return
      if (content === null) {
        throw new Error("the stoplights feed gave no reading, so no activity could start")
      }
      await plugin.start({ content })
    }

    void (async () => {
      if (plugin == null) return
      const opened = await plugin.addListener("token", (event) => {
        void postDeviceToken(event.value, "liveactivity")
      })
      if (cancelled) void opened.remove()
      else carrying = opened
    })()

    void carry()

    const app = getApp()
    void (async () => {
      if (app == null) return
      const opened = await app.addListener("appStateChange", (state) => {
        if (state.isActive) void carry()
      })
      if (cancelled) void opened.remove()
      else handle = opened
    })()

    return () => {
      cancelled = true
      if (handle != null) void handle.remove()
      if (carrying != null) void carrying.remove()
    }
  }, [userID])

  return null
}
