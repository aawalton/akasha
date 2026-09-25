"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { SPACING_STEPS } from "akasha/design/interface/token/modules/spacing-step/spacing-step.module.code.ts"

export function SpacingRadiusPanel() {
  return (
    <PanelCard id="ds-spacing-radius" collapsible title="Spacing & Radius">
      <div className="space-y-4">
        <div className="space-y-2">
          <Heading>Spacing Scale</Heading>
          <div className="space-y-2">
            {SPACING_STEPS.map(({ token, px, usage }) => (
              <div key={token} className="flex items-center gap-3">
                <code className="w-8 font-mono text-tertiary text-xs">{token}</code>
                <div className="h-3 rounded-sm bg-accent" style={{ width: px }} />
                <code className="w-10 font-mono text-tertiary text-xs">{px}px</code>
                <span className="text-secondary text-xs">{usage}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Heading>Border Radius</Heading>
          <div className="grid grid-cols-4 gap-3">
            <div className="space-y-1">
              <div
                className={`flex h-10 items-center justify-center rounded-sm ${surfaceClass(2)}`}
              >
                <span className="text-secondary text-sm">sm</span>
              </div>
              <code className="block text-center font-mono text-tertiary text-xs">4px</code>
            </div>
            <div className="space-y-1">
              <div
                className={`flex h-10 items-center justify-center rounded-md ${surfaceClass(2)}`}
              >
                <span className="text-secondary text-sm">md</span>
              </div>
              <code className="block text-center font-mono text-tertiary text-xs">6px</code>
            </div>
            <div className="space-y-1">
              <div
                className={`flex h-10 items-center justify-center rounded-lg ${surfaceClass(2)}`}
              >
                <span className="text-secondary text-sm">lg</span>
              </div>
              <code className="block text-center font-mono text-tertiary text-xs">8px</code>
            </div>
            <div className="space-y-1">
              <div
                className={`flex h-10 items-center justify-center rounded-xl ${surfaceClass(2)}`}
              >
                <span className="text-secondary text-sm">xl</span>
              </div>
              <code className="block text-center font-mono text-tertiary text-xs">12px</code>
            </div>
          </div>
        </div>
      </div>
    </PanelCard>
  )
}
