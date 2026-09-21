"use client"

import { PageTabHeader } from "akasha/design/interface/layout/modules/page-tab-header/page-tab-header.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { TabsContent } from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { PatternsUxPanels } from "akasha/design/interface/system/modules/patterns-ux-panels/patterns-ux-panels.module.code.tsx"
import {
  CursorFeedbackPanel,
  DesignPrinciplesPanel,
  ElevationNestingPanel,
  SlotPatternPanel,
  StateLayerImplementationPanel,
} from "akasha/design/interface/system/modules/patterns-visual-panels/patterns-visual-panels.module.code.tsx"

export function PatternsTabContent() {
  return (
    <TabsContent value="patterns">
      <div className="flex flex-col gap-6">
        <PageTabHeader title="Patterns" />
        <ResponsiveColumns>
          <DesignPrinciplesPanel />
          <ElevationNestingPanel />
          <StateLayerImplementationPanel />
          <CursorFeedbackPanel />
          <SlotPatternPanel />
          <PatternsUxPanels />
        </ResponsiveColumns>
      </div>
    </TabsContent>
  )
}
