"use client"

import { Badge, type badgeVariants } from "@akasha/design-badges/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import type { VariantProps } from "class-variance-authority"

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

interface BulkEditTagOption<T extends string> {
  id: T
  name: string
  description?: string
}

interface BulkEditTagProps<T extends string> {
  currentValue: T
  options: readonly BulkEditTagOption<T>[]
  onSelect: (oldValue: T, newValue: T) => void
  count: number
  getVariant?: (value: T) => BadgeVariant
}

export function BulkEditTag<T extends string>({
  currentValue,
  options,
  onSelect,
  count,
  getVariant,
}: BulkEditTagProps<T>) {
  const variant = getVariant ? getVariant(currentValue) : "elevation-muted"

  return (
    <Select<T>
      value={currentValue}
      onValueChange={(newValue) => {
        onSelect(currentValue, newValue)
      }}
    >
      <SelectTrigger hideChevron>
        <Badge variant={variant}>
          <SelectValue />
          {count > 1 && <span>({count})</span>}
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
