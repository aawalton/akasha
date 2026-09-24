"use client"

import { PageLayout } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { bodyPropertyIsContentTier } from "akasha/page/core/schema/modules/content-tier/content-tier.module.code.ts"
import { expandDateMentions } from "akasha/page/core/view/modules/expand-date-mentions/expand-date-mentions.module.code.ts"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import {
  decideReadRestore,
  decideRestoreReady,
  fractionToScrollTop,
  resolveResumeFraction,
} from "akasha/page/ui/component/modules/position-fraction/position-fraction.module.code.ts"
import {
  type ReaderNeighborLink,
  ReaderPager,
  ReadingProgressBar,
} from "akasha/page/ui/component/modules/reader-chrome/reader-chrome.module.code.tsx"
import { useReaderPageSource } from "akasha/page/ui/component/modules/reader-page-source/reader-page-source.module.code.tsx"
import {
  ReaderProseBody,
  ReaderProseStatic,
} from "akasha/page/ui/component/modules/reader-prose-body/reader-prose-body.module.code.tsx"
import { READER_PROSE_TYPOGRAPHY } from "akasha/page/ui/component/modules/reader-typography/reader-typography.module.code.ts"
import { useReadEndOnScroll } from "akasha/page/ui/component/modules/use-read-end-on-scroll/use-read-end-on-scroll.module.code.ts"
import { useReaderProgressWriter } from "akasha/page/ui/component/modules/use-reader-progress-writer/use-reader-progress-writer.module.code.ts"
import { useRestoreReadPosition } from "akasha/page/ui/component/modules/use-restore-read-position/use-restore-read-position.module.code.ts"
import { DisplayFrame } from "akasha/page/ui/frame/modules/display-frame/display-frame.module.code.tsx"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { type ReactNode, useCallback } from "react"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const READER_VIRTUALIZE_THRESHOLD = 24_000

function toFiniteNumber(value: unknown): number | undefined {
  if (value == null) return undefined
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

interface PageReaderContentProps {
  pageTypeSlug: PageTypeSlug
  id: string
  readerPrev?: ReaderNeighborLink | null
  readerNext?: ReaderNeighborLink | null
  storyHref?: string | null
  onReadToEnd?: () => void
  drawProse?: (body: string) => ReactNode
}

export function PageReaderContent({
  pageTypeSlug,
  id,
  readerPrev,
  readerNext,
  storyHref,
  onReadToEnd,
  drawProse,
}: PageReaderContentProps) {
  const source = useReaderPageSource()
  const { pageTypeData } = source.useReaderPageType(pageTypeSlug)
  const detailConfig = pageTypeData.detailConfig

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

  const isVirtualizedBody = drawProse === undefined && body.length > READER_VIRTUALIZE_THRESHOLD

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
              <div className="flex flex-col gap-8 py-6">
                {(readerPrev != null || readerNext != null) && (
                  <ReaderPager prev={readerPrev ?? null} next={readerNext ?? null} position="top" />
                )}
                {body.trim() === "" ? (
                  <p className="text-secondary italic">This page has no text yet.</p>
                ) : drawProse !== undefined ? (
                  drawProse(body)
                ) : isVirtualizedBody ? (
                  <ReaderProseBody
                    content={body}
                    className={cn(
                      READER_PROSE_TYPOGRAPHY,
                      "text-primary",
                      holdReaderBody && "invisible"
                    )}
                    anchorRef={anchorRef}
                  />
                ) : (
                  <ReaderProseStatic
                    content={body}
                    className={`${READER_PROSE_TYPOGRAPHY} text-primary`}
                    anchorRef={anchorRef}
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
