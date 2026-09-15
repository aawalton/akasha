"use client"

import { BrandHeartPanel } from "akasha/design/interface/design-interfaces-system/modules/brand-heart/brand-heart.module.code.tsx"
import { PersonalityTonePanel } from "akasha/design/interface/design-interfaces-system/modules/personality-tone/personality-tone.module.code.tsx"
import { StrategicPrismPanel } from "akasha/design/interface/design-interfaces-system/modules/strategic-prism/strategic-prism.module.code.tsx"
import { UiApplicationRulesPanel } from "akasha/design/interface/design-interfaces-system/modules/ui-application-rules/ui-application-rules.module.code.tsx"
import { VisualIdentityPanel } from "akasha/design/interface/design-interfaces-system/modules/visual-identity/visual-identity.module.code.tsx"
import { PageTabHeader } from "akasha/design/interface/layout/modules/page-tab-header/page-tab-header.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { TabsContent } from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"

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
