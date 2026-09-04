"use client"

import { cn } from "@akasha/design-primitives/cn"
import { Table, TableHead, TableHeader, TableRow } from "@akasha/design-primitives/table"
import { PageTableColGroup } from "@akasha/pages-ui-components/page-table-colgroup"
import {
  applyColumnDrop,
  type ColumnDropZone,
  type ColumnRectMeasure,
  computeColumnDropZone,
} from "@akasha/pages-ui-components/page-table-column-dnd-helpers"
import {
  ACTIONS_COLUMN_PX,
  type PageTableColumn,
} from "@akasha/pages-ui-components/page-table-shared"
import { tableMinWidthPx } from "@akasha/pages-ui-components/page-table-widths"
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { horizontalListSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable"
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react"

interface SortableColumnHeaderProps {
  column: PageTableColumn
  isDragSource: boolean
  dropEdge?: "before" | "after"
  onRegister: (id: string, el: HTMLElement | null) => void
}

function SortableColumnHeader({
  column,
  isDragSource,
  dropEdge,
  onRegister,
}: SortableColumnHeaderProps) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: column.id })
  const setRefs = useCallback(
    (el: HTMLElement | null) => {
      setNodeRef(el)
      onRegister(column.id, el)
    },
    [setNodeRef, onRegister, column.id]
  )

  return (
    <TableHead className="relative cursor-grab overflow-hidden text-left normal-case transition-colors hover:bg-primary/5 active:cursor-grabbing">
      {dropEdge === "before" && (
        <span className="absolute inset-y-0 left-0 w-0.5 bg-accent" aria-hidden />
      )}
      {dropEdge === "after" && (
        <span className="absolute inset-y-0 right-0 w-0.5 bg-accent" aria-hidden />
      )}
      <button
        type="button"
        ref={setRefs}
        data-col-id={column.id}
        aria-label={`Reorder column ${column.label}`}
        className={cn(
          "flex w-full cursor-grab touch-none items-center gap-1 active:cursor-grabbing",
          isDragSource && "opacity-30"
        )}
        {...attributes}
        {...listeners}
      >
        <span className="truncate">{column.label}</span>
      </button>
    </TableHead>
  )
}

interface ReorderableColumnTableProps {
  columns: readonly PageTableColumn[]
  onReorderColumns: (orderedColumnIds: readonly string[]) => void
  hasRowActions?: boolean
  children: ReactNode
}

export function ReorderableColumnTable({
  columns,
  onReorderColumns,
  hasRowActions,
  children,
}: ReorderableColumnTableProps) {
  const columnById = new Map(columns.map((c) => [c.id, c]))
  const incomingIds = columns.map((c) => c.id)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )

  const [orderedIds, setOrderedIds] = useState<string[]>(() => incomingIds)
  const lastIncomingRef = useRef<string[]>(incomingIds)
  useEffect(() => {
    const prevIncoming = lastIncomingRef.current
    const unchanged =
      prevIncoming.length === incomingIds.length &&
      prevIncoming.every((id, i) => id === incomingIds[i])
    if (unchanged) return
    lastIncomingRef.current = incomingIds
    setOrderedIds(incomingIds)
  }, [incomingIds])

  const [activeId, setActiveId] = useState<string | null>(null)
  const [dropZone, setDropZone] = useState<ColumnDropZone>(null)
  const zoneRef = useRef<ColumnDropZone>(null)
  const headerRefs = useRef<Map<string, HTMLElement>>(new Map())

  const registerRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el === null) headerRefs.current.delete(id)
    else headerRefs.current.set(id, el)
  }, [])

  const updateDropZone = useCallback(
    (pointerX: number) => {
      if (activeId === null) return
      const measures: ColumnRectMeasure[] = []
      for (const [id, el] of headerRefs.current) {
        const rect = el.getBoundingClientRect()
        measures.push({ id, left: rect.left, width: rect.width })
      }
      const zone = computeColumnDropZone(measures, pointerX, activeId)
      zoneRef.current = zone
      setDropZone(zone)
    },
    [activeId]
  )

  useEffect(() => {
    if (activeId === null) return
    const onPointerMove = (e: PointerEvent) => updateDropZone(e.clientX)
    window.addEventListener("pointermove", onPointerMove)
    return () => window.removeEventListener("pointermove", onPointerMove)
  }, [activeId, updateDropZone])

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const zone = zoneRef.current
    const draggedId = String(event.active.id)
    setActiveId(null)
    setDropZone(null)
    zoneRef.current = null
    if (zone === null) return
    const next = applyColumnDrop(orderedIds, draggedId, zone)
    if (next === orderedIds) return
    setOrderedIds([...next])
    onReorderColumns(next)
  }

  function handleDragCancel() {
    setActiveId(null)
    setDropZone(null)
    zoneRef.current = null
  }

  const orderedColumns = orderedIds
    .map((id) => columnById.get(id))
    .filter((c): c is PageTableColumn => c !== undefined)
  const activeColumn = activeId !== null ? columnById.get(activeId) : undefined

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <Table
        className="table-fixed"
        style={{
          minWidth:
            tableMinWidthPx(orderedColumns) + (hasRowActions === true ? ACTIONS_COLUMN_PX : 0),
        }}
      >
        <PageTableColGroup columns={orderedColumns} hasRowActions={hasRowActions} />
        <TableHeader>
          <TableRow className="border-primary/10 border-b">
            <SortableContext items={orderedIds} strategy={horizontalListSortingStrategy}>
              {orderedColumns.map((column) => (
                <SortableColumnHeader
                  key={column.id}
                  column={column}
                  isDragSource={activeId === column.id}
                  dropEdge={dropZone?.columnId === column.id ? dropZone.position : undefined}
                  onRegister={registerRef}
                />
              ))}
            </SortableContext>
            {hasRowActions === true && (
              <TableHead className="overflow-hidden text-left normal-case" aria-hidden />
            )}
          </TableRow>
        </TableHeader>
        {children}
      </Table>
      <DragOverlay modifiers={[restrictToHorizontalAxis]} dropAnimation={null}>
        {activeColumn ? (
          <div className="pointer-events-none flex items-center gap-1 text-left text-secondary text-xs uppercase tracking-wide opacity-60">
            <span>{activeColumn.label}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
