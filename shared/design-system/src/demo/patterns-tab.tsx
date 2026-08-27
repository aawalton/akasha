"use client"

import { PageTabHeader, ResponsiveColumns } from "../index"
import { TabsContent } from "@shared/design-patterns/components/tabs"
import { PatternsUxPanels } from "./patterns-ux-panels"
import { PatternsVisualPanels } from "./patterns-visual-panels"

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
