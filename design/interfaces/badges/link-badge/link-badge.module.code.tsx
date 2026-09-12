"use client"

import { chainSuppressDoubleClickSelect } from "akasha/design/interfaces/badges/button-badge/button-badge.module.code.tsx"
import {
  Badge,
  type badgeVariants,
} from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { cn } from "akasha/design/interfaces/primitives/cn/cn.module.code.ts"
import type { VariantProps } from "class-variance-authority"
import type * as React from "react"

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
