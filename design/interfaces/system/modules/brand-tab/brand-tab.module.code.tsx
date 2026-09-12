"use client"

import { PageTabHeader } from "akasha/design/interfaces/layout/page-tab-header/page-tab-header.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interfaces/layout/responsive-columns/responsive-columns.module.code.tsx"
import { TabsContent } from "akasha/design/interfaces/patterns/tabs/tabs.module.code.tsx"
import { BrandHeartPanel } from "akasha/design/interfaces/system/modules/brand-heart/brand-heart.module.code.tsx"
import { PersonalityTonePanel } from "akasha/design/interfaces/system/personality-tone/personality-tone.module.code.tsx"
import { StrategicPrismPanel } from "akasha/design/interfaces/system/strategic-prism/strategic-prism.module.code.tsx"
import { UiApplicationRulesPanel } from "akasha/design/interfaces/system/ui-application-rules/ui-application-rules.module.code.tsx"
import { VisualIdentityPanel } from "akasha/design/interfaces/system/visual-identity/visual-identity.module.code.tsx"

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
