"use client"

import { PAGE_TITLE_CLASSES } from "@akasha/design-layout/page-layout-data"
import { cn } from "@akasha/design-primitives/cn"
import { useCallback, useEffect, useRef, useState } from "react"

interface EditableTitleProps {
  value: string
  onSave: (newValue: string) => void
}

export function EditableTitle({ value, onSave }: EditableTitleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const [displayValue, setDisplayValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  useEffect(() => {
    if (!isEditing) setDraft(value)
  }, [value, isEditing])

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  const handleSave = useCallback(() => {
    const trimmed = draft.trim()
    if (trimmed !== "" && trimmed !== value) {
      setDisplayValue(trimmed)
      onSave(trimmed)
    }
    setIsEditing(false)
  }, [draft, value, onSave])

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            e.currentTarget.blur()
          }
          if (e.key === "Escape") {
            setDraft(value)
            setIsEditing(false)
          }
        }}
        className="w-full border-accent border-b-2 bg-transparent font-bold text-2xl text-primary outline-none"
      />
    )
  }

  return (
    <h1
      onClick={() => setIsEditing(true)}
      className={cn(
        PAGE_TITLE_CLASSES,
        "cursor-pointer select-text transition-colors hover:text-accent"
      )}
    >
      {displayValue}
    </h1>
  )
}
