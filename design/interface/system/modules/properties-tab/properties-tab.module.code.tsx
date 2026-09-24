"use client"

import { PageTabHeader } from "akasha/design/interface/layout/modules/page-tab-header/page-tab-header.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { TabsContent } from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import {
  ActionPropertyBadgesPanel,
  DatePropertyBadgesPanel,
  EmptyPropertyBadgesPanel,
  NumberPropertyBadgesPanel,
  RelationPropertyBadgesPanel,
  SelectionPropertyBadgesPanel,
  TextPropertyBadgesPanel,
} from "akasha/design/interface/system/modules/property-badge-panels/property-badge-panels.module.code.tsx"
import { PropertyRowsPanel } from "akasha/design/interface/system/modules/property-row-panels/property-row-panels.module.code.tsx"

export function PropertiesTabContent() {
  return (
    <TabsContent value="properties">
      <div className="flex flex-col gap-6">
        <PageTabHeader title="Properties" />
        <ResponsiveColumns>
          <PropertyRowsPanel />
          <TextPropertyBadgesPanel />
          <NumberPropertyBadgesPanel />
          <SelectionPropertyBadgesPanel />
          <DatePropertyBadgesPanel />
          <RelationPropertyBadgesPanel />
          <ActionPropertyBadgesPanel />
          <EmptyPropertyBadgesPanel />
        </ResponsiveColumns>
      </div>
    </TabsContent>
  )
}
