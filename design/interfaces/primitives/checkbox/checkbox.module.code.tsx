"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import type * as React from "react"

import { cn } from "../cn/cn.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"
import { useSurface } from "../surface-provider/surface-provider.module.code.tsx"

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const surface = useSurface()
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] shadow-xs outline-none transition-shadow disabled:cursor-not-allowed disabled:opacity-[0.38] aria-invalid:ring-secondary/30 data-[state=checked]:bg-text-primary data-[state=checked]:text-text-primary focus-visible:[outline-offset:-1px] focus-visible:[outline:1.5px_solid_var(--color-accent)]",
        surfaceClass(surface + 2),
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
