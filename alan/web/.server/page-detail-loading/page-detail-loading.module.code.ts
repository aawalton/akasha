import { answerPageTypes } from "akasha/alan/web/.server/alan-answer-page-types/alan-answer-page-types.module.code.ts"
import { answerPages } from "akasha/alan/web/.server/alan-answer-pages/alan-answer-pages.module.code.ts"
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
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { ReaderNeighborLink } from "akasha/page/ui/component/modules/reader-chrome/reader-chrome.module.code.tsx"
import { filePagesPath } from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"
import { FILE_BACKED_ROSTER_PATH } from "akasha/page/ui-store/collection/modules/file-backing/file-backing.module.code.ts"
import {
  buildPageHref,
  parsePageHrefParam,
} from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { playedListsOf } from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { data, type LoaderFunctionArgs } from "react-router"

const NAV_SLUG = "nav"
const READING_STORY_SLUG = "reading-story"
const PAGE_TYPE_SLUG = "page-type"

export type Seeds = Readonly<Record<string, unknown>>

const NO_SEEDS: Seeds = {}

type Asked = { readonly path: string; readonly pageTypeSlug: string | null }

type Answered = readonly [string, unknown]

function askedFor(pageTypeSlug: string, id: string, slug: string | null): readonly Asked[] {
  if (pageTypeSlug !== storyPlayed.slug || slug === null) return []
  const lists = playedListsOf(namedAs(pageTypeSlug, slug, null))
  return [
    { path: FILE_BACKED_ROSTER_PATH, pageTypeSlug: null },
    { path: filePagesPath(pageTypeSlug, [], { by: "id", values: [id] }), pageTypeSlug },
    {
      path: filePagesPath(PAGE_TYPE_SLUG, [], { by: "slug", values: [pageTypeSlug] }),
      pageTypeSlug: PAGE_TYPE_SLUG,
    },
    ...[lists.chapters, lists.turns, lists.character].map((list) => ({
      path: filePagesPath(list.pageTypeSlug, [], list.named),
      pageTypeSlug: list.pageTypeSlug,
    })),
  ]
}

async function answerOf(request: Request, asked: Asked): Promise<Answered | null> {
  const one = new Request(new URL(asked.path, request.url).href, {
    headers: new Headers(request.headers),
  })
  try {
    const answered =
      asked.pageTypeSlug === null
        ? await answerPageTypes(one)
        : await answerPages(one, asked.pageTypeSlug)
    if (!answered.ok) return null
    return [asked.path, await answered.json()]
  } catch (err) {
    console.warn(`page-detail loader: ${asked.path} went unanswered, so the browser reads it`, err)
    return null
  }
}

async function seedsFor(
  request: Request,
  pageTypeSlug: string,
  id: string,
  slug: string | null
): Promise<Seeds> {
  const asked = askedFor(pageTypeSlug, id, slug)
  if (asked.length === 0) return NO_SEEDS
  const answered = await Promise.all(asked.map((one) => answerOf(request, one)))
  return Object.fromEntries(answered.filter((one): one is Answered => one !== null))
}

function nameOf(row: Readonly<Record<string, unknown>> | null | undefined): string | null {
  const title = row?.title
  if (typeof title === "string" && title !== "") return title
  return typeof row?.slug === "string" ? row.slug : null
}

export async function loader({ params, request }: LoaderFunctionArgs) {
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
      select: ["id", "title", "slug", "icon"],
    })
    return data({
      kind: "nav" as const,
      pageTypeSlug,
      pageHrefParam,
      faviconIdSuffix: parsed.idSuffix,
      faviconIcon: navPage && typeof navPage.icon === "string" ? navPage.icon : "",
      title: nameOf(navPage),
    })
  }

  const exact = await getPageByIdSuffix({
    pageTypeSlug: brandedSlug,
    idSuffix: parsed.idSuffix,
    slug: parsed.slug ?? undefined,
    select: ["id", "title", "slug"],
  })

  let resolvedSlug = pageTypeSlug
  let id: string | null = exact && typeof exact.id === "string" ? exact.id : null
  let title: string | null = nameOf(exact)

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
        title = nameOf(resolved)
      }
    }
  }

  if (id == null) {
    throw new Response("Not Found", { status: 404 })
  }

  const pageSlug = exact && typeof exact.slug === "string" ? exact.slug : null
  const seeding = seedsFor(request, resolvedSlug, id, pageSlug)

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
    faviconIcon: "",
    title,
    readerPrev,
    readerNext,
    storyHref,
    chapterTitle,
    chapterNumber,
    storyTitle,
    nextUnreadHref,
    followsType: sequenceConfig != null || resolvedSlug === READING_STORY_SLUG,
    seeds: await seeding,
  })
}
