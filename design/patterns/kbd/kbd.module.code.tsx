"use client"

import { cn } from "akasha/design/primitives/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/primitives/surface-provider/surface-provider.module.code.tsx"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  const surface = useSurface()
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-medium font-sans text-tertiary text-xs",
        surfaceClass(surface + 1),
        "[&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
