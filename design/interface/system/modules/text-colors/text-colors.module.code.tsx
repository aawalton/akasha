"use client"

import { chalk } from "akasha/design/interface/color/pages/chalk.color.ts"
import { silver } from "akasha/design/interface/color/pages/silver.color.ts"
import { stone } from "akasha/design/interface/color/pages/stone.color.ts"
import { yellow } from "akasha/design/interface/color/pages/yellow.color.ts"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { TokenSwatch } from "akasha/design/interface/system/modules/token-swatch/token-swatch.module.code.tsx"

export function TextColorsPanel() {
  return (
    <PanelCard id="ds-text-colors" collapsible title="Text Colors">
      <div className="space-y-4">
        <div className="space-y-2">
          <Heading>Text Hierarchy</Heading>
          <div className="flex flex-col gap-2">
            <TokenSwatch
              name="primary"
              color={chalk}
              description="Headings, important content"
              className="bg-primary"
            />
            <TokenSwatch
              name="secondary"
              color={silver}
              description="Body text, descriptions"
              className="bg-secondary"
            />
            <TokenSwatch
              name="tertiary"
              color={stone}
              description="Labels, captions, metadata"
              className="bg-tertiary"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Heading>Semantic</Heading>
          <TokenSwatch
            name="accent"
            color={yellow}
            description="Values, results. Must always be bold."
            className="bg-accent"
          />
        </div>
      </div>
    </PanelCard>
  )
}
