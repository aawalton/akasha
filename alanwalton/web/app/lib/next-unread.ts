import { loadStoryCatalog } from "@collections/litrpg/nova/catalog"
import { selectNextChapter } from "@collections/litrpg/nova/select-internals"
import { buildPageHref, PageTypeSlug } from "@shared/pages-url"

export async function resolveNextUnreadHref(args: { storyId: string }): Promise<string | null> {
  const { storyId } = args
  const chapter = selectNextChapter(await loadStoryCatalog(storyId), storyId)
  if (chapter === null || chapter.pageTypeSlug === undefined) return null
  return buildPageHref({
    pageTypeSlug: PageTypeSlug(chapter.pageTypeSlug),
    slug: null,
    fallbackSlugSource: chapter.title,
    id: chapter.id,
  })
}
