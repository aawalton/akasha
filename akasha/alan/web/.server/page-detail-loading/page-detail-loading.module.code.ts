import {
  getPage,
  getPageByIdSuffix,
  getPageByIdSuffixAcrossTypes,
  getPages,
} from "@akasha/pages-access/get"
import { getDescendantPageTypeSlugs } from "@akasha/pages-access/page-type"
import { getMediaConfig, getSequenceConfig } from "@akasha/pages-access/page-type-config"
import type { MediaVariant } from "@akasha/pages-ui/media/page-media-player"
import type { ReaderNeighborLink } from "@akasha/pages-ui-components/reader-chrome"
import { buildPageHref, parsePageHrefParam } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import {
  getRequestServerClient,
  resolveRequestSession,
} from "@akasha/supabase-rr/request-session-cache"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { type SentenceMark, sentenceMarkSchema } from "@akasha/voice-core/voice/mark-schema"
import { data, type LoaderFunctionArgs } from "react-router"
import { z } from "zod"
import { resolveReaderNeighbors } from "../../alan-reader-neighbors/alan-reader-neighbors.module.code.ts"
import { resolveMediaVariants } from "../../media-variants/media-variants.module.code.ts"
import { resolveNextUnreadHref } from "../../next-unread/next-unread.module.code.ts"
import { selectPageDisplayKind } from "../../page-display-kind/page-display-kind.module.code.ts"

const NAV_SLUG = "nav"
const chessGamePgnSchema = z.string().catch("")
const audioSentenceMarksSchema = z.array(sentenceMarkSchema)
const READING_STORY_SLUG = "reading-story"

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
  const { headers } = getRequestServerClient(request)
  await resolveRequestSession(request)

  if (pageTypeSlug === NAV_SLUG) {
    const navPage = await getPageByIdSuffix({
      pageTypeSlug: brandedSlug,
      idSuffix: parsed.idSuffix,
      slug: parsed.slug ?? undefined,
      select: ["id", "title"],
    })
    return data(
      {
        kind: "nav" as const,
        pageTypeSlug,
        pageHrefParam,
        faviconIdSuffix: parsed.idSuffix,
        title: navPage && typeof navPage.title === "string" ? navPage.title : null,
      },
      { headers }
    )
  }

  const exact = await getPageByIdSuffix({
    pageTypeSlug: brandedSlug,
    idSuffix: parsed.idSuffix,
    slug: parsed.slug ?? undefined,
    select: ["id", "externalId", "gameEngine", "title"],
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

  const gameEngine = exact != null && typeof exact.gameEngine === "string" ? exact.gameEngine : null
  const externalId = exact != null && typeof exact.externalId === "string" ? exact.externalId : null
  const displayKind = selectPageDisplayKind({
    configDisplay: undefined,
    gameEngine,
    externalId,
  })

  if (displayKind === "idle") {
    return data(
      {
        kind: "idle" as const,
        pageTypeSlug: resolvedSlug,
        id,
        faviconIdSuffix: null,
        title,
        frame: null,
      },
      { headers }
    )
  }
  if (displayKind === "chess") {
    return data(
      {
        kind: "chess-game" as const,
        pageTypeSlug: resolvedSlug,
        id,
        initialFen: null,
        initialPgn: null,
        faviconIdSuffix: null,
        title,
      },
      { headers }
    )
  }

  if (displayKind === "chess-review") {
    const chessRow = (
      await getPages({
        pageTypeSlug: resolvedSlug,
        where: [{ key: "id", eq: id }],
        limit: 1,
      })
    ).rows[0]
    const pgn = chessGamePgnSchema.parse(chessRow?.pgn ?? "")
    return data(
      {
        kind: "chess-review" as const,
        pageTypeSlug: resolvedSlug,
        id,
        pgn,
        faviconIdSuffix: null,
        title,
      },
      { headers }
    )
  }

  let audioVariants: readonly MediaVariant[] | null = null
  let audioNextHref: string | null = null
  let audioDefaultVariant: string | null = null
  let audioSentenceMarks: readonly SentenceMark[] = []
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
  const mediaConfig = await getMediaConfig({ pageTypeSlug: resolvedBrandedSlug })
  const sequenceConfig = await getSequenceConfig({ pageTypeSlug: resolvedBrandedSlug })
  if (mediaConfig?.audio != null || sequenceConfig != null) {
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
      if (mediaConfig?.audio != null) {
        try {
          const resolved = await resolveMediaVariants({ page: fullPage })
          audioVariants = resolved.variants
          audioNextHref = readerNext?.href ?? null
          audioDefaultVariant = resolved.defaultVariant
          audioSentenceMarks = audioSentenceMarksSchema.parse(resolved.sentenceMarks)
        } catch (err) {
          console.error(
            `page-detail loader: audio variant resolution failed for ${resolvedSlug}/${id}; serving without audio`,
            err
          )
        }
      }
    }
  }

  return data(
    {
      kind: "detail" as const,
      pageTypeSlug: resolvedSlug,
      id,
      faviconIdSuffix: null,
      title,
      audioVariants,
      audioNextHref,
      audioDefaultVariant,
      audioSentenceMarks,
      readerPrev,
      readerNext,
      storyHref,
      chapterTitle,
      chapterNumber,
      storyTitle,
      nextUnreadHref,
    },
    { headers }
  )
}
