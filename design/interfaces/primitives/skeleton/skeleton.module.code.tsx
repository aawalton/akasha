"use client"

import { cn } from "akasha/design/interfaces/primitives/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonVariants = cva(
  [
    "relative overflow-hidden cursor-default select-none",
    "before:absolute before:inset-0",
    "before:bg-gradient-to-r before:from-transparent before:via-white/[0.04] before:to-transparent",
    "before:bg-[length:200%_100%]",
    "before:animate-skeleton-shimmer",
  ],
  {
    variants: {
      radius: {
        sm: "rounded-sm before:rounded-sm",
        md: "rounded-md before:rounded-md",
        lg: "rounded-lg before:rounded-lg",
        full: "rounded-full before:rounded-full",
      },
    },
    defaultVariants: {
      radius: "md",
    },
  }
)

type SkeletonProps = React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>

function Skeleton({ className, radius, ...props }: SkeletonProps) {
  const surface = useSurface()

  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(surfaceClass(surface + 1), skeletonVariants({ radius }), className)}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
