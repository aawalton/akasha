import {
  type ViewConfig,
  type ViewDataJSON,
  type ViewLayout,
  type VisibilityChange,
  viewConfigToData,
} from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import type { GalleryCardSize } from "akasha/page/core/view/modules/gallery/gallery.module.code.ts"
import { reorderVisibleProperties } from "akasha/page/ui/component/modules/page-table-column-dnd-helpers/page-table-column-dnd-helpers.module.code.ts"
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
      onUpdateView(viewId, { pageTypeId: viewConfigPageTypeId, ...viewConfigToData(config) })
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
