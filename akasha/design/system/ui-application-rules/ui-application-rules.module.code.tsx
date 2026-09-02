"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { cn } from "@akasha/design-primitives/cn"
import { Heading } from "@akasha/design-primitives/heading"
import { surfaceClass } from "@akasha/design-primitives/surface-class"

export function UiApplicationRulesPanel() {
  return (
    <PanelCard id="ds-ui-application-rules" collapsible title="UI Application Rules">
      <div className="space-y-3">
        <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
          <Heading as="div">1. Immediate Feedback</Heading>
          <p className="text-secondary text-xs">
            As the user tweaks a stat (Geist Mono), the result should update instantly. No
            "Calculate" buttons unless the calculation is heavy.
          </p>
        </div>
        <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
          <Heading as="div">2. Gold is for Value</Heading>
          <p className="text-secondary text-xs">
            Use the Legendary Gold accent to draw the eye to the{" "}
            <span className="text-primary">result</span> of the user's work (e.g., the final DPS
            number), not just decorative borders. Accent-colored text must always be bold (
            <code className="text-tertiary">font-bold</code> or{" "}
            <code className="text-tertiary">font-semibold</code>) to reinforce its importance and
            maintain visual consistency.
          </p>
        </div>
        <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
          <Heading as="div">3. Respect the User's Intelligence</Heading>
          <p className="text-secondary text-xs">
            Do not hide advanced stats behind "Simple" views unless requested. The Temper user is
            here for the details.
          </p>
        </div>
      </div>
    </PanelCard>
  )
}
