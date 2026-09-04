"use client"

import {
  allSelection,
  type BlockSelection,
  extendSelection,
  focusAfterDelete,
  matchSelectionKey,
  navigateSelection,
  rangeSelection,
  type SelectionKey,
  selectedInOrder,
  singleSelection,
  toggleSelection,
} from "@akasha/pages-core/property-types/block-selection"
import type { RichDocument } from "@akasha/pages-core/property-types/rich-document"
import { type EditorOp, newBlockId } from "@akasha/pages-core/property-types/rich-document-ops"
import { flattenBlockIds } from "@akasha/pages-core/property-types/rich-document-tree"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { useCallback, useEffect, useRef, useState } from "react"

interface UseBlockSelectionArgs {
  docRef: React.RefObject<RichDocument>
  commit: (op: EditorOp) => void
  flushPendingText: () => void
  requestFocus: (blockId: string, caret: "start" | "end") => void
  isCollapsed: (id: string) => boolean
}

export interface BlockSelectionApi {
  readonly selection: BlockSelection | null
  readonly enterSelection: (blockId: string) => void
  readonly clearSelection: () => void
  readonly rangeSelectTo: (blockId: string) => void
  readonly toggleSelect: (blockId: string) => void
}

function blurActive(): undefined {
  const el = typeof document === "undefined" ? null : document.activeElement
  if (el !== null && el instanceof HTMLElement) el.blur()
}

function isEditableFocused(): boolean {
  const el = typeof document === "undefined" ? null : document.activeElement
  if (el === null) return false
  if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) return true
  return el instanceof HTMLElement && el.isContentEditable
}

export function useBlockSelection({
  docRef,
  commit,
  flushPendingText,
  requestFocus,
  isCollapsed,
}: UseBlockSelectionArgs): BlockSelectionApi {
  const [selection, setSelection] = useState<BlockSelection | null>(null)
  const selectionRef = useRef<BlockSelection | null>(null)

  const orderedIds = useCallback(
    (): readonly string[] => flattenBlockIds(docRef.current.blocks, { isCollapsed }),
    [docRef, isCollapsed]
  )

  const apply = useCallback((next: BlockSelection | null) => {
    selectionRef.current = next
    setSelection(next)
  }, [])

  const enterSelection = useCallback(
    (blockId: string) => {
      flushPendingText()
      blurActive()
      apply(singleSelection(blockId))
    },
    [apply, flushPendingText]
  )

  const clearSelection = useCallback(() => apply(null), [apply])

  const rangeSelectTo = useCallback(
    (blockId: string) => {
      flushPendingText()
      blurActive()
      const sel = selectionRef.current
      const ids = orderedIds()
      apply(sel === null ? singleSelection(blockId) : rangeSelection(ids, sel.anchorId, blockId))
    },
    [apply, flushPendingText, orderedIds]
  )

  const toggleSelect = useCallback(
    (blockId: string) => {
      flushPendingText()
      blurActive()
      apply(toggleSelection(selectionRef.current, blockId))
    },
    [apply, flushPendingText]
  )

  const deleteSelected = useCallback(
    (sel: BlockSelection) => {
      const ids = orderedIds()
      const target = focusAfterDelete(sel, ids)
      for (const id of selectedInOrder(sel, ids)) commit({ kind: "deleteBlock", id })
      apply(target === null ? null : singleSelection(target))
    },
    [apply, commit, orderedIds]
  )

  const moveSelected = useCallback(
    (sel: BlockSelection, direction: "up" | "down") => {
      const ids = orderedIds()
      const ordered = selectedInOrder(sel, ids)
      const sequence = direction === "up" ? ordered : [...ordered].reverse()
      for (const id of sequence) commit({ kind: "moveBlock", id, direction })
    },
    [commit, orderedIds]
  )

  const duplicateSelected = useCallback(
    (sel: BlockSelection) => {
      const ids = orderedIds()
      for (const id of selectedInOrder(sel, ids)) {
        commit({ kind: "duplicateBlock", id, newId: newBlockId() })
      }
    },
    [commit, orderedIds]
  )

  const dispatch = useCallback(
    (key: SelectionKey, sel: BlockSelection) => {
      const ids = orderedIds()
      switch (key.kind) {
        case "clear":
          apply(null)
          return
        case "edit":
          apply(null)
          requestFocus(sel.focusId, "end")
          return
        case "navigate":
          apply(navigateSelection(sel, ids, key.direction))
          return
        case "extend":
          apply(extendSelection(sel, ids, key.direction))
          return
        case "selectAll":
          apply(allSelection(ids))
          return
        case "move":
          moveSelected(sel, key.direction)
          return
        case "duplicate":
          duplicateSelected(sel)
          return
        case "delete":
          deleteSelected(sel)
          return
        default:
          return assertNever(key)
      }
    },
    [apply, deleteSelected, duplicateSelected, moveSelected, orderedIds, requestFocus]
  )

  useEffect(() => {
    if (selection === null) return
    const handler = (e: KeyboardEvent) => {
      if (isEditableFocused()) return
      const sel = selectionRef.current
      if (sel === null) return
      const key = matchSelectionKey({
        code: e.code,
        key: e.key,
        meta: e.metaKey,
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey,
      })
      if (key === null) return
      e.preventDefault()
      dispatch(key, sel)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [selection, dispatch])

  return { selection, enterSelection, clearSelection, rangeSelectTo, toggleSelect }
}
