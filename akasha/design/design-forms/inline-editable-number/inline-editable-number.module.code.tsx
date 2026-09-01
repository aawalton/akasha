"use client"

import { cn } from "@akasha/design-primitives/cn"
import { useEffect, useRef, useState } from "react"

export interface InlineEditableNumberProps {
  value: number | null | undefined
  onChange: (value: number | null) => void
  placeholder?: string
  className?: string
  inputClassName?: string
  min?: number
  max?: number
  step?: number
  suffix?: string
}

const DISPLAY_ONLY_CLASS_RE = /^(truncate|overflow-hidden|select-none|max-w-)/

function stripDisplayOnlyClasses(className: string | undefined): string {
  if (className == null) return ""
  return className
    .split(" ")
    .filter((cls) => !DISPLAY_ONLY_CLASS_RE.test(cls))
    .join(" ")
}

export function InlineEditableNumber({
  value,
  onChange,
  placeholder = "—",
  className,
  inputClassName,
  min,
  max,
  step = 1,
  suffix,
}: InlineEditableNumberProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftValue, setDraftValue] = useState(value?.toString() ?? "")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isEditing) {
      setDraftValue(value?.toString() ?? "")
    }
  }, [value, isEditing])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const enterEditMode = () => {
    setDraftValue(value?.toString() ?? "")
    setIsEditing(true)
  }

  const save = () => {
    const trimmed = draftValue.trim()
    if (trimmed === "") {
      if (value !== null && value !== undefined) {
        onChange(null)
      }
    } else {
      const num = Number(trimmed)
      if (!Number.isNaN(num)) {
        const clamped =
          min !== undefined && num < min ? min : max !== undefined && num > max ? max : num
        if (clamped !== value) {
          onChange(clamped)
        }
      }
    }
    setIsEditing(false)
  }

  const cancel = () => {
    setDraftValue(value?.toString() ?? "")
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      save()
    } else if (e.key === "Escape") {
      e.preventDefault()
      cancel()
    }
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        value={draftValue}
        onChange={(e) => setDraftValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={save}
        min={min}
        max={max}
        step={step}
        className={cn(
          "h-auto w-full min-w-0 bg-transparent px-0 py-0 text-left outline-none [appearance:textfield] selection:bg-accent/20 placeholder:text-tertiary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          stripDisplayOnlyClasses(className),
          inputClassName
        )}
      />
    )
  }

  const displayValue =
    value !== null && value !== undefined ? `${value}${suffix ?? ""}` : placeholder

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
        "cursor-text transition-colors hover:underline hover:decoration-1 hover:decoration-text-tertiary hover:underline-offset-4",
        "focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]",
        value === null || value === undefined ? "text-tertiary" : "",
        className
      )}
    >
      {displayValue}
    </div>
  )
}
