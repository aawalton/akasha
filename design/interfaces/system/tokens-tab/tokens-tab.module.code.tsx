"use client"

import { PageTabHeader } from "akasha/design/interfaces/layout/page-tab-header/page-tab-header.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interfaces/layout/responsive-columns/responsive-columns.module.code.tsx"
import { TabsContent } from "akasha/design/interfaces/patterns/tabs/tabs.module.code.tsx"
import { BordersPanel } from "akasha/design/interfaces/system/borders/borders.module.code.tsx"
import { GemstoneColorsPanel } from "akasha/design/interfaces/system/gemstone-colors/gemstone-colors.module.code.tsx"
import { SpacingRadiusPanel } from "akasha/design/interfaces/system/spacing-radius/spacing-radius.module.code.tsx"
import { StateLayersPanel } from "akasha/design/interfaces/system/state-layers/state-layers.module.code.tsx"
import { SurfaceElevationPanel } from "akasha/design/interfaces/system/surface-elevation/surface-elevation.module.code.tsx"
import { TextColorsPanel } from "akasha/design/interfaces/system/text-colors/text-colors.module.code.tsx"
import { TypographyPanel } from "akasha/design/interfaces/system/typography/typography.module.code.tsx"

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
