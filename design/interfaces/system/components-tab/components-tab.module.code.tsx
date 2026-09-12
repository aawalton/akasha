"use client"

import { PageTabHeader } from "akasha/design/interfaces/layout/page-tab-header/page-tab-header.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interfaces/layout/responsive-columns/responsive-columns.module.code.tsx"
import { TabsContent } from "akasha/design/interfaces/patterns/tabs/tabs.module.code.tsx"
import { ComponentsItemDisplayPanels } from "akasha/design/interfaces/system/components-item-display-panels/components-item-display-panels.module.code.tsx"
import { ComponentsListGridPanels } from "akasha/design/interfaces/system/components-list-grid-panels/components-list-grid-panels.module.code.tsx"
import { ComponentsMenuPanels } from "akasha/design/interfaces/system/components-menu-panels/components-menu-panels.module.code.tsx"
import { ComponentsOverlayPanels } from "akasha/design/interfaces/system/components-overlay-panels/components-overlay-panels.module.code.tsx"
import { ComponentsSelectionPanels } from "akasha/design/interfaces/system/components-selection-panels/components-selection-panels.module.code.tsx"
import { ComponentsSkeletonPanels } from "akasha/design/interfaces/system/components-skeleton-panels/components-skeleton-panels.module.code.tsx"
import { ComponentsSortFilterPanels } from "akasha/design/interfaces/system/components-sort-filter-panels/components-sort-filter-panels.module.code.tsx"
import { ComponentsTextDisplayPanels } from "akasha/design/interfaces/system/components-text-display-panels/components-text-display-panels.module.code.tsx"
import { ComponentsCompoundNavPanels } from "akasha/design/interfaces/system/modules/components-compound-nav-panels/components-compound-nav-panels.module.code.tsx"
import { ComponentsCompoundPanels } from "akasha/design/interfaces/system/modules/components-compound-panels/components-compound-panels.module.code.tsx"
import { ComponentsCorePanels } from "akasha/design/interfaces/system/modules/components-core-panels/components-core-panels.module.code.tsx"
import { ComponentsFormControlsPanels } from "akasha/design/interfaces/system/modules/components-form-controls-panels/components-form-controls-panels.module.code.tsx"
import { ComponentsInputCompositePanels } from "akasha/design/interfaces/system/modules/components-input-composite-panels/components-input-composite-panels.module.code.tsx"
import { ComponentsInputPanels } from "akasha/design/interfaces/system/modules/components-input-panels/components-input-panels.module.code.tsx"

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
