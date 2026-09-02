"use client"

import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import {
  DATE_SENTINEL_OPTIONS,
  RELATIVE_DIRECTION_OPTIONS,
  RELATIVE_UNIT_OPTIONS,
} from "@akasha/pages-core/property-types/date-sentinels"
import type { ReadonlyJSONValue } from "@akasha/pages-core/schema/pages"
import {
  betweenDateToJson,
  betweenInstantToJson,
  parseBetweenDateValue,
  parseBetweenInstantValue,
  parseRelativeToTodayValue,
  parseSentinelDateValue,
  parseSentinelInstantValue,
  relativeToTodayToJson,
  sentinelDateToJson,
  sentinelInstantToJson,
} from "@akasha/pages-ui-components/date-time-filter-inputs-parse"
import { Check, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function DateSentinelInput({
  value,
  onChange,
}: {
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const sv = parseSentinelDateValue(value)
  const [sentinelOpen, setSentinelOpen] = useState(false)

  const sentinelLabel =
    DATE_SENTINEL_OPTIONS.find((o) => o.value === sv.sentinel)?.label ?? "Custom date"

  return (
    <>
      <Popover open={sentinelOpen} onOpenChange={setSentinelOpen}>
        <PopoverTrigger asChild>
          <ButtonBadge variant="elevation-muted">
            {sentinelLabel}
            <ChevronDown className="size-3 text-tertiary" />
          </ButtonBadge>
        </PopoverTrigger>
        <PopoverContent align="start" className={`w-auto min-w-[160px] p-1 ${surfaceClass(4)}`}>
          <div className="flex flex-col">
            {DATE_SENTINEL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-xs hover:bg-primary/8"
                onClick={() => {
                  if (opt.value === "custom_date") {
                    onChange(
                      sentinelDateToJson({ sentinel: "custom_date", customDate: sv.customDate })
                    )
                  } else {
                    onChange(sentinelDateToJson({ sentinel: opt.value }))
                  }
                  setSentinelOpen(false)
                }}
              >
                <Check
                  className={`size-3 ${opt.value === sv.sentinel ? "opacity-100" : "opacity-0"}`}
                />
                {opt.label}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {sv.sentinel === "custom_date" && (
        <input
          type="date"
          value={sv.customDate ?? ""}
          onChange={(e) => {
            onChange(
              sentinelDateToJson({
                sentinel: "custom_date",
                customDate: e.target.value !== "" ? e.target.value : undefined,
              })
            )
          }}
          className="rounded-md border border-secondary bg-surface text-secondary text-xs"
        />
      )}
    </>
  )
}

export function InstantSentinelInput({
  value,
  onChange,
}: {
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const sv = parseSentinelInstantValue(value)
  const [sentinelOpen, setSentinelOpen] = useState(false)
  const surface = useSurface()

  const sentinelLabel =
    DATE_SENTINEL_OPTIONS.find((o) => o.value === sv.sentinel)?.label ?? "Custom date"
  const dateTimeStr =
    sv.customInstant != null ? new Date(sv.customInstant).toISOString().slice(0, 16) : ""

  return (
    <>
      <Popover open={sentinelOpen} onOpenChange={setSentinelOpen}>
        <PopoverTrigger asChild>
          <ButtonBadge variant="elevation-muted">
            {sentinelLabel}
            <ChevronDown className="size-3 text-tertiary" />
          </ButtonBadge>
        </PopoverTrigger>
        <PopoverContent align="start" className={`w-auto min-w-[160px] p-1 ${surfaceClass(4)}`}>
          <div className="flex flex-col">
            {DATE_SENTINEL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-xs hover:bg-primary/8"
                onClick={() => {
                  if (opt.value === "custom_date") {
                    onChange(
                      sentinelInstantToJson({
                        sentinel: "custom_date",
                        customInstant: sv.customInstant,
                      })
                    )
                  } else {
                    onChange(sentinelInstantToJson({ sentinel: opt.value }))
                  }
                  setSentinelOpen(false)
                }}
              >
                <Check
                  className={`size-3 ${opt.value === sv.sentinel ? "opacity-100" : "opacity-0"}`}
                />
                {opt.label}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {sv.sentinel === "custom_date" && (
        <input
          type="datetime-local"
          value={dateTimeStr}
          onChange={(e) => {
            const ms = e.target.value !== "" ? new Date(e.target.value).getTime() : undefined
            if (ms != null) {
              onChange(sentinelInstantToJson({ sentinel: "custom_date", customInstant: ms }))
            }
          }}
          className={`date-input-accent rounded-md ${surfaceClass(surface + 1)} px-2 py-0.5 text-secondary text-xs outline-none focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]`}
        />
      )}
    </>
  )
}

export function RelativeToTodayInput({
  value,
  onChange,
}: {
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const rv = parseRelativeToTodayValue(value)

  useEffect(() => {
    if (value == null) {
      onChange(
        relativeToTodayToJson({
          type: "relative_to_today",
          direction: "this",
          unit: "week",
        })
      )
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      <SentinelBadgeSelect
        options={RELATIVE_DIRECTION_OPTIONS}
        value={rv.direction}
        onChange={(direction) =>
          onChange(relativeToTodayToJson({ type: "relative_to_today", direction, unit: rv.unit }))
        }
      />
      <SentinelBadgeSelect
        options={RELATIVE_UNIT_OPTIONS}
        value={rv.unit}
        onChange={(unit) =>
          onChange(
            relativeToTodayToJson({
              type: "relative_to_today",
              direction: rv.direction,
              unit,
            })
          )
        }
      />
    </div>
  )
}

export function BetweenDateValueInput({
  value,
  onChange,
}: {
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const bv = parseBetweenDateValue(value)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-secondary text-xs">From</span>
        <DateSentinelInput
          value={sentinelDateToJson(bv.start)}
          onChange={(startVal) => {
            onChange(
              betweenDateToJson({
                type: "between",
                start: parseSentinelDateValue(startVal),
                end: bv.end,
              })
            )
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-secondary text-xs">To</span>
        <DateSentinelInput
          value={sentinelDateToJson(bv.end)}
          onChange={(endVal) => {
            onChange(
              betweenDateToJson({
                type: "between",
                start: bv.start,
                end: parseSentinelDateValue(endVal),
              })
            )
          }}
        />
      </div>
    </div>
  )
}

export function BetweenInstantValueInput({
  value,
  onChange,
}: {
  value: ReadonlyJSONValue | undefined
  onChange: (value: ReadonlyJSONValue | undefined) => void
}) {
  const bv = parseBetweenInstantValue(value)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-secondary text-xs">From</span>
        <InstantSentinelInput
          value={sentinelInstantToJson(bv.start)}
          onChange={(startVal) => {
            onChange(
              betweenInstantToJson({
                type: "between",
                start: parseSentinelInstantValue(startVal),
                end: bv.end,
              })
            )
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-secondary text-xs">To</span>
        <InstantSentinelInput
          value={sentinelInstantToJson(bv.end)}
          onChange={(endVal) => {
            onChange(
              betweenInstantToJson({
                type: "between",
                start: bv.start,
                end: parseSentinelInstantValue(endVal),
              })
            )
          }}
        />
      </div>
    </div>
  )
}

function SentinelBadgeSelect<T extends string>({
  options,
  value,
  onChange,
}: {
  options: ReadonlyArray<{ value: T; label: string }>
  value: T
  onChange: (value: T) => void
}) {
  const [open, setOpen] = useState(false)
  const currentLabel = options.find((o) => o.value === value)?.label ?? value

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonBadge variant="elevation-muted">
          {currentLabel}
          <ChevronDown className="size-3 text-tertiary" />
        </ButtonBadge>
      </PopoverTrigger>
      <PopoverContent align="start" className={`w-auto min-w-[100px] p-1 ${surfaceClass(4)}`}>
        <div className="flex flex-col">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-xs hover:bg-primary/8"
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
            >
              <Check className={`size-3 ${opt.value === value ? "opacity-100" : "opacity-0"}`} />
              {opt.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
