"use client"

import { Icon } from "@akasha/design-patterns/lucide-icon"
import { TabsList, TabsTrigger } from "@akasha/design-patterns/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@akasha/design-primitives/dropdown-menu"
import type { ViewDataJSON } from "@akasha/pages-core/schema/view-data"
import type { ViewCallbacks } from "@akasha/pages-ui/mutators/view-callbacks"
import { CreateViewPopover } from "@akasha/pages-ui-components/create-view-popover"
import {
  VIEW_FALLBACK_ICON_NAME,
  ViewTabContextMenu,
  type ViewTabItem,
} from "@akasha/pages-ui-components/view-tab-context-menu"
import type { DragEndEvent } from "@dnd-kit/core"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { horizontalListSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Ellipsis } from "lucide-react"
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react"

const FULL_TAB_W = 140
const ICON_TAB_W = 36
const ADD_BTN_W = 36
const MORE_BTN_W = 36

interface SortableViewTabProps {
  view: ViewTabItem
  viewCount: number
  mode: "full" | "icon"
  callbacks: ViewCallbacks
}

function SortableViewTab({ view, viewCount, mode, callbacks }: SortableViewTabProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: view.id,
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    position: "relative",
    zIndex: isDragging ? 1 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={mode === "icon" ? "flex shrink-0" : "flex min-w-0 flex-1"}
      {...attributes}
      {...listeners}
    >
      <ViewTabContextMenu view={view} viewCount={viewCount} mode={mode} callbacks={callbacks} />
    </div>
  )
}

export type ViewTabMode = "full" | "icon" | "overflow"

export function classifyViewTabs(
  orderedIds: readonly string[],
  activeId: string | undefined,
  fullCount: number,
  iconCount: number
): Map<string, ViewTabMode> {
  const ranked = orderedIds
    .map((id, index) => ({ id, rank: id === activeId ? -1 : index }))
    .sort((a, b) => a.rank - b.rank)

  const out = new Map<string, ViewTabMode>()
  for (const [i, entry] of ranked.entries()) {
    const mode: ViewTabMode =
      i < fullCount ? "full" : i < fullCount + iconCount ? "icon" : "overflow"
    out.set(entry.id, mode)
  }
  return out
}

function useTabLayout(viewCount: number) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<{ fullCount: number; iconCount: number }>({
    fullCount: viewCount,
    iconCount: 0,
  })

  const compute = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const available = el.clientWidth - ADD_BTN_W
    if (viewCount === 0) {
      setLayout({ fullCount: 0, iconCount: 0 })
      return
    }

    if (viewCount * FULL_TAB_W <= available) {
      setLayout({ fullCount: viewCount, iconCount: 0 })
      return
    }

    const availableWithMore = available - MORE_BTN_W
    const maxFull = Math.max(0, Math.floor(availableWithMore / FULL_TAB_W))
    const remaining = viewCount - maxFull
    const spaceAfterFull = availableWithMore - maxFull * FULL_TAB_W
    const maxIcons = Math.max(0, Math.floor(spaceAfterFull / ICON_TAB_W))
    const iconCount = Math.min(remaining, maxIcons)

    setLayout({ fullCount: maxFull, iconCount })
  }, [viewCount])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => compute())
    observer.observe(el)
    compute()
    return () => observer.disconnect()
  }, [compute])

  return { containerRef, layout }
}

interface OverflowMenuProps {
  views: readonly ViewTabItem[]
  activeTab: string | undefined
  onSelect: (viewId: string) => void
}

function OverflowMenu({ views, activeTab, onSelect }: OverflowMenuProps) {
  if (views.length === 0) return null

  const hasActive = views.some((v) => v.id === activeTab)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`flex h-[calc(100%-1px)] shrink-0 cursor-pointer items-center justify-center rounded-md px-2 text-sm transition-colors focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)] ${hasActive ? "font-bold text-accent" : "text-tertiary hover:bg-primary/8 hover:text-primary"}`}
          style={{ width: MORE_BTN_W }}
        >
          <Ellipsis className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {views.map((view) => (
          <DropdownMenuItem
            key={view.id}
            onSelect={() => onSelect(view.id)}
            className={view.id === activeTab ? "font-bold text-accent" : undefined}
          >
            <Icon name={view.iconName ?? VIEW_FALLBACK_ICON_NAME} className="size-4 shrink-0" />
            <span className="truncate">{view.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ViewTabsProps {
  views: readonly ViewTabItem[]
  callbacks: ViewCallbacks
  currentViewData?: ViewDataJSON
  activeViewId?: string
}

export function ViewTabs({ views, callbacks, currentViewData, activeViewId }: ViewTabsProps) {
  const { containerRef, layout } = useTabLayout(views.length)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor)
  )

  const [orderedIds, setOrderedIds] = useState<string[]>(() => views.map((v) => v.id))

  useEffect(() => {
    const incomingIds = views.map((v) => v.id)
    setOrderedIds((prev) => {
      const prevSet = new Set(prev)
      const incomingSet = new Set(incomingIds)
      if (prev.length === incomingIds.length && prev.every((id) => incomingSet.has(id))) {
        return prev
      }
      const kept = prev.filter((id) => incomingSet.has(id))
      const added = incomingIds.filter((id) => !prevSet.has(id))
      return [...kept, ...added]
    })
  }, [views])

  const viewById = new Map(views.map((v) => [v.id, v]))
  const orderedViews = orderedIds
    .map((id) => viewById.get(id))
    .filter((v): v is ViewTabItem => v !== undefined)

  const activeTab = activeViewId ?? views[0]?.id

  const classification = classifyViewTabs(
    orderedViews.map((v) => v.id),
    activeTab,
    layout.fullCount,
    layout.iconCount
  )
  const overflowViews = orderedViews.filter((v) => classification.get(v.id) === "overflow")
  const visibleViews = orderedViews.filter((v) => classification.get(v.id) !== "overflow")
  const visibleIds = visibleViews.map((v) => v.id)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const visibleIdSet = new Set(visibleIds)
    if (!visibleIdSet.has(String(active.id)) || !visibleIdSet.has(String(over.id))) return

    const oldIndex = orderedIds.indexOf(String(active.id))
    const newIndex = orderedIds.indexOf(String(over.id))
    if (oldIndex === -1 || newIndex === -1) return

    const newIds = [...orderedIds]
    newIds.splice(oldIndex, 1)
    newIds.splice(newIndex, 0, String(active.id))

    setOrderedIds(newIds)
    callbacks.onReorderViews(newIds)
  }

  const [overflowSelect, setOverflowSelect] = useState<string | null>(null)

  const hiddenTriggersRef = useRef<Map<string, HTMLButtonElement>>(new Map())
  useEffect(() => {
    if (overflowSelect != null) {
      const trigger = hiddenTriggersRef.current.get(overflowSelect)
      if (trigger) {
        trigger.click()
      }
      setOverflowSelect(null)
    }
  }, [overflowSelect])

  return (
    <div ref={containerRef} className="w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={visibleIds} strategy={horizontalListSortingStrategy}>
          <TabsList className="flex h-9 select-none flex-nowrap items-center justify-start gap-0 rounded-lg">
            {visibleViews.map((view) => (
              <SortableViewTab
                key={view.id}
                view={view}
                viewCount={views.length}
                mode={classification.get(view.id) === "full" ? "full" : "icon"}
                callbacks={callbacks}
              />
            ))}
            {overflowViews.length > 0 && (
              <OverflowMenu
                views={overflowViews}
                activeTab={activeTab}
                onSelect={setOverflowSelect}
              />
            )}
            {overflowViews.map((view) => (
              <TabsTrigger
                key={`hidden-${view.id}`}
                ref={(el) => {
                  if (el) {
                    hiddenTriggersRef.current.set(view.id, el)
                  } else {
                    hiddenTriggersRef.current.delete(view.id)
                  }
                }}
                value={view.id}
                className="!absolute !size-0 !overflow-hidden !opacity-0"
                tabIndex={-1}
                aria-hidden
              />
            ))}
            <div className="flex h-full items-stretch pl-1">
              <CreateViewPopover
                currentViewData={currentViewData}
                onCreate={callbacks.onCreateView}
              />
            </div>
          </TabsList>
        </SortableContext>
      </DndContext>
    </div>
  )
}
