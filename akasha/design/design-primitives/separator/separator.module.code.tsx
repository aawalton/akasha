"use client"

import * as SeparatorPrimitive from "@radix-ui/react-separator"
import type * as React from "react"

import { cn } from "../cn/cn.module.code.ts"
import { surfaceClass } from "../surface-class/surface-class.module.code.ts"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
        surfaceClass(3),
        className
      )}
      {...props}
    />
  )
}

export { Separator }
