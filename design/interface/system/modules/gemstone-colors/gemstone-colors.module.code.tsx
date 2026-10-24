"use client"

import { blue } from "akasha/design/interface/color/pages/blue.color.ts"
import { green } from "akasha/design/interface/color/pages/green.color.ts"
import { orange } from "akasha/design/interface/color/pages/orange.color.ts"
import { purple } from "akasha/design/interface/color/pages/purple.color.ts"
import { red } from "akasha/design/interface/color/pages/red.color.ts"
import { yellow } from "akasha/design/interface/color/pages/yellow.color.ts"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { TokenSwatch } from "akasha/design/interface/system/modules/token-swatch/token-swatch.module.code.tsx"

export function GemstoneColorsPanel() {
  return (
    <PanelCard id="ds-gemstone-colors" collapsible title="Gemstone Colors">
      <p className="text-secondary text-sm">
        Six gemstones, each carrying a fixed status meaning across every page-type's property
        colors.
      </p>
      <div className="flex flex-col gap-2">
        <TokenSwatch
          name="green"
          color={green}
          description="Successful completion — terminal success"
          className="bg-green"
        />
        <TokenSwatch
          name="blue"
          color={blue}
          description="Ready to engage — the highlighted next thing"
          className="bg-blue"
        />
        <TokenSwatch
          name="purple"
          color={purple}
          description="Verification & deployment — finalize, verify, deploy"
          className="bg-purple"
        />
        <TokenSwatch
          name="yellow"
          color={yellow}
          description="Preparatory — queued or being prepared"
          className="bg-yellow"
        />
        <TokenSwatch
          name="orange"
          color={orange}
          description="Active work — happening right now"
          className="bg-orange"
        />
        <TokenSwatch
          name="red"
          color={red}
          description="Unsuccessful completion — terminal failure"
          className="bg-red"
        />
      </div>
    </PanelCard>
  )
}
