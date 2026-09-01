"use client"

import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { TabsContent } from "@akasha/design-patterns/tabs"
import { ComponentsCompoundNavPanels } from "../components-compound-nav-panels/components-compound-nav-panels.module.code.tsx"
import { ComponentsCompoundPanels } from "../components-compound-panels/components-compound-panels.module.code.tsx"
import { ComponentsCorePanels } from "../components-core-panels/components-core-panels.module.code.tsx"
import { ComponentsFormControlsPanels } from "../components-form-controls-panels/components-form-controls-panels.module.code.tsx"
import { ComponentsInputCompositePanels } from "../components-input-composite-panels/components-input-composite-panels.module.code.tsx"
import { ComponentsInputPanels } from "../components-input-panels/components-input-panels.module.code.tsx"
import { ComponentsItemDisplayPanels } from "../components-item-display-panels/components-item-display-panels.module.code.tsx"
import { ComponentsListGridPanels } from "../components-list-grid-panels/components-list-grid-panels.module.code.tsx"
import { ComponentsMenuPanels } from "../components-menu-panels/components-menu-panels.module.code.tsx"
import { ComponentsOverlayPanels } from "../components-overlay-panels/components-overlay-panels.module.code.tsx"
import { ComponentsSelectionPanels } from "../components-selection-panels/components-selection-panels.module.code.tsx"
import { ComponentsSkeletonPanels } from "../components-skeleton-panels/components-skeleton-panels.module.code.tsx"
import { ComponentsSortFilterPanels } from "../components-sort-filter-panels/components-sort-filter-panels.module.code.tsx"
import { ComponentsTextDisplayPanels } from "../components-text-display-panels/components-text-display-panels.module.code.tsx"

export function ComponentsTabContent() {
  return (
    <TabsContent value="components">
      <div className="flex flex-col gap-6">
        <PageTabHeader title="Components" />
        <ResponsiveColumns>
          <ComponentsCorePanels />
          <ComponentsInputPanels />
          <ComponentsOverlayPanels />
          <ComponentsFormControlsPanels />
          <ComponentsTextDisplayPanels />
          <ComponentsSkeletonPanels />
          <ComponentsMenuPanels />
          <ComponentsInputCompositePanels />
          <ComponentsSelectionPanels />
          <ComponentsSortFilterPanels />
          <ComponentsItemDisplayPanels />
          <ComponentsListGridPanels />
          <ComponentsCompoundPanels />
          <ComponentsCompoundNavPanels />
        </ResponsiveColumns>
      </div>
    </TabsContent>
  )
}
