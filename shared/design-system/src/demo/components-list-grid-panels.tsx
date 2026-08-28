"use client"

import { useState } from "react"
import { LoadMoreButton } from "@shared/design-layout/components/load-more-button"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Card, CardContent } from "@shared/design-primitives/components/card"
import { Heading } from "@shared/design-primitives/components/heading"

export function ComponentsListGridPanels() {
  const [visibleCount, setVisibleCount] = useState(5)

  const TOTAL_ITEMS = 20

  return (
    <>
      {}
      <PanelCard id="ds-load-more-button" collapsible title="LoadMoreButton">
        <p className="text-secondary text-sm">
          Progressive loading button showing visible vs total count. Accepts visibleCount,
          totalCount, and onLoadMore.
        </p>
        <LoadMoreButton
          visibleCount={visibleCount}
          totalCount={TOTAL_ITEMS}
          onLoadMore={() => setVisibleCount((prev) => Math.min(prev + 5, TOTAL_ITEMS))}
        />
      </PanelCard>

      {}
      <PanelCard id="ds-virtual-card-grid" collapsible title="VirtualCardGrid">
        <p className="text-secondary text-sm">
          Virtualized card grid using TanStack Virtual. Requires LayoutProvider context (provided by
          AppShell) to determine column count. Accepts an items array and renderItem function. Not
          demoed interactively here because it renders rows absolutely positioned via
          useWindowVirtualizer, which conflicts with the PanelCard container.
        </p>
      </PanelCard>

      {}
      <PanelCard id="ds-paginated-card-grid" collapsible title="PaginatedCardGrid">
        <p className="text-secondary text-sm">
          Composes VirtualCardGrid and LoadMoreButton into a paginated grid. Shows a Load More
          button for progressive loading at all breakpoints. Accepts items, renderItem, pageSize,
          and scroll restoration props.
        </p>
        <div className="space-y-2">
          <Heading>Props</Heading>
          <div className="flex flex-wrap gap-2 text-secondary text-xs">
            {[
              "items",
              "renderItem",
              "pageSize",
              "trailingContent",
              "itemLabel",
              "initialVisibleCount",
              "onVisibleCountChange",
            ].map((prop) => (
              <Card key={prop}>
                <CardContent className="px-3 py-1.5">
                  <code>{prop}</code>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PanelCard>
    </>
  )
}
