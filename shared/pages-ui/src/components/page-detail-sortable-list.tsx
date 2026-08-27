"use client"

import type { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable"
import { GripVertical } from "lucide-react"
import { type ReactNode, useState } from "react"
import type { PropertyDefinition } from "@shared/pages-core/types"

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
      {...attributes}
      className={[
        "relative flex items-center gap-1",
        dropPosition === "before"
          ? "before:pointer-events-none before:absolute before:top-0 before:right-0 before:left-0 before:h-0.5 before:bg-tertiary"
          : "",
        dropPosition === "after"
          ? "after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-tertiary"
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
  const [overId, setOverId] = useState<string | null>(null)

  const itemIds = bodyDefs.map((d) => d.id)
  const activeItem = activeId != null ? bodyDefs.find((d) => d.id === activeId) : null
  const activeIndex = activeId != null ? itemIds.indexOf(activeId) : -1
  const overIndex = overId != null ? itemIds.indexOf(overId) : -1

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
  }

  function handleDragOver(event: DragOverEvent) {
    setOverId(event.over ? String(event.over.id) : null)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null)
    setOverId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = itemIds.indexOf(String(active.id))
    const newIndex = itemIds.indexOf(String(over.id))
    if (oldIndex === -1 || newIndex === -1) return
    const newOrder = arrayMove(itemIds, oldIndex, newIndex)
    onReorderDefinitions(newOrder)
  }

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds}>
        <div className="@container flex flex-col gap-2">
          {bodyDefs.map((def, i) => (
            <SortablePropertyRow
              key={def.id}
              id={def.id}
              isDragSource={activeId === def.id}
              dropPosition={
                overId === def.id && activeIndex !== -1 && overIndex !== -1 && activeIndex !== i
                  ? activeIndex > i
                    ? "before"
                    : "after"
                  : undefined
              }
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
