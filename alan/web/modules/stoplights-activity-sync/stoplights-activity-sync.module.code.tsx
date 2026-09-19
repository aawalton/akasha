"use client"

import { apiFetch } from "akasha/alan/web/modules/api-fetch/api-fetch.module.code.ts"
import {
  getApp,
  getStoplightsActivity,
  isNativeShell,
  type PluginListenerHandle,
} from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { UserIdContext } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { useContext, useEffect } from "react"
import { z } from "zod"

const FEEDS = [
  { at: "/api/habit-stoplights", wireKey: "habit" },
  { at: "/api/inbox-stoplights", wireKey: "inbox" },
  { at: "/api/attribute-stoplights", wireKey: "attribute" },
] as const

const ANSWER = z.object({ stoplights: z.array(z.record(z.string(), z.unknown())) })

export interface ActivityStoplight {
  readonly key: string
  readonly label: string
  readonly tier: string
  readonly reading: string | null
  readonly nextTier: string | null
  readonly progress: number | null
}

export interface StoplightsContent {
  readonly upkeep: readonly ActivityStoplight[]
  readonly inboxes: readonly ActivityStoplight[]
  readonly attributes: readonly ActivityStoplight[]
  readonly takenAt: string
}

function numberIn(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

export function stoplightsIn(
  rows: readonly Readonly<Record<string, unknown>>[],
  wireKey: string
): readonly ActivityStoplight[] {
  const held: ActivityStoplight[] = []
  for (const row of rows) {
    const key = textIn(row[wireKey])
    const tier = textIn(row.tier)
    if (key === null || tier === null) continue
    held.push({
      key,
      label: textIn(row.label) ?? key,
      tier,
      reading: textIn(row.reading),
      nextTier: textIn(row.nextTier),
      progress: numberIn(row.progress),
    })
  }
  return held
}

async function rowsIn(at: string): Promise<readonly Readonly<Record<string, unknown>>[] | null> {
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
  const [upkeep, inboxes, attributes] = await Promise.all(FEEDS.map((one) => rowsIn(one.at)))
  if (upkeep == null || inboxes == null || attributes == null) return null
  return {
    upkeep: stoplightsIn(upkeep, FEEDS[0].wireKey),
    inboxes: stoplightsIn(inboxes, FEEDS[1].wireKey),
    attributes: stoplightsIn(attributes, FEEDS[2].wireKey),
    takenAt: at,
  }
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

    const carry = async (): Promise<void> => {
      const content = await contentRead(new Date().toISOString())
      if (cancelled || content === null) return
      try {
        await plugin.start({ content: JSON.stringify(content) })
      } catch (error: unknown) {
        console.error("[stoplights-activity] would not take the reading", error)
      }
    }

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
    }
  }, [userID])

  return null
}
