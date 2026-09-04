"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import { LoadMoreButton } from "../load-more-button/load-more-button.module.code.tsx"
import { ResponsiveColumns } from "../responsive-columns/responsive-columns.module.code.tsx"
import { useLoadMore } from "../use-load-more/use-load-more.module.code.ts"
import { VirtualCardGrid } from "../virtual-card-grid/virtual-card-grid.module.code.tsx"

const VIRTUALIZATION_THRESHOLD = 50

interface PaginatedCardGridProps<T> {
  items: readonly T[]
  renderItem: (item: T, index: number) => ReactNode
  pageSize?: number
  trailingContent?: ReactNode
  itemLabel?: string
  initialVisibleCount?: number
  onVisibleCountChange?: (count: number) => void
  resetKey?: string
  keyExtractor?: (item: T) => string
  onServerLoadMore?: () => void
  canServerLoadMore?: boolean
}

export function PaginatedCardGrid<T>({
  items,
  renderItem,
  pageSize = 24,
  trailingContent,
  itemLabel = "items",
  initialVisibleCount,
  onVisibleCountChange,
  resetKey,
  keyExtractor,
  onServerLoadMore,
  canServerLoadMore,
}: PaginatedCardGridProps<T>) {
  const { visibleCount, hasMore, loadMore } = useLoadMore({
    totalCount: items.length,
    pageSize,
    initialVisibleCount,
    resetKey,
    onServerLoadMore,
    canServerLoadMore,
  })

  const prevVisibleCountRef = useRef(visibleCount)
  const gridRef = useRef<HTMLDivElement>(null)

  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    onVisibleCountChange?.(visibleCount)
  }, [visibleCount, onVisibleCountChange])

  useEffect(() => {
    const prevCount = prevVisibleCountRef.current
    prevVisibleCountRef.current = visibleCount

    if (visibleCount <= prevCount) return

    const newCount = visibleCount - prevCount
    setAnnouncement(
      `${newCount} more ${itemLabel} loaded, showing ${visibleCount} of ${items.length}`
    )

    const grid = gridRef.current
    if (!grid) return
    const firstNewCard = grid.querySelector<HTMLElement>(`[data-card-index="${prevCount}"]`)
    if (firstNewCard) {
      firstNewCard.focus({ preventScroll: true })
    }
  }, [visibleCount, items.length, itemLabel])

  const prevItemsLengthRef = useRef(items.length)
  useEffect(() => {
    const prev = prevItemsLengthRef.current
    prevItemsLengthRef.current = items.length

    if (prev !== items.length && items.length > 0) {
      setAnnouncement(`${items.length} ${itemLabel} match your filters`)
    }
  }, [items.length, itemLabel])

  const visibleItems = items.slice(0, visibleCount)
  const useVirtualization = visibleItems.length > VIRTUALIZATION_THRESHOLD

  return (
    <div ref={gridRef} className="flex flex-col gap-6">
      {}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {useVirtualization ? (
        <VirtualCardGrid
          items={visibleItems}
          renderItem={renderItem}
          trailingContent={trailingContent}
        />
      ) : (
        <ResponsiveColumns sortChildren={false}>
          {visibleItems.map((item, index) => (
            <div key={keyExtractor ? keyExtractor(item) : index} data-card-index={index}>
              {renderItem(item, index)}
            </div>
          ))}
          {trailingContent}
        </ResponsiveColumns>
      )}

      {hasMore && (
        <LoadMoreButton
          visibleCount={visibleCount}
          totalCount={items.length}
          onLoadMore={loadMore}
          indeterminate={canServerLoadMore && visibleCount >= items.length}
        />
      )}
    </div>
  )
}
