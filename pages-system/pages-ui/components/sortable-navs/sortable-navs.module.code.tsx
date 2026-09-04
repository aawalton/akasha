"use client"

import type { AppNavItem } from "@akasha/design-layout/nav-types"
import { SidebarNavGroup } from "@akasha/design-layout/sidebar-nav-group"
import { useSidebarState } from "@akasha/design-layout/use-sidebar-state"
import { cn } from "@akasha/design-primitives/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { PagesUILink, usePagesUIRouter } from "@akasha/pages-ui/navigation-context"
import { type DropZoneInfo, findDropZone } from "@akasha/pages-ui-components/drop-zones"
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
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react"

function SortableNavItem({
  id,
  children,
  isNestTarget,
  reorderPosition,
  isDragSource,
}: {
  id: string
  children: ReactNode
  isNestTarget?: boolean
  reorderPosition?: "before" | "after" | null
  isDragSource?: boolean
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id })
  const wasDragging = useRef(false)

  useEffect(() => {
    if (isDragging) {
      wasDragging.current = true
    }
  }, [isDragging])

  const handleClickCapture = (e: React.MouseEvent) => {
    if (wasDragging.current) {
      e.preventDefault()
      e.stopPropagation()
      wasDragging.current = false
    }
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClickCapture={handleClickCapture}
      style={{ position: "relative", opacity: isDragSource ? 0.3 : undefined }}
      className={[
        isNestTarget ? "rounded-md bg-accent/10 ring-1 ring-accent/30" : "",
        reorderPosition === "before"
          ? "before:pointer-events-none before:absolute before:top-0 before:right-0 before:left-0 before:h-0.5 before:bg-accent"
          : "",
        reorderPosition === "after"
          ? "after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-accent"
          : "",
      ]
        .filter((s) => s !== "")
        .join(" ")}
    >
      {children}
    </div>
  )
}

interface SortableNavsProps {
  items: readonly AppNavItem[]
  dynamicItemIds: readonly string[]
  onReorder: (pageIds: readonly string[]) => void
  onSetParent: (childPageId: string, parentPageId: string | null) => void
  rootItemIds: Set<string>
  childItemIds: Set<string>
  childrenByParentId: Map<string, string[]>
  renderItem: (item: AppNavItem) => ReactNode
}

export function SortableNavs({
  items,
  dynamicItemIds,
  onReorder,
  onSetParent,
  rootItemIds,
  childItemIds,
  childrenByParentId,
  renderItem,
}: SortableNavsProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )
  const { pathname } = usePagesUIRouter()

  const dynamicIdSet = new Set(dynamicItemIds)
  const childIdSet = new Set(childItemIds)
  const [dropZone, setDropZone] = useState<DropZoneInfo>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeIdRef = useRef<string | null>(null)

  const updateDropZone = useCallback(
    (pointerY: number) => {
      if (!containerRef.current || activeIdRef.current == null) return

      const itemElements = containerRef.current.querySelectorAll<HTMLElement>("[data-sortable-id]")
      const zoneItems: Array<{
        id: string
        rect: { top: number; height: number }
        isRoot: boolean
      }> = []

      for (const el of itemElements) {
        const id = el.dataset.sortableId
        if (id == null) continue
        const rect = el.getBoundingClientRect()
        zoneItems.push({
          id,
          rect: { top: rect.top, height: rect.height },
          isRoot: rootItemIds.has(id),
        })
      }

      setDropZone(findDropZone(zoneItems, pointerY, activeIdRef.current))
    },
    [rootItemIds]
  )

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
    const currentDropZone = dropZone
    activeIdRef.current = null
    setActiveId(null)
    setDropZone(null)

    if (!currentDropZone) return

    const draggedId = String(event.active.id)
    const targetId = currentDropZone.id
    if (draggedId === targetId) return

    const draggedPageId = draggedId.replace(/^view-/, "")

    if (currentDropZone.type === "nest") {
      const targetPageId = targetId.replace(/^view-/, "")
      onSetParent(draggedPageId, targetPageId)
    } else {
      const isActiveRoot = rootItemIds.has(draggedId)
      if (!isActiveRoot) {
        onSetParent(draggedPageId, null)
      }

      const currentRootIds = items.filter((i) => rootItemIds.has(i.id)).map((i) => i.id)
      const workingIds = isActiveRoot ? [...currentRootIds] : [...currentRootIds, draggedId]
      const filtered = workingIds.filter((id) => id !== draggedId)

      let targetIndex = filtered.indexOf(targetId)
      if (targetIndex === -1) {
        const flatIndex = items.findIndex((i) => i.id === targetId)
        if (flatIndex === -1) return
        for (let i = flatIndex; i >= 0; i--) {
          const item = items[i]
          if (!item) continue
          const parentIdx = filtered.indexOf(item.id)
          if (parentIdx !== -1) {
            targetIndex = parentIdx
            break
          }
        }
        if (targetIndex === -1) targetIndex = filtered.length - 1
      }

      const insertIndex = currentDropZone.position === "after" ? targetIndex + 1 : targetIndex
      filtered.splice(insertIndex, 0, draggedId)
      onReorder(filtered.map((id) => id.replace(/^view-/, "")))
    }
  }

  const itemById = new Map(items.map((i) => [i.id, i]))
  const activeItem = activeId != null ? itemById.get(activeId) : null
  const { effectiveIsCollapsed } = useSidebarState()

  const navLinkClassName = (active: boolean) =>
    cn(
      "group flex w-full cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
      active
        ? `font-semibold text-accent ${surfaceClass(2)}`
        : "text-secondary hover:bg-surface-2 hover:text-primary",
      effectiveIsCollapsed && "justify-center px-0"
    )

  const popoverLinkClassName = (active: boolean) =>
    cn(
      "flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
      active
        ? `font-semibold text-accent ${surfaceClass(2)}`
        : "text-secondary hover:bg-surface-2 hover:text-primary"
    )

  function DynamicNavItem(item: AppNavItem) {
    const childIds = childrenByParentId.get(item.id)
    const hasChildren = childIds && childIds.length > 0

    if (hasChildren) {
      const anyChildActive = childIds.some((cid) => {
        const child = itemById.get(cid)
        return child?.activePrefix != null && pathname.startsWith(child.activePrefix)
      })
      const isParentActive =
        !anyChildActive && item.activePrefix != null && pathname.startsWith(item.activePrefix)

      if (effectiveIsCollapsed) {
        return (
          <SortableNavItem
            key={item.id}
            id={item.id}
            isDragSource={activeId === item.id}
            isNestTarget={dropZone?.id === item.id && dropZone.type === "nest"}
            reorderPosition={
              dropZone?.id === item.id && dropZone.type === "reorder"
                ? (dropZone.position ?? null)
                : null
            }
          >
            <div data-sortable-id={item.id}>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(navLinkClassName(isParentActive || anyChildActive), "w-full")}
                    title={item.shortLabel}
                  >
                    {item.iconStatic ??
                      item.iconSlot ??
                      (item.icon && <item.icon className="h-5 w-5 shrink-0" />)}
                  </button>
                </PopoverTrigger>
                <PopoverContent side="right" align="start" className="w-56 p-1">
                  <nav className="space-y-0.5">
                    {item.href != null && (
                      <PagesUILink
                        href={item.href}
                        className={popoverLinkClassName(!anyChildActive && isParentActive)}
                        aria-current={isParentActive ? "page" : undefined}
                      >
                        <span>{item.label}</span>
                      </PagesUILink>
                    )}
                    {childIds.map((childId) => {
                      const childItem = itemById.get(childId)
                      if (!childItem) return null
                      const childIsActive =
                        childItem.activePrefix != null &&
                        pathname.startsWith(childItem.activePrefix)
                      return (
                        <PagesUILink
                          key={childId}
                          href={childItem.href ?? "#"}
                          className={popoverLinkClassName(childIsActive)}
                          aria-current={childIsActive ? "page" : undefined}
                        >
                          <span>{childItem.label}</span>
                        </PagesUILink>
                      )
                    })}
                  </nav>
                </PopoverContent>
              </Popover>
            </div>
          </SortableNavItem>
        )
      }

      const itemRow: AppNavItem = { ...item, children: undefined }
      return (
        <SortableNavItem
          key={item.id}
          id={item.id}
          isDragSource={activeId === item.id}
          isNestTarget={dropZone?.id === item.id && dropZone.type === "nest"}
          reorderPosition={
            dropZone?.id === item.id && dropZone.type === "reorder"
              ? (dropZone.position ?? null)
              : null
          }
        >
          <div data-sortable-id={item.id}>
            <SidebarNavGroup
              headerClassName={cn(
                "rounded-md pr-2 transition-colors",
                isParentActive ? surfaceClass(2) : "hover:bg-surface-2"
              )}
              trigger={renderItem(itemRow)}
              defaultOpen={anyChildActive}
            >
              <nav className="space-y-1">
                {childIds.map((childId) => {
                  const childItem = itemById.get(childId)
                  if (!childItem) return null
                  return (
                    <SortableNavItem
                      key={childId}
                      id={childId}
                      isDragSource={activeId === childId}
                      reorderPosition={
                        dropZone?.id === childId && dropZone.type === "reorder"
                          ? (dropZone.position ?? null)
                          : null
                      }
                    >
                      <div data-sortable-id={childId} className="pl-6">
                        {renderItem(childItem)}
                      </div>
                    </SortableNavItem>
                  )
                })}
              </nav>
            </SidebarNavGroup>
          </div>
        </SortableNavItem>
      )
    }

    return (
      <SortableNavItem
        key={item.id}
        id={item.id}
        isDragSource={activeId === item.id}
        isNestTarget={dropZone?.id === item.id && dropZone.type === "nest"}
        reorderPosition={
          dropZone?.id === item.id && dropZone.type === "reorder"
            ? (dropZone.position ?? null)
            : null
        }
      >
        <div data-sortable-id={item.id}>{renderItem(item)}</div>
      </SortableNavItem>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={[...dynamicItemIds]}>
        <div ref={containerRef} className="space-y-1">
          {items.map((item) => {
            if (!dynamicIdSet.has(item.id)) return renderItem(item)
            if (childIdSet.has(item.id)) return null
            return DynamicNavItem(item)
          })}
        </div>
      </SortableContext>
      <DragOverlay modifiers={[restrictToVerticalAxis]} dropAnimation={null}>
        {activeItem ? (
          <div className="pointer-events-none opacity-60">
            {renderItem({ ...activeItem, children: undefined })}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
