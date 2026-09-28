"use client"

import { PageCollectionContent } from "akasha/page/ui/component/modules/page-collection-content/page-collection-content.module.code.tsx"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import { StoryChapters } from "akasha/story/ui/modules/story-chapters/story-chapters.module.code.tsx"
import { ChapterWriteButton } from "akasha/story/world/stories/written/modules/chapter-writing/chapter-writing.module.code.tsx"

export function Drawing({ pageTypeSlug, id, nextUnreadHref }: PageDrawingProps) {
  const { page } = usePage({ pageTypeSlug, id })
  const slug = toPageDataJSON(page?.properties).slug
  return (
    <PageCollectionContent pageTypeSlug={pageTypeSlug} id={id} nextUnreadHref={nextUnreadHref}>
      {typeof slug === "string" && slug !== "" ? <ChapterWriteButton story={slug} /> : null}
      <StoryChapters pageTypeSlug={pageTypeSlug} id={id} />
    </PageCollectionContent>
  )
}
