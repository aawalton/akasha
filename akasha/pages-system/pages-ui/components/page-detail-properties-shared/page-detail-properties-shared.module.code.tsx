"use client"

import { Badge } from "@akasha/design-badges/badge"
import { Calendar } from "@akasha/design-forms/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import type { BadgeVariant } from "@akasha/pages-core/schema/color-rule"
import { formatSmartDate } from "@akasha/pages-core/view/format-smart-date"
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
  const selected = dateStr != null ? parseLocalDate(dateStr) : undefined

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
              onChange(formatLocalDate(d))
              setOpen(false)
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number)
  if (year === undefined || month === undefined || day === undefined) {
    throw new Error(`parseLocalDate: malformed date string ${dateStr}`)
  }
  return new Date(year, month - 1, day)
}

function formatLocalDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
