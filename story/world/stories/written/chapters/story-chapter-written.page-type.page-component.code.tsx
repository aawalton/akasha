"use client"

import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { PageReaderContent } from "akasha/page/ui/component/modules/page-reader-content/page-reader-content.module.code.tsx"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  BeatProse,
  useBeatReading,
} from "akasha/story/ui/modules/beat-reading/beat-reading.module.code.tsx"
import { ChapterProse } from "akasha/story/ui/modules/chapter-prose/chapter-prose.module.code.tsx"
import type { InlineCover } from "akasha/story/ui/modules/inline-cover/inline-cover.module.code.tsx"
import { storyAsker } from "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"
import { proseSegmentsOf } from "akasha/story/ui/modules/session-envelope/session-envelope.module.code.ts"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import { ChapterPanels } from "akasha/story/world/stories/written/chapters/modules/chapter-panels/chapter-panels.module.code.tsx"

const ONE = 1

const submitsNothing: SubmitPlayerAction = async () => ({
  ok: false,
  error: "A chapter is read, not played.",
})

function textIn(value: unknown): string | undefined {
  return stringIn(value) ?? undefined
}

function writtenCoversOf(
  id: string,
  beats: Beats,
  data: Readonly<Record<string, unknown>>
): readonly InlineCover[] {
  const listed: { readonly cover: string; readonly after?: string | undefined }[] = (
    beats.pictured ?? []
  ).map((one) => ({ cover: one.cover, after: one.coverAfter }))
  if (listed.length === 0 && Array.isArray(data.scenes)) {
    for (const one of data.scenes) {
      const cover = textIn(one)
      if (cover !== undefined) listed.push({ cover })
    }
  }
  return listed.map((one, at) => ({ id: `${id}#${at + ONE}`, number: at + ONE, ...one }))
}

function WrittenProse({
  id,
  body,
  data,
}: {
  id: string
  body: string
  data: Readonly<Record<string, unknown>>
}) {
  const { beats, ready } = useBeatReading()
  if (!ready) return null
  if (beats.prose !== undefined && beats.beats.length > 0) {
    return (
      <BeatProse
        beats={beats}
        muted={false}
        asker={storyAsker(data.story)}
        submitPlayerAction={submitsNothing}
        signedOutNotice={null}
      />
    )
  }
  return (
    <ChapterProse
      text={body}
      segments={proseSegmentsOf(body)}
      covers={writtenCoversOf(id, beats, data)}
      asker={storyAsker(data.story)}
      muted={false}
      submitPlayerAction={submitsNothing}
      signedOutNotice={null}
    />
  )
}

function proseFor(id: string) {
  return function drawProse(body: string, data: Readonly<Record<string, unknown>>) {
    return <WrittenProse id={id} body={body} data={data} />
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
      around={(column) => (
        <ChapterPanels pageTypeSlug={pageTypeSlug} id={id}>
          {column}
        </ChapterPanels>
      )}
    />
  )
}
