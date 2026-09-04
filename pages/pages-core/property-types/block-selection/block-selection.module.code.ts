import type { ShortcutMods } from "../block-shortcuts/block-shortcuts.module.code.ts"

export interface BlockSelection {
  readonly anchorId: string
  readonly focusId: string
  readonly ids: ReadonlySet<string>
}

export function singleSelection(id: string): BlockSelection {
  return { anchorId: id, focusId: id, ids: new Set([id]) }
}

function rangeIds(blockIds: readonly string[], a: string, b: string): Set<string> {
  const ia = blockIds.indexOf(a)
  const ib = blockIds.indexOf(b)
  if (ia < 0 || ib < 0) return new Set()
  const lo = Math.min(ia, ib)
  const hi = Math.max(ia, ib)
  return new Set(blockIds.slice(lo, hi + 1))
}

export function rangeSelection(
  blockIds: readonly string[],
  anchorId: string,
  focusId: string
): BlockSelection {
  return { anchorId, focusId, ids: rangeIds(blockIds, anchorId, focusId) }
}

export function toggleSelection(sel: BlockSelection | null, id: string): BlockSelection | null {
  if (sel === null) return singleSelection(id)
  const ids = new Set(sel.ids)
  if (ids.has(id)) {
    ids.delete(id)
    if (ids.size === 0) return null
    const focusId = ids.has(sel.focusId) ? sel.focusId : (firstOf(ids) ?? id)
    const anchorId = ids.has(sel.anchorId) ? sel.anchorId : focusId
    return { anchorId, focusId, ids }
  }
  ids.add(id)
  return { anchorId: id, focusId: id, ids }
}

function firstOf(ids: ReadonlySet<string>): string | undefined {
  for (const id of ids) return id
  return undefined
}

export function navigateSelection(
  sel: BlockSelection,
  blockIds: readonly string[],
  direction: "up" | "down"
): BlockSelection {
  const next = neighbourId(sel.focusId, blockIds, direction)
  return next === null ? sel : singleSelection(next)
}

export function extendSelection(
  sel: BlockSelection,
  blockIds: readonly string[],
  direction: "up" | "down"
): BlockSelection {
  const next = neighbourId(sel.focusId, blockIds, direction)
  return next === null ? sel : rangeSelection(blockIds, sel.anchorId, next)
}

function neighbourId(
  id: string,
  blockIds: readonly string[],
  direction: "up" | "down"
): string | null {
  const i = blockIds.indexOf(id)
  if (i < 0) return null
  const j = direction === "up" ? i - 1 : i + 1
  const next = blockIds[j]
  return next === undefined ? null : next
}

export function allSelection(blockIds: readonly string[]): BlockSelection | null {
  const first = blockIds[0]
  const last = blockIds[blockIds.length - 1]
  if (first === undefined || last === undefined) return null
  return { anchorId: first, focusId: last, ids: new Set(blockIds) }
}

export function selectedInOrder(
  sel: BlockSelection,
  blockIds: readonly string[]
): readonly string[] {
  return blockIds.filter((id) => sel.ids.has(id))
}

export function focusAfterDelete(sel: BlockSelection, blockIds: readonly string[]): string | null {
  const firstIdx = blockIds.findIndex((id) => sel.ids.has(id))
  if (firstIdx < 0) return null
  for (let k = firstIdx - 1; k >= 0; k--) {
    const id = blockIds[k]
    if (id !== undefined && !sel.ids.has(id)) return id
  }
  for (let k = firstIdx + 1; k < blockIds.length; k++) {
    const id = blockIds[k]
    if (id !== undefined && !sel.ids.has(id)) return id
  }
  return null
}

export type SelectionKey =
  | { kind: "delete" }
  | { kind: "duplicate" }
  | { kind: "move"; direction: "up" | "down" }
  | { kind: "extend"; direction: "up" | "down" }
  | { kind: "navigate"; direction: "up" | "down" }
  | { kind: "selectAll" }
  | { kind: "edit" }
  | { kind: "clear" }

export function matchSelectionKey(m: ShortcutMods): SelectionKey | null {
  const mod = m.meta || m.ctrl

  if (mod && m.shift && !m.alt) {
    if (m.key === "ArrowUp") return { kind: "move", direction: "up" }
    if (m.key === "ArrowDown") return { kind: "move", direction: "down" }
  }
  if (mod && !m.shift && !m.alt && m.code === "KeyD") return { kind: "duplicate" }
  if (mod && !m.shift && !m.alt && m.code === "KeyA") return { kind: "selectAll" }

  if (!mod && m.shift && !m.alt) {
    if (m.key === "ArrowUp") return { kind: "extend", direction: "up" }
    if (m.key === "ArrowDown") return { kind: "extend", direction: "down" }
  }
  if (!mod && !m.shift && !m.alt) {
    if (m.key === "ArrowUp") return { kind: "navigate", direction: "up" }
    if (m.key === "ArrowDown") return { kind: "navigate", direction: "down" }
  }

  if (!mod && !m.alt && (m.key === "Backspace" || m.key === "Delete")) return { kind: "delete" }
  if (!mod && !m.shift && !m.alt && m.key === "Enter") return { kind: "edit" }
  if (m.key === "Escape") return { kind: "clear" }

  return null
}
