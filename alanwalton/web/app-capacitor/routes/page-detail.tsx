"use client"

import { resolveDisplayKind } from "@shared/pages-core/schema/detail-config"
import { parsePageTypeData } from "@shared/pages-core/schema/pages"
import { ViewPageContent } from "@shared/pages-ui"
import { getPageDisplay } from "@shared/pages-ui/capabilities/page-display-registry"
import { useAllPages, usePageByIdSuffix } from "@shared/pages-ui/supabase/hooks"
import { useReaderNeighbors } from "@shared/pages-ui/supabase/use-reader-neighbors"
import { PageTypeSlug, parsePageHrefParam } from "@shared/pages-url"
import { assertNever } from "@shared/utils-narrow/assert-never"
import { lazy, Suspense } from "react"
import { useParams } from "react-router"
import { AwenRemoteReader } from "~/awen/components/awen-remote-reader"
import { OfflineDownloadButton } from "~/components/offline-download-button"
import { ReaderNarrationDetail } from "~/components/reader-narration-detail"
import { type PageDisplayKind, selectPageDisplayKind } from "~/lib/page-display-kind"
import { useIsOnline } from "~/lib/use-is-online"
import { useMediaVariants } from "~/lib/use-media-variants"
import { useNextUnreadHref } from "~/lib/use-next-unread"
import { QuestionAnswerArm } from "./question-answer-arm"

const NAV_SLUG = "nav"

const READING_STORY_SLUG = "reading-story"

const ChessBoard = lazy(() => import("~/chess/chess-board"))

const IdleGame = lazy(() => import("~/idle/idle-game"))

export default function CapacitorPageDetail() {
  const params = useParams()
  if (params.pageTypeSlug === NAV_SLUG) {
    return <ViewPageContent navItemIdParam={params.pageHrefParam ?? ""} />
  }
  return (
    <PageDetailDispatch
      pageTypeSlug={params.pageTypeSlug ?? ""}
      pageHrefParam={params.pageHrefParam ?? ""}
    />
  )
}

function PageDetailDispatch({
  pageTypeSlug,
  pageHrefParam,
}: {
  pageTypeSlug: string
  pageHrefParam: string
}) {
  const slug = PageTypeSlug(pageTypeSlug)
  const parsed = parsePageHrefParam(pageHrefParam)
  const isOnline = useIsOnline()

  const { page, isLoading } = usePageByIdSuffix({
    pageTypeSlug: slug,
    idSuffix: parsed?.idSuffix,
    slug: parsed?.slug ?? undefined,
  })
  const { pages: pageTypes } = useAllPages({ pageTypeSlug: "page-type" })
  const pageType = pageTypes.find((pt) => pt.properties?.slug === pageTypeSlug)
  const pageTypeData = parsePageTypeData(pageType?.properties)
  const pageTypeDetailConfig = pageTypeData.detailConfig
  const configDisplay = resolveDisplayKind(pageTypeDetailConfig)
  const neighbors = useReaderNeighbors(page?._id, slug)
  const hasAudio = pageTypeData.mediaConfig?.audio != null
  const audio = useMediaVariants(page?._id, hasAudio)
  const nextUnreadHref = useNextUnreadHref(
    pageTypeSlug === READING_STORY_SLUG ? page?._id : undefined
  )

  if (parsed === null) return <NotFound />
  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl p-6 text-primary">
        <p className="text-secondary">Loading…</p>
      </main>
    )
  }
  if (page === null) {
    if (!isOnline && configDisplay === "chess-review") return <OfflineReviewUncached />
    return <NotFound />
  }

  const genericBody = (
    <>
      {}
      <ReaderNarrationDetail
        pageTypeSlug={slug}
        id={page._id}
        title={typeof page.properties?.title === "string" ? page.properties.title : ""}
        readerPrev={neighbors.prev ?? undefined}
        readerNext={neighbors.next ?? undefined}
        audioVariants={audio?.variants}
        audioDefaultVariant={audio?.defaultVariant ?? undefined}
        audioNextHref={neighbors.next?.href ?? undefined}
        audioActions={
          audio != null && audio.variants.length > 0 ? (
            <OfflineDownloadButton
              pageId={page._id}
              chapterTitle={typeof page.properties?.title === "string" ? page.properties.title : ""}
              chapterNumber={
                typeof page.properties?.chapterNumber === "number"
                  ? page.properties.chapterNumber
                  : null
              }
              storyTitle={null}
              variants={audio.variants}
            />
          ) : undefined
        }
        nextUnreadHref={nextUnreadHref ?? undefined}
      />
    </>
  )

  const gameEngine =
    typeof page.properties?.gameEngine === "string" ? page.properties.gameEngine : null
  const externalId =
    typeof page.properties?.externalId === "string" ? page.properties.externalId : null
  const kind = selectPageDisplayKind({ configDisplay, gameEngine, externalId })
  const displayKind: PageDisplayKind =
    !isOnline && !getPageDisplay(kind)?.offlineCapable ? "generic" : kind

  switch (displayKind) {
    case "chess":
      return (
        <Suspense fallback={null}>
          <ChessBoard />
        </Suspense>
      )
    case "chess-review": {
      const pgn = typeof page.properties?.pgn === "string" ? page.properties.pgn : undefined
      return (
        <Suspense fallback={null}>
          <ChessBoard initialPgn={pgn} />
        </Suspense>
      )
    }
    case "idle":
      return (
        <Suspense fallback={null}>
          <IdleGame
            title={typeof page.properties?.title === "string" ? page.properties.title : null}
            frameConfig={pageTypeDetailConfig?.frame ?? null}
          />
        </Suspense>
      )
    case "awen":
      return externalId !== null ? (
        <AwenRemoteReader externalId={externalId} fallback={genericBody} />
      ) : (
        genericBody
      )
    case "question":
      return <QuestionAnswerArm questionId={page._id} pageTypeSlug={pageTypeSlug} />
    case "persona":
    case "generic":
      return genericBody
    default:
      return assertNever(displayKind)
  }
}

function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-6 text-primary">
      <h1 className="font-semibold text-lg">Not found</h1>
      <p className="text-secondary">This page couldn’t be found.</p>
    </main>
  )
}

function OfflineReviewUncached() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-6 text-primary">
      <h1 className="font-semibold text-lg">Not available offline yet</h1>
      <p className="text-secondary">
        Open this review online once to cache it — after that it’s available offline.
      </p>
    </main>
  )
}
