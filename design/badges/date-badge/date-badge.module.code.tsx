"use client"

import { Calendar } from "@akasha/design-forms/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { CalendarDays } from "lucide-react"
import { useState } from "react"
import { Badge, type BadgeVariant } from "../badge/badge.module.code.tsx"
import { useBadgeLayoutContext } from "../badge-layout-context/badge-layout-context.module.code.tsx"
import { ButtonBadge } from "../button-badge/button-badge.module.code.tsx"

interface DateBadgeProps {
  label: string
  value: string | null
  editable?: boolean
  onDateChange?: (date: string | null) => void
  variant?: BadgeVariant
  clearable?: boolean
  removeLabel?: string
  className?: string
}

function DateBadge({
  label,
  value,
  editable = false,
  onDateChange,
  variant = "elevation-muted",
  clearable = true,
  removeLabel = "Clear date",
  className,
}: DateBadgeProps) {
  if (!editable) {
    return (
      <Badge variant={variant} className={className}>
        {label}
      </Badge>
    )
  }
  return (
    <DateBadgeEditable
      label={label}
      value={value}
      onDateChange={onDateChange}
      variant={variant}
      clearable={clearable}
      removeLabel={removeLabel}
      className={className}
    />
  )
}

function DateBadgeEditable({
  label,
  value,
  onDateChange,
  variant,
  clearable,
  removeLabel,
  className,
}: {
  label: string
  value: string | null
  onDateChange?: (date: string | null) => void
  variant?: BadgeVariant
  clearable?: boolean
  removeLabel?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const layout = useBadgeLayoutContext()
  const align = layout.popoverAlign ?? "start"

  const selectedDate = value != null ? parseLocalDate(value) : undefined

  const handleSelect = (selected: Date | undefined) => {
    if (selected) {
      onDateChange?.(formatLocalDate(selected))
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonBadge
          variant={variant}
          onRemove={clearable === true && value != null ? () => onDateChange?.(null) : undefined}
          removeLabel={removeLabel}
          className={className}
        >
          {label}
          <CalendarDays className="size-3 text-tertiary" />
        </ButtonBadge>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto p-3">
        <Calendar mode="single" selected={selectedDate} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  )
}

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number)
  if (year === undefined || month === undefined || day === undefined) {
    throw new Error(`parseLocalDate: invalid date string ${dateStr}`)
  }
  return new Date(year, month - 1, day)
}

function formatLocalDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export type { DateBadgeProps }
export { DateBadge }
