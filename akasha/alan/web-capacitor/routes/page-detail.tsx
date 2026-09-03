"use client"

import { OfflineDownloadButton } from "@akasha/alanwalton-web/offline-download-button"
import {
  type PageDisplayKind,
  selectPageDisplayKind,
} from "@akasha/alanwalton-web/page-display-kind"
import { ReaderNarrationDetail } from "@akasha/alanwalton-web/reader-narration-detail"
import { useIsOnline } from "@akasha/alanwalton-web/use-is-online"
import { useMediaVariants } from "@akasha/alanwalton-web/use-media-variants"
import { useNextUnreadHref } from "@akasha/alanwalton-web/use-next-unread"
import { resolveDisplayKind } from "@akasha/pages-core/schema/detail-config"
import { parsePageTypeData } from "@akasha/pages-core/schema/pages"
import { getPageDisplay } from "@akasha/pages-ui/capabilities/page-display-registry"
import { useAllPages, usePageByIdSuffix } from "@akasha/pages-ui/supabase/hooks"
import { useReaderNeighbors } from "@akasha/pages-ui/supabase/use-reader-neighbors"
import { ViewPageContent } from "@akasha/pages-ui-components/view-page-content"
import { parsePageHrefParam } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { lazy, Suspense } from "react"
import { useParams } from "react-router"

const NAV_SLUG = "nav"

const READING_STORY_SLUG = "reading-story"

const ChessBoard = lazy(() => import("@akasha/chess-core/chess-board"))

const IdleGame = lazy(() => import("@akasha/alanwalton-web/idle-game"))

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
  const slug = toPageTypeSlug(pageTypeSlug)
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
