"use client"

import * as SwitchPrimitive from "@radix-ui/react-switch"
import type * as React from "react"

import { cn } from "../cn/cn.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { useSurface } from "../surface-provider/surface-provider.module.code.tsx"

const UNCHECKED_TRACK_CLASS = [
  "data-[state=unchecked]:bg-surface-1",
  "data-[state=unchecked]:bg-surface-2",
  "data-[state=unchecked]:bg-surface-3",
  "data-[state=unchecked]:bg-surface-4",
] as const

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const surface = useSurface()
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full shadow-xs outline-none transition-all disabled:cursor-not-allowed disabled:opacity-[0.38] data-[state=checked]:bg-accent focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]",
        UNCHECKED_TRACK_CLASS[Math.min(surface, 3)],
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
          surfaceClass(surface + 2)
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
