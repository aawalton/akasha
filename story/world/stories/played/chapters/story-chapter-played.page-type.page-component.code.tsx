"use client"

import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { PageReaderContent } from "akasha/page/ui/component/modules/page-reader-content/page-reader-content.module.code.tsx"
import { ChapterProse } from "akasha/story/ui/modules/chapter-prose/chapter-prose.module.code.tsx"
import { storyAsker } from "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"
import { proseSegmentsOf } from "akasha/story/ui/modules/session-envelope/session-envelope.module.code.ts"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import { playedCoversOf } from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"

const submitsNothing: SubmitPlayerAction = async () => ({
  ok: false,
  error: "A chapter is read, not played.",
})

function proseFor(id: string) {
  return function drawProse(body: string, data: Readonly<Record<string, unknown>>) {
    return (
      <ChapterProse
        text={body}
        segments={proseSegmentsOf(body)}
        covers={playedCoversOf([asPage({ ...data, id })], [])}
        asker={storyAsker(data.story)}
        muted={false}
        submitPlayerAction={submitsNothing}
        signedOutNotice={null}
      />
    )
  }
}

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
      drawProse={proseFor(id)}
    />
  )
}
