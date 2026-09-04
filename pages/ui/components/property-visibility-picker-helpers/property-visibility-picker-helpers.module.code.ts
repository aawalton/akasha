import type { PropertyVisibilityMode } from "@akasha/pages-core/schema/view-data"

export interface PropertyVisibilityOption {
  id: string
  label: string
}

export interface VisibilitySections {
  alwaysShow: readonly string[]
  hideWhenEmpty: readonly string[]
}

export function splitShownSections(
  visibleProperties: readonly string[],
  alwaysShowProperties: readonly string[]
): VisibilitySections {
  const alwaysSet = new Set(alwaysShowProperties)
  const alwaysShow: string[] = []
  const hideWhenEmpty: string[] = []
  for (const id of visibleProperties) {
    if (alwaysSet.has(id)) alwaysShow.push(id)
    else hideWhenEmpty.push(id)
  }
  return { alwaysShow, hideWhenEmpty }
}

export interface VisibilitySectionArrays {
  alwaysShow: readonly string[]
  hideWhenEmpty: readonly string[]
  alwaysHide: readonly string[]
}

const SECTION_KEY_BY_MODE = {
  "always-show": "alwaysShow",
  "hide-when-empty": "hideWhenEmpty",
  "always-hide": "alwaysHide",
} as const satisfies Record<PropertyVisibilityMode, keyof VisibilitySectionArrays>

export function applySectionDrop(
  sections: VisibilitySectionArrays,
  id: string,
  targetMode: PropertyVisibilityMode,
  anchorId: string | null
): VisibilitySectionArrays {
  const alwaysShow = sections.alwaysShow.filter((x) => x !== id)
  const hideWhenEmpty = sections.hideWhenEmpty.filter((x) => x !== id)
  const alwaysHide = sections.alwaysHide.filter((x) => x !== id)
  const removed: VisibilitySectionArrays = { alwaysShow, hideWhenEmpty, alwaysHide }

  const targetKey = SECTION_KEY_BY_MODE[targetMode]
  const target = removed[targetKey]
  const anchorIndex = anchorId === null ? -1 : target.indexOf(anchorId)
  const next =
    anchorIndex === -1
      ? [...target, id]
      : [...target.slice(0, anchorIndex), id, ...target.slice(anchorIndex)]

  return { ...removed, [targetKey]: next }
}

export type PickerDropZone =
  | { mode: PropertyVisibilityMode; rowId: string; position: "before" | "after" }
  | { mode: PropertyVisibilityMode; rowId: null }
  | null

export interface SectionMeasure {
  mode: PropertyVisibilityMode
  top: number
  height: number
  rows: readonly { id: string; top: number; height: number }[]
}

export function computePickerDropZone(
  sections: readonly SectionMeasure[],
  pointerY: number,
  activeId: string
): PickerDropZone {
  const first = sections[0]
  const last = sections[sections.length - 1]
  if (first === undefined || last === undefined) return null

  let target: SectionMeasure | undefined = sections.find(
    (s) => pointerY >= s.top && pointerY <= s.top + s.height
  )
  if (target === undefined) target = pointerY < first.top ? first : last

  const rows = target.rows.filter((r) => r.id !== activeId)
  const nearest = rows[0]
  if (nearest === undefined) return { mode: target.mode, rowId: null }

  let best = nearest
  let bestDistance = Number.POSITIVE_INFINITY
  for (const row of rows) {
    const distance = Math.abs(pointerY - (row.top + row.height / 2))
    if (distance < bestDistance) {
      bestDistance = distance
      best = row
    }
  }
  const position = pointerY < best.top + best.height / 2 ? "before" : "after"
  return { mode: target.mode, rowId: best.id, position }
}

export function dropZoneToAnchor(
  zone: NonNullable<PickerDropZone>,
  sections: VisibilitySectionArrays,
  activeId: string
): { targetMode: PropertyVisibilityMode; anchorId: string | null } {
  const targetMode = zone.mode
  if (zone.rowId === null) return { targetMode, anchorId: null }
  if (zone.position === "before") return { targetMode, anchorId: zone.rowId }
  const target = sections[SECTION_KEY_BY_MODE[targetMode]].filter((x) => x !== activeId)
  const index = target.indexOf(zone.rowId)
  const next = index >= 0 && index + 1 < target.length ? target[index + 1] : undefined
  return { targetMode, anchorId: next ?? null }
}

export function sectionsToLists(sections: VisibilitySectionArrays): {
  visibleProperties: readonly string[]
  alwaysShowProperties: readonly string[]
  hiddenPropertiesOrder: readonly string[]
} {
  return {
    visibleProperties: [...sections.alwaysShow, ...sections.hideWhenEmpty],
    alwaysShowProperties: [...sections.alwaysShow],
    hiddenPropertiesOrder: [...sections.alwaysHide],
  }
}
