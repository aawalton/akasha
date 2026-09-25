import { selectNextChapter } from "akasha/alan/collection/reading/modules/chapter-choosing/chapter-choosing.module.code.ts"
import { loadStoryCatalog } from "akasha/alan/collection/reading/modules/story-catalog/story-catalog.module.code.ts"
import { buildPageHref } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

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
