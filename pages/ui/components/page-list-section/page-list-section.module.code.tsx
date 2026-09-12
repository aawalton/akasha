"use client"

import type { PropertyDefinition } from "akasha/pages/core/page-data/page-data.module.code.ts"
import type { ViewLayout } from "akasha/pages/core/schema/view-data/view-data.module.code.ts"
import {
  DEFAULT_GALLERY_CARD_SIZE,
  type GalleryCardSize,
} from "akasha/pages/core/view/gallery/gallery.module.code.ts"
import { buildTableColumns } from "akasha/pages/ui/components/modules/card-property-columns/card-property-columns.module.code.ts"
import { PageCardGrid } from "akasha/pages/ui/components/page-card-grid/page-card-grid.module.code.tsx"
import { PageGallery } from "akasha/pages/ui/components/page-gallery/page-gallery.module.code.tsx"
import { PageTable } from "akasha/pages/ui/components/page-table/page-table.module.code.tsx"
import type { PageTableColumn } from "akasha/pages/ui/components/page-table-shared/page-table-shared.module.code.ts"
import { withColumnWidths } from "akasha/pages/ui/components/page-table-widths/page-table-widths.module.code.ts"
import { SortableCardCollection } from "akasha/pages/ui/components/sortable-card-collection/sortable-card-collection.module.code.tsx"
import type { ReorderCardsHandler } from "akasha/pages/ui/components/use-reorder-view-wiring/use-reorder-view-wiring.module.code.ts"
import type { PageRow } from "akasha/pages/ui/components/view-engine/view-row/view-row.module.code.ts"
import type { ReactNode } from "react"

interface PageListSectionProps {
  layout?: ViewLayout
  items: readonly PageRow[]
  renderItem: (item: PageRow) => ReactNode
  renderRow?: (item: PageRow) => ReactNode
  onReorderColumns?: (orderedColumnIds: readonly string[]) => void
  onReorderCards?: ReorderCardsHandler
  hasRowActions?: boolean
  definitions: readonly PropertyDefinition[]
  columns?: readonly PageTableColumn[]
  visibleProperties?: readonly string[]
  pageSize: number
  resetKey: string
  onServerLoadMore?: () => void
  canServerLoadMore?: boolean
  serverPrefetchPages?: number
  galleryCardSize?: GalleryCardSize
}

export function PageListSection({
  layout,
  items,
  renderItem,
  renderRow,
  onReorderColumns,
  onReorderCards,
  hasRowActions,
  definitions,
  columns: sharedColumns,
  visibleProperties,
  pageSize,
  resetKey,
  onServerLoadMore,
  canServerLoadMore,
  serverPrefetchPages,
  galleryCardSize,
}: PageListSectionProps) {
  if (onReorderCards != null && layout !== "table") {
    return (
      <SortableCardCollection
        items={items}
        cardSize={galleryCardSize ?? DEFAULT_GALLERY_CARD_SIZE}
        onReorder={onReorderCards}
        pageSize={pageSize}
        resetKey={resetKey}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        onServerLoadMore={onServerLoadMore}
        canServerLoadMore={canServerLoadMore}
        serverPrefetchPages={serverPrefetchPages}
      />
    )
  }
  if (layout === "gallery" || layout === "notes") {
    return (
      <PageGallery
        items={items}
        cardSize={galleryCardSize ?? DEFAULT_GALLERY_CARD_SIZE}
        pageSize={pageSize}
        resetKey={resetKey}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        onServerLoadMore={onServerLoadMore}
        canServerLoadMore={canServerLoadMore}
        serverPrefetchPages={serverPrefetchPages}
      />
    )
  }
  if (layout === "table" && renderRow) {
    const columns =
      sharedColumns ??
      withColumnWidths(buildTableColumns(definitions, visibleProperties ?? []), items)
    return (
      <PageTable
        items={items}
        columns={columns}
        renderRow={renderRow}
        onReorderColumns={onReorderColumns}
        hasRowActions={hasRowActions}
        pageSize={pageSize}
        resetKey={resetKey}
        onServerLoadMore={onServerLoadMore}
        canServerLoadMore={canServerLoadMore}
        serverPrefetchPages={serverPrefetchPages}
      />
    )
  }
  return (
    <PageCardGrid
      items={items}
      pageSize={pageSize}
      resetKey={resetKey}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      onServerLoadMore={onServerLoadMore}
      canServerLoadMore={canServerLoadMore}
      serverPrefetchPages={serverPrefetchPages}
    />
  )
}
