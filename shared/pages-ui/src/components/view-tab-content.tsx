"use client"

import { parseListingConfig } from "@shared/pages-core/schema/listing-config"
import { isLocked, isPageTypeLocked, type ViewDataJSON } from "@shared/pages-core/schema/view-data"
import { type LockedFacet } from "@shared/pages-core/schema/view-data-locked"
import { PageTypeSlug } from "@shared/pages-url"
import { SupabasePageResolverProvider } from "../supabase/page-resolver-provider.tsx"
import { type PageWithProperties } from "../supabase/types.ts"
import { useSetPropertyOptimistic } from "../supabase/use-set-property-optimistic.tsx"
import { useUserId } from "../use-user-id.tsx"
import { PageCardRenderer } from "./page-card-renderer.tsx"
import { pageRowToPageDataJSON } from "./page-data-json.ts"
import { PageSystemTabContent } from "./page-system-view.tsx"
import { type PageTypeOption } from "./page-system-view-settings-types.ts"
import { readRelationConfig } from "./page-system-view-helpers.tsx"
import { PageTableRowCells } from "./page-table.tsx"
import { useGalleryViewProps } from "./use-gallery-view-props.ts"
import { useNotesViewProps } from "./use-notes-view-props.ts"
import { usePropertyChangePerfHandler } from "./use-property-change-perf-handler.ts"
import { useReorderViewWiring } from "./use-reorder-view-wiring.ts"
import { useViewConfigHandlers } from "./use-view-config-handlers.ts"
import { useViewRowHandlers } from "./use-view-row-handlers.ts"
import { useViewTabContentData } from "./use-view-tab-content-data.ts"
import { buildRelationBackLinkHref, buildRowHref } from "./view-tab-content-href.ts"

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
    pageTypeSlug: rowPageTypeSlug ?? PageTypeSlug("page"),
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
          const { _id, ...rest } = page
          const fill = rowAggregates.get(_id)
          const pageData = pageRowToPageDataJSON(fill ? { ...rest, ...fill } : rest)
          const viewRowHref = buildRowHref(rowPageTypeSlug, page)
          const rowHref = viewRowHref !== "" ? viewRowHref : pageHrefById(_id)
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
                      handlePropertyChange(_id, propertyId, value, eventTimeStamp)
              }
              onCreateOption={
                isLocked(effectiveConfig, "editRowValues")
                  ? undefined
                  : (propertyId, label) => handleCreateOption(_id, pageData, propertyId, label)
              }
              onComplete={
                isLocked(effectiveConfig, "editRowValues")
                  ? undefined
                  : (value) => handlePropertyChange(_id, "completedAt", value)
              }
              isFavorite={pageData.favoritedAt != null}
              onToggleFavorite={(value) => handleToggleFavorite(_id, value)}
              onDelete={
                isLocked(effectiveConfig, "deletePage") ? undefined : () => handleDeletePage(_id)
              }
              pageHref={pageHrefById}
              relationHref={(propertyId) => {
                const def = properties.find((d) => d.id === propertyId)
                return buildRelationBackLinkHref({
                  target: def ? readRelationConfig(def.config) : undefined,
                  rowId: _id,
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
