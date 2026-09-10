"use client"

import { PageTabHeader } from "akasha/design/layout/page-tab-header/page-tab-header.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/layout/responsive-columns/responsive-columns.module.code.tsx"
import { TabsContent } from "akasha/design/patterns/tabs/tabs.module.code.tsx"
import { PatternsUxPanels } from "../patterns-ux-panels/patterns-ux-panels.module.code.tsx"
import { PatternsVisualPanels } from "../patterns-visual-panels/patterns-visual-panels.module.code.tsx"

export function PatternsTabContent() {
  return (
    <TabsContent value="patterns">
      <div className="flex flex-col gap-6">
        <PageTabHeader title="Patterns" />
        <ResponsiveColumns>
          <PatternsVisualPanels />
          <PatternsUxPanels />
        </ResponsiveColumns>
      </div>
    </TabsContent>
  )
}
