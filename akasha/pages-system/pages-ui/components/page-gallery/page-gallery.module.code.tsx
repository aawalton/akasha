"use client"

import { LoadMoreButton } from "@akasha/design-layout/load-more-button"
import { PanelDefaultOpenProvider } from "@akasha/design-layout/panel-default-open-context"
import { useLoadMore } from "@akasha/design-layout/use-load-more"
import { type GalleryCardSize, galleryCardMinWidth } from "@akasha/pages-core/view/gallery"
import type { ReactNode } from "react"

interface PageGalleryProps<T> {
  items: readonly T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T) => string
  cardSize: GalleryCardSize
  pageSize?: number
  resetKey?: string
  onServerLoadMore?: () => void
  canServerLoadMore?: boolean
  serverPrefetchPages?: number
}

export function PageGallery<T>({
  items,
  renderItem,
  keyExtractor,
  cardSize,
  pageSize = 12,
  resetKey,
  onServerLoadMore,
  canServerLoadMore,
  serverPrefetchPages,
}: PageGalleryProps<T>) {
  const { visibleCount, hasMore, loadMore } = useLoadMore({
    totalCount: items.length,
    pageSize,
    resetKey,
    onServerLoadMore,
    canServerLoadMore,
    serverPrefetchPages,
  })

  const visibleItems = items.slice(0, visibleCount)
  const minWidth = galleryCardMinWidth(cardSize)

  return (
    <PanelDefaultOpenProvider value={true}>
      <div className="flex flex-col gap-6">
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(min(${minWidth}px, 100%), 1fr))`,
          }}
        >
          {visibleItems.map((item, index) => (
            <div key={keyExtractor(item)} data-card-index={index} className="min-w-0">
              {renderItem(item, index)}
            </div>
          ))}
        </div>
        {hasMore && (
          <LoadMoreButton
            visibleCount={visibleCount}
            totalCount={items.length}
            onLoadMore={loadMore}
            indeterminate={canServerLoadMore && visibleCount >= items.length}
          />
        )}
      </div>
    </PanelDefaultOpenProvider>
  )
}
