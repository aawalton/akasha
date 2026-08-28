"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Heading } from "@shared/design-primitives/components/heading"
import { TokenSwatch } from "../token-swatch"

export function TextColorsPanel() {
  return (
    <PanelCard id="ds-text-colors" collapsible title="Text Colors">
      <div className="space-y-4">
        <div className="space-y-2">
          <Heading>Text Hierarchy</Heading>
          <div className="flex flex-col gap-2">
            <TokenSwatch
              name="primary"
              value="oklch(0.88 0 0)"
              rgba="rgba(215, 215, 215, 1)"
              description="Headings, important content"
              className="bg-primary"
            />
            <TokenSwatch
              name="secondary"
              value="oklch(0.72 0 0)"
              rgba="rgba(164, 164, 164, 1)"
              description="Body text, descriptions"
              className="bg-secondary"
            />
            <TokenSwatch
              name="tertiary"
              value="oklch(0.56 0 0)"
              rgba="rgba(116, 116, 116, 1)"
              description="Labels, captions, metadata"
              className="bg-tertiary"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Heading>Semantic</Heading>
          <TokenSwatch
            name="accent"
            value="oklch(0.63 0.13 73)"
            rgba="rgba(184, 123, 17, 1)"
            description="Values, results. Must always be bold."
            className="bg-accent"
          />
        </div>
      </div>
    </PanelCard>
  )
}
