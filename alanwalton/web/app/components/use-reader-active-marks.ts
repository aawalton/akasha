"use client"

import { type SentenceMark, sentenceMarkSchema } from "@alanwalton/voice-core/voice/mark-schema"
import { useOptionalPlayingSession } from "@shared/pages-ui/media/playing-session-context"
import { KOKORO_STREAM_VARIANT } from "@shared/pages-ui/media/media-src"
import { useEffect, useState } from "react"
import { z } from "zod"

const marksResponseSchema = z.object({ marks: z.array(sentenceMarkSchema) }).strict()

export function useReaderActiveMarks(input: {
  pageId: string
  ssrMarks: readonly SentenceMark[]
}): readonly SentenceMark[] {
  const { pageId, ssrMarks } = input
  const session = useOptionalPlayingSession()
  const active = session?.state.status === "active" ? session.state : null
  const kokoroHere =
    active != null && active.pageId === pageId && active.variant === KOKORO_STREAM_VARIANT
  const fromSentence = kokoroHere ? (active.fromSentence ?? 0) : null

  const [fetched, setFetched] = useState<readonly SentenceMark[] | null>(null)
  useEffect(() => {
    if (fromSentence === null) {
      setFetched(null)
      return
    }
    let cancelled = false
    setFetched(null)
    const url = `/api/media/${pageId}/audio/marks?variant=${KOKORO_STREAM_VARIANT}&fromSentence=${fromSentence}`
    void fetch(url, { credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled) return
        const parsed = marksResponseSchema.safeParse(body)
        setFetched(parsed.success ? parsed.data.marks : null)
      })
      .catch(() => {
        if (!cancelled) setFetched(null)
      })
    return () => {
      cancelled = true
    }
  }, [fromSentence, pageId])

  return fromSentence !== null && fetched !== null ? fetched : ssrMarks
}
