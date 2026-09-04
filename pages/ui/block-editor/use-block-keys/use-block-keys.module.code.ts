"use client"

import { isBlankBlock, type RichDocument } from "@akasha/pages-core/property-types/rich-document"
import {
  createBlock,
  type EditorOp,
  newBlockId,
  textOf,
} from "@akasha/pages-core/property-types/rich-document-ops"
import {
  findBlock,
  findBlockPath,
  flattenBlockIds,
  getBlockAtPath,
} from "@akasha/pages-core/property-types/rich-document-tree"
import { planEnterSplit } from "@akasha/pages-ui/block-editor/block-type-helpers"
import type { SlashChoice } from "@akasha/pages-ui/block-editor/slash-menu"
import { type RefObject, useCallback, useState } from "react"

export type FocusCaret = "start" | "end" | number

export interface BlockKeysDeps {
  readonly docRef: RefObject<RichDocument>
  readonly commit: (op: EditorOp) => void
  readonly flushPendingText: () => void
  readonly requestFocus: (blockId: string, caret: FocusCaret) => void
  readonly focusBlock: (blockId: string, caret: FocusCaret) => void
  readonly isCollapsed: (id: string) => boolean
}

export interface BlockKeysApi {
  readonly slashBlockId: string | null
  readonly setSlashBlockId: (v: string | null) => void
  readonly handleEnter: (blockId: string, caret: number) => void
  readonly handleBackspaceAtStart: (blockId: string) => void
  readonly handleArrowVertical: (blockId: string, direction: "up" | "down") => void
  readonly handleDocumentExtreme: (direction: "start" | "end") => void
  readonly handleSlashSelect: (choice: SlashChoice) => void
  readonly ensureFirstBlock: () => void
}

export function useBlockKeys(deps: BlockKeysDeps): BlockKeysApi {
  const { docRef, commit, flushPendingText, requestFocus, focusBlock, isCollapsed } = deps

  const [slashBlockId, setSlashBlockId] = useState<string | null>(null)

  const handleEnter = useCallback(
    (blockId: string, caret: number) => {
      flushPendingText()
      const cur = findBlock(docRef.current.blocks, blockId)
      if (cur === undefined) return
      const plan = planEnterSplit(cur, caret)
      if (plan.kind === "exit") {
        commit({ kind: "turnInto", id: blockId, type: "paragraph" })
        requestFocus(blockId, "start")
        return
      }
      commit({ kind: "updateText", id: blockId, text: plan.before })
      const block = createBlock(plan.newType, { id: newBlockId(), text: plan.newText })
      commit({ kind: "insertAfter", afterId: blockId, block })
      requestFocus(block.id ?? "", plan.newCaret)
    },
    [commit, flushPendingText, requestFocus]
  )

  const handleBackspaceAtStart = useCallback(
    (blockId: string) => {
      flushPendingText()
      const blocks = docRef.current.blocks
      const path = findBlockPath(blocks, blockId)
      if (path === null) return
      const cur = getBlockAtPath(blocks, path)
      if (cur === undefined) return
      if (cur.type !== "paragraph") {
        commit({ kind: "turnInto", id: blockId, type: "paragraph" })
        requestFocus(blockId, "start")
        return
      }
      const idx = path[path.length - 1] ?? 0
      if (idx === 0) {
        if (path.length >= 2) {
          commit({ kind: "outdent", id: blockId })
          requestFocus(blockId, "start")
          return
        }
        if (blocks.length === 1 && isBlankBlock(cur)) {
          commit({ kind: "deleteBlock", id: blockId })
        }
        return
      }
      const prevPath = [...path.slice(0, -1), idx - 1]
      const prev = getBlockAtPath(blocks, prevPath)
      if (prev === undefined) return
      const joinAt = textOf(prev).length
      commit({ kind: "mergeWithPrevious", id: blockId })
      focusBlock(prev.id ?? "", joinAt)
    },
    [commit, flushPendingText, requestFocus, focusBlock]
  )

  const handleArrowVertical = useCallback(
    (blockId: string, direction: "up" | "down") => {
      const ids = flattenBlockIds(docRef.current.blocks, { isCollapsed })
      const i = ids.indexOf(blockId)
      if (i === -1) return
      const targetId = direction === "up" ? ids[i - 1] : ids[i + 1]
      if (targetId === undefined) return
      focusBlock(targetId, direction === "up" ? "end" : "start")
    },
    [focusBlock, isCollapsed]
  )

  const handleDocumentExtreme = useCallback(
    (direction: "start" | "end") => {
      const ids = flattenBlockIds(docRef.current.blocks, { isCollapsed })
      const targetId = direction === "start" ? ids[0] : ids[ids.length - 1]
      if (targetId === undefined) return
      focusBlock(targetId, direction === "start" ? "start" : "end")
    },
    [focusBlock, isCollapsed]
  )

  const handleSlashSelect = useCallback(
    (choice: SlashChoice) => {
      const blockId = slashBlockId
      setSlashBlockId(null)
      if (blockId === null) return
      flushPendingText()
      const cur = findBlock(docRef.current.blocks, blockId)
      const curEmpty = cur !== undefined && textOf(cur) === ""

      if (choice.type === "divider") {
        let dividerId: string
        if (curEmpty && cur?.type === "paragraph") {
          dividerId = blockId
          commit({ kind: "turnInto", id: blockId, type: "divider" })
        } else {
          const divider = createBlock("divider", { id: newBlockId() })
          dividerId = divider.id ?? ""
          commit({ kind: "insertAfter", afterId: blockId, block: divider })
        }
        const trailing = createBlock("paragraph", { id: newBlockId() })
        commit({ kind: "insertAfter", afterId: dividerId, block: trailing })
        requestFocus(trailing.id ?? "", "start")
        return
      }

      if (curEmpty) {
        commit({ kind: "turnInto", id: blockId, type: choice.type, level: choice.level })
        requestFocus(blockId, "start")
        return
      }
      const block = createBlock(choice.type, { id: newBlockId(), level: choice.level })
      commit({ kind: "insertAfter", afterId: blockId, block })
      requestFocus(block.id ?? "", "start")
    },
    [commit, flushPendingText, requestFocus, slashBlockId]
  )

  const ensureFirstBlock = useCallback(() => {
    if (docRef.current.blocks.length > 0) return
    const block = createBlock("paragraph", { id: newBlockId() })
    commit({ kind: "insertAfter", afterId: null, block })
    requestFocus(block.id ?? "", "start")
  }, [commit, requestFocus])

  return {
    slashBlockId,
    setSlashBlockId,
    handleEnter,
    handleBackspaceAtStart,
    handleArrowVertical,
    handleDocumentExtreme,
    handleSlashSelect,
    ensureFirstBlock,
  }
}
