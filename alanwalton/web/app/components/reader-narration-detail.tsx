"use client"

import type { SentenceMark } from "@alanwalton/voice-core/voice/mark-schema"
import { useOptionalPlayingSession } from "@shared/pages-ui/media/playing-session-context"
import { KOKORO_STREAM_VARIANT, STORED_READ_ALOUD_VARIANT } from "@shared/pages-ui/media/media-src"
import { planPlayFromSentence } from "@shared/pages-ui/media/play-from-sentence"
import { type ActiveSessionInit } from "@shared/pages-ui/media/playing-session"
import { type ComponentProps, useCallback, useMemo } from "react"
import { useLocation } from "react-router"
import { PageDetailWithReadMark } from "./page-detail-with-read-mark"
import { useReaderActiveMarks } from "./use-reader-active-marks"

const EMPTY_MARKS: readonly SentenceMark[] = []

type Props = Omit<ComponentProps<typeof PageDetailWithReadMark>, "onPlayFromSentence"> & {
  title: string
}

type ReaderPlayFromSentenceInput = {
  readonly pageId: string
  readonly pageTypeSlug: string
  readonly title: string
  readonly audioNextHref?: string | null
  readonly sentenceMarks?: readonly SentenceMark[]
}

export function useReaderPlayFromSentence(
  input: ReaderPlayFromSentenceInput
): (sentenceIndex: number) => void {
  const location = useLocation()
  const session = useOptionalPlayingSession()
  const marks = input.sentenceMarks ?? EMPTY_MARKS

  const readAloudInit = useMemo<ActiveSessionInit>(
    () => ({
      pageId: input.pageId,
      pageTypeSlug: input.pageTypeSlug,
      pageHref: location.pathname,
      title: input.title,
      medium: "audio",
      variant: STORED_READ_ALOUD_VARIANT,
      speed: 1,
      nextHref: input.audioNextHref ?? null,
    }),
    [input.pageId, input.pageTypeSlug, input.audioNextHref, location.pathname, input.title]
  )

  return useCallback(
    (sentenceIndex: number) => {
      const plan = planPlayFromSentence(marks, sentenceIndex)
      if (plan.kind === "ungenerated") {
        session?.startSession({
          ...readAloudInit,
          variant: KOKORO_STREAM_VARIANT,
          fromSentence: plan.startSentenceIndex,
        })
        return
      }
      session?.playFromSeconds(plan.seconds, readAloudInit)
    },
    [marks, session, readAloudInit]
  )
}

export function ReaderNarrationDetail({ title, ...detailProps }: Props) {
  const onPlayFromSentence = useReaderPlayFromSentence({
    pageId: detailProps.id,
    pageTypeSlug: detailProps.pageTypeSlug,
    title,
    audioNextHref: detailProps.audioNextHref,
    sentenceMarks: detailProps.sentenceMarks,
  })
  const highlightMarks = useReaderActiveMarks({
    pageId: detailProps.id,
    ssrMarks: detailProps.sentenceMarks ?? EMPTY_MARKS,
  })
  return (
    <PageDetailWithReadMark
      {...detailProps}
      sentenceMarks={highlightMarks}
      onPlayFromSentence={onPlayFromSentence}
    />
  )
}
