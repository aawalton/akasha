import { useEffect } from "react"
import { z } from "zod"

export type EnsureRenditionStatus = "ready" | "generating" | "unavailable"

export type EnsureRenditionFn = (track: {
  pageId: string
  medium: string
}) => Promise<EnsureRenditionStatus>

const POLL_INTERVAL_MS = 2_500

const ensureResponseSchema = z.object({
  status: z.enum(["ready", "generating", "unavailable"]),
})

export async function webEnsureRendition(track: {
  pageId: string
  medium: string
}): Promise<EnsureRenditionStatus> {
  const res = await fetch(`/api/media/${track.pageId}/${track.medium}/ensure`, {
    method: "POST",
  })
  const body = await res.json().catch(() => null)
  const parsed = ensureResponseSchema.safeParse(body)
  return parsed.success ? parsed.data.status : "unavailable"
}

export function useWebKitReadAloudDivert({
  enabled,
  pageId,
  medium,
  ensureRendition,
  onReady,
  onUnavailable,
}: {
  enabled: boolean
  pageId: string | null
  medium: string | null
  ensureRendition: EnsureRenditionFn | undefined
  onReady: () => void
  onUnavailable: () => void
}): undefined {
  return useWebKitReadAloudEnsure({
    suppressed: enabled,
    pageId,
    medium,
    ensureRendition: ensureRendition ?? webEnsureRendition,
    onReady,
    onUnavailable,
  })
}

function useWebKitReadAloudEnsure({
  suppressed,
  pageId,
  medium,
  ensureRendition,
  onReady,
  onUnavailable,
}: {
  suppressed: boolean
  pageId: string | null
  medium: string | null
  ensureRendition: EnsureRenditionFn
  onReady: () => void
  onUnavailable: () => void
}): undefined {
  useEffect(() => {
    if (!suppressed || pageId == null || medium == null) return
    let cancelled = false
    const poll = async (): Promise<void> => {
      for (;;) {
        if (cancelled) return
        let status: EnsureRenditionStatus
        try {
          status = await ensureRendition({ pageId, medium })
        } catch {
          return
        }
        if (cancelled) return
        if (status === "ready") {
          onReady()
          return
        }
        if (status === "unavailable") {
          onUnavailable()
          return
        }
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
      }
    }
    void poll()
    return () => {
      cancelled = true
    }
  }, [suppressed, pageId, medium, ensureRendition, onReady, onUnavailable])
}
