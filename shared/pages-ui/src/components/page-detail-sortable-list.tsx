"use client"

import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { GripVertical } from "lucide-react"
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react"
import type { PropertyDefinition } from "@shared/pages-core/types"
import { type DropZoneInfo, findDropZone } from "./drop-zones.ts"

function SortablePropertyRow({
  id,
  isDragSource,
  dropPosition,
  children,
}: {
  id: string
  isDragSource: boolean
  dropPosition?: "before" | "after"
  children: ReactNode
}) {
  const { attributes, listeners, setNodeRef } = useSortable({ id })
  return (
    <div
      ref={setNodeRef}
      data-sortable-id={id}
      {...attributes}
      className={[
        "relative flex items-center gap-1",
        dropPosition === "before"
          ? "before:pointer-events-none before:absolute before:top-0 before:right-0 before:left-0 before:h-0.5 before:bg-accent"
          : "",
        dropPosition === "after"
          ? "after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-accent"
          : "",
      ]
        .filter((s) => s !== "")
        .join(" ")}
      style={{ opacity: isDragSource ? 0.3 : undefined }}
    >
      <button
        type="button"
        aria-label="Reorder"
        className="cursor-grab touch-none text-tertiary active:cursor-grabbing"
        {...listeners}
      >
        <GripVertical className="size-3.5" />
      </button>
      {children}
    </div>
  )
}

export function SortablePropertyList({
  bodyDefs,
  onReorderDefinitions,
  propertyRow,
}: {
  bodyDefs: readonly PropertyDefinition[]
  onReorderDefinitions: (orderedIds: readonly string[]) => void
  propertyRow: (def: PropertyDefinition) => ReactNode
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dropZone, setDropZone] = useState<DropZoneInfo>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeIdRef = useRef<string | null>(null)

  const itemIds = bodyDefs.map((d) => d.id)
  const activeItem = activeId != null ? bodyDefs.find((d) => d.id === activeId) : null

  const updateDropZone = useCallback((pointerY: number) => {
    if (!containerRef.current || activeIdRef.current == null) return
    const rows = containerRef.current.querySelectorAll<HTMLElement>("[data-sortable-id]")
    const zoneItems: Array<{ id: string; rect: { top: number; height: number }; isRoot: boolean }> =
      []
    for (const row of rows) {
      const id = row.dataset.sortableId
      if (id == null) continue
      const rect = row.getBoundingClientRect()
      zoneItems.push({ id, rect: { top: rect.top, height: rect.height }, isRoot: false })
    }
    setDropZone(findDropZone(zoneItems, pointerY, activeIdRef.current))
  }, [])

  useEffect(() => {
    if (activeId == null) return
    const handlePointerMove = (e: PointerEvent) => {
      updateDropZone(e.clientY)
    }
    window.addEventListener("pointermove", handlePointerMove)
    return () => window.removeEventListener("pointermove", handlePointerMove)
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
    if (zone == null || zone.position === undefined) return
    const dragged = String(event.active.id)
    if (dragged === zone.id) return
    const rest = itemIds.filter((id) => id !== dragged)
    const target = rest.indexOf(zone.id)
    if (target === -1) return
    rest.splice(zone.position === "after" ? target + 1 : target, 0, dragged)
    onReorderDefinitions(rest)
  }

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds}>
        <div ref={containerRef} className="@container flex flex-col gap-2">
          {bodyDefs.map((def) => (
            <SortablePropertyRow
              key={def.id}
              id={def.id}
              isDragSource={activeId === def.id}
              dropPosition={dropZone?.id === def.id ? dropZone.position : undefined}
            >
              {propertyRow(def)}
            </SortablePropertyRow>
          ))}
        </div>
      </SortableContext>
      <DragOverlay modifiers={[restrictToVerticalAxis]} dropAnimation={null}>
        {activeItem ? (
          <div className="pointer-events-none opacity-60">{propertyRow(activeItem)}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
