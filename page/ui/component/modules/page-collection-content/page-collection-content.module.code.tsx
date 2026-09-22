"use client"

import { PageLayout } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { Icon } from "akasha/design/interface/pattern/modules/lucide-icon/lucide-icon.module.code.tsx"
import { buttonVariants } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { parsePageTypeData } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import { expandDateMentions } from "akasha/page/core/view/modules/expand-date-mentions/expand-date-mentions.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { DegradingImage } from "akasha/page/ui/component/modules/degrading-image/degrading-image.module.code.tsx"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import { PageDetailHeaderMenu } from "akasha/page/ui/component/modules/page-detail-header-menu/page-detail-header-menu.module.code.tsx"
import { PagesFilteredContent } from "akasha/page/ui/component/modules/pages-by-relation-content/pages-by-relation-content.module.code.tsx"
import { PropertyRow } from "akasha/page/ui/component/modules/property-row/property-row.module.code.tsx"
import { PagesUILink } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { useAllPages } from "akasha/page/ui/supabase/modules/hooks/hooks.module.code.ts"
import { useResolvedDefinitions } from "akasha/page/ui/supabase/modules/use-option-list-lookup/use-option-list-lookup.module.code.ts"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import {
  type PageTypeSlug,
  toPageTypeSlug,
} from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import type { ReactNode } from "react"

const PAGE_TYPE_SLUG = "page-type"

interface PageCollectionContentProps {
  pageTypeSlug: PageTypeSlug
  id: string
  nextUnreadHref?: string | null
  children?: ReactNode
}

export function PageCollectionContent({
  pageTypeSlug,
  id,
  nextUnreadHref,
  children,
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
                <PropertyRow key={def.id} property={def} value={data[def.id] ?? null} />
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
      {children}
      {childCollection != null && (
        <PagesFilteredContent
          embedded
          pageTypeSlug={toPageTypeSlug(slugOf(childCollection.childType))}
          searchParams={{ [childCollection.childRelation]: id }}
        />
      )}
    </>
  )
}
