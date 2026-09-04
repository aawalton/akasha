"use client"

import { LoadMoreButton } from "@akasha/design-layout/load-more-button"
import { PanelDefaultOpenProvider } from "@akasha/design-layout/panel-default-open-context"
import { useColumnCount } from "@akasha/design-layout/use-column-count"
import { useLoadMore } from "@akasha/design-layout/use-load-more"
import { VirtualCardGrid } from "@akasha/design-layout/virtual-card-grid"
import type { ReactNode } from "react"

const VIRTUALIZATION_THRESHOLD = 50

interface PageCardGridProps<T> {
  items: readonly T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T) => string
  pageSize?: number
  resetKey?: string
  onServerLoadMore?: () => void
  canServerLoadMore?: boolean
  serverPrefetchPages?: number
}

export function PageCardGrid<T>({
  items,
  renderItem,
  keyExtractor,
  pageSize = 12,
  resetKey,
  onServerLoadMore,
  canServerLoadMore,
  serverPrefetchPages,
}: PageCardGridProps<T>) {
  const { visibleCount, hasMore, loadMore } = useLoadMore({
    totalCount: items.length,
    pageSize,
    resetKey,
    onServerLoadMore,
    canServerLoadMore,
    serverPrefetchPages,
  })

  const columnCount = useColumnCount() ?? 1
  const visibleItems = items.slice(0, visibleCount)
  const useVirtualization = visibleItems.length > VIRTUALIZATION_THRESHOLD

  const loadMoreButton = hasMore ? (
    <LoadMoreButton
      visibleCount={visibleCount}
      totalCount={items.length}
      onLoadMore={loadMore}
      indeterminate={canServerLoadMore && visibleCount >= items.length}
    />
  ) : null

  if (useVirtualization) {
    return (
      <PanelDefaultOpenProvider value={true}>
        <div className="flex flex-col gap-6">
          <VirtualCardGrid items={visibleItems} renderItem={renderItem} />
          {loadMoreButton}
        </div>
      </PanelDefaultOpenProvider>
    )
  }

  const columns: { item: T; index: number }[][] = Array.from({ length: columnCount }, () => [])
  for (const [i, item] of visibleItems.entries()) {
    const col = columns[i % columnCount]
    if (col === undefined) continue
    col.push({ item, index: i })
  }

  return (
    <PanelDefaultOpenProvider value={true}>
      <div className="relative flex flex-col gap-6">
        <div className="flex gap-6">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex min-w-0 flex-1 flex-col gap-6">
              {col.map(({ item, index }) => (
                <div key={keyExtractor(item)} data-card-index={index}>
                  {renderItem(item, index)}
                </div>
              ))}
            </div>
          ))}
        </div>
        {loadMoreButton}
      </div>
    </PanelDefaultOpenProvider>
  )
}
