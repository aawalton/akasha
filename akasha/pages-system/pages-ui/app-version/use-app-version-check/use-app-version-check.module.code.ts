"use client"

import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { parseBuildSha } from "@akasha/web-build-version/build-sha"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import {
  buildVersionedReloadUrl,
  liveVersionIn,
  shouldPromptVersionUpdate,
} from "../app-version-check/app-version-check.module.code.ts"

export const LIVE_VERSION_PATH = "/api/live-version"

export const LIVE_VERSION_POLL_MS = 60_000

const ASK_CEILING_MS = 5_000

const BUILD_SHA = parseBuildSha(process.env.NEXT_PUBLIC_BUILD_SHA)

const DEFAULT_CLASSNAMES = {
  toast: `!${surfaceClass(0)} !border-accent !text-accent !font-bold`,
  actionButton: "!bg-accent !text-surface-0",
}

async function askLiveVersion(signal: AbortSignal): Promise<string | null> {
  try {
    const response = await fetch(LIVE_VERSION_PATH, {
      headers: { accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.any([signal, AbortSignal.timeout(ASK_CEILING_MS)]),
    })
    if (!response.ok) return null
    return liveVersionIn(await response.json())
  } catch {
    return null
  }
}

export function useAppVersionCheck(options?: {
  classNames?: { toast?: string; actionButton?: string }
  enabled?: boolean
  pollMs?: number
}): undefined {
  const enabled = options?.enabled ?? true
  const pollMs = options?.pollMs ?? LIVE_VERSION_POLL_MS
  const classNames = options?.classNames ?? DEFAULT_CLASSNAMES
  const classNamesRef = useRef(classNames)
  classNamesRef.current = classNames

  useEffect(() => {
    if (!enabled) return
    if (BUILD_SHA === null) return

    const controller = new AbortController()
    let detected = false

    const ask = async (): Promise<void> => {
      const liveVersion = await askLiveVersion(controller.signal)
      if (controller.signal.aborted) return
      if (liveVersion === null) return
      if (
        !shouldPromptVersionUpdate({ buildSha: BUILD_SHA, liveVersion, alreadyDetected: detected })
      )
        return
      detected = true
      toast("A new version is available", {
        id: "version-update",
        duration: Number.POSITIVE_INFINITY,
        closeButton: false,
        classNames: classNamesRef.current,
        action: {
          label: "Reload",
          onClick: () =>
            window.location.replace(buildVersionedReloadUrl(window.location.href, liveVersion)),
        },
      })
    }

    void ask()
    const timer = setInterval(() => void ask(), pollMs)
    return () => {
      controller.abort()
      clearInterval(timer)
    }
  }, [enabled, pollMs])
}
