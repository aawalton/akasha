"use client"

import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { TabsContent } from "@akasha/design-patterns/tabs"
import { BordersPanel } from "../borders/borders.module.code.tsx"
import { GemstoneColorsPanel } from "../gemstone-colors/gemstone-colors.module.code.tsx"
import { SpacingRadiusPanel } from "../spacing-radius/spacing-radius.module.code.tsx"
import { StateLayersPanel } from "../state-layers/state-layers.module.code.tsx"
import { SurfaceElevationPanel } from "../surface-elevation/surface-elevation.module.code.tsx"
import { TextColorsPanel } from "../text-colors/text-colors.module.code.tsx"
import { TypographyPanel } from "../typography/typography.module.code.tsx"

export function TokensTabContent() {
  return (
    <TabsContent value="tokens">
      <div className="flex flex-col gap-6">
        <PageTabHeader title="Tokens" />
        <ResponsiveColumns>
          <SurfaceElevationPanel />
          <TypographyPanel />
          <TextColorsPanel />
          <GemstoneColorsPanel />
          <StateLayersPanel />
          <BordersPanel />
          <SpacingRadiusPanel />
        </ResponsiveColumns>
      </div>
    </TabsContent>
  )
}
