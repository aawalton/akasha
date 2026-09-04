"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { Button } from "@akasha/design-primitives/button"

export function StateLayersPanel() {
  return (
    <PanelCard id="ds-state-layers" collapsible title="State Layers">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="flex h-10 items-center justify-center rounded-md bg-secondary/[0.08] px-6">
            <span className="text-secondary text-sm">Hover</span>
          </div>
          <code className="block text-center font-mono text-tertiary text-xs">0.08</code>
        </div>
        <div className="space-y-1">
          <div className="flex h-10 items-center justify-center rounded-md bg-secondary/[0.12] px-6 ring-2 ring-accent/50">
            <span className="text-secondary text-sm">Focus</span>
          </div>
          <code className="block text-center font-mono text-tertiary text-xs">0.12</code>
        </div>
        <div className="space-y-1">
          <div className="flex h-10 items-center justify-center rounded-md bg-secondary/[0.12] px-6">
            <span className="text-secondary text-sm">Pressed</span>
          </div>
          <code className="block text-center font-mono text-tertiary text-xs">0.12</code>
        </div>
        <div className="space-y-1">
          <div className="flex h-10 items-center justify-center rounded-md bg-secondary/[0.12] px-6 opacity-[0.38]">
            <span className="text-secondary text-sm">Disabled</span>
          </div>
          <code className="block text-center font-mono text-tertiary text-xs">0.38</code>
        </div>
      </div>
      <div className="pt-2">
        <Button variant="secondary" size="lg" className="w-full">
          Hover, focus, and click me
        </Button>
      </div>
    </PanelCard>
  )
}
