"use client"

import { HorizontalScrollFade } from "@akasha/design-primitives/horizontal-scroll-fade"
import type { VariantProps } from "class-variance-authority"
import type * as React from "react"

import { Badge, type badgeVariants } from "../badge/badge.module.code.tsx"

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>

export interface BadgeToggleGroupItem {
  value: string
  label: string
  variant?: BadgeVariant
  frontAction?: React.ReactNode
}

export interface BadgeToggleGroupProps {
  items: readonly BadgeToggleGroupItem[]

  onSelect: (value: readonly BadgeToggleGroupItem[]) => void

  value: readonly BadgeToggleGroupItem[]

  className?: string

  unselectedVariant?: "elevation" | "elevation-muted" | "surface"

  selectedVariant?: BadgeVariant

  wrap?: boolean

  disabled?: boolean
}

function BadgeToggleGroup({
  items,
  value,
  onSelect,
  className,
  unselectedVariant = "elevation",
  selectedVariant = "accent",
  wrap = false,
  disabled = false,
}: BadgeToggleGroupProps) {
  const toggleSelect = (item: BadgeToggleGroupItem) => {
    if (disabled) return
    if (value.some((x) => x.value === item.value)) {
      onSelect(value.filter((x) => x.value !== item.value))
    } else {
      onSelect([...value, item])
    }
  }

  const badges = (
    <div data-slot="badge-toggle-group" className={`flex gap-2 ${wrap ? "flex-wrap" : ""}`}>
      {items.map((item) => {
        const isSelected = value.some((x) => x.value === item.value)
        return (
          <Badge
            key={item.value}
            variant={isSelected ? (item.variant ?? selectedVariant) : unselectedVariant}
            className={
              disabled
                ? "shrink-0 cursor-default"
                : "shrink-0 transition-all hover:opacity-80 active:scale-95"
            }
            frontAction={item.frontAction}
            onClick={() => toggleSelect(item)}
            asChild
          >
            <button type="button" disabled={disabled}>
              {item.label}
            </button>
          </Badge>
        )
      })}
    </div>
  )

  if (wrap) {
    return <div className={className}>{badges}</div>
  }

  return <HorizontalScrollFade className={className}>{badges}</HorizontalScrollFade>
}

export { BadgeToggleGroup }
