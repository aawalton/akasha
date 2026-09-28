"use client"

import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import type { PanelAppointment } from "akasha/story/ui/played-panel/modules/panel-drawing/panel-drawing.module.code.ts"

const TIME_PANEL = "flex flex-col gap-2 rounded-xl p-4 shadow-sm"

const CLOCK_LINE = "text-secondary text-sm"

const UPCOMING_LIST = "flex flex-col gap-1 text-sm text-tertiary"

type TimePanelProps = {
  readonly clock: string | null
  readonly upcoming: readonly PanelAppointment[]
}

export function TimePanel({ clock, upcoming }: TimePanelProps) {
  if (clock === null && upcoming.length === 0) return null
  return (
    <SurfaceProvider level={1} className={TIME_PANEL}>
      {clock === null ? null : <p className={CLOCK_LINE}>{clock}</p>}
      {upcoming.length === 0 ? null : (
        <ul className={UPCOMING_LIST}>
          {upcoming.map((one) => (
            <li key={one.id}>
              {one.when} · {one.title}
            </li>
          ))}
        </ul>
      )}
    </SurfaceProvider>
  )
}
