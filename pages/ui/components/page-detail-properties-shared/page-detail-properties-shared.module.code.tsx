"use client"

import {
  localDateIn,
  localDateOf,
} from "akasha/design/interfaces/badges/date-badge/date-badge.module.code.tsx"
import { Badge } from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { Calendar } from "akasha/design/interfaces/forms/modules/calendar/calendar.module.code.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interfaces/primitives/popover/popover.module.code.tsx"
import type { BadgeVariant } from "akasha/pages/core/schema/color-rule-variant/color-rule-variant.module.code.ts"
import { formatSmartDate } from "akasha/pages/core/view/format-smart-date/format-smart-date.module.code.ts"
import { useState } from "react"

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

export function DateBadge({
  value,
  onChange,
  variant = "elevation-muted",
}: {
  value: unknown
  onChange: (v: string | null) => void
  variant?: BadgeVariant
}) {
  const [open, setOpen] = useState(false)
  const dateStr = typeof value === "string" && DATE_REGEX.test(value) ? value : null
  const selected = dateStr != null ? localDateIn(dateStr) : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className="inline-flex h-5 cursor-pointer items-center outline-none focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
        >
          <Badge variant={variant}>
            {dateStr != null ? formatSmartDate(dateStr) : "Pick date"}
          </Badge>
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-3" onPointerDown={(e) => e.stopPropagation()}>
        <Calendar
          mode="single"
          defaultMonth={selected}
          selected={selected}
          onSelect={(d) => {
            if (d) {
              onChange(localDateOf(d))
              setOpen(false)
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
