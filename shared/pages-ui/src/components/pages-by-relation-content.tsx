"use client"

import type { ViewConfig } from "@akasha/pages-core/schema/view-data"
import { buildPageListingHref } from "@akasha/pages-url/page-listing-href"
import type { PageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { useCallback } from "react"
import { usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { SupabasePageResolverProvider } from "@akasha/pages-ui/supabase/page-resolver-provider"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { renderBareListingCard } from "./bare-listing-card"
import { PageSystemTabContent } from "./page-system-view"
import { PageSystemShell } from "./page-system-shell"
import { viewConfigToListingParams } from "@akasha/pages-ui-components/synthetic-config"
import { useGalleryViewProps } from "@akasha/pages-ui-components/use-gallery-view-props"
import { useNotesViewProps } from "@akasha/pages-ui-components/use-notes-view-props"
import { usePagesFilteredHrefs } from "@akasha/pages-ui-components/use-pages-filtered-hrefs"
import { usePagesFilteredMutations } from "./use-pages-filtered-mutations"
import { usePagesFilteredQuery } from "./use-pages-filtered-query"

const RELATION_TARGET_SLUG = "page"

interface PagesFilteredContentProps {
  pageTypeSlug: PageTypeSlug
  searchParams: Record<string, string>
  embedded?: boolean
}

export function PagesFilteredContent({
  pageTypeSlug,
  searchParams,
  embedded,
}: PagesFilteredContentProps) {
  const router = usePagesUIRouter()
  const userId = useUserId()

  const {
    pageTypes,
    pageTypesLoading,
    targetPageType,
    targetPageTypeId,
    properties,
    propertiesByPageType,
    pageTypeSlugById,
    pageTypePluralSlugById,
    pageTypeName,
    baseFilters,
    effectiveConfig,
    loadMore,
    canLoadMore,
    isLoading,
    totalCount,
    allPages,
    relatedPages,
    rowAggregates,
    pageRows,
    serverGrouped,
  } = usePagesFilteredQuery({ pageTypeSlug, searchParams })

  const {
    handleCreatePage,
    handlePropertyChange,
    handleIconChange,
    handleDeletePage,
    handleToggleFavorite,
    pageTypeIconName,
  } = usePagesFilteredMutations({
    pageTypeSlug,
    targetPageTypeId,
    userId,
    targetPageType,
    router,
  })

  const handleConfigChange = useCallback(
    (config: ViewConfig) => {
      const params = viewConfigToListingParams(config, searchParams, baseFilters)
      const rawPluralSlug = targetPageType?.properties?.pluralSlug
      const pluralSlug = typeof rawPluralSlug === "string" ? rawPluralSlug : pageTypeSlug
      router.replace(buildPageListingHref({ pluralSlug, query: params }))
    },
    [router, pageTypeSlug, targetPageType, searchParams, baseFilters]
  )

  const { buildRowHref, pageHrefById, makeRelationHref } = usePagesFilteredHrefs({
    pageTypeSlug,
    allPages,
    relatedPages,
    pageTypeSlugById,
    pageTypePluralSlugById,
    properties,
  })

  const { galleryCardSize, galleryCoverSource, galleryCoverSourceOptions } = useGalleryViewProps(
    effectiveConfig,
    properties
  )

  const { notesProperty, notesPropertyOptions } = useNotesViewProps(effectiveConfig, properties)

  const loading = pageTypesLoading || !targetPageType

  return (
    <div>
      {!loading && <title>{pageTypeName}</title>}
      <SupabasePageResolverProvider
        pages={allPages}
        pageTypes={pageTypes}
        relatedPages={relatedPages}
        pickerPageTypeSlug={RELATION_TARGET_SLUG}
      >
        <PageSystemShell
          title={embedded === true ? null : loading ? "" : pageTypeName}
          tabs={[{ id: "list", label: pageTypeName, icon: undefined }]}
          loading={loading}
          empty={{
            title: "No pages",
            description: "No pages match the current filters.",
          }}
        >
          <PageSystemTabContent
            items={pageRows}
            label={pageTypeName}
            properties={properties}
            storagePrefix={`pages-filtered-${pageTypeSlug}`}
            totalCount={totalCount}
            defaultFilters={effectiveConfig.filters}
            defaultSorts={effectiveConfig.sorts}
            defaultGroupBy={effectiveConfig.group_by}
            defaultGroupSorts={effectiveConfig.group_sorts}
            defaultPageSize={effectiveConfig.page_size}
            defaultGroupPageSize={effectiveConfig.group_page_size}
            defaultItemPageSize={effectiveConfig.item_page_size}
            onConfigChange={handleConfigChange}
            onLoadMore={loadMore}
            canLoadMore={canLoadMore}
            layout={effectiveConfig.layout}
            visibleProperties={effectiveConfig.visible_properties}
            alwaysShowProperties={effectiveConfig.always_show_properties}
            galleryCardSize={galleryCardSize}
            galleryCoverSource={galleryCoverSource}
            galleryCoverSourceOptions={galleryCoverSourceOptions}
            notesProperty={notesProperty?.id}
            notesPropertyOptions={notesPropertyOptions}
            pageTypeId={targetPageTypeId}
            propertiesByPageType={propertiesByPageType}
            serverGrouped={serverGrouped}
            isLoading={isLoading}
            onCreatePage={
              pageTypeSlug.length > 0 && targetPageTypeId.length > 0 && userId != null
                ? handleCreatePage
                : undefined
            }
            renderItem={(page) =>
              renderBareListingCard(page, {
                properties,
                pageTypeSlug,
                visiblePropertyIds: effectiveConfig.visible_properties ?? [],
                alwaysShowPropertyIds: effectiveConfig.always_show_properties ?? [],
                notesProperty,
                pageTypeIconName,
                rowAggregates,
                buildRowHref,
                pageHrefById,
                makeRelationHref,
                onIconChange: handleIconChange,
                onPropertyChange: handlePropertyChange,
                onDelete: handleDeletePage,
                onToggleFavorite: handleToggleFavorite,
              })
            }
          />
        </PageSystemShell>
      </SupabasePageResolverProvider>
    </div>
  )
}
