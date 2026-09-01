"use client"

import { cn } from "@akasha/design-primitives/cn"
import { CheckIcon } from "lucide-react"
import type { KeyboardEvent } from "react"

import { Badge, type BadgeVariant } from "../badge/badge.module.code.tsx"

interface CheckboxBadgeProps {
  checked: boolean
  onChange?: (checked: boolean) => void
  variant?: BadgeVariant
  "aria-label"?: string
  className?: string
}

function CheckboxBadge({
  checked,
  onChange,
  variant = "elevation-muted",
  "aria-label": ariaLabel,
  className,
}: CheckboxBadgeProps) {
  const interactive = !!onChange
  const handleKeyDown = interactive
    ? (event: KeyboardEvent<HTMLSpanElement>) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault()
          onChange(!checked)
        }
      }
    : undefined
  return (
    <Badge
      variant={variant}
      className={cn("px-1.5", interactive && "cursor-pointer hover:bg-primary/8", className)}
      role="checkbox"
      aria-checked={checked}
      aria-readonly={interactive ? undefined : true}
      aria-label={ariaLabel}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? () => onChange(!checked) : undefined}
      onKeyDown={handleKeyDown}
    >
      <span
        data-slot="checkbox-badge-box"
        className={cn(
          "inline-flex size-3.5 shrink-0 items-center justify-center rounded-[3px]",
          checked ? "bg-text-primary text-text-primary" : "border border-current opacity-40"
        )}
      >
        {checked && <CheckIcon className="size-2.5" />}
      </span>
    </Badge>
  )
}

export type { CheckboxBadgeProps }
export { CheckboxBadge }
