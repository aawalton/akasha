"use client"

import { PageLayout } from "@akasha/design-layout/page-layout"
import { simplePageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { resolveDisplayKind } from "@akasha/pages-core/schema/detail-config"
import { parsePageTypeData } from "@akasha/pages-core/schema/pages"
import type { MediaVariant } from "@akasha/pages-ui/media/page-media-player"
import { useAllPages } from "@akasha/pages-ui/supabase/hooks"
import { usePage } from "@akasha/pages-ui/supabase/use-page"
import { useRecordPageView } from "@akasha/pages-ui/supabase/use-record-page-view"
import {
  PAGE_TYPE_SLUG,
  selectDetailBody,
} from "@akasha/pages-ui-components/page-detail-content-helpers"
import type { ReaderNeighborLink } from "@akasha/pages-ui-components/reader-chrome"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { SentenceMark } from "@akasha/voice-core/voice/mark-schema"
import type { ReactNode } from "react"
import { PageCollectionContent } from "../page-collection-content/page-collection-content.module.code.tsx"
import { PageDefaultContent } from "../page-default-content/page-default-content.module.code.tsx"
import { PageReaderContent } from "../page-reader-content/page-reader-content.module.code.tsx"

interface PageDetailContentProps {
  pageTypeSlug: PageTypeSlug
  id: string
  audioVariants?: readonly MediaVariant[]
  audioNextHref?: string | null
  audioDefaultVariant?: string | null
  readerPrev?: ReaderNeighborLink | null
  readerNext?: ReaderNeighborLink | null
  storyHref?: string | null
  audioActions?: ReactNode
  nextUnreadHref?: string | null
  onReadToEnd?: () => void
  sentenceMarks?: readonly SentenceMark[]
  onPlayFromSentence?: (sentenceIndex: number) => void
}

export function PageDetailContent({
  pageTypeSlug,
  id,
  audioVariants,
  audioNextHref,
  audioDefaultVariant,
  readerPrev,
  readerNext,
  storyHref,
  audioActions,
  nextUnreadHref,
  onReadToEnd,
  sentenceMarks,
  onPlayFromSentence,
}: PageDetailContentProps) {
  const { page, isLoading: pageIsLoading } = usePage({ pageTypeSlug, id })
  useRecordPageView({
    pageTypeSlug,
    id,
    lastViewedAt: page?.properties?.lastViewedAt,
    enabled: page != null,
  })
  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  const pageType = pageTypes.find((pt) => pt.properties?.slug === pageTypeSlug)
  const body = selectDetailBody({
    hasPage: page != null,
    pageIsLoading,
    hasPageType: pageType != null,
    displayKind: resolveDisplayKind(parsePageTypeData(pageType?.properties).detailConfig),
  })
  switch (body) {
    case "skeleton":
      return (
        <PageLayout loading skeleton={simplePageSkeleton({ titleWidth: 160 })}>
          {null}
        </PageLayout>
      )
    case "reader":
      return (
        <PageReaderContent
          pageTypeSlug={pageTypeSlug}
          id={id}
          audioVariants={audioVariants}
          audioNextHref={audioNextHref}
          audioDefaultVariant={audioDefaultVariant}
          readerPrev={readerPrev}
          readerNext={readerNext}
          storyHref={storyHref}
          audioActions={audioActions}
          onReadToEnd={onReadToEnd}
          sentenceMarks={sentenceMarks}
          onPlayFromSentence={onPlayFromSentence}
        />
      )
    case "collection":
      return (
        <PageCollectionContent
          pageTypeSlug={pageTypeSlug}
          id={id}
          nextUnreadHref={nextUnreadHref}
        />
      )
    case "default":
      return <PageDefaultContent pageTypeSlug={pageTypeSlug} id={id} />
    default:
      return assertNever(body)
  }
}
