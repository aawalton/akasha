"use client"

import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { TabsContent } from "@shared/design-patterns/components/tabs"
import { ComponentsCompoundNavPanels } from "./components-compound-nav-panels"
import { ComponentsCompoundPanels } from "./components-compound-panels"
import { ComponentsCorePanels } from "./components-core-panels"
import { ComponentsFormControlsPanels } from "./components-form-controls-panels"
import { ComponentsInputCompositePanels } from "./components-input-composite-panels"
import { ComponentsInputPanels } from "./components-input-panels"
import { ComponentsItemDisplayPanels } from "./components-item-display-panels"
import { ComponentsListGridPanels } from "./components-list-grid-panels"
import { ComponentsMenuPanels } from "./components-menu-panels"
import { ComponentsOverlayPanels } from "./components-overlay-panels"
import { ComponentsSelectionPanels } from "./components-selection-panels"
import { ComponentsSkeletonPanels } from "./components-skeleton-panels"
import { ComponentsSortFilterPanels } from "./components-sort-filter-panels"
import { ComponentsTextDisplayPanels } from "./components-text-display-panels"

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
