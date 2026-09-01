"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { cn } from "@akasha/design-primitives/cn"
import { Heading } from "@akasha/design-primitives/heading"
import { surfaceClass } from "@akasha/design-primitives/surface-class"

export function BrandHeartPanel() {
  return (
    <PanelCard id="ds-brand-heart" collapsible title="Brand Heart">
      <div className="space-y-4">
        <div className="space-y-2">
          <Heading variant="subsection-accent">The Golden Circle</Heading>
          <div className="space-y-2">
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">WHY (The Belief)</Heading>
              <p className="text-secondary text-xs">
                We believe the barrier to finding a perfect playstyle shouldn't be the cost of
                failure. Experimentation should be free, instant, and painless.
              </p>
            </div>
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">HOW (The Action)</Heading>
              <p className="text-secondary text-xs">
                We replace expensive in-game trial-and-error with rigorous, pixel-perfect
                mathematical simulation.
              </p>
            </div>
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">WHAT (The Product)</Heading>
              <p className="text-secondary text-xs">
                Temper: The Ultimate ESO Build Editor & Optimizer.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Heading variant="subsection-accent">The Archetypes</Heading>
          <div className="space-y-2">
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">Primary: The Sage (The Source of Truth)</Heading>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Motivation:</span> To use intelligence and analysis
                to understand the world.
              </p>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Role:</span> The unbiased arbiter of what works and
                what doesn't.
              </p>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Promise:</span> "We did the math so you don't have
                to."
              </p>
            </div>
            <div className={cn("space-y-1 rounded-lg p-3", surfaceClass(2))}>
              <Heading as="div">Secondary: The Explorer (The Treasure Hunter)</Heading>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Motivation:</span> To discover something new and
                authentic.
              </p>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Role:</span> The facilitator of "off-meta"
                discovery.
              </p>
              <p className="text-secondary text-xs">
                <span className="text-tertiary">Promise:</span> "Find the hidden gold in the data."
              </p>
            </div>
          </div>
        </div>
      </div>
    </PanelCard>
  )
}
