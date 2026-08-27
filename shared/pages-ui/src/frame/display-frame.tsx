"use client"

import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { ArrowDown } from "lucide-react"
import { type ReactNode, type RefObject, useCallback } from "react"
import { useChromeToggle } from "../components/use-chrome-toggle"
import { type FrameConfig, frameFollowMode, frameSupportsFocusMode } from "./frame-config"
import { FrameSafeAreaMasks } from "./frame-safe-area-masks"
import { FrameStickyFooter } from "./frame-sticky-footer"
import { type FrameHeader, FrameStickyHeader } from "./frame-sticky-header"
import { useFollowAnchor } from "./use-follow-anchor"

interface DisplayFrameProps {
  readonly config?: FrameConfig
  readonly header?: FrameHeader | null
  readonly footer?: ReactNode
  readonly followAnchor?: {
    readonly ref: RefObject<HTMLElement | null>
    readonly renderTrigger: unknown
    readonly forcePinSignal?: unknown
  } | null
  readonly children: ReactNode
}

export function DisplayFrame({
  config,
  header,
  footer,
  followAnchor,
  children,
}: DisplayFrameProps) {
  const focusEnabled = frameSupportsFocusMode(config)
  const { chromeHidden, onSurfaceClick } = useChromeToggle()

  const followMode = followAnchor != null ? frameFollowMode(config) : null
  const { showJumpToLatest, jumpToLatest } = useFollowAnchor({
    anchorRef: followAnchor?.ref ?? { current: null },
    renderTrigger: followAnchor?.renderTrigger,
    forcePinSignal: followAnchor?.forcePinSignal,
    mode: followMode,
  })

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (focusEnabled) onSurfaceClick(e)
    },
    [focusEnabled, onSurfaceClick]
  )

  return (
    <div className="flex min-h-screen flex-col">
      {}
      {config?.edgeToEdge === true && <FrameSafeAreaMasks chromeHidden={chromeHidden} />}
      {header != null && <FrameStickyHeader header={header} />}
      {}
      <article
        className="flex flex-1 flex-col"
        onClick={focusEnabled ? handleCanvasClick : undefined}
      >
        {children}
      </article>
      {footer != null && <FrameStickyFooter>{footer}</FrameStickyFooter>}
      {}
      {followMode !== null && showJumpToLatest && !chromeHidden && (
        <div className="pointer-events-none sticky bottom-24 z-30 flex justify-center">
          {followMode === "top" ? (
            <button
              type="button"
              onClick={jumpToLatest}
              aria-label="Jump to latest"
              className={cn(
                "pointer-events-auto flex h-11 w-11 items-center justify-center",
                "rounded-full border border-primary/10 text-primary shadow-lg",
                surfaceClass(2)
              )}
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={jumpToLatest}
              className={cn(
                "pointer-events-auto w-fit rounded-full px-4 py-2",
                "border border-primary/10 font-medium text-primary text-sm shadow-lg",
                surfaceClass(2)
              )}
            >
              Jump to latest ↓
            </button>
          )}
        </div>
      )}
    </div>
  )
}
