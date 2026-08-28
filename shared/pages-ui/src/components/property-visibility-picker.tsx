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
import { SortableContext } from "@dnd-kit/sortable"
import { FilterTextField } from "@shared/design-primitives/components/filterable-list"
import { Heading } from "@shared/design-primitives/components/heading"
import { SubView } from "@shared/design-primitives/components/sub-view"
import type { PropertyVisibilityMode, VisibilityChange } from "@shared/pages-core/schema/view-data"
import { requireGet } from "@shared/utils-narrow/require-get"
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  applySectionDrop,
  computePickerDropZone,
  dropZoneToAnchor,
  type PickerDropZone,
  type PropertyVisibilityOption,
  type SectionMeasure,
  sectionsToLists,
  splitShownSections,
  type VisibilitySectionArrays,
} from "./property-visibility-picker-helpers"
import { PropertyRowGhost, SortablePropertyRow } from "./property-visibility-picker-rows"

interface PropertyVisibilityPickerProps {
  eligibleOptions: readonly PropertyVisibilityOption[]
  visibleProperties: readonly string[]
  alwaysShowProperties?: readonly string[]
  hiddenPropertiesOrder?: readonly string[]
  onVisibilityChange?: (next: VisibilityChange) => void
  onBack: () => void
}

const SECTION_ORDER = [
  { mode: "always-show", heading: "Always Show" },
  { mode: "hide-when-empty", heading: "Hide When Empty" },
  { mode: "always-hide", heading: "Always Hide" },
] as const satisfies ReadonlyArray<{ mode: PropertyVisibilityMode; heading: string }>

const MODE_BY_VALUE: Record<string, PropertyVisibilityMode> = {
  "always-show": "always-show",
  "hide-when-empty": "hide-when-empty",
  "always-hide": "always-hide",
}

interface SectionProps {
  mode: PropertyVisibilityMode
  heading: string
  rows: readonly PropertyVisibilityOption[]
  interactive: boolean
  dropZone: PickerDropZone
}

function PropertyVisibilitySection({ mode, heading, rows, interactive, dropZone }: SectionProps) {
  const ids = useMemo(() => rows.map((opt) => opt.id), [rows])
  const appendActive = dropZone !== null && dropZone.rowId === null && dropZone.mode === mode
  return (
    <div className="flex flex-col gap-1">
      <div className="px-2">
        <Heading variant="label-muted">{heading}</Heading>
      </div>
      <SortableContext items={ids}>
        <div data-section-mode={mode} className="flex min-h-7 flex-col gap-1">
          {rows.length > 0 ? (
            rows.map((option) => {
              const dropIndicator =
                dropZone !== null && dropZone.rowId !== null && dropZone.rowId === option.id
                  ? dropZone.position
                  : undefined
              return (
                <SortablePropertyRow
                  key={option.id}
                  option={option}
                  sortable={interactive}
                  dropIndicator={dropIndicator}
                />
              )
            })
          ) : (
            <div className="flex flex-col gap-1">
              {appendActive && <div className="h-0.5 rounded bg-accent" />}
              <div className="px-2 py-1 text-tertiary text-xs italic">Drag a property here</div>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

export function PropertyVisibilityPicker({
  eligibleOptions,
  visibleProperties,
  alwaysShowProperties,
  hiddenPropertiesOrder,
  onVisibilityChange,
  onBack,
}: PropertyVisibilityPickerProps) {
  const currentAlwaysShow = alwaysShowProperties ?? []
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dropZone, setDropZone] = useState<PickerDropZone>(null)
  const [query, setQuery] = useState("")
  const trimmedQuery = query.trim().toLowerCase()
  const containerRef = useRef<HTMLDivElement>(null)
  const activeIdRef = useRef<string | null>(null)

  const filteredOptions = useMemo(() => {
    if (trimmedQuery === "") return eligibleOptions
    return eligibleOptions.filter((opt) => opt.label.toLowerCase().includes(trimmedQuery))
  }, [eligibleOptions, trimmedQuery])

  const filteredOptionMap = useMemo(
    () => new Map(filteredOptions.map((opt) => [opt.id, opt])),
    [filteredOptions]
  )

  const { alwaysShow: alwaysShowFull, hideWhenEmpty: hideWhenEmptyFull } = useMemo(
    () => splitShownSections(visibleProperties, currentAlwaysShow),
    [visibleProperties, currentAlwaysShow]
  )

  const alwaysHideFull = useMemo(() => {
    const visibleSet = new Set(visibleProperties)
    const eligibleHidden = eligibleOptions.filter((opt) => !visibleSet.has(opt.id))
    const eligibleMap = new Map(eligibleHidden.map((opt) => [opt.id, opt]))
    const ordered: string[] = []
    const consumed = new Set<string>()
    if (hiddenPropertiesOrder) {
      for (const id of hiddenPropertiesOrder) {
        if (eligibleMap.has(id) && !consumed.has(id)) {
          ordered.push(id)
          consumed.add(id)
        }
      }
    }
    const remaining = eligibleHidden
      .filter((opt) => !consumed.has(opt.id))
      .toSorted((a, b) => a.label.localeCompare(b.label))
      .map((opt) => opt.id)
    return [...ordered, ...remaining]
  }, [eligibleOptions, visibleProperties, hiddenPropertiesOrder])

  const sectionsFull: VisibilitySectionArrays = useMemo(
    () => ({
      alwaysShow: alwaysShowFull,
      hideWhenEmpty: hideWhenEmptyFull,
      alwaysHide: alwaysHideFull,
    }),
    [alwaysShowFull, hideWhenEmptyFull, alwaysHideFull]
  )

  const rowsForMode = useMemo(() => {
    const toRows = (full: readonly string[]): readonly PropertyVisibilityOption[] =>
      full.flatMap((id) => (filteredOptionMap.has(id) ? [requireGet(filteredOptionMap, id)] : []))
    return {
      "always-show": toRows(alwaysShowFull),
      "hide-when-empty": toRows(hideWhenEmptyFull),
      "always-hide": toRows(alwaysHideFull),
    } as const satisfies Record<PropertyVisibilityMode, readonly PropertyVisibilityOption[]>
  }, [alwaysShowFull, hideWhenEmptyFull, alwaysHideFull, filteredOptionMap])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )

  const interactive = onVisibilityChange != null

  const updateDropZone = useCallback((pointerY: number) => {
    const container = containerRef.current
    const active = activeIdRef.current
    if (container === null || active === null) return
    const measures: SectionMeasure[] = []
    for (const sectionEl of container.querySelectorAll<HTMLElement>("[data-section-mode]")) {
      const mode = MODE_BY_VALUE[sectionEl.dataset.sectionMode ?? ""]
      if (mode === undefined) continue
      const sectionRect = sectionEl.getBoundingClientRect()
      const rows: { id: string; top: number; height: number }[] = []
      for (const rowEl of sectionEl.querySelectorAll<HTMLElement>("[data-row-id]")) {
        const id = rowEl.dataset.rowId
        if (id === undefined) continue
        const rowRect = rowEl.getBoundingClientRect()
        rows.push({ id, top: rowRect.top, height: rowRect.height })
      }
      measures.push({ mode, top: sectionRect.top, height: sectionRect.height, rows })
    }
    setDropZone(computePickerDropZone(measures, pointerY, active))
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
    if (!onVisibilityChange || zone === null) return
    const draggedId = String(event.active.id)
    const { targetMode, anchorId } = dropZoneToAnchor(zone, sectionsFull, draggedId)
    onVisibilityChange(
      sectionsToLists(applySectionDrop(sectionsFull, draggedId, targetMode, anchorId))
    )
  }

  function handleDragCancel() {
    activeIdRef.current = null
    setActiveId(null)
    setDropZone(null)
  }

  const activeOption =
    activeId !== null ? eligibleOptions.find((opt) => opt.id === activeId) : undefined

  const sections: ReactNode = SECTION_ORDER.map(({ mode, heading }) => (
    <PropertyVisibilitySection
      key={mode}
      mode={mode}
      heading={heading}
      rows={rowsForMode[mode]}
      interactive={interactive}
      dropZone={dropZone}
    />
  ))

  return (
    <SubView title="Property Visibility" onBack={onBack} className="gap-3">
      {eligibleOptions.length > 0 && (
        <FilterTextField
          value={query}
          onChange={setQuery}
          autoFocus
          placeholder="Search…"
          ariaLabel="Search properties"
        />
      )}
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div ref={containerRef} className="flex flex-col gap-3">
          {sections}
        </div>
        <DragOverlay modifiers={[restrictToVerticalAxis]} dropAnimation={null}>
          {activeOption ? (
            <div className="pointer-events-none opacity-60">
              <PropertyRowGhost option={activeOption} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </SubView>
  )
}
