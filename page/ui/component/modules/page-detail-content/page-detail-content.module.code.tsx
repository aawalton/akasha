"use client"

import type { SentenceMark } from "akasha/alan/harness/voice-core/modules/mark-schema/mark-schema.module.code.ts"
import { PageLayout } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { pageTypeChain } from "akasha/page/core/schema/modules/page-type-inheritance/page-type-inheritance.module.code.ts"
import { useAppEditing } from "akasha/page/ui/component/modules/app-editing/app-editing.module.code.tsx"
import { PAGE_TYPE_SLUG } from "akasha/page/ui/component/modules/page-detail-content-helpers/page-detail-content-helpers.module.code.ts"
import { drawingAlong } from "akasha/page/ui/component/modules/page-drawings/page-drawings.module.code.ts"
import type { ReaderNeighborLink } from "akasha/page/ui/component/modules/reader-chrome/reader-chrome.module.code.tsx"
import type { MediaVariant } from "akasha/page/ui/media/modules/page-media-player/page-media-player.module.code.tsx"
import { useAllPages } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import { useRecordPageView } from "akasha/page/ui/supabase/modules/use-record-page-view/use-record-page-view.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import type { ReactNode } from "react"

export interface PageDrawingProps {
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
  drawnPlainly?: boolean
}

const FALLS_BACK_TO = "page"

export function PageDetailContent(props: PageDrawingProps) {
  const { pageTypeSlug, id } = props
  const { page, isLoading: pageIsLoading } = usePage({ pageTypeSlug, id })
  const editing = useAppEditing()
  useRecordPageView({
    pageTypeSlug,
    id,
    lastViewedAt: page?.properties?.lastViewedAt,
    enabled: editing && page != null,
  })
  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  const known = pageTypes.some((pt) => pt.properties?.slug === pageTypeSlug)
  if (!known) {
    const pageNotFound = page == null && !pageIsLoading
    if (!pageNotFound) {
      return (
        <PageLayout loading skeleton={simplePageSkeleton({ titleWidth: 160 })}>
          {null}
        </PageLayout>
      )
    }
  }
  const chain =
    known && props.drawnPlainly !== true ? pageTypeChain(pageTypes, pageTypeSlug) : [FALLS_BACK_TO]
  const Drawing = drawingAlong(chain) ?? drawingAlong([FALLS_BACK_TO])
  return Drawing === undefined ? null : <Drawing {...props} />
}
