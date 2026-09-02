"use client"

import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
import { clampFraction } from "@akasha/pages-ui-components/position-fraction"
import { emitPositionWrite } from "@akasha/pages-ui-components/position-write-event"
import { computeReadProgress } from "@akasha/pages-ui-components/read-progress"
import type { ReaderPositionAnchor } from "@akasha/pages-ui-components/reader-prose-body"
import { type RefObject, useEffect, useRef } from "react"

export interface ReaderProgressWriterArgs {
  readonly progressPropertyId: string | undefined
  readonly lengthPropertyId: string | undefined
  readonly wordCount: number | undefined
  readonly currentProgress: number | undefined
  readonly id: string
  readonly pageTypeSlug: string
  readonly userId: string | null | undefined
  readonly page: PageWithProperties | null
  readonly setProperty: (args: {
    pageTypeSlug: string
    pageId: string
    propertyId: string
    value: number
  }) => void
}

export function useReaderProgressWriter(args: ReaderProgressWriterArgs): {
  anchorRef: RefObject<ReaderPositionAnchor | null>
  restoringRef: RefObject<boolean>
} {
  const {
    progressPropertyId,
    lengthPropertyId,
    wordCount,
    currentProgress,
    id,
    pageTypeSlug,
    userId,
    page,
    setProperty,
  } = args

  const currentProgressRef = useRef<number | undefined>(currentProgress)
  const wordCountRef = useRef<number | undefined>(wordCount)
  const idRef = useRef(id)
  const pageTypeSlugRef = useRef(pageTypeSlug)
  const lastWrittenRef = useRef<number | undefined>(undefined)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const restoringRef = useRef(false)
  const anchorRef = useRef<ReaderPositionAnchor | null>(null)

  useEffect(() => {
    currentProgressRef.current = currentProgress
    wordCountRef.current = wordCount
    idRef.current = id
    pageTypeSlugRef.current = pageTypeSlug
  }, [currentProgress, wordCount, id, pageTypeSlug])

  const writerArmed =
    progressPropertyId != null &&
    lengthPropertyId != null &&
    wordCount != null &&
    wordCount > 0 &&
    userId != null &&
    page != null

  useEffect(() => {
    if (!writerArmed) return
    const onScroll = () => {
      if (restoringRef.current) return
      if (debounceRef.current !== undefined) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        if (restoringRef.current) return
        const doc = document.documentElement
        const scrollable = doc.scrollHeight - doc.clientHeight
        const pixelFraction = scrollable > 0 ? doc.scrollTop / scrollable : 0
        const contentFraction =
          anchorRef.current?.fractionAt(doc.scrollTop) ?? clampFraction(pixelFraction)
        const wc = wordCountRef.current
        if (wc == null) return
        const next = computeReadProgress({
          scrollFraction: contentFraction,
          wordCount: wc,
          currentProgress: currentProgressRef.current,
        })
        if (next !== undefined && next !== lastWrittenRef.current) {
          lastWrittenRef.current = next
          setProperty({
            pageTypeSlug: pageTypeSlugRef.current,
            pageId: idRef.current,
            propertyId: progressPropertyId,
            value: next,
          })
          emitPositionWrite(idRef.current, next)
        }
      }, 1500)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (debounceRef.current !== undefined) clearTimeout(debounceRef.current)
    }
  }, [writerArmed, progressPropertyId, setProperty])

  return { anchorRef, restoringRef }
}
