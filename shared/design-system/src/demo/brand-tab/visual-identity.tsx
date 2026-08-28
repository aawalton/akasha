"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Heading } from "@shared/design-primitives/components/heading"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"

export function VisualIdentityPanel() {
  return (
    <PanelCard id="ds-visual-identity" collapsible title="Visual Identity">
      <div className="space-y-4">
        <div className="space-y-2">
          <Heading variant="subsection-accent">Design Philosophy</Heading>
          <p className="text-secondary text-sm">
            <span className="font-medium text-primary">Data Over Decoration.</span> Temper is a
            utility, not a game. The UI should fade into the background. If an element does not help
            the user understand the build, remove it.
          </p>
        </div>

        <div className="space-y-2">
          <Heading variant="subsection-accent">Typography</Heading>
          <p className="text-secondary text-sm">
            We use the <span className="font-medium text-primary">Geist</span> family to convey
            modern engineering precision.
          </p>
          <div className="space-y-2">
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">Primary: Geist Sans</Heading>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Usage:</span> Navigation, labels, body text,
                tooltips.
              </p>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Vibe:</span> Clean, legible, structural.
              </p>
            </div>
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">Secondary: Geist Mono</Heading>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Usage:</span> DPS numbers, stat values, resource
                pools, formula inputs.
              </p>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Vibe:</span> Mathematical, technical, raw truth.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Heading variant="subsection-accent">Color Palette</Heading>
          <div className="space-y-2">
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">The Canvas (Dark Mode)</Heading>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Slate Grey:</span> The foundation. Reduces eye
                strain during long theory-crafting sessions. Use for backgrounds, cards, modal
                windows.
              </p>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">White/Off-White:</span> High contrast text. Use for
                primary data readout.
              </p>
            </div>
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">The Accent (Legendary Gold)</Heading>
              <p className="text-secondary text-xs">
                Represents "Hidden Treasure," "Legendary Quality," and "Dwemer Engineering." Use for
                active states, key data highlights, primary borders, successful optimizations.
              </p>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Note:</span> Ensure this gold is distinct from
                standard "Warning Yellow." It should feel metallic and valuable, not alarming.
              </p>
            </div>
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">Functional Colors</Heading>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Success Green:</span> Validation passed.
              </p>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Error Red:</span> Critical conflict (e.g.,
                impossible gear combinations).
              </p>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Neutral Grey:</span> Inactive/Disabled elements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PanelCard>
  )
}
