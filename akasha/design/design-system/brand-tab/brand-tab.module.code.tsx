"use client"

import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { TabsContent } from "@akasha/design-patterns/tabs"
import { BrandHeartPanel } from "../brand-heart/brand-heart.module.code.tsx"
import { PersonalityTonePanel } from "../personality-tone/personality-tone.module.code.tsx"
import { StrategicPrismPanel } from "../strategic-prism/strategic-prism.module.code.tsx"
import { UiApplicationRulesPanel } from "../ui-application-rules/ui-application-rules.module.code.tsx"
import { VisualIdentityPanel } from "../visual-identity/visual-identity.module.code.tsx"

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
