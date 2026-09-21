"use client"

import { completionShapeOf } from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import type { ViewConfig } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { RenderBareListingCard } from "akasha/page/ui/component/modules/bare-listing-card/bare-listing-card.module.code.tsx"
import { PageSystemShell } from "akasha/page/ui/component/modules/page-system-shell/page-system-shell.module.code.tsx"
import { PageSystemTabContent } from "akasha/page/ui/component/modules/page-system-view/page-system-view.module.code.tsx"
import { viewConfigToListingParams } from "akasha/page/ui/component/modules/synthetic-config/synthetic-config.module.code.ts"
import { useGalleryViewProps } from "akasha/page/ui/component/modules/use-gallery-view-props/use-gallery-view-props.module.code.ts"
import { useNotesViewProps } from "akasha/page/ui/component/modules/use-notes-view-props/use-notes-view-props.module.code.ts"
import { usePagesFilteredHrefs } from "akasha/page/ui/component/modules/use-pages-filtered-hrefs/use-pages-filtered-hrefs.module.code.ts"
import { usePagesFilteredMutations } from "akasha/page/ui/component/modules/use-pages-filtered-mutations/use-pages-filtered-mutations.module.code.ts"
import { usePagesFilteredQuery } from "akasha/page/ui/component/modules/use-pages-filtered-query/use-pages-filtered-query.module.code.ts"
import type { PageRow } from "akasha/page/ui/component/view-engine/modules/view-row/view-row.module.code.ts"
import { usePagesUIRouter } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { SupabasePageResolverProvider } from "akasha/page/ui/supabase/modules/page-resolver-provider/page-resolver-provider.module.code.tsx"
import { useCompletePageOptimistic } from "akasha/page/ui/supabase/modules/use-complete-page-optimistic/use-complete-page-optimistic.module.code.tsx"
import { buildPageListingHref } from "akasha/page/url/modules/page-listing-href/page-listing-href.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useCallback } from "react"

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
    pageTypeSlugById,
    pageTypeName,
    baseFilters,
    effectiveConfig,
    loadMore,
    canLoadMore,
    isLoading,
    totalCount,
    allPages,
    relatedPages,
    pageRows,
    serverGrouped,
    descendantUnasked,
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
      router.replace(buildPageListingHref({ slug: pageTypeSlug, query: params }))
    },
    [router, pageTypeSlug, searchParams, baseFilters]
  )

  const { buildRowHref, pageHrefById, makeRelationHref } = usePagesFilteredHrefs({
    pageTypeSlug,
    allPages,
    relatedPages,
    pageTypeSlugById,
    properties,
  })

  const { galleryCardSize, galleryCoverSource, galleryCoverSourceOptions } = useGalleryViewProps(
    effectiveConfig,
    properties
  )

  const { notesProperty, notesPropertyOptions } = useNotesViewProps(effectiveConfig, properties)

  const completePage = useCompletePageOptimistic()
  const completion = completionShapeOf(pageTypeSlug)

  const handleComplete = useCallback(
    (page: PageRow, atMs: number | null) => {
      if (completion === null) return
      completePage({ pageTypeSlug, pageId: page._id, shape: completion, values: page, atMs })
    },
    [completePage, completion, pageTypeSlug]
  )

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
          tabs={
            descendantUnasked === null ? [{ id: "list", label: pageTypeName, icon: undefined }] : []
          }
          loading={loading}
          empty={
            descendantUnasked === null
              ? {
                  title: "No pages",
                  description: "No pages match the current filters.",
                }
              : {
                  title: "This listing was not asked for",
                  description: descendantUnasked,
                }
          }
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
            serverGrouped={serverGrouped}
            isLoading={isLoading}
            onCreatePage={
              pageTypeSlug.length > 0 && targetPageTypeId.length > 0 && userId != null
                ? handleCreatePage
                : undefined
            }
            renderItem={(page) =>
              RenderBareListingCard(page, {
                properties,
                pageTypeSlug,
                visiblePropertyIds: effectiveConfig.visible_properties ?? [],
                alwaysShowPropertyIds: effectiveConfig.always_show_properties ?? [],
                notesProperty,
                pageTypeIconName,
                buildRowHref,
                pageHrefById,
                makeRelationHref,
                onIconChange: handleIconChange,
                onPropertyChange: handlePropertyChange,
                onComplete: handleComplete,
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
