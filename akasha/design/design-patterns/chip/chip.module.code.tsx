"use client"

import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import type * as React from "react"

export interface ChipProps {
  children: string | React.ReactNode

  className?: string

  actions?: readonly React.ReactNode[]
}

function Chip(props: ChipProps) {
  const surface = useSurface()
  return (
    <div
      data-slot="chip"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-2 py-1 text-secondary text-xs",
        surfaceClass(surface + 1),
        props.className
      )}
    >
      <div className="whitespace-nowrap">{props.children}</div>
      {props.actions?.map((a, i) => (
        <div key={i} className="flex shrink-0 items-center justify-center">
          {a}
        </div>
      ))}
    </div>
  )
}

export { Chip }
