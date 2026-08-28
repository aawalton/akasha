"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { TokenSwatch } from "../token-swatch"

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
          value="oklch(0.57 0.12 155)"
          rgba="rgba(45, 140, 87, 1)"
          description="Successful completion — terminal success"
          style={{ backgroundColor: "var(--green)" }}
        />
        <TokenSwatch
          name="blue"
          value="oklch(0.47 0.12 258)"
          rgba="rgba(44, 90, 157, 1)"
          description="Ready to engage — the highlighted next thing"
          style={{ backgroundColor: "var(--blue)" }}
        />
        <TokenSwatch
          name="purple"
          value="oklch(0.51 0.14 308)"
          rgba="rgba(124, 76, 163, 1)"
          description="Verification & deployment — finalize, verify, deploy"
          style={{ backgroundColor: "var(--purple)" }}
        />
        <TokenSwatch
          name="yellow"
          value="oklch(0.63 0.13 73)"
          rgba="rgba(184, 123, 17, 1)"
          description="Preparatory — queued or being prepared"
          style={{ backgroundColor: "var(--yellow)" }}
        />
        <TokenSwatch
          name="orange"
          value="oklch(0.58 0.15 50)"
          rgba="rgba(190, 90, 10, 1)"
          description="Active work — happening right now"
          style={{ backgroundColor: "var(--orange)" }}
        />
        <TokenSwatch
          name="red"
          value="oklch(0.47 0.17 19)"
          rgba="rgba(165, 28, 50, 1)"
          description="Unsuccessful completion — terminal failure"
          style={{ backgroundColor: "var(--red)" }}
        />
      </div>
    </PanelCard>
  )
}
