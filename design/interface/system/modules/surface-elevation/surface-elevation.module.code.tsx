"use client"

import { ash } from "akasha/design/interface/color/pages/ash.color.ts"
import { charcoal } from "akasha/design/interface/color/pages/charcoal.color.ts"
import { graphite } from "akasha/design/interface/color/pages/graphite.color.ts"
import { slate } from "akasha/design/interface/color/pages/slate.color.ts"
import { soot } from "akasha/design/interface/color/pages/soot.color.ts"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { TokenSwatch } from "akasha/design/interface/system/modules/token-swatch/token-swatch.module.code.tsx"

export function SurfaceElevationPanel() {
  return (
    <PanelCard id="ds-surface-elevation" collapsible title="Surface Elevation">
      <div className="flex flex-col gap-2">
        <TokenSwatch
          name="surface-0"
          color={soot}
          description="Page background"
          className={surfaceClass(0)}
        />
        <TokenSwatch
          name="surface-1"
          color={charcoal}
          description="Cards, dialogs, sheets"
          className={surfaceClass(1)}
        />
        <TokenSwatch
          name="surface-2"
          color={graphite}
          description="Nested in cards/dialogs"
          className={surfaceClass(2)}
          showBorder
        />
        <TokenSwatch
          name="surface-3"
          color={slate}
          description="Popover/tooltip content"
          className={surfaceClass(3)}
        />
        <TokenSwatch
          name="surface-4"
          color={ash}
          description="Highest elevation"
          className={surfaceClass(4)}
        />
      </div>
    </PanelCard>
  )
}
