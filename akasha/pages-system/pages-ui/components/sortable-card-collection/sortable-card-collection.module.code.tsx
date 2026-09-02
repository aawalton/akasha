"use client"

import { LoadMoreButton } from "@akasha/design-layout/load-more-button"
import { PanelDefaultOpenProvider } from "@akasha/design-layout/panel-default-open-context"
import { useLoadMore } from "@akasha/design-layout/use-load-more"
import { type GalleryCardSize, galleryCardMinWidth } from "@akasha/pages-core/view/gallery"
import type { ReorderCardsHandler } from "@akasha/pages-ui-components/use-reorder-view-wiring"
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react"

interface SortableCardCollectionProps<T> {
  items: readonly T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T) => string
  cardSize: GalleryCardSize
  onReorder: ReorderCardsHandler
  pageSize?: number
  resetKey?: string
  onServerLoadMore?: () => void
  canServerLoadMore?: boolean
  serverPrefetchPages?: number
}

function SortableCard({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })
  return (
    <div
      ref={setNodeRef}
      data-sortable-card-id={id}
      {...attributes}
      {...listeners}
      className="min-w-0 touch-none"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : undefined,
      }}
    >
      {children}
    </div>
  )
}

export function SortableCardCollection<T>({
  items,
  renderItem,
  keyExtractor,
  cardSize,
  onReorder,
  pageSize = 12,
  resetKey,
  onServerLoadMore,
  canServerLoadMore,
  serverPrefetchPages,
}: SortableCardCollectionProps<T>) {
  const { visibleCount, hasMore, loadMore } = useLoadMore({
    totalCount: items.length,
    pageSize,
    resetKey,
    onServerLoadMore,
    canServerLoadMore,
    serverPrefetchPages,
  })

  const itemByKey = useMemo(() => {
    const map = new Map<string, { item: T; index: number }>()
    items.forEach((item, index) => map.set(keyExtractor(item), { item, index }))
    return map
  }, [items, keyExtractor])
  const incomingIds = useMemo(() => items.map(keyExtractor), [items, keyExtractor])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const [orderedIds, setOrderedIds] = useState<readonly string[]>(() => incomingIds)
  const lastIncomingRef = useRef<readonly string[]>(incomingIds)
  useEffect(() => {
    const prev = lastIncomingRef.current
    const unchanged =
      prev.length === incomingIds.length && prev.every((id, i) => id === incomingIds[i])
    if (unchanged) return
    lastIncomingRef.current = incomingIds
    setOrderedIds(incomingIds)
  }, [incomingIds])

  const [activeId, setActiveId] = useState<string | null>(null)
  const minWidth = galleryCardMinWidth(cardSize)
  const visibleIds = orderedIds.slice(0, visibleCount)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null)
    const { active, over } = event
    if (over === null) return
    const fromIndex = orderedIds.indexOf(String(active.id))
    const toIndex = orderedIds.indexOf(String(over.id))
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return
    const next = arrayMove([...orderedIds], fromIndex, toIndex)
    setOrderedIds(next)
    onReorder({ orderedIds: next, fromIndex, toIndex })
  }

  const activeEntry = activeId !== null ? itemByKey.get(activeId) : undefined

  return (
    <PanelDefaultOpenProvider value={true}>
      <div className="flex flex-col gap-6">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <SortableContext items={visibleIds} strategy={rectSortingStrategy}>
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(min(${minWidth}px, 100%), 1fr))`,
              }}
            >
              {visibleIds.map((id) => {
                const entry = itemByKey.get(id)
                if (entry === undefined) return null
                return (
                  <SortableCard key={id} id={id}>
                    {renderItem(entry.item, entry.index)}
                  </SortableCard>
                )
              })}
            </div>
          </SortableContext>
          <DragOverlay dropAnimation={null}>
            {activeEntry ? (
              <div className="min-w-0 opacity-80">
                {renderItem(activeEntry.item, activeEntry.index)}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
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
