"use client"

import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { type ReactNode, useEffect } from "react"

export function FrameStickyFooter({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.frameFooter = ""
    return () => {
      delete document.documentElement.dataset.frameFooter
    }
  }, [])

  return (
    <div
      data-slot="frame-sticky-footer"
      className={cn(
        "sticky bottom-0 z-20 border-primary/10 border-t pb-(--safe-area-bottom)",
        surfaceClass(0)
      )}
    >
      {children}
    </div>
  )
}
