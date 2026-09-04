"use client"

import { parseListingConfig } from "@akasha/pages-core/schema/listing-config"
import { isLocked, isPageTypeLocked, type ViewDataJSON } from "@akasha/pages-core/schema/view-data"
import type { LockedFacet } from "@akasha/pages-core/schema/view-data-locked"
import { SupabasePageResolverProvider } from "@akasha/pages-ui/supabase/page-resolver-provider"
import type { PageWithProperties } from "@akasha/pages-ui/supabase/page-with-properties"
import { useSetPropertyOptimistic } from "@akasha/pages-ui/supabase/use-set-property-optimistic"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { pageRowToPageDataJSON } from "@akasha/pages-ui-components/page-data-json"
import { useReorderViewWiring } from "@akasha/pages-ui-components/use-reorder-view-wiring"
import type { PageTypeOption } from "@akasha/pages-ui-components/view-settings-options"
import {
  buildRelationBackLinkHref,
  buildRowHref,
  readRelationConfig,
} from "@akasha/pages-ui-components/view-tab-content-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { PageCardRenderer } from "../page-card-renderer/page-card-renderer.module.code.tsx"
import { PageSystemTabContent } from "../page-system-view/page-system-view.module.code.tsx"
import { PageTableRowCells } from "../page-table/page-table.module.code.tsx"
import { useGalleryViewProps } from "../use-gallery-view-props/use-gallery-view-props.module.code.ts"
import { useNotesViewProps } from "../use-notes-view-props/use-notes-view-props.module.code.ts"
import { usePropertyChangePerfHandler } from "../use-property-change-perf-handler/use-property-change-perf-handler.module.code.ts"
import { useViewConfigHandlers } from "../use-view-config-handlers/use-view-config-handlers.module.code.ts"
import { useViewRowHandlers } from "../use-view-row-handlers/use-view-row-handlers.module.code.ts"
import { useViewTabContentData } from "../use-view-tab-content-data/use-view-tab-content-data.module.code.ts"

export function ViewTabContent({
  parentPageTypeId,
  parentLocked,
  viewId,
  viewPages,
  pageTypes,
  onUpdateView,
  pageTypeOptions,
  embedded,
}: {
  parentPageTypeId: string
  parentLocked?: LockedFacet
  viewId: string
  viewPages: readonly PageWithProperties[]
  pageTypes: readonly PageWithProperties[]
  onUpdateView: (id: string, updates: Partial<ViewDataJSON>) => void
  pageTypeOptions?: readonly PageTypeOption[]
  embedded?: boolean
}) {
  const {
    viewConfig,
    effectiveConfig,
    effectivePageTypeId,
    effectivePageType,
    rowPageTypeSlug,
    properties,
    loadMore,
    canLoadMore,
    isLoading,
    error,
    totalCount,
    propertiesByPageType,
    pageTypePluralSlugById,
    allPages,
    relatedPages,
    rowAggregates,
    pageHrefById,
    resolveRowSlug,
    pageRows,
    serverGrouped,
  } = useViewTabContentData({
    parentPageTypeId,
    parentLocked,
    viewId,
    viewPages,
    pageTypes,
    pageTypeOptions,
  })

  const setProperty = useSetPropertyOptimistic()
  const userId = useUserId()

  const {
    handleCreatePage,
    handleIconChange,
    handleDeletePage,
    handleToggleFavorite,
    handleCreateOption,
  } = useViewRowHandlers({
    rowPageTypeSlug,
    resolveRowSlug,
    effectivePageTypeId,
    userId,
    properties,
    setProperty,
  })

  const visibleProperties = viewConfig?.visible_properties
  const hiddenPropertiesOrder = viewConfig?.hidden_properties_order
  const alwaysShowProperties = viewConfig?.always_show_properties

  const { galleryCardSize, galleryCoverSource, galleryCoverSourceOptions } = useGalleryViewProps(
    viewConfig,
    properties
  )
  const { notesProperty, notesPropertyOptions } = useNotesViewProps(viewConfig, properties)

  const {
    handleConfigChange,
    handleVisibilityChange,
    handlePageTypeChange,
    handleReorderColumns,
    handleLayoutChange,
    handleGalleryCoverSourceChange,
    handleGalleryCardSizeChange,
    handleNotesPropertyChange,
  } = useViewConfigHandlers({
    onUpdateView,
    viewId,
    viewConfigPageTypeId: viewConfig?.pageTypeId,
    visibleProperties,
  })

  const { onReorderCards } = useReorderViewWiring({
    reorder: viewConfig?.reorder,
    viewId,
    pageTypeSlug: rowPageTypeSlug ?? toPageTypeSlug("page"),
  })

  const handlePropertyChange = usePropertyChangePerfHandler(setProperty, rowPageTypeSlug)

  const pageTypeIconName =
    typeof effectivePageType?.properties?.icon === "string"
      ? effectivePageType.properties.icon
      : null

  const pageTypeName = String(effectivePageType?.properties?.title ?? "Items")

  const coverActionCapability = parseListingConfig(effectivePageType?.properties?.listingConfig)
    ?.coverAction?.capability

  return (
    <SupabasePageResolverProvider
      pages={allPages}
      pageTypes={pageTypes}
      relatedPages={relatedPages}
      pickerPageTypeSlug={rowPageTypeSlug}
    >
      {error !== null ? (
        <div
          role="alert"
          className="rounded-md border border-red/40 bg-red/10 p-3 text-red text-sm"
        >
          This view failed to load: {error.message}
        </div>
      ) : null}
      <PageSystemTabContent
        embedded={embedded}
        items={pageRows}
        label={pageTypeName}
        properties={properties}
        visibleProperties={visibleProperties}
        hiddenPropertiesOrder={hiddenPropertiesOrder}
        alwaysShowProperties={alwaysShowProperties}
        onVisibilityChange={
          isLocked(effectiveConfig, "changePropertyVisibility") ? undefined : handleVisibilityChange
        }
        onReorderColumns={handleReorderColumns}
        onReorderCards={onReorderCards}
        storagePrefix={`view-${parentPageTypeId}:list`}
        totalCount={totalCount}
        defaultFilters={viewConfig?.filters}
        defaultSorts={viewConfig?.sorts}
        defaultGroupBy={viewConfig?.group_by}
        defaultGroupSorts={viewConfig?.group_sorts}
        defaultCalendarDateBy={viewConfig?.calendar_date_by}
        defaultTimelineStartProperty={viewConfig?.timeline_start_property}
        defaultTimelineEndProperty={viewConfig?.timeline_end_property}
        defaultPageSize={viewConfig?.page_size}
        defaultGroupPageSize={viewConfig?.group_page_size}
        defaultItemPageSize={viewConfig?.item_page_size}
        onConfigChange={handleConfigChange}
        onLoadMore={loadMore}
        canLoadMore={canLoadMore}
        layout={viewConfig?.layout}
        onLayoutChange={isLocked(effectiveConfig, "changeLayout") ? undefined : handleLayoutChange}
        pageTypeId={effectivePageTypeId}
        pageTypeSlug={rowPageTypeSlug}
        onPageTypeChange={isPageTypeLocked(effectiveConfig) ? undefined : handlePageTypeChange}
        pageTypeOptions={pageTypeOptions}
        isCrossType={viewConfig?.crossTypeSource != null}
        hasRowActions={viewConfig?.crossTypeSource != null}
        propertiesByPageType={propertiesByPageType}
        onCreatePage={
          !isLocked(effectiveConfig, "createPage") && effectivePageTypeId != null && userId != null
            ? handleCreatePage
            : undefined
        }
        serverGrouped={serverGrouped}
        isLoading={isLoading}
        onPropertyPatch={handlePropertyChange}
        galleryCardSize={galleryCardSize}
        galleryCoverSource={galleryCoverSource}
        galleryCoverSourceOptions={galleryCoverSourceOptions}
        onGalleryCoverSourceChange={
          isLocked(effectiveConfig, "changeCoverSource")
            ? undefined
            : handleGalleryCoverSourceChange
        }
        onGalleryCardSizeChange={
          isLocked(effectiveConfig, "changeCardSize") ? undefined : handleGalleryCardSizeChange
        }
        notesProperty={notesProperty?.id}
        notesPropertyOptions={notesPropertyOptions}
        onNotesPropertyChange={
          isLocked(effectiveConfig, "changeCoverSource") ? undefined : handleNotesPropertyChange
        }
        renderItem={(page) => (
          <PageCardRenderer
            page={page}
            properties={properties}
            visibleProperties={visibleProperties}
            alwaysShowProperties={alwaysShowProperties}
            galleryCardSize={galleryCardSize}
            galleryCoverSourceId={galleryCoverSource}
            notesProperty={notesProperty}
            coverActionCapability={coverActionCapability}
            rowPageTypeSlug={rowPageTypeSlug}
            rowAggregates={rowAggregates}
            pageTypeIconName={pageTypeIconName}
            pageHrefById={pageHrefById}
            pageTypePluralSlugById={pageTypePluralSlugById}
            onIconChange={isLocked(effectiveConfig, "editRowIcon") ? undefined : handleIconChange}
            onPropertyChange={
              isLocked(effectiveConfig, "editRowValues") ? undefined : handlePropertyChange
            }
            onCompletedAtChange={
              isLocked(effectiveConfig, "editRowValues")
                ? undefined
                : (pageId, value) => handlePropertyChange(pageId, "completedAt", value)
            }
            onCreateOption={
              isLocked(effectiveConfig, "editRowValues") ? undefined : handleCreateOption
            }
            onDelete={isLocked(effectiveConfig, "deletePage") ? undefined : handleDeletePage}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        renderRow={(page) => {
          const { _id: id, ...rest } = page
          const fill = rowAggregates.get(id)
          const pageData = pageRowToPageDataJSON(fill ? { ...rest, ...fill } : rest)
          const viewRowHref = buildRowHref(rowPageTypeSlug, page)
          const rowHref = viewRowHref !== "" ? viewRowHref : pageHrefById(id)
          return (
            <PageTableRowCells
              data={pageData}
              definitions={properties}
              visibleProperties={visibleProperties}
              rowHref={rowHref}
              onPropertyChange={
                isLocked(effectiveConfig, "editRowValues")
                  ? undefined
                  : (propertyId, value, eventTimeStamp) =>
                      handlePropertyChange(id, propertyId, value, eventTimeStamp)
              }
              onCreateOption={
                isLocked(effectiveConfig, "editRowValues")
                  ? undefined
                  : (propertyId, label) => handleCreateOption(id, pageData, propertyId, label)
              }
              onComplete={
                isLocked(effectiveConfig, "editRowValues")
                  ? undefined
                  : (value) => handlePropertyChange(id, "completedAt", value)
              }
              isFavorite={pageData.favoritedAt != null}
              onToggleFavorite={(value) => handleToggleFavorite(id, value)}
              onDelete={
                isLocked(effectiveConfig, "deletePage") ? undefined : () => handleDeletePage(id)
              }
              pageHref={pageHrefById}
              relationHref={(propertyId) => {
                const def = properties.find((d) => d.id === propertyId)
                return buildRelationBackLinkHref({
                  target: def ? readRelationConfig(def.config) : undefined,
                  rowId: id,
                  fallbackHref: rowHref,
                  pluralSlugById: pageTypePluralSlugById,
                })
              }}
            />
          )
        }}
      />
    </SupabasePageResolverProvider>
  )
}
