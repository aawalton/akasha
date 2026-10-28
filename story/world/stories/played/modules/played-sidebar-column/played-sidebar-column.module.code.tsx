"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import {
  PlaceDrawn,
  PlaceHeaded,
} from "akasha/story/ui/modules/place-head/place-head.module.code.tsx"
import { type KeyboardEvent, type PointerEvent, type ReactNode, useRef } from "react"

export type Widths = {
  readonly left: number
  readonly right: number
}

const SIDEBAR_WIDTH = 500

const SIDEBAR_NARROWEST = 320

const SIDEBAR_WIDEST = 800

export const TURNS_AT_LEAST = 420

const RESIZE_STEP = 16

export const WIDTHS: Widths = { left: SIDEBAR_WIDTH, right: SIDEBAR_WIDTH }

const WIDTHS_STORED_AT = "played-sidebar-widths"

const SIDEBAR =
  "sticky top-(--safe-area-top) z-10 flex h-[calc(100dvh-var(--safe-area-top))] shrink-0 flex-col"

const RAISED = 1

const BODY =
  "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-4 [scrollbar-width:none]"

const HANDLE =
  "absolute inset-y-0 z-10 w-1.5 cursor-col-resize touch-none transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:outline-none"

const HANDLE_LEFT = "-right-[3px]"

const HANDLE_RIGHT = "-left-[3px]"

export function widthClamped(wanted: number, width: number, beside: number): number {
  const widest = Math.min(SIDEBAR_WIDEST, width - TURNS_AT_LEAST - beside)
  return Math.round(Math.max(SIDEBAR_NARROWEST, Math.min(widest, wanted)))
}

function widthAt(held: object, key: string): number {
  const value: unknown = Reflect.get(held, key)
  if (typeof value !== "number" || !Number.isFinite(value)) return SIDEBAR_WIDTH
  return Math.max(SIDEBAR_NARROWEST, Math.min(SIDEBAR_WIDEST, value))
}

export function storedWidths(): Widths {
  try {
    const held: unknown = JSON.parse(localStorage.getItem(WIDTHS_STORED_AT) ?? "null")
    if (typeof held !== "object" || held === null) return WIDTHS
    return { left: widthAt(held, "left"), right: widthAt(held, "right") }
  } catch {
    return WIDTHS
  }
}

export function storeWidths(widths: Widths): undefined {
  localStorage.setItem(WIDTHS_STORED_AT, JSON.stringify(widths))
}

export function SidebarColumn({
  side,
  width,
  onWidth,
  label,
  onClose,
  children,
}: {
  side: "left" | "right"
  width: number
  onWidth: (wanted: number) => void
  label: string
  onClose: () => void
  children: ReactNode
}) {
  const dragged = useRef<{ readonly x: number; readonly width: number } | null>(null)
  const outward = side === "left" ? 1 : -1
  const grab = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragged.current = { x: event.clientX, width }
  }
  const drag = (event: PointerEvent<HTMLDivElement>) => {
    const from = dragged.current
    if (from !== null) onWidth(from.width + outward * (event.clientX - from.x))
  }
  const drop = (event: PointerEvent<HTMLDivElement>) => {
    dragged.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }
  const step = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
    event.preventDefault()
    const rightward = event.key === "ArrowRight" ? 1 : -1
    onWidth(width + outward * rightward * RESIZE_STEP)
  }
  return (
    <aside aria-label={label} className={cn(SIDEBAR, surfaceClass(RAISED))} style={{ width }}>
      <PlaceHeaded label={label} onClose={onClose}>
        <SurfaceProvider level={RAISED} className={BODY}>
          <PlaceDrawn>{children}</PlaceDrawn>
        </SurfaceProvider>
      </PlaceHeaded>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label={`Resize ${label}`}
        aria-valuenow={width}
        aria-valuemin={SIDEBAR_NARROWEST}
        aria-valuemax={SIDEBAR_WIDEST}
        tabIndex={0}
        className={cn(HANDLE, side === "left" ? HANDLE_LEFT : HANDLE_RIGHT)}
        onPointerDown={grab}
        onPointerMove={drag}
        onPointerUp={drop}
        onPointerCancel={drop}
        onKeyDown={step}
      />
    </aside>
  )
}
