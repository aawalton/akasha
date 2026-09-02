import type {
  ViewConfig,
  ViewDataJSON,
  ViewLayout,
  VisibilityChange,
} from "@akasha/pages-core/schema/view-data"
import type { GalleryCardSize } from "@akasha/pages-core/view/gallery"
import { reorderVisibleProperties } from "@akasha/pages-ui-components/page-table-column-dnd-helpers"
import { useCallback } from "react"

interface UseViewConfigHandlersArgs {
  onUpdateView: (id: string, updates: Partial<ViewDataJSON>) => void
  viewId: string
  viewConfigPageTypeId?: string
  visibleProperties?: readonly string[]
}

export function useViewConfigHandlers({
  onUpdateView,
  viewId,
  viewConfigPageTypeId,
  visibleProperties,
}: UseViewConfigHandlersArgs) {
  const handleConfigChange = useCallback(
    (config: ViewConfig) => {
      onUpdateView(viewId, {
        pageTypeId: viewConfigPageTypeId,
        filters: config.filters ? [...config.filters] : undefined,
        sorts: config.sorts ? [...config.sorts] : undefined,
        group_by: config.groupBy,
        group_sorts: config.groupSorts ? [...config.groupSorts] : undefined,
        group_granularity: config.groupGranularity,
        calendar_date_by: config.calendarDateBy,
        timeline_start_property: config.timelineStartProperty,
        timeline_end_property: config.timelineEndProperty,
        page_size: config.pageSize,
        group_page_size: config.groupPageSize,
        item_page_size: config.itemPageSize,
      })
    },
    [onUpdateView, viewId, viewConfigPageTypeId]
  )

  const handleVisibilityChange = useCallback(
    (next: VisibilityChange) => {
      onUpdateView(viewId, {
        visible_properties: [...next.visibleProperties],
        hidden_properties_order: [...next.hiddenPropertiesOrder],
        always_show_properties: [...next.alwaysShowProperties],
      })
    },
    [onUpdateView, viewId]
  )

  const handlePageTypeChange = useCallback(
    (newPageTypeId: string) => {
      onUpdateView(viewId, { pageTypeId: newPageTypeId })
    },
    [onUpdateView, viewId]
  )

  const handleReorderColumns = useCallback(
    (orderedColumnIds: readonly string[]) => {
      onUpdateView(viewId, {
        visible_properties: [
          ...reorderVisibleProperties(visibleProperties ?? [], orderedColumnIds),
        ],
      })
    },
    [onUpdateView, viewId, visibleProperties]
  )

  const handleLayoutChange = useCallback(
    (newLayout: ViewLayout) => {
      onUpdateView(viewId, { layout: newLayout })
    },
    [onUpdateView, viewId]
  )

  const handleGalleryCoverSourceChange = useCallback(
    (propertyId: string | null) => {
      onUpdateView(viewId, { gallery_cover_source: propertyId ?? undefined })
    },
    [onUpdateView, viewId]
  )

  const handleGalleryCardSizeChange = useCallback(
    (size: GalleryCardSize) => {
      onUpdateView(viewId, { gallery_card_size: size })
    },
    [onUpdateView, viewId]
  )

  const handleNotesPropertyChange = useCallback(
    (propertyId: string | null) => {
      onUpdateView(viewId, { notes_property: propertyId ?? undefined })
    },
    [onUpdateView, viewId]
  )

  return {
    handleConfigChange,
    handleVisibilityChange,
    handlePageTypeChange,
    handleReorderColumns,
    handleLayoutChange,
    handleGalleryCoverSourceChange,
    handleGalleryCardSizeChange,
    handleNotesPropertyChange,
  }
}
