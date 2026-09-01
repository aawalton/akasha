"use client"

import { cn } from "@akasha/design-primitives/cn"
import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import type { ReactElement, ReactNode } from "react"
import React from "react"
import type { ChipProps } from "../chip/chip.module.code.tsx"

export interface ChipListProps {
  maxChips?: number

  children: readonly ReactElement<ChipProps>[] | ReactElement<ChipProps>
}

function ChipList(props: ChipListProps) {
  const surface = useSurface()
  const elements = Array.isArray(props.children) ? props.children : [props.children]

  const items: Array<ReactNode> = []
  let bound = elements.length
  if (props.maxChips != null && elements.length > props.maxChips) {
    bound = props.maxChips
  }

  for (let i = 0; i < bound; i++) {
    items.push(<React.Fragment key={i}>{elements[i]}</React.Fragment>)
  }

  if (bound < elements.length) {
    items.push(
      <Popover key="more">
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-md px-2 py-1 text-tertiary text-xs transition-colors hover:bg-primary/[0.08] active:bg-primary/[0.12] disabled:pointer-events-none disabled:opacity-[0.38]",
              surfaceClass(surface + 1)
            )}
          >
            +{elements.length - bound} more
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto max-w-[calc(min(28rem,var(--radix-popover-content-available-width)))]">
          <div className="flex flex-wrap gap-1">
            {elements.slice(bound).map((x: ReactNode, i: number) => (
              <React.Fragment key={i}>{x}</React.Fragment>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <div data-slot="chip-list" className="flex flex-wrap gap-1">
      {items}
    </div>
  )
}

export { ChipList }
