"use client"

import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { type ReactNode, useMemo, useRef } from "react"
import { COLUMN_GAP } from "../layout-data/layout-data.module.code.ts"
import { useColumnCount } from "../use-column-count/use-column-count.module.code.tsx"

const CARD_HEIGHT = 232

type ColumnEntry<T> = { globalIndex: number } & ({ item: T } | { trailing: true })

interface VirtualCardGridProps<T> {
  items: readonly T[]
  renderItem: (item: T, index: number) => ReactNode
  trailingContent?: ReactNode
}

export function VirtualCardGrid<T>({
  items,
  renderItem,
  trailingContent,
}: VirtualCardGridProps<T>) {
  const columnCount = useColumnCount() ?? 1
  const listRef = useRef<HTMLDivElement>(null)

  const columns = useMemo(() => {
    const cols: ColumnEntry<T>[][] = Array.from({ length: columnCount }, () => [])
    const heights: number[] = new Array(columnCount).fill(0)

    const heightAt = (i: number): number => heights[i] ?? 0
    const colAt = (i: number): { push: (entry: ColumnEntry<T>) => unknown } | undefined => cols[i]

    for (let i = 0; i < items.length; i++) {
      let minCol = 0
      for (let c = 1; c < columnCount; c++) {
        if (heightAt(c) < heightAt(minCol)) minCol = c
      }
      const item = items[i]
      const col = colAt(minCol)
      if (item !== undefined && col) col.push({ item, globalIndex: i })
      heights[minCol] = heightAt(minCol) + CARD_HEIGHT + COLUMN_GAP
    }

    if (trailingContent != null) {
      let minCol = 0
      for (let c = 1; c < columnCount; c++) {
        if (heightAt(c) < heightAt(minCol)) minCol = c
      }
      const col = colAt(minCol)
      if (col) col.push({ trailing: true, globalIndex: -1 })
    }

    return cols
  }, [items, columnCount, trailingContent != null])

  const scrollMargin = listRef.current?.offsetTop ?? 0

  return (
    <div ref={listRef} className="flex" style={{ gap: COLUMN_GAP }}>
      {columns.map((column, colIdx) => (
        <VirtualColumn
          key={colIdx}
          entries={column}
          renderItem={renderItem}
          trailingContent={trailingContent}
          scrollMargin={scrollMargin}
        />
      ))}
    </div>
  )
}

interface VirtualColumnProps<T> {
  entries: readonly ColumnEntry<T>[]
  renderItem: (item: T, index: number) => ReactNode
  trailingContent?: ReactNode
  scrollMargin: number
}

function VirtualColumn<T>({
  entries,
  renderItem,
  trailingContent,
  scrollMargin,
}: VirtualColumnProps<T>) {
  const virtualizer = useWindowVirtualizer({
    count: entries.length,
    estimateSize: () => CARD_HEIGHT,
    gap: COLUMN_GAP,
    overscan: 3,
    scrollMargin,
  })

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div
      className="relative w-panel min-w-0 flex-shrink-0"
      style={{ height: virtualizer.getTotalSize() }}
    >
      {virtualItems.map((vItem) => {
        const entry = entries[vItem.index]
        if (!entry) return null
        const isTrailing = "trailing" in entry

        return (
          <div
            key={vItem.key}
            ref={virtualizer.measureElement}
            data-index={vItem.index}
            data-card-index={isTrailing ? undefined : entry.globalIndex}
            className="absolute top-0 left-0 w-full"
            style={{
              transform: `translateY(${vItem.start - scrollMargin}px)`,
            }}
          >
            {isTrailing ? trailingContent : renderItem(entry.item, entry.globalIndex)}
          </div>
        )
      })}
    </div>
  )
}
