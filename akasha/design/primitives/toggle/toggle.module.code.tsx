"use client"

import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../cn/cn.module.code.ts"
import { type SurfaceLevel, surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { useSurface } from "../surface-provider/surface-provider.module.code.tsx"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-primary/8 disabled:pointer-events-none disabled:opacity-[0.38] data-[state=on]:bg-primary/12 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:[outline:1.5px_solid_var(--color-accent)] focus-visible:[outline-offset:-1px] outline-none transition-[color,box-shadow] aria-invalid:ring-secondary/30 whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        elevation: "",
        "elevation-muted": "text-secondary",
        surface: "",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ToggleVariant = VariantProps<typeof toggleVariants>["variant"]

function resolveToggleSurfaceBg(variant: ToggleVariant, surface: SurfaceLevel): string {
  if (variant === "elevation" || variant === "elevation-muted") return surfaceClass(surface + 1)
  if (variant === "surface") return surfaceClass(Math.max(surface, 1))
  return ""
}

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  const surface = useSurface()
  const surfaceBg = resolveToggleSurfaceBg(variant, surface)
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), surfaceBg, className)}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
