"use client"

import { cn } from "@akasha/design-primitives/cn"
import * as React from "react"

interface EditableNumberProps {
  value: number
  min?: number
  max: number
  onChange: (value: number) => void
  format?: (value: number) => string
  prefix?: string
  suffix?: string
  stopPropagation?: boolean
  className?: string
}

function EditableNumber({
  value,
  min = 0,
  max,
  onChange,
  format = String,
  prefix,
  suffix,
  stopPropagation = false,
  className,
}: EditableNumberProps) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleEdit() {
    setDraft(String(value))
    setEditing(true)
  }

  function handleCommit() {
    setEditing(false)
    const parsed = Number.parseInt(draft, 10)
    if (Number.isNaN(parsed)) return
    const clamped = Math.max(min, Math.min(max, parsed))
    if (clamped !== value) {
      onChange(clamped)
    }
  }

  function handleCancel() {
    setEditing(false)
  }

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  if (editing) {
    return (
      <span
        data-slot="editable-number"
        className={cn("text-inherit", className)}
        {...(stopPropagation && {
          onClick: (e: React.MouseEvent) => e.stopPropagation(),
          onPointerDown: (e: React.PointerEvent) => e.stopPropagation(),
        })}
      >
        {prefix}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={draft}
          onChange={(e) => {
            const filtered = e.target.value.replace(/[^0-9]/g, "")
            setDraft(filtered)
          }}
          onKeyDown={(e) => {
            if (stopPropagation) e.stopPropagation()
            if (e.key === "Enter") {
              e.preventDefault()
              handleCommit()
            } else if (e.key === "Escape") {
              e.preventDefault()
              handleCancel()
            }
          }}
          onBlur={handleCommit}
          className="w-0 min-w-0 rounded-sm bg-transparent text-center font-medium text-inherit tabular-nums outline-none ring-1 ring-accent selection:bg-accent/15 selection:text-current"
          style={{ width: `${Math.max(draft.length, 1)}ch` }}
        />
        {suffix}
      </span>
    )
  }

  return (
    <span
      data-slot="editable-number"
      role="button"
      tabIndex={0}
      className={cn("cursor-pointer text-inherit tabular-nums", className)}
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation()
        handleEdit()
      }}
      onPointerDown={stopPropagation ? (e) => e.stopPropagation() : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (stopPropagation) e.stopPropagation()
          e.preventDefault()
          handleEdit()
        }
      }}
    >
      {prefix}
      {format(value)}
      {suffix}
    </span>
  )
}

export type { EditableNumberProps }
export { EditableNumber }
