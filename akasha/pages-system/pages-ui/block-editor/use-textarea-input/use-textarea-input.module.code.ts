"use client"

import { leadingMarker } from "@akasha/pages-core/property-types/block-markers"
import {
  matchBlockShortcut,
  matchDocumentExtreme,
} from "@akasha/pages-core/property-types/block-shortcuts"
import { detectMarkdownShorthand } from "@akasha/pages-core/property-types/markdown-shorthand"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { type Ref, useCallback, useRef } from "react"
import type { BlockRowProps } from "../block-row/block-row.module.code.tsx"

export interface TextareaInputApi {
  readonly ref: Ref<HTMLTextAreaElement>
  readonly onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  readonly onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  readonly onMouseDown: (e: React.MouseEvent<HTMLTextAreaElement>) => void
  readonly onClick: (e: React.MouseEvent<HTMLTextAreaElement>) => void
  readonly onFocus: () => void
  readonly onBlur: () => void
}

function assignRef(ref: Ref<HTMLTextAreaElement>, value: HTMLTextAreaElement | null): undefined {
  if (typeof ref === "function") {
    ref(value)
    return
  }
  if (ref !== null && ref !== undefined) ref.current = value
}

export function useTextareaInput(props: BlockRowProps): TextareaInputApi {
  const propsRef = useRef(props)
  propsRef.current = props
  const enterShiftRef = useRef(false)
  const elRef = useRef<HTMLTextAreaElement | null>(null)

  const onBeforeInput = useCallback((e: InputEvent) => {
    const el = elRef.current
    if (el === null) return
    const p = propsRef.current
    const caret = el.selectionStart ?? el.value.length
    if (e.inputType === "insertText" && e.data === " ") {
      const transform = detectMarkdownShorthand(el.value, caret, "space")
      if (transform !== null) {
        e.preventDefault()
        p.onShorthand(transform)
      }
      return
    }
    if (e.inputType === "insertLineBreak" || e.inputType === "insertParagraph") {
      if (enterShiftRef.current) return
      const transform = detectMarkdownShorthand(el.value, caret, "enter")
      if (transform !== null) {
        e.preventDefault()
        p.onShorthand(transform)
        return
      }
      e.preventDefault()
      p.onEnter(caret)
    }
  }, [])

  const ref = useCallback(
    (el: HTMLTextAreaElement | null) => {
      const prev = elRef.current
      if (prev !== null) prev.removeEventListener("beforeinput", onBeforeInput)
      elRef.current = el
      if (el !== null) el.addEventListener("beforeinput", onBeforeInput)
      assignRef(propsRef.current.textareaRef, el)
    },
    [onBeforeInput]
  )

  const onMouseDown = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey && (e.metaKey || e.altKey)) {
      e.preventDefault()
      props.onSelectToggle()
      return
    }
    if (e.shiftKey) {
      e.preventDefault()
      props.onSelectRange()
    }
  }

  const onClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget
    const caret = el.selectionStart ?? 0
    if (props.block.type === "to-do") {
      const marker = leadingMarker(el.value)
      if (marker?.kind === "to-do" && caret <= 3) props.onToggleTodo()
      return
    }
    if (props.block.type === "toggle") {
      const marker = leadingMarker(el.value)
      if (marker?.kind === "toggle" && caret <= 1) props.onToggleCollapse()
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      e.preventDefault()
      props.onEscape()
      return
    }
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      if (props.block.type === "toggle") props.onToggleCollapse()
      return
    }
    if (e.key === "Enter") {
      enterShiftRef.current = e.shiftKey
      return
    }
    if (e.key === "Tab") {
      e.preventDefault()
      if (e.shiftKey) props.onOutdent()
      else props.onIndent()
      return
    }
    const shortcut = matchBlockShortcut({
      code: e.code,
      key: e.key,
      meta: e.metaKey,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
    })
    if (shortcut !== null) {
      e.preventDefault()
      switch (shortcut.kind) {
        case "turnInto":
          props.onTurnInto(shortcut.type, shortcut.level)
          return
        case "move":
          props.onMoveBlock(shortcut.direction)
          return
        case "duplicate":
          props.onDuplicate()
          return
        default:
          return assertNever(shortcut)
      }
    }
    const docExtreme = matchDocumentExtreme({
      code: e.code,
      key: e.key,
      meta: e.metaKey,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
    })
    if (docExtreme !== null) {
      e.preventDefault()
      props.onDocumentExtreme(docExtreme)
      return
    }
    const noMods = !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
    if (e.key === "ArrowUp" && noMods) {
      const el = e.currentTarget
      if (!el.value.slice(0, el.selectionStart).includes("\n")) {
        e.preventDefault()
        props.onArrowUp()
      }
      return
    }
    if (e.key === "ArrowDown" && noMods) {
      const el = e.currentTarget
      if (!el.value.slice(el.selectionEnd).includes("\n")) {
        e.preventDefault()
        props.onArrowDown()
      }
      return
    }
    if (e.key === "Backspace") {
      const el = e.currentTarget
      if (el.selectionStart === 0 && el.selectionEnd === 0) {
        e.preventDefault()
        props.onBackspaceAtStart()
      }
      return
    }
    if (e.key === "/") {
      if (e.currentTarget.value === "") {
        e.preventDefault()
        props.onSlashTrigger()
      }
    }
  }

  return {
    ref,
    onChange: (e) => props.onChangeText(e.target.value),
    onKeyDown,
    onMouseDown,
    onClick,
    onFocus: props.onFocusText,
    onBlur: props.onBlur,
  }
}
