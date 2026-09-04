"use client"

import { PageLayout } from "@akasha/design-layout/page-layout"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@akasha/design-patterns/empty"
import { Icon } from "@akasha/design-patterns/lucide-icon"
import { buttonVariants } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { parsePageTypeData } from "@akasha/pages-core/schema/pages"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { expandDateMentions } from "@akasha/pages-core/view/expand-date-mentions"
import { PagesUILink } from "@akasha/pages-ui/navigation-context"
import { useAllPages } from "@akasha/pages-ui/supabase/hooks"
import { useResolvedDefinitions } from "@akasha/pages-ui/supabase/use-option-list-lookup"
import { usePage } from "@akasha/pages-ui/supabase/use-page"
import { DegradingImage } from "@akasha/pages-ui-components/degrading-image"
import { toPageDataJSON } from "@akasha/pages-ui-components/page-data-json"
import { PageDetailHeaderMenu } from "@akasha/pages-ui-components/page-detail-header-menu"
import { PropertyBadge } from "@akasha/pages-ui-components/property-badge"
import { type PageTypeSlug, toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { PagesFilteredContent } from "../pages-by-relation-content/pages-by-relation-content.module.code.tsx"

const PAGE_TYPE_SLUG = "page-type"

interface PageCollectionContentProps {
  pageTypeSlug: PageTypeSlug
  id: string
  nextUnreadHref?: string | null
}

export function PageCollectionContent({
  pageTypeSlug,
  id,
  nextUnreadHref,
}: PageCollectionContentProps) {
  const { page, isLoading } = usePage({ pageTypeSlug, id })
  const { pages: pageTypes } = useAllPages({ pageTypeSlug: PAGE_TYPE_SLUG })
  const surface = useSurface()

  const pageType = pageTypes.find((pt) => pt.properties?.slug === pageTypeSlug)
  const { detailConfig, propertyDefinitions: rawDefinitions } = parsePageTypeData(
    pageType?.properties
  )
  const propertyDefinitions = useResolvedDefinitions(rawDefinitions)

  const data = toPageDataJSON(page?.properties)
  const title = data.title != null ? String(data.title) : ""
  const header = detailConfig?.header
  const childCollection = detailConfig?.childCollection

  const coverUrl = typeof data.cover === "string" && data.cover.length > 0 ? data.cover : null
  const showCover = header?.showCover !== false
  const headerFields = (header?.fields ?? [])
    .map((fid) => propertyDefinitions.find((d) => d.id === fid))
    .filter((d): d is PropertyDefinition => d != null)

  if (!isLoading && page == null) {
    return (
      <PageLayout>
        <PageLayout.Content>
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Page not found</EmptyTitle>
              <EmptyDescription>This page doesn't exist or may have been deleted.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </PageLayout.Content>
      </PageLayout>
    )
  }

  return (
    <>
      {data.title != null && <title>{expandDateMentions(title)}</title>}
      {header != null && page != null && (
        <div className="mx-auto flex w-full max-w-[710px] flex-col gap-4 px-6 pt-6">
          {showCover && coverUrl != null && (
            <DegradingImage
              src={coverUrl}
              alt=""
              className="block h-auto w-full rounded-md"
              fallback={
                <div
                  className={cn(
                    "flex aspect-video w-full items-center justify-center rounded-md",
                    surfaceClass(surface + 1)
                  )}
                >
                  <Icon name="image" className="size-8 text-tertiary" />
                </div>
              }
            />
          )}
          <div className="flex items-start justify-between gap-2">
            <h1 className="font-semibold text-2xl text-primary leading-tight">
              {expandDateMentions(title)}
            </h1>
            <PageDetailHeaderMenu
              pageTypeSlug={pageTypeSlug}
              pageId={id}
              isFavorite={data.favoritedAt != null}
            />
          </div>
          {headerFields.length > 0 && (
            <div className="flex flex-col gap-2">
              {headerFields.map((def) => (
                <div key={def.id} className="flex items-center justify-between gap-3">
                  <span className="min-w-28 shrink-0 text-secondary text-sm">{def.title}</span>
                  <PropertyBadge property={def} value={data[def.id] ?? null} context="detail" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {nextUnreadHref != null && nextUnreadHref.length > 0 && (
        <div className="mx-auto flex w-full max-w-[710px] px-6 pt-4">
          {}
          <PagesUILink
            href={nextUnreadHref}
            className={cn(buttonVariants({ variant: "accent", size: "sm" }))}
          >
            Jump to next unread chapter
          </PagesUILink>
        </div>
      )}
      {childCollection != null && (
        <PagesFilteredContent
          embedded
          pageTypeSlug={toPageTypeSlug(childCollection.childType)}
          searchParams={{ [childCollection.childRelation]: id }}
        />
      )}
    </>
  )
}
