"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { ButtonBadge } from "@shared/design-badges/components/button-badge"
import { Textarea } from "@shared/design-primitives/components/textarea"
import { cn } from "@shared/design-primitives/utils/cn"
import { useEffect, useRef, useState } from "react"

import { MarkdownRenderer } from "../markdown/markdown-renderer"
import type { PropertyBadgeProps } from "./property-badge"

const FILL_EDITOR_CLASS =
  "field-sizing-fixed h-full min-h-0 resize-none rounded-none bg-transparent px-0 py-0 shadow-none focus-visible:[outline:none]"

interface MarkdownInlineEditorProps {
  source: string
  onSave: (next: string) => void
  fill?: boolean
}

function MarkdownInlineEditor({ source, onSave, fill }: MarkdownInlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(source)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isEditing) setDraft(source)
  }, [source, isEditing])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isEditing])

  const enterEditMode = () => {
    setDraft(source)
    setIsEditing(true)
  }

  const save = () => {
    if (draft !== source) onSave(draft)
    setIsEditing(false)
  }

  const cancel = () => {
    setDraft(source)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Textarea
        ref={textareaRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault()
            cancel()
          }
        }}
        placeholder="Enter markdown..."
        className={fill ? FILL_EDITOR_CLASS : "min-h-[6rem]"}
      />
    )
  }

  const isEmpty = source.length === 0
  return (
    <div
      onClick={enterEditMode}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          enterEditMode()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Click to edit"
      className={cn(
        "cursor-text touch-pan-y",
        fill && "h-full",
        isEmpty && "text-tertiary",
        isEmpty && !fill && "min-h-[6rem]"
      )}
    >
      {isEmpty ? "Enter markdown..." : <MarkdownRenderer content={source} />}
    </div>
  )
}

export function MarkdownPropertyBadge({
  property,
  value,
  context,
  editable,
  onPropertyChange,
  onCardNavigate,
  fill,
}: PropertyBadgeProps & {
  fill?: boolean
}) {
  if (context === "card") {
    const chars = String(value ?? "").length
    const label = `${property.title}: ${chars} chars`
    const variant = property.accent ? "accent" : "elevation-muted"
    if (onCardNavigate) {
      return (
        <ButtonBadge
          variant={variant}
          onClick={(e) => {
            e.stopPropagation()
            onCardNavigate()
          }}
        >
          {label}
        </ButtonBadge>
      )
    }
    return <Badge variant={variant}>{label}</Badge>
  }

  const source = String(value ?? "")
  if (editable && onPropertyChange) {
    return (
      <MarkdownInlineEditor
        source={source}
        onSave={(next) => onPropertyChange(property.id, next)}
        fill={fill}
      />
    )
  }
  return <MarkdownRenderer content={source} />
}
