"use client"

import { getEsoDayStr } from "@akasha/day/eso-day"
import { Badge } from "@akasha/design-badges/badge"
import { Button } from "@akasha/design-primitives/button"
import { FilterableList, FilterableListItem } from "@akasha/design-primitives/filterable-list"
import { Heading } from "@akasha/design-primitives/heading"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import {
  buildMonthGrid,
  CALENDAR_WEEKDAY_LABELS,
  monthKeyOf,
  shiftMonth,
} from "@akasha/pages-core/view/calendar-grid"
import { usePageCalendarState } from "@akasha/pages-ui-components/use-page-calendar-state"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import { DndContext, DragOverlay, useDraggable } from "@dnd-kit/core"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useState,
} from "react"

interface PageCalendarProps {
  items: readonly PageRow[]
  dateProperty: PropertyDefinition | undefined
  renderItem: (item: PageRow) => ReactNode
  draggable: boolean
  onReschedule?: (pageId: string, dayStr: string) => void
  onQuickAdd?: (dayStr: string) => void | Promise<void>
  dateOptions: readonly { id: string; label: string }[]
  calendarDateBy: string | null
  onCalendarDateByChange: (id: string) => void
}

const MAX_EVENTS_PER_DAY = 4

function CalendarEvent({
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
      data-calendar-event
      className={`${draggable ? "cursor-grab touch-none" : ""} ${isDragging ? "opacity-30" : ""}`}
      {...(draggable ? listeners : {})}
      {...(draggable ? attributes : {})}
    >
      {children}
    </div>
  )
}

function DatePropertyPicker({
  dateOptions,
  calendarDateBy,
  onCalendarDateByChange,
}: {
  dateOptions: readonly { id: string; label: string }[]
  calendarDateBy: string | null
  onCalendarDateByChange: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const current = dateOptions.find((o) => o.id === calendarDateBy)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="tertiary" size="sm">
          <CalendarIcon className="size-3.5" />
          {current?.label ?? "Pick date property"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <FilterableList>
          {dateOptions.map((option) => (
            <FilterableListItem
              key={option.id}
              selected={option.id === calendarDateBy}
              onSelect={() => {
                onCalendarDateByChange(option.id)
                setOpen(false)
              }}
            >
              {option.label}
            </FilterableListItem>
          ))}
        </FilterableList>
      </PopoverContent>
    </Popover>
  )
}

function DayCell({
  day,
  events,
  inFocusedMonth,
  isToday,
  isDropTarget,
  canDrag,
  onQuickAdd,
  renderItem,
}: {
  day: string
  events: readonly PageRow[]
  inFocusedMonth: boolean
  isToday: boolean
  isDropTarget: boolean
  canDrag: boolean
  onQuickAdd?: (dayStr: string) => void | Promise<void>
  renderItem: (item: PageRow) => ReactNode
}) {
  const dayNum = Number(day.slice(8))
  const shown = events.slice(0, MAX_EVENTS_PER_DAY)
  const overflow = events.length - shown.length
  const interactive =
    onQuickAdd !== undefined
      ? {
          role: "button" as const,
          tabIndex: 0,
          "aria-label": `Add on ${day}`,
          onClick: (e: ReactMouseEvent) => {
            if (e.target instanceof Element && e.target.closest("[data-calendar-event]") !== null) {
              return
            }
            void onQuickAdd(day)
          },
          onKeyDown: (e: ReactKeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              void onQuickAdd(day)
            }
          },
        }
      : {}
  return (
    <div
      data-calendar-day={day}
      {...interactive}
      className={`flex min-h-24 flex-col gap-1 rounded-md p-1.5 ${surfaceClass(1)} ${
        onQuickAdd !== undefined ? "cursor-pointer" : ""
      } ${inFocusedMonth ? "" : "opacity-50"} ${isDropTarget ? "ring-2 ring-accent" : ""}`}
    >
      <div className="flex items-center justify-between px-0.5">
        <span
          className={`text-xs ${
            isToday
              ? "flex size-5 items-center justify-center rounded-md bg-accent/15 font-medium text-accent"
              : "text-tertiary"
          }`}
        >
          {Number.isNaN(dayNum) ? "" : dayNum}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {shown.map((item) => (
          <CalendarEvent key={item._id} id={item._id} draggable={canDrag}>
            {renderItem(item)}
          </CalendarEvent>
        ))}
        {overflow > 0 && <Badge variant="elevation-muted">{`+${overflow} more`}</Badge>}
      </div>
    </div>
  )
}

export function PageCalendar({
  items,
  dateProperty,
  renderItem,
  draggable,
  onReschedule,
  onQuickAdd,
  dateOptions,
  calendarDateBy,
  onCalendarDateByChange,
}: PageCalendarProps) {
  const {
    containerRef,
    activeId,
    dropTargetDay,
    anchor,
    setAnchor,
    sensors,
    canDrag,
    buckets,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = usePageCalendarState({ items, dateProperty, draggable, onReschedule })

  const picker = (
    <DatePropertyPicker
      dateOptions={dateOptions}
      calendarDateBy={calendarDateBy}
      onCalendarDateByChange={onCalendarDateByChange}
    />
  )

  if (dateProperty === undefined) {
    return (
      <div className="flex flex-col items-center gap-3 py-12">
        <p className="text-secondary text-sm">Pick a date property to lay out this calendar.</p>
        {picker}
      </div>
    )
  }

  const grid = buildMonthGrid(anchor)
  const todayStr = getEsoDayStr(new Date())

  const activeItem = activeId !== null ? items.find((item) => item._id === activeId) : undefined

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="tertiary"
            size="icon-sm"
            aria-label="Previous month"
            onClick={() => setAnchor((a) => shiftMonth(a, -1))}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="tertiary" size="sm" onClick={() => setAnchor(getEsoDayStr(new Date()))}>
            Today
          </Button>
          <Button
            variant="tertiary"
            size="icon-sm"
            aria-label="Next month"
            onClick={() => setAnchor((a) => shiftMonth(a, 1))}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Heading variant="subsection">{grid.label}</Heading>
          <div className="ml-auto">{picker}</div>
        </div>

        <div ref={containerRef} className="flex flex-col gap-1">
          <div className="grid grid-cols-7 gap-1">
            {CALENDAR_WEEKDAY_LABELS.map((label) => (
              <Heading key={label} variant="label-muted" className="px-1 text-center">
                {label}
              </Heading>
            ))}
          </div>
          {grid.weeks.map((week) => (
            <div key={week[0] ?? ""} className="grid grid-cols-7 gap-1">
              {week.map((day) => (
                <DayCell
                  key={day}
                  day={day}
                  events={buckets.get(day) ?? []}
                  inFocusedMonth={monthKeyOf(day) === grid.monthKey}
                  isToday={day === todayStr}
                  isDropTarget={canDrag && dropTargetDay === day && activeId !== null}
                  canDrag={canDrag}
                  onQuickAdd={onQuickAdd}
                  renderItem={renderItem}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {activeItem ? (
          <div className="pointer-events-none opacity-60">{renderItem(activeItem)}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
