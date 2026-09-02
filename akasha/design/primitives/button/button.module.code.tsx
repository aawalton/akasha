"use client"

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../cn/cn.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { useSurface } from "../surface-provider/surface-provider.module.code.tsx"

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:cursor-not-allowed aria-disabled:pointer-events-none data-[disabled]:pointer-events-none disabled:opacity-[var(--state-disabled-content)] aria-disabled:opacity-[var(--state-disabled-content)] data-[disabled]:opacity-[var(--state-disabled-content)] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:[outline:1.5px_solid_var(--color-accent)] focus-visible:[outline-offset:-1px] aria-invalid:ring-secondary/30",
  {
    variants: {
      variant: {
        primary:
          "relative z-0 overflow-hidden text-primary after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-primary after:opacity-0 after:content-[''] after:-z-10 hover:after:opacity-[var(--state-hover)] focus-visible:after:opacity-[var(--state-focus)] active:after:opacity-[var(--state-pressed)]",
        destructive:
          "relative z-0 overflow-hidden text-secondary after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-secondary after:opacity-0 after:content-[''] after:-z-10 hover:after:opacity-[var(--state-hover)] focus-visible:after:opacity-[var(--state-focus)] active:after:opacity-[var(--state-pressed)]",
        secondary:
          "relative z-0 overflow-hidden text-secondary after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-secondary after:opacity-0 after:content-[''] after:-z-10 hover:after:opacity-[var(--state-hover)] focus-visible:after:opacity-[var(--state-focus)] active:after:opacity-[var(--state-pressed)]",
        tertiary:
          "relative z-0 overflow-hidden bg-transparent text-tertiary after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-tertiary after:opacity-0 after:content-[''] after:-z-10 hover:after:opacity-[var(--state-hover)] focus-visible:after:opacity-[var(--state-focus)] active:after:opacity-[var(--state-pressed)]",
        accent:
          "relative z-0 overflow-hidden bg-accent/15 text-accent after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-accent after:opacity-0 after:content-[''] after:-z-10 hover:after:opacity-[var(--state-hover)] focus-visible:after:opacity-[var(--state-focus)] active:after:opacity-[var(--state-pressed)]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 rounded-[calc(var(--radius)-5px)] gap-1 px-2 has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)]",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  }
)

const surfaceBgVariants = new Set<string | null | undefined>([
  "primary",
  "destructive",
  "secondary",
  undefined,
  null,
])

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const surface = useSurface()
  const tag = { element: asChild ? Slot : "button" }

  return (
    <tag.element
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        surfaceBgVariants.has(variant) && surfaceClass(surface + 1),
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
