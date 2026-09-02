"use client"

import { cn } from "@akasha/design-primitives/cn"
import * as React from "react"

import { Badge, type BadgeVariant } from "../badge/badge.module.code.tsx"
import { ButtonBadge } from "../button-badge/button-badge.module.code.tsx"

interface NumberBadgeProps {
  value: number
  editable?: boolean
  min?: number
  max?: number
  onChange?: (value: number) => void
  format?: (value: number) => string
  prefix?: string
  variant?: BadgeVariant
  className?: string
  "aria-label"?: string
  "aria-labelledby"?: string
}

const defaultFormat = (n: number) => `#${n.toLocaleString()}`

function NumberBadge({
  value,
  editable = false,
  min,
  max,
  onChange,
  format = defaultFormat,
  prefix = "#",
  variant,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: NumberBadgeProps) {
  if (!editable) {
    return (
      <Badge
        variant={variant}
        className={cn("tabular-nums", className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {format(value)}
      </Badge>
    )
  }
  return (
    <NumberBadgeEditable
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      format={format}
      prefix={prefix}
      variant={variant}
      className={className}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
    />
  )
}

function NumberBadgeEditable({
  value,
  min,
  max,
  onChange,
  format,
  prefix,
  variant,
  className,
  ariaLabel,
  ariaLabelledBy,
}: {
  value: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  format: (value: number) => string
  prefix: string
  variant?: BadgeVariant
  className?: string
  ariaLabel?: string
  ariaLabelledBy?: string
}) {
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
    let clamped = parsed
    if (min !== undefined) clamped = Math.max(min, clamped)
    if (max !== undefined) clamped = Math.min(max, clamped)
    if (clamped !== value) {
      onChange?.(clamped)
    }
  }

  function handleCancel() {
    setEditing(false)
  }

  React.useEffect(() => {
    if (editing) {
      requestAnimationFrame(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      })
    }
  }, [editing])

  const displayText = format(value)

  return (
    <ButtonBadge
      variant={variant}
      onClick={!editing ? handleEdit : undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "tabular-nums",
        editing && "cursor-text [outline-offset:-1px] [outline:1.5px_solid_var(--color-accent)]",
        className
      )}
    >
      {editing ? (
        <>
          {prefix}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            value={draft}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            onChange={(e) => {
              const filtered = e.target.value.replace(/[^0-9-]/g, "")
              setDraft(filtered)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleCommit()
              } else if (e.key === "Escape") {
                e.preventDefault()
                handleCancel()
              }
            }}
            onBlur={handleCommit}
            className="w-0 min-w-0 bg-transparent text-center font-medium text-current text-xs tabular-nums outline-none selection:bg-accent/15 selection:text-current"
            style={{ width: `${Math.max(draft.length, 1)}ch` }}
          />
        </>
      ) : (
        displayText
      )}
    </ButtonBadge>
  )
}

export type { NumberBadgeProps }
export { NumberBadge }
