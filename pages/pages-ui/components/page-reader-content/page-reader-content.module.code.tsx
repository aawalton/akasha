"use client"

import { PageLayout } from "@akasha/design-layout/page-layout"
import { simplePageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@akasha/design-patterns/empty"
import { cn } from "@akasha/design-primitives/cn"
import { bodyPropertyIsContentTier } from "@akasha/pages-core/schema/content-tier"
import { expandDateMentions } from "@akasha/pages-core/view/expand-date-mentions"
import { DisplayFrame } from "@akasha/pages-ui/frame/display-frame"
import type { MediaVariant } from "@akasha/pages-ui/media/page-media-player"
import {
  SentenceNarrationProvider,
  type SentenceNarrationValue,
} from "@akasha/pages-ui/media/sentence-narration-context"
import { toPageDataJSON } from "@akasha/pages-ui-components/page-data-json"
import {
  decideReadRestore,
  decideRestoreReady,
  fractionToScrollTop,
  resolveResumeFraction,
} from "@akasha/pages-ui-components/position-fraction"
import { ReaderAudioBlock } from "@akasha/pages-ui-components/reader-audio-block"
import {
  type ReaderNeighborLink,
  ReaderPager,
  ReadingProgressBar,
} from "@akasha/pages-ui-components/reader-chrome"
import { useReaderPageSource } from "@akasha/pages-ui-components/reader-page-source"
import { ReaderProseBody, ReaderProseStatic } from "@akasha/pages-ui-components/reader-prose-body"
import { layoutSentenceSpans } from "@akasha/pages-ui-components/reader-sentence-layout"
import { READER_PROSE_TYPOGRAPHY } from "@akasha/pages-ui-components/reader-typography"
import { useReadEndOnScroll } from "@akasha/pages-ui-components/use-read-end-on-scroll"
import { useReaderProgressWriter } from "@akasha/pages-ui-components/use-reader-progress-writer"
import { useRestoreReadPosition } from "@akasha/pages-ui-components/use-restore-read-position"
import { useSentenceHighlight } from "@akasha/pages-ui-components/use-sentence-highlight"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import type { SentenceMark } from "@akasha/voice-core/voice/mark-schema"
import { type ReactNode, useCallback, useMemo, useRef } from "react"

const READER_VIRTUALIZE_THRESHOLD = 24_000

function toFiniteNumber(value: unknown): number | undefined {
  if (value == null) return undefined
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

const EMPTY_MARKS: readonly SentenceMark[] = []

interface PageReaderContentProps {
  pageTypeSlug: PageTypeSlug
  id: string
  audioVariants?: readonly MediaVariant[]
  audioNextHref?: string | null
  audioDefaultVariant?: string | null
  readerPrev?: ReaderNeighborLink | null
  readerNext?: ReaderNeighborLink | null
  storyHref?: string | null
  audioActions?: ReactNode
  onReadToEnd?: () => void
  sentenceMarks?: readonly SentenceMark[]
  onPlayFromSentence?: (sentenceIndex: number) => void
}

export function PageReaderContent({
  pageTypeSlug,
  id,
  audioVariants,
  audioNextHref,
  audioDefaultVariant,
  readerPrev,
  readerNext,
  storyHref,
  audioActions,
  onReadToEnd,
  sentenceMarks,
  onPlayFromSentence,
}: PageReaderContentProps) {
  const source = useReaderPageSource()
  const { pageTypeData } = source.useReaderPageType(pageTypeSlug)
  const detailConfig = pageTypeData.detailConfig
  const mediaConfig = pageTypeData.mediaConfig

  const includeContentOnDemand = bodyPropertyIsContentTier(pageTypeData)
  const { page, isLoading } = source.useReaderPage({ pageTypeSlug, id, includeContentOnDemand })

  const data = toPageDataJSON(page?.properties)
  const title = data.title != null ? String(data.title) : ""
  const bodyPropertyId = detailConfig?.bodyPropertyId
  const bodyValue = bodyPropertyId != null ? data[bodyPropertyId] : undefined
  const body = bodyValue != null && typeof bodyValue !== "object" ? String(bodyValue) : ""

  const progressPropertyId = detailConfig?.progressPropertyId
  const lengthPropertyId = detailConfig?.lengthPropertyId
  const wordCount = toFiniteNumber(lengthPropertyId != null ? data[lengthPropertyId] : undefined)
  const currentProgress = toFiniteNumber(
    progressPropertyId != null ? data[progressPropertyId] : undefined
  )
  const rowResumeFraction =
    wordCount != null && wordCount > 0 && currentProgress != null
      ? currentProgress / wordCount
      : undefined
  const localPosition = source.useReaderLocalPosition(id)
  const localResumeFraction =
    wordCount != null && wordCount > 0 && localPosition.value != null
      ? localPosition.value / wordCount
      : undefined
  const resumeFraction = resolveResumeFraction({
    localFraction: localResumeFraction,
    rowFraction: rowResumeFraction,
  })
  const userId = source.useReaderUserId()
  const setProperty = source.useReaderSetProperty()
  const ReaderHeaderMenu = source.ReaderHeaderMenu

  const { anchorRef, restoringRef } = useReaderProgressWriter({
    progressPropertyId,
    lengthPropertyId,
    wordCount,
    currentProgress,
    id,
    pageTypeSlug,
    userId,
    page,
    setProperty,
  })

  const frameConfig = {
    edgeToEdge: detailConfig?.frame?.edgeToEdge ?? true,
    focusMode: detailConfig?.frame?.focusMode ?? true,
    autoScroll: {
      loadScroll: detailConfig?.frame?.autoScroll?.loadScroll ?? ("progress" as const),
    },
  }

  const markReadOnEnd = detailConfig?.markReadOnEnd === true
  useReadEndOnScroll({
    enabled: markReadOnEnd && page != null && !isLoading,
    onReadToEnd,
    resetKey: id,
    anchorRef,
  })

  const resolveScrollTop = useCallback((fraction: number): number => {
    const anchor = anchorRef.current
    if (anchor !== null) return anchor.scrollTopFor(fraction)
    const doc = document.documentElement
    return fractionToScrollTop(fraction, doc.scrollHeight - doc.clientHeight)
  }, [])

  const isVirtualizedBody = body.length > READER_VIRTUALIZE_THRESHOLD

  const marks = sentenceMarks ?? EMPTY_MARKS
  const audioNarrationCapable = mediaConfig?.audio != null && onPlayFromSentence != null
  const sentenceLayout = useMemo(
    () => (audioNarrationCapable ? layoutSentenceSpans(body) : null),
    [audioNarrationCapable, body]
  )
  const narrationValue = useMemo<SentenceNarrationValue>(
    () => ({ marks, playFromSentence: onPlayFromSentence ?? (() => {}) }),
    [marks, onPlayFromSentence]
  )
  const proseContainerRef = useRef<HTMLDivElement>(null)
  const scrollToBlock = useCallback(
    (blockIndex: number) => anchorRef.current?.scrollToBlock(blockIndex),
    [anchorRef]
  )
  useSentenceHighlight({
    containerRef: proseContainerRef,
    layout: sentenceLayout,
    marks,
    scrollToBlock,
  })

  const restoreMayFire = !localPosition.loaded || decideReadRestore(resumeFraction) !== undefined
  const holdEligibleForRestore = isVirtualizedBody && restoreMayFire

  const { held: holdReaderBody } = useRestoreReadPosition({
    ready: decideRestoreReady({
      pagePresent: page != null,
      isLoading,
      localLoaded: localPosition.loaded,
      bodyPresent: body.trim() !== "",
    }),
    fraction: resumeFraction,
    resetKey: id,
    suppressRef: restoringRef,
    resolveScrollTop,
    holdEligible: holdEligibleForRestore,
  })

  return (
    <DisplayFrame
      config={frameConfig}
      header={
        page
          ? {
              title: expandDateMentions(title),
              titleHref: storyHref ?? null,
              showBack: true,
              menu: (
                <ReaderHeaderMenu
                  pageTypeSlug={pageTypeSlug}
                  pageId={id}
                  isFavorite={data.favoritedAt != null}
                />
              ),
            }
          : null
      }
    >
      <PageLayout loading={isLoading} skeleton={simplePageSkeleton({ titleWidth: 240 })}>
        {data.title != null && <title>{expandDateMentions(title)}</title>}
        {page ? (
          <>
            {detailConfig?.showReadingProgress === true && <ReadingProgressBar />}
            <PageLayout.Content className="max-w-[68ch]!">
              <SentenceNarrationProvider value={narrationValue}>
                <div ref={proseContainerRef} className="flex flex-col gap-8 py-6">
                  {mediaConfig?.audio != null && audioVariants != null && (
                    <ReaderAudioBlock
                      pageId={id}
                      pageTypeSlug={pageTypeSlug}
                      title={title}
                      variants={audioVariants}
                      nextHref={audioNextHref ?? null}
                      defaultVariant={audioDefaultVariant ?? null}
                      resumeFraction={localPosition.loaded ? resumeFraction : undefined}
                      length={wordCount}
                      currentProgress={currentProgress}
                      progressPropertyId={progressPropertyId}
                      text={body}
                      audioActions={audioActions}
                    />
                  )}
                  {(readerPrev != null || readerNext != null) && (
                    <ReaderPager
                      prev={readerPrev ?? null}
                      next={readerNext ?? null}
                      position="top"
                    />
                  )}
                  {body.trim() === "" ? (
                    <p className="text-secondary italic">This page has no text yet.</p>
                  ) : isVirtualizedBody ? (
                    <ReaderProseBody
                      content={body}
                      className={cn(
                        READER_PROSE_TYPOGRAPHY,
                        "text-primary",
                        holdReaderBody && "invisible"
                      )}
                      anchorRef={anchorRef}
                      sentenceBlocks={sentenceLayout?.blocks}
                    />
                  ) : (
                    <ReaderProseStatic
                      content={body}
                      className={`${READER_PROSE_TYPOGRAPHY} text-primary`}
                      anchorRef={anchorRef}
                      sentenceBlocks={sentenceLayout?.blocks}
                    />
                  )}
                  {(readerPrev != null || readerNext != null) && (
                    <ReaderPager
                      prev={readerPrev ?? null}
                      next={readerNext ?? null}
                      position="bottom"
                    />
                  )}
                </div>
              </SentenceNarrationProvider>
            </PageLayout.Content>
          </>
        ) : (
          <PageLayout.Content>
            <Empty>
              <EmptyHeader>
                <EmptyTitle>Page not found</EmptyTitle>
                <EmptyDescription>
                  This page doesn't exist or may have been deleted.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </PageLayout.Content>
        )}
      </PageLayout>
    </DisplayFrame>
  )
}
