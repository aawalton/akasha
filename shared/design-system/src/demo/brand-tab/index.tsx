"use client"

import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { TabsContent } from "@shared/design-patterns/components/tabs"
import { BrandHeartPanel } from "./brand-heart"
import { PersonalityTonePanel } from "./personality-tone"
import { StrategicPrismPanel } from "./strategic-prism"
import { UiApplicationRulesPanel } from "./ui-application-rules"
import { VisualIdentityPanel } from "./visual-identity"

export function BrandTabContent() {
  return (
    <TabsContent value="brand">
      <div className="flex flex-col gap-6">
        <PageTabHeader title="Brand" />
        <ResponsiveColumns>
          <BrandHeartPanel />
          <PersonalityTonePanel />
          <VisualIdentityPanel />
          <StrategicPrismPanel />
          <UiApplicationRulesPanel />
        </ResponsiveColumns>
      </div>
    </TabsContent>
  )
}
