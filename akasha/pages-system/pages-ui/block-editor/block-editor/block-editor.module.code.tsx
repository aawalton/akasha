"use client"

import { useDebouncedCallback } from "@akasha/design-primitives/use-debounced-callback"
import type { Block, RichDocument } from "@akasha/pages-core/property-types/rich-document"
import {
  applyEditorOp,
  type EditorOp,
  normalizeRichDocument,
} from "@akasha/pages-core/property-types/rich-document-ops"
import { BlockAccessoryBar } from "@akasha/pages-ui/block-editor/block-accessory-bar"
import { BlockTree } from "@akasha/pages-ui/block-editor/block-tree"
import { collectToggleIds } from "@akasha/pages-ui/block-editor/block-type-helpers"
import { SlashMenu } from "@akasha/pages-ui/block-editor/slash-menu"
import { useBlockCollapse } from "@akasha/pages-ui/block-editor/use-block-collapse"
import { useBlockFocus } from "@akasha/pages-ui/block-editor/use-block-focus"
import { useBlockKeys } from "@akasha/pages-ui/block-editor/use-block-keys"
import { useBlockOps } from "@akasha/pages-ui/block-editor/use-block-ops"
import { useBlockPersistence } from "@akasha/pages-ui/block-editor/use-block-persistence"
import { useBlockSelection } from "@akasha/pages-ui/block-editor/use-block-selection"
import { useCoarsePointer } from "@akasha/pages-ui/block-editor/use-coarse-pointer"
import { useKeyboardInset } from "@akasha/pages-ui/block-editor/use-keyboard-inset"
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { BlockRow } from "../block-row/block-row.module.code.tsx"

interface BlockEditorProps {
  pageTypeSlug: string
  id: string
  propertyId: string
  value: unknown
}

export function BlockEditor({ pageTypeSlug, id, propertyId, value }: BlockEditorProps) {
  const [doc, setDoc] = useState<RichDocument>(() => normalizeRichDocument(value))

  const docRef = useRef<RichDocument>(doc)
  const dirtyRef = useRef(false)
  const enqueue = useBlockPersistence({
    pageTypeSlug,
    id,
    propertyId,
    currentDocRef: docRef,
  })

  useEffect(() => {
    if (dirtyRef.current) return
    const incoming = normalizeRichDocument(value)
    if (JSON.stringify(incoming) === JSON.stringify(docRef.current)) return
    docRef.current = incoming
    setDoc(incoming)
  }, [value])

  const { isCollapsed, toggleCollapse, expand, defaultCollapseToggles } = useBlockCollapse(
    collectToggleIds(doc.blocks)
  )

  useEffect(() => {
    defaultCollapseToggles(collectToggleIds(doc.blocks))
  }, [doc, defaultCollapseToggles])

  const pendingTextRef = useRef<{ id: string; text: string } | null>(null)

  const commit = useCallback(
    (op: EditorOp) => {
      dirtyRef.current = true
      const prev = docRef.current
      const next = applyEditorOp(prev, op)
      docRef.current = next
      setDoc(next)
      void enqueue(prev, op)
    },
    [enqueue]
  )

  const flushPendingText = useCallback(() => {
    const pending = pendingTextRef.current
    if (pending === null) return
    pendingTextRef.current = null
    commit({ kind: "updateText", id: pending.id, text: pending.text })
  }, [commit])

  const debouncedPersistText = useDebouncedCallback(flushPendingText, 600)

  const {
    setTextareaRef,
    requestFocus,
    focusBlock,
    focusBlockThroughCommit,
    focusLastBlockEnd,
    textareaRefs,
  } = useBlockFocus({ doc, docRef, isCollapsed })

  const selection = useBlockSelection({
    docRef,
    commit,
    flushPendingText,
    requestFocus,
    isCollapsed,
  })

  const coarsePointer = useCoarsePointer()
  const keyboardInset = useKeyboardInset()
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null)
  const clearFocusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleTextFocus = useCallback(
    (blockId: string) => {
      if (clearFocusTimerRef.current !== null) {
        clearTimeout(clearFocusTimerRef.current)
        clearFocusTimerRef.current = null
      }
      selection.clearSelection()
      setFocusedBlockId(blockId)
    },
    [selection]
  )
  const handleTextBlur = useCallback(() => {
    flushPendingText()
    if (clearFocusTimerRef.current !== null) clearTimeout(clearFocusTimerRef.current)
    clearFocusTimerRef.current = setTimeout(() => {
      clearFocusTimerRef.current = null
      const active = document.activeElement
      const stillEditing =
        active instanceof HTMLTextAreaElement &&
        Array.from(textareaRefs.current.values()).includes(active)
      if (!stillEditing) setFocusedBlockId(null)
    }, 0)
  }, [flushPendingText])
  useEffect(() => {
    return () => {
      if (clearFocusTimerRef.current !== null) clearTimeout(clearFocusTimerRef.current)
    }
  }, [])

  const handleChangeText = useCallback(
    (blockId: string, text: string) => {
      dirtyRef.current = true
      const prev = docRef.current
      const next = applyEditorOp(prev, { kind: "updateText", id: blockId, text })
      docRef.current = next
      setDoc(next)
      pendingTextRef.current = { id: blockId, text }
      debouncedPersistText()
    },
    [debouncedPersistText]
  )

  const {
    handleToggleTodo,
    handleTurnInto,
    handleMoveBlock,
    handleDuplicate,
    handleDeleteBlock,
    handleIndent,
    handleOutdent,
    handleShorthand,
  } = useBlockOps({
    docRef,
    commit,
    flushPendingText,
    requestFocus,
    focusBlockThroughCommit,
    expand,
    isCollapsed,
  })

  const {
    slashBlockId,
    setSlashBlockId,
    handleEnter,
    handleBackspaceAtStart,
    handleArrowVertical,
    handleDocumentExtreme,
    handleSlashSelect,
    ensureFirstBlock,
  } = useBlockKeys({ docRef, commit, flushPendingText, requestFocus, focusBlock, isCollapsed })

  if (doc.blocks.length === 0) {
    return (
      <button
        type="button"
        onClick={ensureFirstBlock}
        aria-label="Empty note — click to start typing"
        className="flex min-h-full w-full cursor-text touch-pan-y items-start justify-start rounded-sm px-0.5 text-left text-base md:text-sm"
      />
    )
  }

  const RenderRow = (block: Block): ReactNode => {
    const blockId = block.id ?? ""
    const row = (
      <BlockRow
        block={block}
        selected={selection.selection?.ids.has(blockId) ?? false}
        textareaRef={setTextareaRef(blockId)}
        onChangeText={(text) => handleChangeText(blockId, text)}
        onEnter={(caret) => handleEnter(blockId, caret)}
        onArrowUp={() => handleArrowVertical(blockId, "up")}
        onArrowDown={() => handleArrowVertical(blockId, "down")}
        onDocumentExtreme={(direction) => handleDocumentExtreme(direction)}
        onBackspaceAtStart={() => handleBackspaceAtStart(blockId)}
        onSlashTrigger={() => setSlashBlockId(blockId)}
        onToggleTodo={() => handleToggleTodo(blockId)}
        onShorthand={(transform) => handleShorthand(blockId, transform)}
        onTurnInto={(type, level) => handleTurnInto(blockId, type, level)}
        onMoveBlock={(direction) => handleMoveBlock(blockId, direction)}
        onDuplicate={() => handleDuplicate(blockId)}
        onIndent={() => handleIndent(blockId)}
        onOutdent={() => handleOutdent(blockId)}
        onToggleCollapse={() => toggleCollapse(blockId)}
        onEscape={() => selection.enterSelection(blockId)}
        onSelectRange={() => selection.rangeSelectTo(blockId)}
        onSelectToggle={() => selection.toggleSelect(blockId)}
        onFocusText={() => handleTextFocus(blockId)}
        onBlur={handleTextBlur}
      />
    )
    if (slashBlockId === blockId) {
      return (
        <SlashMenu
          open
          onSelect={handleSlashSelect}
          onClose={() => {
            setSlashBlockId(null)
            requestFocus(blockId, "end")
          }}
        >
          <div>{row}</div>
        </SlashMenu>
      )
    }
    return row
  }

  return (
    <div className="flex min-h-full flex-col gap-0.5">
      <BlockTree blocks={doc.blocks} renderRow={RenderRow} isCollapsed={isCollapsed} />
      {}
      <button
        type="button"
        aria-label="Focus end of notes"
        tabIndex={-1}
        className="flex-1 cursor-text touch-pan-y"
        onPointerDown={(e) => {
          e.preventDefault()
          focusLastBlockEnd()
        }}
      />
      {coarsePointer && focusedBlockId !== null && (
        <BlockAccessoryBar
          inset={keyboardInset}
          onIndent={() => handleIndent(focusedBlockId)}
          onOutdent={() => handleOutdent(focusedBlockId)}
          onMoveUp={() => handleMoveBlock(focusedBlockId, "up")}
          onMoveDown={() => handleMoveBlock(focusedBlockId, "down")}
          onDelete={() => handleDeleteBlock(focusedBlockId)}
          onDuplicate={() => handleDuplicate(focusedBlockId)}
          onTurnInto={() => setSlashBlockId(focusedBlockId)}
        />
      )}
    </div>
  )
}
