"use client"

import { getEsoDayStr } from "@akasha/day/eso-day"
import { Badge } from "@akasha/design-badges/badge"
import { Button } from "@akasha/design-primitives/button"
import { Input } from "@akasha/design-primitives/input"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import type { PropertyValue } from "@akasha/pages-core/property-types/types"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import type { PropertyBadgeProps } from "@akasha/pages-ui-components/property-badge"
import { labelRrule } from "@akasha/recurrence/labeling"
import { parseRecurringText } from "@akasha/recurrence/parsing"
import { getOccurrenceAtOrAfter } from "@akasha/recurrence/scheduling"
import { useId, useState } from "react"

interface RruleValue {
  rule: string
  anchorFromCompletion: boolean
}

function readRruleValue(value: PropertyValue): RruleValue | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const rule: unknown = Reflect.get(value, "rule")
  if (typeof rule !== "string" || rule.length === 0) return null
  const anchor: unknown = Reflect.get(value, "anchorFromCompletion")
  if (typeof anchor !== "boolean") return null
  return { rule, anchorFromCompletion: anchor }
}

function findCompanion(
  defs: ReadonlyArray<PropertyDefinition> | undefined,
  id: string,
  type: PropertyDefinition["type"]
): PropertyDefinition | null {
  if (defs === undefined) return null
  const match = defs.find((d) => d.id === id)
  if (match === undefined || match.type !== type) return null
  return match
}

function readDateString(value: unknown): string | null {
  if (typeof value !== "string" || value === "") return null
  return value
}

export function RrulePropertyBadge({
  property,
  value,
  editable,
  pageData,
  propertyDefinitions,
  onPropertyChange,
}: PropertyBadgeProps) {
  const variant = property.accent ? "accent" : "elevation-muted"
  const parsed = readRruleValue(value)

  let label: string
  if (parsed === null) {
    label = "?"
  } else {
    try {
      label = labelRrule(parsed.rule, { anchorFromCompletion: parsed.anchorFromCompletion })
    } catch {
      label = "?"
    }
  }

  if (editable === true && onPropertyChange !== undefined) {
    return (
      <RrulePopoverBadge
        label={label}
        variant={variant}
        property={property}
        currentValue={parsed}
        pageData={pageData}
        propertyDefinitions={propertyDefinitions}
        onPropertyChange={onPropertyChange}
      />
    )
  }

  return <Badge variant={variant}>{label}</Badge>
}

function RrulePopoverBadge({
  label,
  variant,
  property,
  currentValue,
  pageData,
  propertyDefinitions,
  onPropertyChange,
}: {
  label: string
  variant: "accent" | "elevation-muted"
  property: PropertyDefinition
  currentValue: RruleValue | null
  pageData: PropertyBadgeProps["pageData"]
  propertyDefinitions: PropertyBadgeProps["propertyDefinitions"]
  onPropertyChange: NonNullable<PropertyBadgeProps["onPropertyChange"]>
}) {
  const [open, setOpen] = useState(false)
  const initialInput = currentValue === null ? "" : labelRruleSafe(currentValue, label)
  const [input, setInput] = useState(initialInput)
  const [error, setError] = useState<string | null>(null)
  const inputId = useId()

  const reset = (nextInput: string) => {
    setInput(nextInput)
    setError(null)
  }

  const handleOpenChange = (next: boolean) => {
    if (next) reset(initialInput)
    setOpen(next)
  }

  const handleSave = () => {
    const trimmed = input.trim()
    if (trimmed === "") {
      setError("Type a recurrence like 'every monday' or 'every! day'.")
      return
    }
    const recurring = parseRecurringText(trimmed)
    if (recurring === null) {
      setError(
        "Could not parse — try 'every monday', 'every 2 weeks on mon, wed', or 'every! day'."
      )
      return
    }
    try {
      labelRrule(recurring.rrule, { anchorFromCompletion: recurring.rruleFromCompletion })
    } catch {
      setError("That recurrence cannot be represented — try a simpler form.")
      return
    }

    onPropertyChange(property.id, {
      rule: recurring.rrule,
      anchorFromCompletion: recurring.rruleFromCompletion,
    })

    const dueTimeDef = findCompanion(propertyDefinitions, "dueTime", "calendar-time")
    if (dueTimeDef !== null && recurring.time !== null) {
      onPropertyChange("dueTime", recurring.time)
    }

    const dueDateDef = findCompanion(propertyDefinitions, "dueDate", "calendar-date")
    if (dueDateDef !== null) {
      const currentDueDate = readDateString(pageData?.dueDate)
      if (currentDueDate !== null) {
        const next = getOccurrenceAtOrAfter(recurring.rrule, currentDueDate)
        if (next !== null && next !== currentDueDate) {
          onPropertyChange("dueDate", next)
        }
      } else {
        onPropertyChange("dueDate", getEsoDayStr(new Date()))
      }
    }

    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className="inline-flex h-5 cursor-pointer items-center outline-none focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]"
        >
          <Badge variant={variant}>{label}</Badge>
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-3">
        <div className="flex flex-col gap-2">
          <label htmlFor={inputId} className="font-medium text-secondary text-xs">
            Recurrence
          </label>
          <Input
            id={inputId}
            autoFocus
            value={input}
            onChange={(e) => reset(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSave()
              } else if (e.key === "Escape") {
                e.preventDefault()
                setOpen(false)
              }
            }}
            placeholder="every monday at 9am"
          />
          {error !== null ? <p className="text-danger text-xs">{error}</p> : null}
          <div className="flex items-center justify-end gap-2">
            <Button variant="tertiary" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function labelRruleSafe(value: RruleValue, fallback: string): string {
  try {
    return labelRrule(value.rule, { anchorFromCompletion: value.anchorFromCompletion })
  } catch {
    return fallback
  }
}
