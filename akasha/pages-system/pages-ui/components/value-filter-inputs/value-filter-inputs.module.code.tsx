"use client"

import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { DateBadge } from "@akasha/design-badges/date-badge"
import { InputBadge } from "@akasha/design-badges/input-badge"
import { NumberBadge } from "@akasha/design-badges/number-badge"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import type { FilterOperator } from "@akasha/pages-core/property-types/types"
import type { ReadonlyJSONValue } from "@akasha/pages-core/schema/pages"
import type { PageFilterDimension } from "@akasha/pages-core/view/generate-filter-dimensions"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"

export function toStringArray(value: ReadonlyJSONValue | undefined): readonly string[] {
  if (!Array.isArray(value)) return []
  return value.filter((v): v is string => typeof v === "string")
}

export function TextValueInput({
  value,
  onChange,
}: {
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const [local, setLocal] = useState(typeof value === "string" ? value : "")

  return (
    <InputBadge
      value={local}
      onChange={setLocal}
      onCommit={(v) => onChange(v !== "" ? v : undefined)}
      placeholder="Value..."
    />
  )
}

export function NumberValueInput({
  value,
  onChange,
}: {
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const numValue = typeof value === "number" ? value : 0

  return (
    <NumberBadge
      editable
      value={numValue}
      min={-999999}
      max={999999}
      onChange={(n) => onChange(n)}
      format={(n) => String(n)}
      prefix=""
      variant="elevation-muted"
    />
  )
}

export function DateValueInput({
  value,
  onChange,
}: {
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const dateStr = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null

  return (
    <DateBadge
      editable
      label={dateStr ?? ""}
      value={dateStr}
      onDateChange={(d) => onChange(d != null && d !== "" ? d : undefined)}
      clearable
    />
  )
}

export function CalendarTimeValueInput({
  value,
  onChange,
}: {
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const time = typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value) ? value : ""

  return (
    <input
      type="time"
      value={time}
      onChange={(e) => onChange(e.target.value !== "" ? e.target.value : undefined)}
      className="rounded-md border border-outline bg-surface px-2 py-0.5 font-mono text-sm tabular-nums"
    />
  )
}

export function InstantValueInput({
  value,
  onChange,
}: {
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const msValue = typeof value === "number" ? value : null
  const dateTimeStr = msValue != null ? new Date(msValue).toISOString().slice(0, 16) : ""

  return (
    <input
      type="datetime-local"
      value={dateTimeStr}
      onChange={(e) => {
        const ms = e.target.value !== "" ? new Date(e.target.value).getTime() : undefined
        onChange(ms)
      }}
      className="rounded-md border border-outline bg-surface px-2 py-0.5 text-sm"
    />
  )
}

export function SelectBadgePicker({
  dimension,
  operator,
  value,
  onChange,
}: {
  dimension: PageFilterDimension
  operator: FilterOperator
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const [open, setOpen] = useState(false)
  const options = dimension.options ?? []
  const isArrayOperator = operator === "includes" || operator === "not_includes"

  const selectedIds: readonly string[] = isArrayOperator
    ? toStringArray(value)
    : typeof value === "string"
      ? [value]
      : []

  const triggerLabel =
    selectedIds.length === 0
      ? "All"
      : selectedIds.length === 1
        ? (options.find((o) => o.id === selectedIds[0])?.label ?? selectedIds[0])
        : `${selectedIds.length} selected`

  const toggleOption = (optionId: string) => {
    if (isArrayOperator) {
      const next = selectedIds.includes(optionId)
        ? selectedIds.filter((id) => id !== optionId)
        : [...selectedIds, optionId]
      onChange(next.length > 0 ? next : undefined)
    } else {
      if (selectedIds.includes(optionId)) {
        onChange(undefined)
      } else {
        onChange(optionId)
      }
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonBadge variant="elevation-muted">
          {triggerLabel}
          <ChevronDown className="size-3 text-tertiary" />
        </ButtonBadge>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={`max-h-[240px] w-auto min-w-[160px] overflow-y-auto p-1 ${surfaceClass(4)}`}
      >
        <div className="flex flex-col">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-xs hover:bg-primary/8"
              onClick={() => toggleOption(opt.id)}
            >
              <Check
                className={`size-3 ${selectedIds.includes(opt.id) ? "opacity-100" : "opacity-0"}`}
              />
              {opt.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
