"use client"

import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { PageReaderContent } from "akasha/page/ui/component/modules/page-reader-content/page-reader-content.module.code.tsx"

export function Drawing({
  pageTypeSlug,
  id,
  readerPrev,
  readerNext,
  storyHref,
  onReadToEnd,
}: PageDrawingProps) {
  return (
    <PageReaderContent
      pageTypeSlug={pageTypeSlug}
      id={id}
      readerPrev={readerPrev}
      readerNext={readerNext}
      storyHref={storyHref}
      onReadToEnd={onReadToEnd}
    />
  )
}
