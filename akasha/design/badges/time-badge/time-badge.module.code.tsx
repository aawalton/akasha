"use client"

import { parseDateExpression } from "@akasha/design-forms/date-parser"
import { formatTime12h } from "@akasha/design-forms/format-time"
import { normalizeBareNumericTime } from "@akasha/design-forms/normalize-bare-numeric-time"
import { Input } from "@akasha/design-primitives/input"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { useEffect, useRef, useState } from "react"
import { Badge, type BadgeVariant } from "../badge/badge.module.code.tsx"
import { useBadgeLayoutContext } from "../badge-layout-context/badge-layout-context.module.code.tsx"

interface TimeBadgeProps {
  value: string | null
  editable?: boolean
  onTimeChange?: (time: string | null) => void
  variant?: BadgeVariant
  isOverdue?: boolean
  onOpenChange?: (open: boolean) => void
  clearable?: boolean
}

function TimeBadge({
  value,
  editable = false,
  onTimeChange,
  variant = "elevation-muted",
  isOverdue,
  onOpenChange,
  clearable = true,
}: TimeBadgeProps) {
  const resolvedVariant = isOverdue ? "red" : variant

  if (!editable) {
    return <Badge variant={resolvedVariant}>{value != null ? formatTime12h(value) : "Time"}</Badge>
  }
  return (
    <TimeBadgeEditable
      value={value}
      onTimeChange={onTimeChange}
      variant={resolvedVariant}
      onOpenChange={onOpenChange}
      clearable={clearable}
    />
  )
}

function TimeBadgeEditable({
  value,
  onTimeChange,
  variant,
  onOpenChange,
  clearable,
}: {
  value: string | null
  onTimeChange?: (time: string | null) => void
  variant?: BadgeVariant
  onOpenChange?: (open: boolean) => void
  clearable?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value != null ? formatTime12h(value) : "")
  const inputRef = useRef<HTMLInputElement>(null)
  const layout = useBadgeLayoutContext()
  const align = layout.popoverAlign ?? "start"

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (next) {
      setInputValue(value != null ? formatTime12h(value) : "")
    }
    onOpenChange?.(next)
  }

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.select())
    }
  }, [open])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const parsed = parseDateExpression(normalizeBareNumericTime(inputValue))
      if (parsed?.time != null) {
        onTimeChange?.(parsed.time)
        setOpen(false)
        onOpenChange?.(false)
      }
    } else if (e.key === "Escape") {
      setOpen(false)
      onOpenChange?.(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="group cursor-pointer text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <Badge
            variant={variant}
            onRemove={clearable === true && value != null ? () => onTimeChange?.(null) : undefined}
            removeLabel="Clear time"
            className="group-hover:bg-primary/8"
          >
            {value != null ? formatTime12h(value) : "Time"}
          </Badge>
        </button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-48 p-3">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='e.g. "3pm", "3:30 PM"'
        />
      </PopoverContent>
    </Popover>
  )
}

export { TimeBadge, type TimeBadgeProps }
