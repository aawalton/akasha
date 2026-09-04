"use client"

import { getEsoDayStr } from "@akasha/day/eso-day"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import { pageDayKey } from "@akasha/pages-core/view/calendar-date-to-value"
import {
  type CalendarCellRect,
  computeCalendarDropDay,
} from "@akasha/pages-ui-components/page-calendar-dnd-helpers"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import type { DragStartEvent } from "@dnd-kit/core"
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

export function usePageCalendarState({
  items,
  dateProperty,
  draggable,
  onReschedule,
}: {
  items: readonly PageRow[]
  dateProperty: PropertyDefinition | undefined
  draggable: boolean
  onReschedule?: (pageId: string, dayStr: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeIdRef = useRef<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dropTargetDay, setDropTargetDay] = useState<string | null>(null)
  const [anchor, setAnchor] = useState(() => getEsoDayStr(new Date()))

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )

  const canDrag = draggable && onReschedule != null

  const buckets = useMemo(() => {
    const map = new Map<string, PageRow[]>()
    if (dateProperty === undefined) return map
    for (const item of items) {
      const day = pageDayKey(dateProperty, item[dateProperty.id])
      if (day === null) continue
      const existing = map.get(day)
      if (existing === undefined) map.set(day, [item])
      else existing.push(item)
    }
    return map
  }, [items, dateProperty])

  const sourceDayFor = useCallback(
    (pageId: string): string | null => {
      for (const [day, rows] of buckets) {
        if (rows.some((row) => row._id === pageId)) return day
      }
      return null
    },
    [buckets]
  )

  const updateDropTarget = useCallback((pointerX: number, pointerY: number) => {
    const container = containerRef.current
    if (container === null || activeIdRef.current === null) return
    const rects: CalendarCellRect[] = []
    for (const cellEl of container.querySelectorAll<HTMLElement>("[data-calendar-day]")) {
      const day = cellEl.dataset.calendarDay
      if (day === undefined) continue
      const rect = cellEl.getBoundingClientRect()
      rects.push({ day, left: rect.left, top: rect.top, width: rect.width, height: rect.height })
    }
    setDropTargetDay(computeCalendarDropDay(rects, pointerX, pointerY))
  }, [])

  useEffect(() => {
    if (activeId === null) return
    const onPointerMove = (e: PointerEvent) => updateDropTarget(e.clientX, e.clientY)
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
    const target = dropTargetDay
    activeIdRef.current = null
    setActiveId(null)
    setDropTargetDay(null)
    if (!canDrag || id === null || target === null) return
    if (sourceDayFor(id) === target) return
    onReschedule?.(id, target)
  }

  function handleDragCancel() {
    activeIdRef.current = null
    setActiveId(null)
    setDropTargetDay(null)
  }

  return {
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
  }
}
