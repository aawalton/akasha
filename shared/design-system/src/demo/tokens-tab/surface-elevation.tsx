"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { TokenSwatch } from "../token-swatch"

export function SurfaceElevationPanel() {
  return (
    <PanelCard id="ds-surface-elevation" collapsible title="Surface Elevation">
      <div className="flex flex-col gap-2">
        <TokenSwatch
          name="surface-0"
          value="oklch(0.07 0 0)"
          rgba="rgba(1, 1, 1, 1)"
          description="Page background"
          className={surfaceClass(0)}
        />
        <TokenSwatch
          name="surface-1"
          value="oklch(0.19 0 0)"
          rgba="rgba(20, 20, 20, 1)"
          description="Cards, dialogs, sheets"
          className={surfaceClass(1)}
        />
        <TokenSwatch
          name="surface-2"
          value="oklch(0.25 0 0)"
          rgba="rgba(34, 34, 34, 1)"
          description="Nested in cards/dialogs"
          className={surfaceClass(2)}
          showBorder
        />
        <TokenSwatch
          name="surface-3"
          value="oklch(0.30 0 0)"
          rgba="rgba(46, 46, 46, 1)"
          description="Popover/tooltip content"
          className={surfaceClass(3)}
        />
        <TokenSwatch
          name="surface-4"
          value="oklch(0.35 0 0)"
          rgba="rgba(58, 58, 58, 1)"
          description="Highest elevation"
          className={surfaceClass(4)}
        />
      </div>
    </PanelCard>
  )
}
