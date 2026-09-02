"use client"

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@akasha/design-patterns/empty"
import { Button } from "@akasha/design-primitives/button"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import type { ViewSort } from "@akasha/pages-core/schema/view-data"
import type { PropertyDefinition } from "@akasha/pages-core/types"
import type { PageResolver } from "@akasha/pages-core/view/apply-grouping-shared"
import {
  getDefaultGroupSorts,
  sortGroupedResults,
} from "@akasha/pages-core/view/apply-grouping-sort"
import type { ServerGroupedSection } from "@akasha/pages-ui-components/page-system-tab-content-props"
import { PageTimeline } from "@akasha/pages-ui-components/page-timeline"
import type { PageRow } from "@akasha/pages-ui-components/view-engine/view-row"
import { Plus } from "lucide-react"
import type { ReactNode } from "react"

export function sortServerGrouped(
  serverGrouped: readonly ServerGroupedSection[] | undefined,
  groupBy: string,
  groupSorts: readonly ViewSort[],
  properties: readonly PropertyDefinition[],
  resolver?: PageResolver | null
): readonly ServerGroupedSection[] | undefined {
  if (!serverGrouped || groupBy === "") return serverGrouped
  const sorts = groupSorts.length > 0 ? groupSorts : getDefaultGroupSorts(groupBy, properties)
  return sortGroupedResults(serverGrouped, sorts, groupBy, properties, resolver)
}

export function PageViewEmpty({ title, description }: { title: string; description: string }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export function CreatePageButton({
  onClick,
  disabled,
}: {
  onClick: () => void
  disabled?: boolean
}) {
  const surface = useSurface()
  return (
    <Button
      variant="tertiary"
      size="icon"
      className={surfaceClass(surface + 1)}
      aria-label="Create page"
      onClick={onClick}
      disabled={disabled}
    >
      <Plus />
    </Button>
  )
}

export function TimelineLayoutBody({
  rows,
  startPropertyId,
  endPropertyId,
  renderItem,
}: {
  rows: readonly PageRow[]
  startPropertyId: string | undefined
  endPropertyId: string | undefined
  renderItem: (item: PageRow) => ReactNode
}) {
  if (startPropertyId == null || startPropertyId.length === 0) {
    return (
      <PageViewEmpty
        title="Choose a start date"
        description="A timeline needs a start date property. Pick one under view settings → Timeline; each page becomes a bar."
      />
    )
  }
  return (
    <PageTimeline
      rows={rows}
      startPropertyId={startPropertyId}
      endPropertyId={endPropertyId}
      renderItem={renderItem}
    />
  )
}
