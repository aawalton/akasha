"use client"

import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import {
  PageReaderContent,
  useFileBody,
} from "akasha/page/ui/component/modules/page-reader-content/page-reader-content.module.code.tsx"
import { beatsIn } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { ChapterProse } from "akasha/story/ui/modules/chapter-prose/chapter-prose.module.code.tsx"
import type { InlineCover } from "akasha/story/ui/modules/inline-cover/inline-cover.module.code.tsx"
import { proseSegmentsOf } from "akasha/story/ui/modules/session-envelope/session-envelope.module.code.ts"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import { ChapterPanels } from "akasha/story/world/stories/written/chapters/modules/chapter-panels/chapter-panels.module.code.tsx"

const ONE = 1

const FILE_AT = "/api/page-file"

const BEATS = "beats"

const submitsNothing: SubmitPlayerAction = async () => ({
  ok: false,
  error: "A chapter is read, not played.",
})

function textIn(value: unknown): string | undefined {
  return stringIn(value) ?? undefined
}

function writtenCoversOf(
  id: string,
  beatsText: string,
  data: Readonly<Record<string, unknown>>
): readonly InlineCover[] {
  const read = beatsIn(beatsText)
  const pictured = "refused" in read ? [] : (read.pictured ?? [])
  const listed: { readonly cover: string; readonly after?: string | undefined }[] = pictured.map(
    (one) => ({ cover: one.cover, after: one.coverAfter })
  )
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
  pageTypeSlug,
  body,
  data,
}: {
  id: string
  pageTypeSlug: string
  body: string
  data: Readonly<Record<string, unknown>>
}) {
  const slug = textIn(data.slug)
  const href =
    slug === undefined
      ? null
      : `${FILE_AT}/${[pageTypeSlug, slug, BEATS].map(encodeURIComponent).join("/")}`
  const beatsText = useFileBody(href)
  if (href !== null && beatsText === null) return null
  return (
    <ChapterProse
      text={body}
      segments={proseSegmentsOf(body)}
      covers={writtenCoversOf(id, beatsText ?? "", data)}
      muted={false}
      submitPlayerAction={submitsNothing}
      signedOutNotice={null}
    />
  )
}

function proseFor(id: string, pageTypeSlug: string) {
  return function drawProse(body: string, data: Readonly<Record<string, unknown>>) {
    return <WrittenProse id={id} pageTypeSlug={pageTypeSlug} body={body} data={data} />
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
      drawProse={proseFor(id, pageTypeSlug)}
      around={(column) => (
        <ChapterPanels pageTypeSlug={pageTypeSlug} id={id}>
          {column}
        </ChapterPanels>
      )}
    />
  )
}
