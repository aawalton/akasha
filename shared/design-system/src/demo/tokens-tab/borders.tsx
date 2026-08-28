"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Heading } from "@shared/design-primitives/components/heading"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"

export function BordersPanel() {
  return (
    <PanelCard id="ds-borders" collapsible title="Borders">
      <div className="space-y-4">
        <p className="text-secondary text-sm">
          Borders are avoided in most cases. Elevation and spacing provide visual hierarchy. Borders
          are reserved for specific exceptions where they serve a functional purpose.
        </p>

        <div className="space-y-2">
          <Heading>Guiding Principle</Heading>
          <div className={`rounded-lg p-3 text-secondary text-sm ${surfaceClass(2)}`}>
            Use elevation (surface levels) and spacing to create visual separation. Borders add
            visual noise and compete with content. Only use borders when elevation alone cannot
            solve the problem.
          </div>
        </div>

        <div className="space-y-2">
          <Heading>Allowed Exceptions</Heading>
          <div className={`space-y-1 rounded p-3 text-xs ${surfaceClass(2)}`}>
            <div className="flex gap-2">
              <span className="text-primary">1.</span>
              <span className="text-secondary">
                <strong className="text-primary">Sidebar Sections:</strong> Section dividers using{" "}
                <code className="text-primary">border-surface-2 border-t</code> or{" "}
                <code className="text-primary">border-b</code>
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">2.</span>
              <span className="text-secondary">
                <strong className="text-primary">Same-Color Visibility:</strong> When displaying a
                color on the same color background, use{" "}
                <code className="text-primary">border border-white/10</code> for visibility
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">3.</span>
              <span className="text-secondary">
                <strong className="text-primary">Grouped Controls:</strong> Internal border removal
                (<code className="text-primary">border-0</code>) when combining inputs or buttons
                into a single visual unit
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Heading>Border Token</Heading>
          <div className={`space-y-1 rounded p-3 font-mono text-xs ${surfaceClass(2)}`}>
            <div>
              <span className="text-primary">border-white/10</span>
              <span className="text-tertiary"> - Subtle separator, used sparingly</span>
            </div>
            <div>
              <span className="text-primary">border-surface-2</span>
              <span className="text-tertiary"> - Matches elevation for sidebar dividers</span>
            </div>
          </div>
        </div>
      </div>
    </PanelCard>
  )
}
