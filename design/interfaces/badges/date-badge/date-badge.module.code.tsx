"use client"

import { ButtonBadge } from "akasha/design/interfaces/badges/button-badge/button-badge.module.code.tsx"
import {
  Badge,
  type BadgeVariant,
} from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { useBadgeLayoutContext } from "akasha/design/interfaces/badges/modules/badge-layout-context/badge-layout-context.module.code.tsx"
import { Calendar } from "akasha/design/interfaces/forms/calendar/calendar.module.code.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interfaces/primitives/popover/popover.module.code.tsx"
import { padTwo } from "akasha/utils/digit-padding/pad-two/pad-two.module.code.ts"
import { CalendarDays } from "lucide-react"
import { useState } from "react"

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

  const selectedDate = value != null ? localDateIn(value) : undefined

  const handleSelect = (selected: Date | undefined) => {
    if (selected) {
      onDateChange?.(localDateOf(selected))
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

function localDateIn(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number)
  if (year === undefined || month === undefined || day === undefined) {
    throw new Error(`localDateIn: invalid date string ${dateStr}`)
  }
  return new Date(year, month - 1, day)
}

function localDateOf(date: Date): string {
  return `${date.getFullYear()}-${padTwo(date.getMonth() + 1)}-${padTwo(date.getDate())}`
}

export type { DateBadgeProps }
export { DateBadge, localDateIn, localDateOf }
