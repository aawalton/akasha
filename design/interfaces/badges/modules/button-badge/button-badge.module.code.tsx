"use client"

import {
  Badge,
  type badgeVariants,
} from "akasha/design/interfaces/badges/modules/badge/badge.module.code.tsx"
import { cn } from "akasha/design/interfaces/primitives/cn/cn.module.code.ts"
import type { VariantProps } from "class-variance-authority"
import type * as React from "react"

function chainSuppressDoubleClickSelect<E extends Element>(
  consumerOnMouseDown: React.MouseEventHandler<E> | undefined
): React.MouseEventHandler<E> {
  return (event) => {
    if (event.detail >= 2) event.preventDefault()
    consumerOnMouseDown?.(event)
  }
}

function ButtonBadge({
  variant,
  size,
  onRemove,
  removeLabel,
  frontAction,
  truncate,
  className,
  children,
  onMouseDown,
  ...buttonProps
}: Omit<React.ComponentProps<"button">, "type"> &
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
      <button
        type="button"
        onMouseDown={chainSuppressDoubleClickSelect(onMouseDown)}
        {...buttonProps}
      >
        {children}
      </button>
    </Badge>
  )
}

export { ButtonBadge, chainSuppressDoubleClickSelect }
