"use client"

import type { RichDocument } from "@akasha/pages-core/property-types/rich-document"
import { flattenBlockIds } from "@akasha/pages-core/property-types/rich-document-tree"
import type { FocusCaret } from "@akasha/pages-ui/block-editor/use-block-keys"
import { type RefObject, useCallback, useEffect, useRef } from "react"

function caretOffset(caret: FocusCaret, length: number): number {
  if (caret === "start") return 0
  if (caret === "end") return length
  return Math.min(Math.max(caret, 0), length)
}

export interface BlockFocusDeps {
  readonly doc: RichDocument
  readonly docRef: RefObject<RichDocument>
  readonly isCollapsed: (id: string) => boolean
}

export interface BlockFocusApi {
  readonly setTextareaRef: (blockId: string) => (el: HTMLTextAreaElement | null) => void
  readonly requestFocus: (blockId: string, caret: FocusCaret) => void
  readonly focusBlock: (blockId: string, caret: FocusCaret) => void
  readonly focusBlockThroughCommit: (blockId: string, caret: FocusCaret) => void
  readonly focusLastBlockEnd: () => void
  readonly textareaRefs: RefObject<Map<string, HTMLTextAreaElement>>
}

export function useBlockFocus(deps: BlockFocusDeps): BlockFocusApi {
  const { doc, docRef, isCollapsed } = deps

  const textareaRefs = useRef<Map<string, HTMLTextAreaElement>>(new Map())
  const pendingFocusRef = useRef<{ id: string; caret: FocusCaret } | null>(null)
  const guardedReassertRef = useRef<{ id: string; caret: FocusCaret } | null>(null)

  const setTextareaRef = useCallback(
    (blockId: string) => (el: HTMLTextAreaElement | null) => {
      if (el === null) {
        textareaRefs.current.delete(blockId)
        return
      }
      textareaRefs.current.set(blockId, el)
      const pending = pendingFocusRef.current
      if (pending !== null && pending.id === blockId) {
        pendingFocusRef.current = null
        el.focus()
        const pos = caretOffset(pending.caret, el.value.length)
        el.setSelectionRange(pos, pos)
      }
    },
    []
  )

  const requestFocus = useCallback((blockId: string, caret: FocusCaret) => {
    pendingFocusRef.current = { id: blockId, caret }
  }, [])

  useEffect(() => {
    const pending = pendingFocusRef.current
    if (pending !== null) {
      const el = textareaRefs.current.get(pending.id)
      if (el !== undefined) {
        pendingFocusRef.current = null
        el.focus()
        const pos = caretOffset(pending.caret, el.value.length)
        el.setSelectionRange(pos, pos)
      }
    }
    const reassert = guardedReassertRef.current
    guardedReassertRef.current = null
    if (reassert !== null) {
      const active = document.activeElement
      const held =
        active instanceof HTMLTextAreaElement &&
        Array.from(textareaRefs.current.values()).includes(active)
      if (!held) {
        const el = textareaRefs.current.get(reassert.id)
        if (el !== undefined) {
          el.focus()
          const pos = caretOffset(reassert.caret, el.value.length)
          el.setSelectionRange(pos, pos)
        }
      }
    }
  }, [doc])

  const focusBlock = useCallback((blockId: string, caret: FocusCaret) => {
    const el = textareaRefs.current.get(blockId)
    if (el === undefined) {
      pendingFocusRef.current = { id: blockId, caret }
      return
    }
    el.focus()
    const pos = caretOffset(caret, el.value.length)
    el.setSelectionRange(pos, pos)
  }, [])

  const focusBlockThroughCommit = useCallback(
    (blockId: string, caret: FocusCaret) => {
      focusBlock(blockId, caret)
      guardedReassertRef.current = { id: blockId, caret }
    },
    [focusBlock]
  )

  const focusLastBlockEnd = useCallback(() => {
    const visible = flattenBlockIds(docRef.current.blocks, { isCollapsed })
    const lastId = visible[visible.length - 1]
    if (lastId === undefined) return
    focusBlock(lastId, "end")
  }, [docRef, isCollapsed, focusBlock])

  return {
    setTextareaRef,
    requestFocus,
    focusBlock,
    focusBlockThroughCommit,
    focusLastBlockEnd,
    textareaRefs,
  }
}
