"use client"

import { cn } from "@akasha/design-primitives/cn"
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { ArrowDown, ArrowUp, GripVertical, X } from "lucide-react"
import type { CSSProperties, HTMLAttributes } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  applySortDrop,
  computeSortDropZone,
  type SortDropZone,
  type SortRowMeasure,
} from "../sort-group-helpers/sort-group-helpers.module.code.ts"
import type { SortDirection } from "../sort-types/sort-types.module.code.ts"

const DROP_INDICATOR_CLASS = {
  before:
    "before:pointer-events-none before:absolute before:top-0 before:right-0 before:left-0 before:h-0.5 before:bg-accent",
  after:
    "after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-accent",
} as const

interface SortGroupProps {
  label: string
  direction: SortDirection
  onDirectionChange: (direction: SortDirection) => void
  onRemove: () => void
  canRemove?: boolean
  rowRef?: (node: HTMLElement | null) => void
  rowStyle?: CSSProperties
  rowAttrs?: HTMLAttributes<HTMLDivElement>
  gripListeners?: SyntheticListenerMap
  gripActive?: boolean
  rowId?: string
  dropIndicator?: "before" | "after"
}

export function SortGroup({
  label,
  direction,
  onDirectionChange,
  onRemove,
  canRemove = true,
  rowRef,
  rowStyle,
  rowAttrs,
  gripListeners,
  gripActive = false,
  rowId,
  dropIndicator,
}: SortGroupProps) {
  function toggleDirection() {
    const next: SortDirection = direction === "asc" ? "desc" : "asc"
    onDirectionChange(next)
  }

  return (
    <div
      ref={rowRef}
      style={rowStyle}
      {...rowAttrs}
      data-row-id={rowId}
      className={cn(
        "relative flex items-center justify-between gap-2",
        dropIndicator !== undefined && DROP_INDICATOR_CLASS[dropIndicator]
      )}
    >
      <div className="flex min-w-0 items-center gap-1.5">
        {gripActive && (
          <button
            type="button"
            aria-label={`Reorder ${label}`}
            className={cn("touch-none text-tertiary", "cursor-grab active:cursor-grabbing")}
            {...gripListeners}
          >
            <GripVertical className="size-3.5" />
          </button>
        )}
        <span className="truncate text-primary text-sm">{label}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={toggleDirection}
          aria-label={
            direction === "asc"
              ? "Sort ascending — click to sort descending"
              : "Sort descending — click to sort ascending"
          }
          className="cursor-pointer rounded p-1 text-tertiary transition-colors hover:text-primary"
        >
          {direction === "asc" ? <ArrowUp className="size-4" /> : <ArrowDown className="size-4" />}
        </button>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${label} sort`}
            className="cursor-pointer rounded p-1 text-tertiary transition-colors hover:text-primary"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export interface SortRow {
  id: string
  label: string
  direction: SortDirection
  canRemove?: boolean
  onDirectionChange: (direction: SortDirection) => void
  onRemove: () => void
}

interface SortableSortRowProps {
  row: SortRow
  dropIndicator?: "before" | "after"
}

function SortableSortRow({ row, dropIndicator }: SortableSortRowProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id: row.id })
  return (
    <SortGroup
      label={row.label}
      direction={row.direction}
      onDirectionChange={row.onDirectionChange}
      onRemove={row.onRemove}
      canRemove={row.canRemove}
      rowRef={setNodeRef}
      rowStyle={isDragging ? { opacity: 0.3 } : undefined}
      rowAttrs={attributes}
      gripListeners={listeners}
      gripActive={true}
      rowId={row.id}
      dropIndicator={dropIndicator}
    />
  )
}

interface SortableSortListProps {
  rows: readonly SortRow[]
  onReorder: (next: readonly string[]) => void
}

export function SortableSortList({ rows, onReorder }: SortableSortListProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dropZone, setDropZone] = useState<SortDropZone>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeIdRef = useRef<string | null>(null)

  const ids = useMemo(() => rows.map((r) => r.id), [rows])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )

  const updateDropZone = useCallback((pointerY: number) => {
    const container = containerRef.current
    const active = activeIdRef.current
    if (container === null || active === null) return
    const measures: SortRowMeasure[] = []
    for (const rowEl of container.querySelectorAll<HTMLElement>("[data-row-id]")) {
      const id = rowEl.dataset.rowId
      if (id === undefined) continue
      const rect = rowEl.getBoundingClientRect()
      measures.push({ id, top: rect.top, height: rect.height })
    }
    setDropZone(computeSortDropZone(measures, pointerY, active))
  }, [])

  useEffect(() => {
    if (activeId === null) return
    const onPointerMove = (e: PointerEvent) => updateDropZone(e.clientY)
    window.addEventListener("pointermove", onPointerMove)
    return () => window.removeEventListener("pointermove", onPointerMove)
  }, [activeId, updateDropZone])

  function handleDragStart(event: DragStartEvent) {
    const id = String(event.active.id)
    activeIdRef.current = id
    setActiveId(id)
  }

  function handleDragEnd(event: DragEndEvent) {
    const zone = dropZone
    activeIdRef.current = null
    setActiveId(null)
    setDropZone(null)
    if (zone === null) return
    const next = applySortDrop(ids, String(event.active.id), zone)
    if (next !== ids) onReorder(next)
  }

  function handleDragCancel() {
    activeIdRef.current = null
    setActiveId(null)
    setDropZone(null)
  }

  const activeRow = activeId !== null ? rows.find((r) => r.id === activeId) : undefined

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={ids}>
        <div ref={containerRef} className="flex flex-col gap-2">
          {rows.map((row) => {
            const dropIndicator =
              dropZone !== null && dropZone.rowId === row.id ? dropZone.position : undefined
            return <SortableSortRow key={row.id} row={row} dropIndicator={dropIndicator} />
          })}
        </div>
      </SortableContext>
      <DragOverlay modifiers={[restrictToVerticalAxis]} dropAnimation={null}>
        {activeRow ? (
          <div className="pointer-events-none opacity-60">
            <SortGroup
              label={activeRow.label}
              direction={activeRow.direction}
              onDirectionChange={activeRow.onDirectionChange}
              onRemove={activeRow.onRemove}
              canRemove={activeRow.canRemove}
              gripActive={true}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
