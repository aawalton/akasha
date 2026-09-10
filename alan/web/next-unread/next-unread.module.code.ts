import { selectNextChapter } from "akasha/alan/library/reading/chapter-choosing/chapter-choosing.module.code.ts"
import { loadStoryCatalog } from "akasha/alan/library/reading/story-catalog/story-catalog.module.code.ts"
import { buildPageHref } from "akasha/pages/url/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"

export async function resolveNextUnreadHref(args: { storyId: string }): Promise<string | null> {
  const { storyId } = args
  const chapter = selectNextChapter(await loadStoryCatalog(storyId), storyId)
  if (chapter === null || chapter.pageTypeSlug === undefined) return null
  return buildPageHref({
    pageTypeSlug: toPageTypeSlug(chapter.pageTypeSlug),
    slug: null,
    fallbackSlugSource: chapter.title,
    id: chapter.id,
  })
}
