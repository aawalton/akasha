"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "@akasha/design-badges/badge-toggle-group"
import { ButtonBadge } from "@akasha/design-badges/button-badge"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useDebouncedCallback } from "@akasha/design-primitives/use-debounced-callback"
import type { FilterOperator } from "@akasha/pages-core/property-types/types"
import type { ReadonlyJSONValue } from "@akasha/pages-core/schema/pages"
import type { ViewFilter } from "@akasha/pages-core/schema/view-data"
import type { PageFilterDimension } from "@akasha/pages-core/view/generate-filter-dimensions"
import {
  BetweenDateValueInput,
  BetweenInstantValueInput,
  DateSentinelInput,
  InstantSentinelInput,
  RelativeToTodayInput,
} from "@akasha/pages-ui-components/date-time-filter-inputs"
import {
  MultiRelationValueInput,
  RelationValueInput,
} from "@akasha/pages-ui-components/relation-filter-inputs"
import {
  CalendarTimeValueInput,
  DateValueInput,
  InstantValueInput,
  NumberValueInput,
  SelectBadgePicker,
  TextValueInput,
} from "@akasha/pages-ui-components/value-filter-inputs"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"

interface OperatorFilterControlProps {
  dimension: PageFilterDimension
  filter: ViewFilter | undefined
  onFilterChange: (filter: ViewFilter | null) => void
}

const ALL_FILTER_OPERATORS = [
  "equals",
  "not_equals",
  "contains",
  "not_contains",
  "gt",
  "lt",
  "gte",
  "lte",
  "is_empty",
  "is_not_empty",
  "includes",
  "not_includes",
  "is_between",
  "is_relative_to_today",
] as const satisfies ReadonlyArray<FilterOperator>

function isFilterOperator(v: string | undefined): v is FilterOperator {
  return v !== undefined && ALL_FILTER_OPERATORS.some((op) => op === v)
}

const VALUELESS_OPERATORS = new Set<FilterOperator>(["is_empty", "is_not_empty"])

const SENTINEL_SINGLE_OPS = new Set<FilterOperator>(["equals", "gt", "lt", "gte", "lte"])
const RELATIVE_OPS = new Set<FilterOperator>(["is_relative_to_today"])
const BETWEEN_OPS = new Set<FilterOperator>(["is_between"])

export function OperatorFilterControl({
  dimension,
  filter,
  onFilterChange,
}: OperatorFilterControlProps) {
  const debouncedFilterChange = useDebouncedCallback(onFilterChange, 300)
  const currentOperator: FilterOperator | undefined = isFilterOperator(filter?.operator)
    ? filter.operator
    : dimension.operators[0]?.value
  const operators = dimension.operators

  if (operators.length === 0) return null
  if (currentOperator === undefined) return null

  if (dimension.type === "boolean" && operators[0]?.value === "equals") {
    return (
      <BooleanFilterControl dimension={dimension} filter={filter} onFilterChange={onFilterChange} />
    )
  }

  const showOperatorDropdown = operators.length > 1
  const showValueInput = !VALUELESS_OPERATORS.has(currentOperator)

  return (
    <div className="flex flex-wrap items-start gap-2">
      {showOperatorDropdown && (
        <OperatorBadgeSelect
          operators={operators}
          value={currentOperator}
          onChange={(op: FilterOperator) => {
            const wasValueless = VALUELESS_OPERATORS.has(currentOperator)
            const isValueless = VALUELESS_OPERATORS.has(op)

            if (isValueless) {
              onFilterChange({ propertyId: dimension.id, operator: op })
            } else if (wasValueless) {
              onFilterChange({ propertyId: dimension.id, operator: op })
            } else {
              const needsClear = shouldClearValue(currentOperator, op, filter?.value)
              onFilterChange({
                propertyId: dimension.id,
                operator: op,
                value: needsClear ? undefined : filter?.value,
              })
            }
          }}
        />
      )}
      {showValueInput && (
        <ValueInput
          key={currentOperator}
          dimension={dimension}
          operator={currentOperator}
          value={filter?.value}
          onChange={(value: ReadonlyJSONValue | undefined) => {
            if (value === undefined || value === null || value === "") {
              debouncedFilterChange(null)
            } else {
              debouncedFilterChange({
                propertyId: dimension.id,
                operator: currentOperator,
                value,
              })
            }
          }}
        />
      )}
      {!showOperatorDropdown && !showValueInput && null}
    </div>
  )
}

function OperatorBadgeSelect({
  operators,
  value,
  onChange,
}: {
  operators: PageFilterDimension["operators"]
  value: FilterOperator
  onChange: (op: FilterOperator) => void
}) {
  const [open, setOpen] = useState(false)
  const currentLabel = operators.find((op) => op.value === value)?.label ?? value

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonBadge variant="elevation-muted">
          {currentLabel}
          <ChevronDown className="size-3 text-tertiary" />
        </ButtonBadge>
      </PopoverTrigger>
      <PopoverContent align="start" className={`w-auto min-w-[140px] p-1 ${surfaceClass(4)}`}>
        <div className="flex flex-col">
          {operators.map((op) => (
            <button
              key={op.value}
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-xs hover:bg-primary/8"
              onClick={() => {
                onChange(op.value)
                setOpen(false)
              }}
            >
              <Check className={`size-3 ${op.value === value ? "opacity-100" : "opacity-0"}`} />
              {op.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function getValueGroup(op: FilterOperator): string {
  if (VALUELESS_OPERATORS.has(op)) return "valueless"
  if (RELATIVE_OPS.has(op)) return "relative"
  if (BETWEEN_OPS.has(op)) return "between"
  if (SENTINEL_SINGLE_OPS.has(op)) return "sentinel"
  const arrayOps = new Set<FilterOperator>(["includes", "not_includes"])
  if (arrayOps.has(op)) return "array"
  return "other"
}

function shouldClearValue(
  from: FilterOperator,
  to: FilterOperator,
  _value: ReadonlyJSONValue | undefined
): boolean {
  return getValueGroup(from) !== getValueGroup(to)
}

function BooleanFilterControl({ dimension, filter, onFilterChange }: OperatorFilterControlProps) {
  const items: BadgeToggleGroupItem[] = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" },
  ]
  const selectedValue = filter?.value != null ? String(filter.value) : null

  return (
    <BadgeToggleGroup
      items={items}
      value={items.filter((item) => item.value === selectedValue)}
      onSelect={(selected) => {
        if (selected.length === 0) {
          onFilterChange(null)
        } else {
          const newest = requireFirst(selected.slice(selected.length - 1))
          onFilterChange({
            propertyId: dimension.id,
            operator: "equals",
            value: newest.value === "true",
          })
        }
      }}
      unselectedVariant="elevation-muted"
      wrap
    />
  )
}

function ValueInput({
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
  if (dimension.type === "calendar-date" || dimension.type === "instant") {
    if (operator === "is_relative_to_today") {
      return <RelativeToTodayInput value={value} onChange={onChange} />
    }
    if (operator === "is_between") {
      if (dimension.type === "calendar-date") {
        return <BetweenDateValueInput value={value} onChange={onChange} />
      }
      return <BetweenInstantValueInput value={value} onChange={onChange} />
    }
    if (SENTINEL_SINGLE_OPS.has(operator)) {
      if (dimension.type === "calendar-date") {
        return <DateSentinelInput value={value} onChange={onChange} />
      }
      return <InstantSentinelInput value={value} onChange={onChange} />
    }
  }

  switch (dimension.type) {
    case "text":
    case "url":
    case "markdown":
      return <TextValueInput value={value} onChange={onChange} />
    case "number":
      return <NumberValueInput value={value} onChange={onChange} />
    case "calendar-date":
      return <DateValueInput value={value} onChange={onChange} />
    case "calendar-time":
      return <CalendarTimeValueInput value={value} onChange={onChange} />
    case "instant":
      return <InstantValueInput value={value} onChange={onChange} />
    case "select":
      return (
        <SelectBadgePicker
          dimension={dimension}
          operator={operator}
          value={value}
          onChange={onChange}
        />
      )
    case "multi-select":
      return (
        <SelectBadgePicker
          dimension={dimension}
          operator={operator}
          value={value}
          onChange={onChange}
        />
      )
    case "relation":
      return (
        <RelationValueInput
          dimension={dimension}
          operator={operator}
          value={value}
          onChange={onChange}
        />
      )
    case "multi-relation":
      return <MultiRelationValueInput dimension={dimension} value={value} onChange={onChange} />
    case "boolean":
    case "path-select":
    case "rollup":
    case "aggregate":
    case "formula":
    case "json":
    case "rrule":
    case "progress":
    case "rich-document":
    case "action-button":
      return null
    default:
      assertNever(dimension.type)
  }
}
