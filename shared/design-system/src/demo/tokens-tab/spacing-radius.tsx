"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Heading } from "@shared/design-primitives/components/heading"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"

export function SpacingRadiusPanel() {
  return (
    <PanelCard id="ds-spacing-radius" collapsible title="Spacing & Radius">
      <div className="space-y-4">
        <div className="space-y-2">
          <Heading>Spacing Scale</Heading>
          <div className="space-y-2">
            {[
              { token: "1", px: "4px", usage: "Minimal - chip lists" },
              { token: "1.5", px: "6px", usage: "Icon-label pairs" },
              { token: "2", px: "8px", usage: "Tight - headers, badges" },
              { token: "3", px: "12px", usage: "Component - cards, forms" },
              { token: "4", px: "16px", usage: "Medium - panel contents" },
              { token: "6", px: "24px", usage: "Major - sections, columns" },
            ].map(({ token, px, usage }) => (
              <div key={token} className="flex items-center gap-3">
                <code className="w-8 font-mono text-tertiary text-xs">{token}</code>
                <div className="h-3 rounded-sm bg-accent" style={{ width: px }} />
                <code className="w-10 font-mono text-tertiary text-xs">{px}</code>
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
