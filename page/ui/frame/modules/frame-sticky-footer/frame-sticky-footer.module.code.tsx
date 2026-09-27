"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { type ReactNode, useEffect } from "react"

export function useFrameFooterMark(): undefined {
  useEffect(() => {
    document.documentElement.dataset.frameFooter = ""
    return () => {
      delete document.documentElement.dataset.frameFooter
    }
  }, [])
}

export function FrameStickyFooter({ children }: { children: ReactNode }) {
  useFrameFooterMark()

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
