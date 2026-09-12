"use client"

import {
  PageLayout,
  PageTitle,
} from "akasha/design/interfaces/layout/page-layout/page-layout.module.code.tsx"
import { tabbedPageSkeleton } from "akasha/design/interfaces/layout/skeleton-presets/skeleton-presets.module.code.ts"
import {
  PageTabsTrigger,
  Tabs,
  TabsList,
} from "akasha/design/interfaces/patterns/tabs/tabs.module.code.tsx"
import { ComponentsTabContent } from "akasha/design/interfaces/system/components-tab/components-tab.module.code.tsx"
import { LayoutTabContent } from "akasha/design/interfaces/system/layout-tab/layout-tab.module.code.tsx"
import { BrandTabContent } from "akasha/design/interfaces/system/modules/brand-tab/brand-tab.module.code.tsx"
import { PatternsTabContent } from "akasha/design/interfaces/system/patterns-tab/patterns-tab.module.code.tsx"
import { TokensTabContent } from "akasha/design/interfaces/system/tokens-tab/tokens-tab.module.code.tsx"
import { BookOpen, Component, LayoutGrid, Palette, Puzzle } from "lucide-react"

interface DesignSystemPageContentProps {
  initialTab?: string
}

export function DesignSystemPageContent({ initialTab }: DesignSystemPageContentProps) {
  return (
    <PageLayout
      skeleton={tabbedPageSkeleton({
        initialTab,
        defaultTab: "brand",
        tabs: ["brand", "tokens", "components", "layout", "patterns"],
      })}
    >
      <PageLayout.Header>
        <PageTitle>Design System</PageTitle>
      </PageLayout.Header>

      <Tabs defaultValue={initialTab ?? "brand"} syncUrl syncStorage="design-system:tab">
        <PageLayout.Tabs>
          <TabsList className="@[1016px]:grid grid h-18 @[1016px]:grid-cols-5 grid-cols-3 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
            <PageTabsTrigger value="brand" icon={<BookOpen />} label="Brand" />
            <PageTabsTrigger value="tokens" icon={<Palette />} label="Tokens" />
            <PageTabsTrigger value="components" icon={<Component />} label="Components" />
            <PageTabsTrigger value="layout" icon={<LayoutGrid />} label="Layout" />
            <PageTabsTrigger value="patterns" icon={<Puzzle />} label="Patterns" />
          </TabsList>
        </PageLayout.Tabs>

        <PageLayout.Content>
          <BrandTabContent />
          <TokensTabContent />
          <ComponentsTabContent />
          <LayoutTabContent />
          <PatternsTabContent />
        </PageLayout.Content>
      </Tabs>
    </PageLayout>
  )
}
