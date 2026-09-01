"use client"

import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { useEffect, useRef, useState } from "react"

interface InlineEditableTextProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  inputClassName?: string
  validate?: (value: string) => string | null
  maxLength?: number
  displayValue?: string
}

const DISPLAY_ONLY_CLASS_RE = /^(truncate|overflow-hidden|select-none|max-w-)/

function stripDisplayOnlyClasses(className: string | undefined): string {
  if (className == null) return ""
  return className
    .split(" ")
    .filter((cls) => !DISPLAY_ONLY_CLASS_RE.test(cls))
    .join(" ")
}

export function InlineEditableText({
  value,
  onChange,
  placeholder = "Enter text...",
  className,
  inputClassName,
  validate,
  maxLength,
  displayValue,
}: InlineEditableTextProps) {
  const surface = useSurface()
  const [isEditing, setIsEditing] = useState(false)
  const [draftValue, setDraftValue] = useState(value)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isEditing) {
      setDraftValue(value)
    }
  }, [value, isEditing])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const enterEditMode = () => {
    setDraftValue(value)
    setError(null)
    setIsEditing(true)
  }

  const save = () => {
    const trimmedValue = draftValue.trim()

    if (validate) {
      const validationError = validate(trimmedValue)
      if (validationError != null) {
        setError(validationError)
        return
      }
    }

    if (trimmedValue !== value) {
      onChange(trimmedValue)
    }

    setError(null)
    setIsEditing(false)
  }

  const cancel = () => {
    setDraftValue(value)
    setError(null)
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

  const handleBlur = () => {
    save()
  }

  if (isEditing) {
    return (
      <div className="flex w-full flex-col gap-1">
        <input
          ref={inputRef}
          type="text"
          value={draftValue}
          onChange={(e) => setDraftValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={error != null ? "true" : "false"}
          className={cn(
            "h-auto w-full min-w-0 bg-transparent px-0 py-0 outline-none selection:bg-accent/20 placeholder:text-tertiary",
            error != null && surfaceClass(surface + 2),
            stripDisplayOnlyClasses(className),
            inputClassName
          )}
        />
        {error != null && (
          <div className="text-secondary text-sm" role="alert">
            {error}
          </div>
        )}
      </div>
    )
  }

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
        draftValue === "" && "text-tertiary",
        className
      )}
    >
      {draftValue !== ""
        ? displayValue != null && displayValue !== ""
          ? displayValue
          : draftValue
        : placeholder}
    </div>
  )
}
