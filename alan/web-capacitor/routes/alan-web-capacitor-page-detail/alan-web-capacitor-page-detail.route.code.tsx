"use client"

import { OfflineDownloadButton } from "akasha/alan/web/modules/offline-download-button/offline-download-button.module.code.tsx"
import { ReaderNarrationDetail } from "akasha/alan/web/modules/reader-narration-detail/reader-narration-detail.module.code.tsx"
import { useIsOnline } from "akasha/alan/web/modules/use-is-online/use-is-online.module.code.ts"
import { useMediaVariants } from "akasha/alan/web/modules/use-media-variants/use-media-variants.module.code.ts"
import { useNextUnreadHref } from "akasha/alan/web/modules/use-next-unread/use-next-unread.module.code.ts"
import { NotFoundNotice } from "akasha/alan/web-capacitor/modules/not-found-notice/not-found-notice.module.code.tsx"
import { parsePageTypeData } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { ViewPageContent } from "akasha/page/ui/components/modules/view-page-content/view-page-content.module.code.tsx"
import {
  useAllPages,
  usePageByIdSuffix,
} from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { useReaderNeighbors } from "akasha/page/ui/supabase/modules/use-reader-neighbors/use-reader-neighbors.module.code.ts"
import { parsePageHrefParam } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useParams } from "react-router"

const NAV_SLUG = "nav"

const READING_STORY_SLUG = "reading-story"

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
  const drawnOffline = pageType?.properties?.drawnOffline === true
  const neighbors = useReaderNeighbors(page?._id, slug)
  const hasAudio = pageTypeData.mediaConfig?.audio != null
  const audio = useMediaVariants(page?._id, hasAudio)
  const nextUnreadHref = useNextUnreadHref(
    pageTypeSlug === READING_STORY_SLUG ? page?._id : undefined
  )

  if (parsed === null) return <NotFoundNotice />
  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl p-6 text-primary">
        <p className="text-secondary">Loading…</p>
      </main>
    )
  }
  if (page === null) {
    if (!isOnline && drawnOffline) return <OfflineReviewUncached />
    return <NotFoundNotice />
  }

  return (
    <>
      {}
      <ReaderNarrationDetail
        drawnPlainly={!isOnline && !drawnOffline}
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
