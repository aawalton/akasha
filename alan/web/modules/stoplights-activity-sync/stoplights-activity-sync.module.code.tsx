"use client"

import {
  type ActivityRows,
  contentOf,
  type StoplightsContent,
} from "akasha/alan/harness/stoplight/modules/stoplights-activity-content/stoplights-activity-content.module.code.ts"
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

const FEEDS = ["/api/habit-stoplights", "/api/inbox-stoplights", "/api/attribute-stoplights"]

const ANSWER = z.object({ stoplights: z.array(z.record(z.string(), z.unknown())) })

export function contentIn(
  groups: readonly (ActivityRows | null)[],
  takenAt: string
): StoplightsContent | null {
  const [upkeep, inboxes, attributes] = groups
  if (upkeep == null || inboxes == null || attributes == null) return null
  return contentOf([upkeep, inboxes, attributes], takenAt)
}

async function rowsIn(at: string): Promise<ActivityRows | null> {
  try {
    const answer = await apiFetch(at)
    if (!answer.ok) return null
    const said = ANSWER.safeParse(await answer.json())
    return said.success ? said.data.stoplights : null
  } catch {
    return null
  }
}

export async function contentRead(at: string): Promise<StoplightsContent | null> {
  return contentIn(await Promise.all(FEEDS.map(rowsIn)), at)
}

export function StoplightsActivitySync() {
  const userID = useContext(UserIdContext)

  useEffect(() => {
    if (!isNativeShell()) return
    if (userID == null) return
    const plugin = getStoplightsActivity()
    if (plugin == null) return

    let cancelled = false
    let handle: PluginListenerHandle | null = null
    let carrying: PluginListenerHandle | null = null

    const carry = async (): Promise<void> => {
      const content = await contentRead(new Date().toISOString())
      if (cancelled) return
      if (content === null) {
        throw new Error("the stoplight feeds gave no reading, so no activity could start")
      }
      try {
        await plugin.start({ content: JSON.stringify(content) })
      } catch (error: unknown) {
        console.error("[stoplights-activity] would not take the reading", error)
      }
    }

    void (async () => {
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
