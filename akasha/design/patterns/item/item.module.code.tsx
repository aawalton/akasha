"use client"

import { cn } from "@akasha/design-primitives/cn"
import { type SurfaceLevel, surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

const itemVariants = cva(
  "group/item flex items-center text-sm rounded-md transition-colors [a&]:hover:bg-primary/8 [a&]:transition-colors duration-100 flex-wrap outline-none focus-visible:[outline:1.5px_solid_var(--color-accent)] focus-visible:[outline-offset:-1px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        elevation: "",
        "elevation-muted": "text-secondary",
        surface: "",
        muted: "",
      },
      size: {
        default: "p-4 gap-4",
        sm: "py-3 px-4 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ItemVariant = VariantProps<typeof itemVariants>["variant"]

function resolveItemSurfaceBg(variant: ItemVariant, surface: SurfaceLevel): string {
  if (variant === "elevation" || variant === "elevation-muted") return surfaceClass(surface + 1)
  if (variant === "surface") return surfaceClass(Math.max(surface, 1))
  if (variant === "muted") return surfaceClass(2)
  return ""
}

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const surface = useSurface()
  const surfaceBg = resolveItemSurfaceBg(variant, surface)
  const tag = { element: asChild ? Slot : "div" }
  return (
    <tag.element
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size }), surfaceBg, className)}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 rounded-sm [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ItemMediaVariant = VariantProps<typeof itemMediaVariants>["variant"]

function resolveItemMediaSurfaceBg(variant: ItemMediaVariant): string {
  if (variant === "icon") return surfaceClass(2)
  return ""
}

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }), resolveItemMediaSurfaceBg(variant))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn("flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", className)}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn("flex w-fit items-center gap-2 font-medium text-sm leading-snug", className)}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-balance font-normal text-secondary text-sm leading-normal",
        "[&>a:hover]:text-accent [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="item-actions" className={cn("flex items-center gap-2", className)} {...props} />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn("flex basis-full items-center justify-between gap-2", className)}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn("flex basis-full items-center justify-between gap-2", className)}
      {...props}
    />
  )
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
  itemMediaVariants,
  itemVariants,
}
