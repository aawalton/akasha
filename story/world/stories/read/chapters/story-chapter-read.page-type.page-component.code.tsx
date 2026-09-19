"use client"

import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { PageReaderContent } from "akasha/page/ui/component/modules/page-reader-content/page-reader-content.module.code.tsx"

export function Drawing({
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
}: PageDrawingProps) {
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
}
