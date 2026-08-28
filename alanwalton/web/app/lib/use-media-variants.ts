"use client"

import type { MediaVariant } from "@shared/pages-ui/media/page-media-player"
import { useEffect, useState } from "react"
import { z } from "zod"
import { API_ORIGIN } from "~/lib/api-origin"

const mediaVariantsResponseSchema = z
  .object({
    variants: z.array(z.object({ id: z.string(), label: z.string() })),
    defaultVariant: z.string().nullable(),
  })
  .strict()

export interface MediaVariantsResult {
  readonly variants: readonly MediaVariant[]
  readonly defaultVariant: string | null
}

export function useMediaVariants(
  pageId: string | undefined,
  hasAudio: boolean
): MediaVariantsResult | null {
  const [result, setResult] = useState<MediaVariantsResult | null>(null)

  useEffect(() => {
    if (pageId == null || !hasAudio) {
      setResult(null)
      return
    }
    let alive = true
    const run = async (): Promise<void> => {
      try {
        const res = await fetch(`${API_ORIGIN}/api/media/${pageId}/variants`, {
          headers: { accept: "application/json" },
        })
        if (!res.ok) throw new Error(`media variants fetch: status ${res.status}`)
        const parsed = mediaVariantsResponseSchema.parse(await res.json())
        if (alive) {
          setResult({ variants: parsed.variants, defaultVariant: parsed.defaultVariant })
        }
      } catch {
        if (alive) setResult(null)
      }
    }
    void run()
    return () => {
      alive = false
    }
  }, [pageId, hasAudio])

  return result
}
