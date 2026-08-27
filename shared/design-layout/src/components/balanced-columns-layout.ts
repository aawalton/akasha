export const GAP_PX = 24
const COLLAPSED_HEIGHT_PX = 84

function getAt<T>(arr: readonly T[], i: number): T {
  const v = arr[i]
  if (v === undefined)
    throw new Error(`balanced-columns: index ${i} out of range (len=${arr.length})`)
  return v
}
function setAt<T>(
  arr: { [i: number]: T; readonly length: number },
  i: number,
  value: T
): undefined {
  arr[i] = value
}
function pushAt<T>(
  rows: ReadonlyArray<{ push: (item: T) => unknown }>,
  i: number,
  item: T
): undefined {
  getAt(rows, i).push(item)
}

export interface ColumnItem {
  childIndex: number
  defaultOpen: boolean
}

export interface BalancedLayout {
  columns: readonly (readonly ColumnItem[])[]
}

export interface Measurement {
  childIndex: number
  expandedHeight: number
  title: string
}

export interface LayoutOptions {
  columnCount: number
  totalChildren: number
  hasSummaryPanel: boolean
  sortChildren: boolean
  availableHeight: number
}

export type LayoutDecision =
  | { kind: "columns"; columns: readonly (readonly ColumnItem[])[] }
  | { kind: "need-full-measure" }
  | { kind: "noop" }

export function decideBalancedLayout(
  measurements: readonly Measurement[],
  opts: LayoutOptions
): LayoutDecision {
  const { columnCount, totalChildren, hasSummaryPanel, sortChildren, availableHeight } = opts

  if (measurements.length === 0) {
    return { kind: "columns", columns: [] }
  }

  const firstItem = measurements[0]
  if (!firstItem) return { kind: "noop" }

  if (totalChildren === 1) {
    const newColumns: ColumnItem[][] = Array.from({ length: columnCount }, () => [])
    newColumns[0] = [{ childIndex: firstItem.childIndex, defaultOpen: true }]
    return { kind: "columns", columns: newColumns }
  }

  const remainingCount = totalChildren - 1

  if (measurements.length === 1 && remainingCount > 0) {
    const itemsPerCol = Math.ceil(remainingCount / columnCount)
    const bestCaseExpandedHeight =
      firstItem.expandedHeight + itemsPerCol * (firstItem.expandedHeight + GAP_PX)
    if (bestCaseExpandedHeight > availableHeight) {
      const allItems: { childIndex: number; expandedHeight: number }[] = [firstItem]
      for (let i = 1; i < totalChildren; i++) {
        allItems.push({ childIndex: i, expandedHeight: COLLAPSED_HEIGHT_PX })
      }
      const remaining = allItems.slice(1)

      const collapsedItems: { childIndex: number; expandedHeight: number }[][] = Array.from(
        { length: columnCount },
        () => []
      )
      if (hasSummaryPanel) {
        const heights: number[] = new Array(columnCount).fill(0)
        pushAt(collapsedItems, 0, firstItem)
        setAt(heights, 0, firstItem.expandedHeight)
        for (const item of remaining) {
          let minCol = 0
          for (let c = 1; c < columnCount; c++) {
            if (getAt(heights, c) < getAt(heights, minCol)) minCol = c
          }
          pushAt(collapsedItems, minCol, item)
          setAt(heights, minCol, getAt(heights, minCol) + COLLAPSED_HEIGHT_PX + GAP_PX)
        }
      } else {
        for (let i = 0; i < allItems.length; i++) {
          const item = allItems[i]
          if (item === undefined) continue
          pushAt(collapsedItems, i % columnCount, item)
        }
      }

      const newColumns: ColumnItem[][] = collapsedItems.map((items) =>
        items.map((item) => ({
          childIndex: item.childIndex,
          defaultOpen: item.childIndex === firstItem.childIndex && hasSummaryPanel,
        }))
      )

      return { kind: "columns", columns: newColumns }
    }

    return { kind: "need-full-measure" }
  }

  const remaining = measurements.slice(1)

  if (sortChildren) {
    remaining.sort((a, b) => a.title.localeCompare(b.title))
  }

  type ItemInfo = { childIndex: number; expandedHeight: number }

  const makeIsolated = () => {
    const items: ItemInfo[][] = Array.from({ length: columnCount }, () => [])
    pushAt(items, 0, firstItem)
    const heights: number[] = new Array(columnCount).fill(0)
    for (const item of remaining) {
      let minCol = 1
      for (let c = 2; c < columnCount; c++) {
        if (getAt(heights, c) < getAt(heights, minCol)) minCol = c
      }
      pushAt(items, minCol, item)
      setAt(heights, minCol, getAt(heights, minCol) + COLLAPSED_HEIGHT_PX + GAP_PX)
    }
    return items
  }

  const makeGreedyCollapsed = () => {
    const items: ItemInfo[][] = Array.from({ length: columnCount }, () => [])
    const heights: number[] = new Array(columnCount).fill(0)
    pushAt(items, 0, firstItem)
    setAt(heights, 0, firstItem.expandedHeight)
    for (const item of remaining) {
      let minCol = 0
      for (let c = 1; c < columnCount; c++) {
        if (getAt(heights, c) < getAt(heights, minCol)) minCol = c
      }
      pushAt(items, minCol, item)
      setAt(heights, minCol, getAt(heights, minCol) + COLLAPSED_HEIGHT_PX + GAP_PX)
    }
    return items
  }

  const makeGreedyExpanded = () => {
    const items: ItemInfo[][] = Array.from({ length: columnCount }, () => [])
    const heights: number[] = new Array(columnCount).fill(0)
    pushAt(items, 0, firstItem)
    setAt(heights, 0, firstItem.expandedHeight)
    for (const item of remaining) {
      let minCol = 0
      for (let c = 1; c < columnCount; c++) {
        if (getAt(heights, c) < getAt(heights, minCol)) minCol = c
      }
      pushAt(items, minCol, item)
      setAt(heights, minCol, getAt(heights, minCol) + item.expandedHeight + GAP_PX)
    }
    return items
  }

  const makeSequential = () => {
    const allItems = [firstItem, ...remaining]
    const items: ItemInfo[][] = Array.from({ length: columnCount }, () => [])
    for (let i = 0; i < allItems.length; i++) {
      const it = allItems[i]
      if (it === undefined) continue
      pushAt(items, i % columnCount, it)
    }
    return items
  }

  const getOrderedExpanded = sortChildren ? makeGreedyExpanded : makeSequential
  const getOrderedCollapsed = !hasSummaryPanel
    ? makeSequential
    : sortChildren
      ? makeGreedyCollapsed
      : makeSequential

  type Col0 = "only" | "additional-collapsed" | "additional-expanded"
  type Strategy = {
    col0: Col0
    otherColsExpanded: boolean
    getItems: () => readonly (readonly ItemInfo[])[]
  }

  const allStrategies: Strategy[] = hasSummaryPanel
    ? [
        { col0: "only", otherColsExpanded: true, getItems: makeIsolated },
        { col0: "additional-expanded", otherColsExpanded: true, getItems: getOrderedExpanded },
        { col0: "only", otherColsExpanded: false, getItems: makeIsolated },
        { col0: "additional-collapsed", otherColsExpanded: false, getItems: getOrderedCollapsed },
      ]
    : [
        { col0: "additional-expanded", otherColsExpanded: true, getItems: getOrderedExpanded },
        { col0: "additional-collapsed", otherColsExpanded: false, getItems: getOrderedCollapsed },
      ]

  let chosen: {
    col0: Col0
    otherColsExpanded: boolean
    items: readonly (readonly ItemInfo[])[]
  } = {
    col0: "additional-collapsed",
    otherColsExpanded: false,
    items: getOrderedCollapsed(),
  }
  for (const strategy of allStrategies) {
    const items = strategy.getItems()
    const col0HasRest = getAt(items, 0).length > 1
    if (strategy.col0 === "only" && col0HasRest) continue
    let fits = true
    for (let colIdx = 0; colIdx < columnCount; colIdx++) {
      const colItems = getAt(items, colIdx)
      if (colItems.length === 0) continue
      let height = (colItems.length - 1) * GAP_PX
      for (const item of colItems) {
        const isFirst = item.childIndex === firstItem.childIndex
        let expanded: boolean
        if (isFirst && hasSummaryPanel) {
          expanded = true
        } else if (colIdx === 0) {
          expanded = strategy.col0 === "additional-expanded"
        } else {
          expanded = strategy.otherColsExpanded
        }
        height += expanded ? item.expandedHeight : COLLAPSED_HEIGHT_PX
      }
      if (height > availableHeight) {
        fits = false
        break
      }
    }
    if (fits) {
      chosen = { col0: strategy.col0, otherColsExpanded: strategy.otherColsExpanded, items }
      break
    }
  }

  const allOpen = columnCount >= measurements.length

  const newColumns: ColumnItem[][] = chosen.items.map((items, colIdx) =>
    items.map((item) => ({
      childIndex: item.childIndex,
      defaultOpen:
        allOpen ||
        (item.childIndex === firstItem.childIndex && hasSummaryPanel) ||
        (colIdx === 0 ? chosen.col0 === "additional-expanded" : chosen.otherColsExpanded),
    }))
  )

  return { kind: "columns", columns: newColumns }
}

export function layoutEqual(
  a: readonly (readonly ColumnItem[])[],
  b: readonly (readonly ColumnItem[])[]
): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    const ai = a[i]
    const bi = b[i]
    if (ai === undefined || bi === undefined) return false
    if (ai.length !== bi.length) return false
    for (let j = 0; j < ai.length; j++) {
      const aij = ai[j]
      const bij = bi[j]
      if (aij === undefined || bij === undefined) return false
      if (aij.childIndex !== bij.childIndex || aij.defaultOpen !== bij.defaultOpen) return false
    }
  }
  return true
}
