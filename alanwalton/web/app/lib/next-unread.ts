import { buildPageHref } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { loadStoryCatalog } from "@collections/litrpg/nova/catalog"
import { selectNextChapter } from "@collections/litrpg/nova/select-internals"

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
