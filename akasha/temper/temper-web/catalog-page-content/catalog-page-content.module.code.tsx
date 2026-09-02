"use client"

import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { tabbedPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { PageTabsTrigger, Tabs, TabsList } from "@akasha/design-patterns/tabs"
import { useFilterPersistence } from "@akasha/design-patterns/use-filter-persistence"
import { Button } from "@akasha/design-primitives/button"
import { PagesUILink as Link } from "@akasha/pages-ui/navigation-context"
import { ChevronLeft, Swords } from "lucide-react"
import { DungeonsTab } from "../dungeons-tab/dungeons-tab.module.code.tsx"

const VALID_TABS = new Set(["dungeons"])

type FilterValues = {
  tab: string
}

interface CatalogPageContentProps {
  initialTab?: string
}

export function CatalogPageContent({ initialTab }: CatalogPageContentProps) {
  const { values, update } = useFilterPersistence<FilterValues>({
    storageKey: "temper:catalog:filters",
    fields: {
      tab: {
        urlParam: "tab",
        defaultValue: "dungeons",
        initial: initialTab,
        validate: (raw) => (typeof raw === "string" && VALID_TABS.has(raw) ? raw : undefined),
        toParam: (v) => (v === "dungeons" ? null : v),
      },
    },
  })

  return (
    <PageLayout
      skeleton={tabbedPageSkeleton({
        titleWidth: 108,
        initialTab,
        defaultTab: "dungeons",
        tabs: ["dungeons"],
      })}
    >
      <PageLayout.Header>
        <div className="flex min-w-0 items-center gap-4">
          <Button variant="tertiary" size="icon-sm" asChild className="min-[584px]:hidden">
            <Link href="/home">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <PageTitle>Catalog</PageTitle>
        </div>
      </PageLayout.Header>

      <Tabs value={values.tab} onValueChange={(v) => update({ tab: v })}>
        <PageLayout.Tabs>
          <TabsList className="@[1016px]:grid grid h-18 w-full @[1016px]:grid-cols-1 grid-cols-1 rounded-none min-[584px]:flex min-[584px]:h-9 min-[584px]:rounded-lg">
            <PageTabsTrigger value="dungeons" icon={<Swords />} label="Dungeons" />
          </TabsList>
        </PageLayout.Tabs>

        <PageLayout.Content>
          <DungeonsTab />
        </PageLayout.Content>
      </Tabs>
    </PageLayout>
  )
}
