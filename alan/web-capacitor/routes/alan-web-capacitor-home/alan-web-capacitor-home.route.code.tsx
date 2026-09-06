"use client"

import { ALANWALTON_APP_ID, ALANWALTON_APP_SLUG } from "@akasha/alanwalton-web/alan-app-id"
import { HOME_NAV_SLUG } from "@akasha/alanwalton-web/home-dni"
import { PageLayout, PageLayoutSkeleton, PageTitle } from "@akasha/design-layout/page-layout"
import { tabbedPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { reportError } from "@akasha/errors-client/error-reporting"
import { usePagesSupabase } from "@akasha/pages-ui/supabase/use-pages"
import { ViewPageContent } from "@akasha/pages-ui-components/view-page-content"
import { buildPageHrefParam } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useEffect, useMemo } from "react"

const NAV_SLUG = toPageTypeSlug("nav")

export function meta() {
  return [{ title: "Home" }]
}

export function homeUnresolvedBecause(args: {
  navRowCount: number
  isDegraded: boolean
  error: Error | null
}): string {
  if (args.error !== null) {
    return `the '${NAV_SLUG}' pages could not be read: ${args.error.message}`
  }
  if (args.isDegraded) {
    return `nothing answered for the '${NAV_SLUG}' page type before this app stopped waiting`
  }
  if (args.navRowCount === 0) {
    return `nothing answered for the '${NAV_SLUG}' page type`
  }
  return `${args.navRowCount} '${NAV_SLUG}' pages answered and none of them is '${HOME_NAV_SLUG}'`
}

export default function CapacitorHome() {
  const { rows, isLoading, isDegraded, error } = usePagesSupabase({
    pageTypeSlug: NAV_SLUG,
    where: [
      {
        or: [
          { key: "app", eq: ALANWALTON_APP_ID },
          { key: "app", eq: ALANWALTON_APP_SLUG },
        ],
      },
    ],
    limit: 200,
  })

  const navItemIdParam = useMemo(() => {
    const home = rows.find((r) => r.slug === HOME_NAV_SLUG)
    if (home === undefined) return null
    return buildPageHrefParam({
      pageTypeSlug: NAV_SLUG,
      slug: home.slug,
      fallbackSlugSource: home.title,
      id: home.id,
    })
  }, [rows])

  const because =
    navItemIdParam === null && !isLoading
      ? homeUnresolvedBecause({ navRowCount: rows.length, isDegraded, error })
      : null

  useEffect(() => {
    if (because === null) return
    reportError({
      message: `[capacitor-home] the home screen has no nav page to render — ${because}`,
      stack: error?.stack ?? because,
      kind: "error",
      app: "alanwalton",
      errorUserId: null,
    })
  }, [because, error])

  if (navItemIdParam !== null) {
    return <ViewPageContent navItemIdParam={navItemIdParam} />
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen ${surfaceClass(0)}`}>
        <PageLayoutSkeleton config={tabbedPageSkeleton({ defaultTab: "home" })} />
      </div>
    )
  }

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Home could not be built</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <div className="flex flex-col gap-4">
          <p className="text-secondary">This screen is assembled from a nav page, and {because}.</p>
          <p className="text-secondary">
            Nothing has been deleted. The app could not reach what it needed, so it is showing you
            this instead of an empty home.
          </p>
          <button
            type="button"
            className="self-start rounded-md border border-subtle px-4 py-2 text-primary"
            onClick={() => {
              window.location.reload()
            }}
          >
            Try again
          </button>
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
