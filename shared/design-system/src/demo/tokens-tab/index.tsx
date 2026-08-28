"use client"

import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { TabsContent } from "@shared/design-patterns/components/tabs"
import { BordersPanel } from "./borders"
import { GemstoneColorsPanel } from "./gemstone-colors"
import { SpacingRadiusPanel } from "./spacing-radius"
import { StateLayersPanel } from "./state-layers"
import { SurfaceElevationPanel } from "./surface-elevation"
import { TextColorsPanel } from "./text-colors"
import { TypographyPanel } from "./typography"

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
