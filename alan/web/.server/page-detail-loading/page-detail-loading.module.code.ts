import { resolveReaderNeighbors } from "akasha/alan/web/modules/alan-reader-neighbors/alan-reader-neighbors.module.code.ts"
import { resolveNextUnreadHref } from "akasha/alan/web/modules/next-unread/next-unread.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import {
  getPage,
  getPageByIdSuffix,
  getPageByIdSuffixAcrossTypes,
  getPages,
} from "akasha/page/access/modules/get/get.module.code.ts"
import { getDescendantPageTypeSlugs } from "akasha/page/access/modules/page-type/page-type.module.code.ts"
import { getSequenceConfig } from "akasha/page/access/modules/page-type-config/page-type-config.module.code.ts"
import type { ReaderNeighborLink } from "akasha/page/ui/component/modules/reader-chrome/reader-chrome.module.code.tsx"
import {
  buildPageHref,
  parsePageHrefParam,
} from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { data, type LoaderFunctionArgs } from "react-router"

const NAV_SLUG = "nav"
const READING_STORY_SLUG = "reading-story"

export async function loader({ params }: LoaderFunctionArgs) {
  const { pageTypeSlug, pageHrefParam } = params
  if (pageTypeSlug === undefined || pageHrefParam === undefined) {
    throw new Response("Not Found", { status: 404 })
  }

  const parsed = parsePageHrefParam(pageHrefParam)
  if (!parsed) {
    throw new Response("Not Found", { status: 404 })
  }

  const brandedSlug = toPageTypeSlug(pageTypeSlug)

  if (pageTypeSlug === NAV_SLUG) {
    const navPage = await getPageByIdSuffix({
      pageTypeSlug: brandedSlug,
      idSuffix: parsed.idSuffix,
      slug: parsed.slug ?? undefined,
      select: ["id", "title"],
    })
    return data({
      kind: "nav" as const,
      pageTypeSlug,
      pageHrefParam,
      faviconIdSuffix: parsed.idSuffix,
      title: navPage && typeof navPage.title === "string" ? navPage.title : null,
    })
  }

  const exact = await getPageByIdSuffix({
    pageTypeSlug: brandedSlug,
    idSuffix: parsed.idSuffix,
    slug: parsed.slug ?? undefined,
    select: ["id", "title"],
  })

  let resolvedSlug = pageTypeSlug
  let id: string | null = exact && typeof exact.id === "string" ? exact.id : null
  let title: string | null = exact && typeof exact.title === "string" ? exact.title : null

  if (id == null) {
    const subtree = await getDescendantPageTypeSlugs(brandedSlug)
    if (subtree.length > 1) {
      const resolved = await getPageByIdSuffixAcrossTypes({
        pageTypeSlugs: subtree,
        idSuffix: parsed.idSuffix,
        slug: parsed.slug ?? undefined,
      })
      if (resolved && typeof resolved.id === "string") {
        id = resolved.id
        if (typeof resolved.pageTypeSlug === "string") resolvedSlug = resolved.pageTypeSlug
        if (typeof resolved.title === "string") title = resolved.title
      }
    }
  }

  if (id == null) {
    throw new Response("Not Found", { status: 404 })
  }

  let readerPrev: ReaderNeighborLink | null = null
  let readerNext: ReaderNeighborLink | null = null
  let chapterTitle: string | null = null
  let chapterNumber: number | null = null
  const storyTitle: string | null = null
  let storyHref: string | null = null
  let nextUnreadHref: string | null = null
  if (resolvedSlug === READING_STORY_SLUG) {
    nextUnreadHref = await resolveNextUnreadHref({ storyId: id })
  }

  const resolvedBrandedSlug = toPageTypeSlug(resolvedSlug)
  const sequenceConfig = await getSequenceConfig({ pageTypeSlug: resolvedBrandedSlug })
  if (sequenceConfig != null) {
    const fullPage = (
      await getPages({
        pageTypeSlug: resolvedSlug,
        where: [{ key: "id", eq: id }],
        limit: 1,
      })
    ).rows[0]
    if (fullPage) {
      chapterTitle = typeof fullPage.title === "string" ? fullPage.title : null
      chapterNumber = typeof fullPage.chapterNumber === "number" ? fullPage.chapterNumber : null
      const storyRef = fullPage.story
      const parentStoryId =
        typeof storyRef === "string"
          ? storyRef
          : isRecord(storyRef) && typeof storyRef.id === "string"
            ? storyRef.id
            : null
      if (parentStoryId != null) {
        try {
          const story = await getPage({
            pageTypeSlug: READING_STORY_SLUG,
            where: [{ key: "id", eq: parentStoryId }],
            select: ["id", "slug", "title"],
          })
          if (story != null && typeof story.id === "string") {
            storyHref = buildPageHref({
              pageTypeSlug: toPageTypeSlug("reading-story"),
              slug: typeof story.slug === "string" ? story.slug : null,
              fallbackSlugSource: typeof story.title === "string" ? story.title : null,
              id: story.id,
            })
          }
        } catch (err) {
          console.error(
            `page-detail loader: story href resolution failed for ${resolvedSlug}/${id}; serving without a linked title`,
            err
          )
          storyHref = null
        }
      }
      if (sequenceConfig != null) {
        try {
          const neighbors = await resolveReaderNeighbors({
            page: fullPage,
            pageTypeSlug: resolvedBrandedSlug,
          })
          readerPrev = neighbors.prev
          readerNext = neighbors.next
        } catch (err) {
          console.error(
            `page-detail loader: reader neighbor resolution failed for ${resolvedSlug}/${id}; serving without pager`,
            err
          )
        }
      }
    }
  }

  return data({
    kind: "detail" as const,
    pageTypeSlug: resolvedSlug,
    id,
    faviconIdSuffix: null,
    title,
    readerPrev,
    readerNext,
    storyHref,
    chapterTitle,
    chapterNumber,
    storyTitle,
    nextUnreadHref,
  })
}
