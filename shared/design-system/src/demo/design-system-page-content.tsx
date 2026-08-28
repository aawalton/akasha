"use client"

import { BookOpen, Component, LayoutGrid, Palette, Puzzle } from "lucide-react"
import { PageLayout, PageTitle } from "@shared/design-layout/components/page-layout"
import { tabbedPageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { PageTabsTrigger, Tabs, TabsList } from "@shared/design-patterns/components/tabs"
import { BrandTabContent } from "./brand-tab"
import { ComponentsTabContent } from "./components-tab"
import { LayoutTabContent } from "./layout-tab"
import { PatternsTabContent } from "./patterns-tab"
import { TokensTabContent } from "./tokens-tab"

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
