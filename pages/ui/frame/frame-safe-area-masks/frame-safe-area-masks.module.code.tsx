"use client"

import { cn } from "akasha/design/primitives/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/primitives/surface-class/surface-class.module.code.ts"

export function FrameSafeAreaMasks({ chromeHidden }: { chromeHidden: boolean }) {
  return (
    <>
      <div
        data-slot="frame-safe-area-mask-top"
        aria-hidden
        className={cn("pointer-events-none fixed inset-x-0 top-0 z-10", surfaceClass(0))}
        style={{ height: "var(--safe-area-top)" }}
      />
      {chromeHidden && (
        <div
          data-slot="frame-safe-area-mask-bottom"
          aria-hidden
          className={cn("pointer-events-none fixed inset-x-0 bottom-0 z-10", surfaceClass(0))}
          style={{ height: "var(--safe-area-bottom)" }}
        />
      )}
    </>
  )
}
