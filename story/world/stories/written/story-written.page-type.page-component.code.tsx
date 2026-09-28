"use client"

import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { PageLayout } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { PageCollectionContent } from "akasha/page/ui/component/modules/page-collection-content/page-collection-content.module.code.tsx"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { StoryChapters } from "akasha/story/ui/modules/story-chapters/story-chapters.module.code.tsx"
import { StoryPanels } from "akasha/story/world/stories/written/chapters/modules/chapter-panels/chapter-panels.module.code.tsx"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"
import { ChapterWriteButton } from "akasha/story/world/stories/written/modules/chapter-writing/chapter-writing.module.code.tsx"

export function Drawing({ pageTypeSlug, id, nextUnreadHref }: PageDrawingProps) {
  const { page } = usePage({ pageTypeSlug, id })
  const data = toPageDataJSON(page?.properties)
  const slug = data.slug
  return (
    <PageCollectionContent pageTypeSlug={pageTypeSlug} id={id} nextUnreadHref={nextUnreadHref}>
      {typeof slug === "string" && slug !== "" ? (
        <PageLayout.Header className="flex pt-4">
          <ChapterWriteButton story={slug} />
        </PageLayout.Header>
      ) : null}
      {typeof slug === "string" && slug !== "" && stringsIn(data.panels).length > 0 ? (
        <StoryPanels
          chapterPageTypeSlug={toPageTypeSlug(storyChapterWritten.slug)}
          storyPageTypeSlug={pageTypeSlug}
          storySlug={slug}
        >
          <StoryChapters pageTypeSlug={pageTypeSlug} id={id} />
        </StoryPanels>
      ) : (
        <StoryChapters pageTypeSlug={pageTypeSlug} id={id} />
      )}
    </PageCollectionContent>
  )
}
