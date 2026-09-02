"use client"

import { cn } from "@akasha/design-primitives/cn"
import { type SurfaceLevel, surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import * as React from "react"
import { z } from "zod"

const NODE_ENV_SCHEMA = z.string().optional()

import { useBadgeLayoutContext } from "../badge-layout-context/badge-layout-context.module.code.tsx"

const VARIANT_MAP = {
  accent: "bg-accent/15 text-accent [button&]:active:bg-accent/35 [a&]:active:bg-accent/35",
  destructive: `${surfaceClass(2)} text-secondary [button&]:active:bg-primary/15 [a&]:active:bg-primary/15`,
  elevation: "text-primary [button&]:active:bg-primary/15 [a&]:active:bg-primary/15",
  "elevation-muted": "text-secondary [button&]:active:bg-primary/15 [a&]:active:bg-primary/15",
  surface: "text-primary [button&]:active:bg-primary/15 [a&]:active:bg-primary/15",
  normal: "bg-primary/15 text-primary [button&]:active:bg-primary/35 [a&]:active:bg-primary/35",
  fine: "bg-fine/15 text-fine [button&]:active:bg-fine/35 [a&]:active:bg-fine/35",
  superior:
    "bg-superior/15 text-superior [button&]:active:bg-superior/35 [a&]:active:bg-superior/35",
  epic: "bg-epic/15 text-epic [button&]:active:bg-epic/35 [a&]:active:bg-epic/35",
  legendary:
    "bg-legendary/15 text-legendary [button&]:active:bg-legendary/35 [a&]:active:bg-legendary/35",
  mythic: "bg-mythic/15 text-mythic [button&]:active:bg-mythic/35 [a&]:active:bg-mythic/35",
  radiant: "bg-radiant/15 text-radiant [button&]:active:bg-radiant/35 [a&]:active:bg-radiant/35",
  green: "bg-green/15 text-green [button&]:active:bg-green/35 [a&]:active:bg-green/35",
  blue: "bg-blue/15 text-blue [button&]:active:bg-blue/35 [a&]:active:bg-blue/35",
  purple: "bg-purple/15 text-purple [button&]:active:bg-purple/35 [a&]:active:bg-purple/35",
  yellow: "bg-yellow/15 text-yellow [button&]:active:bg-yellow/35 [a&]:active:bg-yellow/35",
  orange: "bg-orange/15 text-orange [button&]:active:bg-orange/35 [a&]:active:bg-orange/35",
  red: "bg-red/15 text-red [button&]:active:bg-red/35 [a&]:active:bg-red/35",
} as const

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:[outline:1.5px_solid_var(--color-accent)] focus-visible:[outline-offset:-1px] aria-invalid:ring-secondary/30 transition-[color,box-shadow] overflow-hidden text-ellipsis select-text cursor-default [button&]:cursor-pointer [a&]:cursor-pointer [button&]:font-semibold [a&]:font-semibold [a&]:hover:bg-primary/8 [button&]:hover:bg-primary/8",
  {
    variants: {
      size: {
        default: "text-xs px-2 py-0.5 [&>svg]:size-3 gap-1",
        lg: "h-6 text-sm px-3 translate-y-[2px] [&>svg]:size-4 gap-1.5",
      },
      variant: VARIANT_MAP,
    },
    defaultVariants: {
      variant: "elevation",
      size: "default",
    },
  }
)

export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

const knownVariantKeys: ReadonlySet<string> = new Set(Object.keys(VARIANT_MAP))

function assertKnownVariant(variant: BadgeVariant): undefined {
  if (variant == null || knownVariantKeys.has(variant)) return
  const message = `Badge: unknown variant "${variant}". Expected one of: ${[...knownVariantKeys].join(", ")}.`
  if (NODE_ENV_SCHEMA.parse(process.env.NODE_ENV) !== "production") throw new Error(message)
  console.error(message)
}

function resolveSurfaceBg(variant: BadgeVariant, surface: SurfaceLevel): string {
  if (variant === "elevation" || variant === "elevation-muted") return surfaceClass(surface + 1)
  if (variant === "surface") return surfaceClass(Math.max(surface, 1))
  return ""
}

function BadgeRemove({
  focusable = false,
  onRemove,
  removeLabel = "Remove",
  className,
}: {
  focusable?: boolean
  onRemove: () => void
  removeLabel?: string
  className?: string
}) {
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
  }
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove()
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      e.stopPropagation()
      onRemove()
    }
  }

  return (
    <span
      role="button"
      tabIndex={focusable ? 0 : -1}
      data-slot="badge-remove"
      aria-label={removeLabel}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "cursor-pointer text-current/50 transition-colors hover:bg-primary/8 hover:text-current",
        className ?? "-mr-1 rounded-sm p-0.5"
      )}
    >
      <X className="size-3" />
    </span>
  )
}

type FrontActionPropagationProps = {
  onClick?: React.MouseEventHandler
  onPointerDown?: React.PointerEventHandler
}

function guardFrontActionPropagation(node: React.ReactNode): React.ReactNode {
  if (!React.isValidElement<FrontActionPropagationProps>(node)) return node
  const originalOnClick = node.props.onClick
  const originalOnPointerDown = node.props.onPointerDown
  return React.cloneElement(node, {
    onClick: (event: React.MouseEvent) => {
      event.stopPropagation()
      originalOnClick?.(event)
    },
    onPointerDown: (event: React.PointerEvent) => {
      event.stopPropagation()
      originalOnPointerDown?.(event)
    },
  })
}

function Badge({
  className,
  variant,
  size,
  asChild = false,
  onRemove,
  removeLabel = "Remove",
  frontAction,
  truncate,
  children,
  ...rest
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    onRemove?: () => void
    removeLabel?: string
    frontAction?: React.ReactNode
    truncate?: "fixed" | "fluid"
  }) {
  assertKnownVariant(variant)
  const surface = useSurface()
  const surfaceBg = resolveSurfaceBg(variant, surface)
  const layout = useBadgeLayoutContext()
  const resolvedTruncate = truncate ?? layout.truncate
  const inline = layout.display === "inline"
  const contextIcon = inline ? null : layout.icon

  const segmented = frontAction != null && onRemove != null

  const frontActionEl =
    frontAction != null ? (
      <span
        data-slot="badge-front-action"
        className={cn("inline-flex items-center", segmented && "rounded-l-md py-0.5 pl-1.5")}
      >
        {guardFrontActionPropagation(frontAction)}
      </span>
    ) : null

  const labelEl = segmented ? (
    <span data-slot="badge-label" className="inline-flex items-center gap-1 px-1 py-0.5">
      {children}
    </span>
  ) : (
    children
  )

  const removeEl = onRemove ? (
    <BadgeRemove
      focusable={segmented}
      onRemove={onRemove}
      removeLabel={removeLabel}
      className={segmented ? "rounded-r-md py-0.5 pr-1.5 pl-0.5" : undefined}
    />
  ) : null

  const outerClassName = inline
    ? cn("inline-flex items-center select-text", className)
    : cn(
        badgeVariants({ variant, size }),
        surfaceBg,
        segmented && "gap-0 p-0",
        resolvedTruncate === "fixed" && "max-w-32 justify-start",
        className
      )

  if (asChild) {
    const only = React.Children.only(children)
    if (!React.isValidElement<{ children?: React.ReactNode }>(only)) return null
    return (
      <Slot data-slot="badge" className={outerClassName} {...rest}>
        {React.cloneElement(only, {}, contextIcon, frontActionEl, only.props.children, removeEl)}
      </Slot>
    )
  }

  return (
    <span data-slot="badge" className={outerClassName} {...rest}>
      {contextIcon}
      {frontActionEl}
      {labelEl}
      {removeEl}
    </span>
  )
}

function IconBadge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  assertKnownVariant(variant)
  const surface = useSurface()
  const surfaceBg = resolveSurfaceBg(variant, surface)
  const iconClassName = cn(badgeVariants({ variant, size }), surfaceBg, "py-1", className)

  if (asChild) {
    return <Slot data-slot="badge" className={iconClassName} {...props} />
  }
  return <span data-slot="badge" className={iconClassName} {...props} />
}

function BadgeRow({
  className,
  wrap = true,
  ...props
}: React.ComponentProps<"div"> & { wrap?: boolean }) {
  return (
    <div
      data-slot="badge-row"
      className={cn(
        "flex min-h-5 items-center gap-1.5",
        wrap ? "w-full flex-wrap" : "flex-nowrap",
        className
      )}
      {...props}
    />
  )
}

export { Badge, BadgeRow, badgeVariants, IconBadge }
