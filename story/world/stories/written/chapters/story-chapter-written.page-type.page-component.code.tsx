"use client"

import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { PageReaderContent } from "akasha/page/ui/component/modules/page-reader-content/page-reader-content.module.code.tsx"
import { ChapterProse } from "akasha/story/ui/modules/chapter-prose/chapter-prose.module.code.tsx"
import type { InlineCover } from "akasha/story/ui/modules/inline-cover/inline-cover.module.code.tsx"
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
  data: Readonly<Record<string, unknown>>
): readonly InlineCover[] {
  const pictured = Array.isArray(data.pictured) ? data.pictured : []
  const listed: { readonly cover: string; readonly after?: string | undefined }[] = []
  for (const one of pictured) {
    if (typeof one !== "object" || one === null) continue
    const entry = one as Readonly<Record<string, unknown>>
    const cover = textIn(entry.cover)
    if (cover !== undefined) listed.push({ cover, after: textIn(entry.coverAfter) })
  }
  if (listed.length === 0 && Array.isArray(data.scenes)) {
    for (const one of data.scenes) {
      const cover = textIn(one)
      if (cover !== undefined) listed.push({ cover })
    }
  }
  return listed.map((one, at) => ({ id: `${id}#${at + ONE}`, number: at + ONE, ...one }))
}

function proseFor(id: string) {
  return function drawProse(body: string, data: Readonly<Record<string, unknown>>) {
    return (
      <ChapterProse
        text={body}
        covers={writtenCoversOf(id, data)}
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
      around={(column) => (
        <ChapterPanels pageTypeSlug={pageTypeSlug} id={id}>
          {column}
        </ChapterPanels>
      )}
    />
  )
}
