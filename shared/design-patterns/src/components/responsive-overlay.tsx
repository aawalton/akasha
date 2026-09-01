"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@akasha/design-primitives/popover"
import { Sheet, SheetContent, SheetTrigger } from "@akasha/design-primitives/sheet"
import { useIsMobile } from "@akasha/design-primitives/use-mobile"
import type * as React from "react"

export interface ResponsiveOverlayProps {
  trigger: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  className?: string
}

export function ResponsiveOverlay({
  trigger,
  children,
  open,
  onOpenChange,
  side,
  align,
  className,
}: ResponsiveOverlayProps): React.ReactElement {
  const isMobile = useIsMobile()
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent side="bottom" className={className}>
          {children}
        </SheetContent>
      </Sheet>
    )
  }
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent side={side} align={align} className={className}>
        {children}
      </PopoverContent>
    </Popover>
  )
}
