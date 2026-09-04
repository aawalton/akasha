"use client"

import { toggleTodoMarker } from "@akasha/pages-core/property-types/block-markers"
import type { ShorthandTransform } from "@akasha/pages-core/property-types/markdown-shorthand"
import type { RichDocument } from "@akasha/pages-core/property-types/rich-document"
import {
  createBlock,
  type EditorOp,
  type HeadingLevel,
  newBlockId,
  type V1BlockType,
} from "@akasha/pages-core/property-types/rich-document-ops"
import {
  findBlock,
  findBlockPath,
  flattenBlockIds,
  getBlockAtPath,
} from "@akasha/pages-core/property-types/rich-document-tree"
import { type RefObject, useCallback } from "react"

export interface BlockOpsDeps {
  readonly docRef: RefObject<RichDocument>
  readonly commit: (op: EditorOp) => void
  readonly flushPendingText: () => void
  readonly requestFocus: (blockId: string, caret: "start" | "end") => void
  readonly focusBlockThroughCommit: (blockId: string, caret: "start" | "end") => void
  readonly expand: (id: string) => void
  readonly isCollapsed: (id: string) => boolean
}

export interface BlockOpsApi {
  readonly handleToggleTodo: (blockId: string) => void
  readonly handleTurnInto: (blockId: string, type: V1BlockType, level?: HeadingLevel) => void
  readonly handleMoveBlock: (blockId: string, direction: "up" | "down") => void
  readonly handleDuplicate: (blockId: string) => void
  readonly handleDeleteBlock: (blockId: string) => void
  readonly handleIndent: (blockId: string) => void
  readonly handleOutdent: (blockId: string) => void
  readonly handleShorthand: (blockId: string, transform: ShorthandTransform) => void
}

export function useBlockOps(deps: BlockOpsDeps): BlockOpsApi {
  const {
    docRef,
    commit,
    flushPendingText,
    requestFocus,
    focusBlockThroughCommit,
    expand,
    isCollapsed,
  } = deps

  const handleToggleTodo = useCallback(
    (blockId: string) => {
      flushPendingText()
      const cur = findBlock(docRef.current.blocks, blockId)
      if (cur === undefined) return
      const text = typeof cur.text === "string" ? cur.text : ""
      commit({ kind: "updateText", id: blockId, text: toggleTodoMarker(text) })
    },
    [commit, docRef, flushPendingText]
  )

  const handleTurnInto = useCallback(
    (blockId: string, type: V1BlockType, level?: HeadingLevel) => {
      flushPendingText()
      commit({ kind: "turnInto", id: blockId, type, level })
      requestFocus(blockId, "end")
    },
    [commit, flushPendingText, requestFocus]
  )

  const handleMoveBlock = useCallback(
    (blockId: string, direction: "up" | "down") => {
      flushPendingText()
      commit({ kind: "moveBlock", id: blockId, direction })
      requestFocus(blockId, "end")
    },
    [commit, flushPendingText, requestFocus]
  )

  const handleDuplicate = useCallback(
    (blockId: string) => {
      flushPendingText()
      const newId = newBlockId()
      commit({ kind: "duplicateBlock", id: blockId, newId })
      requestFocus(newId, "end")
    },
    [commit, flushPendingText, requestFocus]
  )

  const handleDeleteBlock = useCallback(
    (blockId: string) => {
      flushPendingText()
      const visible = flattenBlockIds(docRef.current.blocks, { isCollapsed })
      const idx = visible.indexOf(blockId)
      const neighbor = idx > 0 ? visible[idx - 1] : visible[idx + 1]
      commit({ kind: "deleteBlock", id: blockId })
      if (neighbor !== undefined) focusBlockThroughCommit(neighbor, "end")
    },
    [commit, docRef, flushPendingText, isCollapsed, focusBlockThroughCommit]
  )

  const handleIndent = useCallback(
    (blockId: string) => {
      flushPendingText()
      const path = findBlockPath(docRef.current.blocks, blockId)
      const idx = path === null ? 0 : (path[path.length - 1] ?? 0)
      if (path !== null && idx > 0) {
        const prev = getBlockAtPath(docRef.current.blocks, [...path.slice(0, -1), idx - 1])
        if (prev?.id !== undefined) expand(prev.id)
      }
      commit({ kind: "indent", id: blockId })
      requestFocus(blockId, "end")
    },
    [commit, docRef, expand, flushPendingText, requestFocus]
  )

  const handleOutdent = useCallback(
    (blockId: string) => {
      flushPendingText()
      commit({ kind: "outdent", id: blockId })
      requestFocus(blockId, "end")
    },
    [commit, flushPendingText, requestFocus]
  )

  const handleShorthand = useCallback(
    (blockId: string, transform: ShorthandTransform) => {
      flushPendingText()
      if (transform.kind === "divider") {
        commit({ kind: "turnInto", id: blockId, type: "divider" })
        const trailing = createBlock("paragraph", { id: newBlockId() })
        commit({ kind: "insertAfter", afterId: blockId, block: trailing })
        requestFocus(trailing.id ?? "", "start")
        return
      }
      commit({ kind: "turnInto", id: blockId, type: transform.type, level: transform.level })
      commit({ kind: "updateText", id: blockId, text: transform.marker })
      requestFocus(blockId, "end")
    },
    [commit, flushPendingText, requestFocus]
  )

  return {
    handleToggleTodo,
    handleTurnInto,
    handleMoveBlock,
    handleDuplicate,
    handleDeleteBlock,
    handleIndent,
    handleOutdent,
    handleShorthand,
  }
}
