"use client"

import { LoadMoreButton } from "@akasha/design-layout/load-more-button"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { Card, CardContent } from "@akasha/design-primitives/card"
import { Heading } from "@akasha/design-primitives/heading"
import { useState } from "react"

export function ComponentsListGridPanels() {
  const [visibleCount, setVisibleCount] = useState(5)

  const totalItems = 20

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
          totalCount={totalItems}
          onLoadMore={() => setVisibleCount((prev) => Math.min(prev + 5, totalItems))}
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
