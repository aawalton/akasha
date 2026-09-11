"use client"

import type { SentenceMark } from "akasha/alan/harness/voice-core/mark-schema/mark-schema.module.code.ts"
import { PageLayout } from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interfaces/layout/skeleton-presets/skeleton-presets.module.code.ts"
import { resolveDisplayKind } from "akasha/pages/core/schema/detail-config/detail-config.module.code.ts"
import { parsePageTypeData } from "akasha/pages/core/schema/pages/pages.module.code.ts"
import { PageCollectionContent } from "akasha/pages/ui/components/page-collection-content/page-collection-content.module.code.tsx"
import { PageDefaultContent } from "akasha/pages/ui/components/page-default-content/page-default-content.module.code.tsx"
import {
  PAGE_TYPE_SLUG,
  selectDetailBody,
} from "akasha/pages/ui/components/page-detail-content-helpers/page-detail-content-helpers.module.code.ts"
import { PageReaderContent } from "akasha/pages/ui/components/page-reader-content/page-reader-content.module.code.tsx"
import type { ReaderNeighborLink } from "akasha/pages/ui/components/reader-chrome/reader-chrome.module.code.tsx"
import type { MediaVariant } from "akasha/pages/ui/media/page-media-player/page-media-player.module.code.tsx"
import { useAllPages } from "akasha/pages/ui/supabase/hooks/hooks.module.code.ts"
import { usePage } from "akasha/pages/ui/supabase/use-page/use-page.module.code.ts"
import { useRecordPageView } from "akasha/pages/ui/supabase/use-record-page-view/use-record-page-view.module.code.ts"
import type { PageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"
import { assertNever } from "akasha/utils/narrow/assert-never/assert-never.module.code.ts"
import type { ReactNode } from "react"

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
