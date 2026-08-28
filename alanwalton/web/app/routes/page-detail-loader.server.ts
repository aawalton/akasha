import { type SentenceMark, sentenceMarkSchema } from "@alanwalton/voice-core/voice/mark-schema"
import { detailConfigFor } from "@shared/pages-access/file-detail-config"
import { getPage, getPageByIdSuffix, getPageByIdSuffixAcrossTypes, getPages } from "@shared/pages-access/get"
import { getDescendantPageTypeSlugs } from "@shared/pages-access/page-type"
import { getMediaConfig, getSequenceConfig } from "@shared/pages-access/page-type-config"
import { resolveDisplayKind } from "@shared/pages-core/schema/detail-config"
import type { ReaderNeighborLink } from "@shared/pages-ui/components/reader-chrome"
import type { MediaVariant } from "@shared/pages-ui/media/page-media-player"
import { buildPageHref, PageTypeSlug, parsePageHrefParam } from "@shared/pages-url"
import { getRequestServerClient, resolveRequestSession } from "@shared/supabase-rr/request-session-cache"
import { isRecord } from "../../../../shared/utils-narrow/src/is-record"
import { data } from "react-router"
import { z } from "zod"
import { loadAwenGame } from "~/awen/game-reader.server"
import { resolveMediaVariants } from "~/lib/media-variants"
import { resolveNextUnreadHref } from "~/lib/next-unread"
import { selectPageDisplayKind } from "~/lib/page-display-kind"
import { resolveReaderNeighbors } from "~/lib/reader-neighbors"
import { resolveQuestionDetail } from "~/questions/lib/question-detail-loader"
import type { Route } from "./+types/page-detail"

const NAV_SLUG = "nav"
const chessGamePgnSchema = z.string().catch("")
const audioSentenceMarksSchema = z.array(sentenceMarkSchema)
const READING_STORY_SLUG = "reading-story"

export async function loader({ params, request }: Route.LoaderArgs) {
  const { pageTypeSlug, pageHrefParam } = params
  if (pageTypeSlug === undefined || pageHrefParam === undefined) {
    throw new Response("Not Found", { status: 404 })
  }

  const parsed = parsePageHrefParam(pageHrefParam)
  if (!parsed) {
    throw new Response("Not Found", { status: 404 })
  }

  const brandedSlug = PageTypeSlug(pageTypeSlug)
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
  const detailConfig = await detailConfigFor(resolvedSlug)
  const displayKind = selectPageDisplayKind({
    configDisplay: resolveDisplayKind(detailConfig ?? undefined),
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
        frame: detailConfig?.frame ?? null,
      },
      { headers }
    )
  }
  if (displayKind === "awen" && externalId != null) {
    const awen = await loadAwenGame(externalId)
    return data(
      {
        kind: "awen-game" as const,
        pageTypeSlug: resolvedSlug,
        id,
        awen,
        faviconIdSuffix: null,
        title,
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

  if (displayKind === "question") {
    const resolved = await resolveQuestionDetail({ id, pageTypeSlug: resolvedSlug })
    return data(
      {
        kind: "question" as const,
        pageTypeSlug: resolvedSlug,
        id,
        question: resolved.question,
        persona: resolved.persona,
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

  const resolvedBrandedSlug = PageTypeSlug(resolvedSlug)
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
            where: [{ key: "id", eq: parentStoryId }],
            select: ["id", "slug", "title"],
          })
          if (story != null && typeof story.id === "string") {
            storyHref = buildPageHref({
              pageTypeSlug: PageTypeSlug("reading-story"),
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
