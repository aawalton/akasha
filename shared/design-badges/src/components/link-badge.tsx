"use client"

import { cn } from "@shared/design-primitives/utils/cn"
import type { VariantProps } from "class-variance-authority"
import type * as React from "react"

import { Badge, type badgeVariants } from "./badge"
import { chainSuppressDoubleClickSelect } from "./button-badge"

function LinkBadge({
  variant,
  size,
  onRemove,
  removeLabel,
  frontAction,
  truncate,
  className,
  children,
  onMouseDown,
  href,
  ...anchorProps
}: React.ComponentProps<"a"> &
  VariantProps<typeof badgeVariants> & {
    onRemove?: () => void
    removeLabel?: string
    frontAction?: React.ReactNode
    truncate?: "fixed" | "fluid"
  }) {
  return (
    <Badge
      variant={variant}
      size={size}
      onRemove={onRemove}
      removeLabel={removeLabel}
      frontAction={frontAction}
      truncate={truncate}
      className={cn("cursor-pointer", className)}
      asChild
    >
      <a href={href} onMouseDown={chainSuppressDoubleClickSelect(onMouseDown)} {...anchorProps}>
        {children}
      </a>
    </Badge>
  )
}

export { LinkBadge }
