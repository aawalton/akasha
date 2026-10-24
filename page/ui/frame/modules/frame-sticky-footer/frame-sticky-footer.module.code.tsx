"use client"

import { useAppShellOptional } from "akasha/design/interface/layout/modules/app-shell-context/app-shell-context.module.code.tsx"
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

const ABOVE_THUMB_NAV =
  "max-[584px]:bottom-[calc(var(--bottom-nav-height)+var(--safe-area-bottom))] max-[584px]:mb-[calc(var(--bottom-nav-height)+var(--safe-area-bottom))] max-[584px]:pb-3"

export function FrameStickyFooter({ children }: { children: ReactNode }) {
  const shell = useAppShellOptional()

  return (
    <div
      data-slot="frame-sticky-footer"
      className={cn(
        "sticky bottom-0 z-20 pb-[calc(var(--safe-area-bottom)+2rem)]",
        shell !== null && ABOVE_THUMB_NAV,
        surfaceClass(0)
      )}
    >
      {children}
    </div>
  )
}
