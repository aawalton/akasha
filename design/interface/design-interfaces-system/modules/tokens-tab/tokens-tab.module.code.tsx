"use client"

import { BordersPanel } from "akasha/design/interface/design-interfaces-system/modules/borders/borders.module.code.tsx"
import { GemstoneColorsPanel } from "akasha/design/interface/design-interfaces-system/modules/gemstone-colors/gemstone-colors.module.code.tsx"
import { SpacingRadiusPanel } from "akasha/design/interface/design-interfaces-system/modules/spacing-radius/spacing-radius.module.code.tsx"
import { StateLayersPanel } from "akasha/design/interface/design-interfaces-system/modules/state-layers/state-layers.module.code.tsx"
import { SurfaceElevationPanel } from "akasha/design/interface/design-interfaces-system/modules/surface-elevation/surface-elevation.module.code.tsx"
import { TextColorsPanel } from "akasha/design/interface/design-interfaces-system/modules/text-colors/text-colors.module.code.tsx"
import { TypographyPanel } from "akasha/design/interface/design-interfaces-system/modules/typography/typography.module.code.tsx"
import { PageTabHeader } from "akasha/design/interface/layout/modules/page-tab-header/page-tab-header.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { TabsContent } from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"

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
