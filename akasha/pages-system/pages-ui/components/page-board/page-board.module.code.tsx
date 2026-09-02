"use client"

import { Badge } from "@akasha/design-badges/badge"
import { LoadMoreButton } from "@akasha/design-layout/load-more-button"
import { Heading } from "@akasha/design-primitives/heading"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import {
  type BoardColumnRect,
  computeBoardDropColumn,
} from "@akasha/pages-ui-components/page-board-dnd-helpers"
import type { ServerGroupedSection } from "@akasha/pages-ui-components/page-system-tab-content-props"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import type { DragStartEvent } from "@dnd-kit/core"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react"

interface PageBoardProps {
  groups: readonly ServerGroupedSection[]
  renderItem: (item: PageRow) => ReactNode
  onCardDrop?: (pageId: string, toGroupKey: string) => void
  draggable: boolean
  itemPageSize: number
}

function BoardCard({
  id,
  draggable,
  children,
}: {
  id: string
  draggable: boolean
  children: ReactNode
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: !draggable,
  })
  return (
    <div
      ref={setNodeRef}
      className={`${draggable ? "cursor-grab touch-none" : ""} ${isDragging ? "opacity-30" : ""}`}
      {...(draggable ? listeners : {})}
      {...(draggable ? attributes : {})}
    >
      {children}
    </div>
  )
}

export function PageBoard({
  groups,
  renderItem,
  onCardDrop,
  draggable,
  itemPageSize,
}: PageBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeIdRef = useRef<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dropTargetKey, setDropTargetKey] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )

  const canDrag = draggable && onCardDrop != null

  const sourceKeyFor = useCallback(
    (pageId: string): string | null => {
      for (const group of groups) {
        if (group.items.some((item) => item._id === pageId)) return group.key
      }
      return null
    },
    [groups]
  )

  const updateDropTarget = useCallback((pointerX: number) => {
    const container = containerRef.current
    if (container === null || activeIdRef.current === null) return
    const rects: BoardColumnRect[] = []
    for (const colEl of container.querySelectorAll<HTMLElement>("[data-column-key]")) {
      const key = colEl.dataset.columnKey
      if (key === undefined) continue
      const rect = colEl.getBoundingClientRect()
      rects.push({ key, left: rect.left, width: rect.width })
    }
    setDropTargetKey(computeBoardDropColumn(rects, pointerX))
  }, [])

  useEffect(() => {
    if (activeId === null) return
    const onPointerMove = (e: PointerEvent) => updateDropTarget(e.clientX)
    window.addEventListener("pointermove", onPointerMove)
    return () => window.removeEventListener("pointermove", onPointerMove)
  }, [activeId, updateDropTarget])

  function handleDragStart(event: DragStartEvent) {
    const id = String(event.active.id)
    activeIdRef.current = id
    setActiveId(id)
  }

  function handleDragEnd() {
    const id = activeIdRef.current
    const target = dropTargetKey
    activeIdRef.current = null
    setActiveId(null)
    setDropTargetKey(null)
    if (!canDrag || id === null || target === null) return
    if (sourceKeyFor(id) === target) return
    onCardDrop?.(id, target)
  }

  function handleDragCancel() {
    activeIdRef.current = null
    setActiveId(null)
    setDropTargetKey(null)
  }

  const activeItem =
    activeId !== null
      ? groups.flatMap((g) => g.items).find((item) => item._id === activeId)
      : undefined

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div ref={containerRef} className="flex gap-3 overflow-x-auto pb-2">
        {groups.map((group) => {
          const isTarget = canDrag && dropTargetKey === group.key && activeId !== null
          const count = group.totalCount ?? group.items.length
          return (
            <div
              key={group.key}
              data-column-key={group.key}
              className={`flex w-72 shrink-0 flex-col gap-2 rounded-lg p-2 ${surfaceClass(1)} ${
                isTarget ? "ring-2 ring-accent" : ""
              }`}
            >
              <div className="flex items-center gap-2 px-1">
                <Heading variant="label-muted">{group.label}</Heading>
                <Badge variant="elevation-muted">{count}</Badge>
              </div>
              {isTarget && <div className="h-0.5 rounded bg-accent" />}
              <div className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <BoardCard key={item._id} id={item._id} draggable={canDrag}>
                    {renderItem(item)}
                  </BoardCard>
                ))}
              </div>
              {group.canLoadMore === true && group.loadMore !== undefined && (
                <LoadMoreButton
                  visibleCount={group.items.length}
                  totalCount={group.totalCount ?? group.items.length + itemPageSize}
                  onLoadMore={group.loadMore}
                />
              )}
            </div>
          )
        })}
      </div>
      <DragOverlay modifiers={[restrictToHorizontalAxis]} dropAnimation={null}>
        {activeItem ? (
          <div className="pointer-events-none w-72 opacity-60">{renderItem(activeItem)}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
