"use client"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "akasha/design/interfaces/patterns/empty/empty.module.code.tsx"
import { Button } from "akasha/design/interfaces/primitives/button/button.module.code.tsx"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
import type { PropertyDefinition } from "akasha/pages/core/page-data/page-data.module.code.ts"
import type { ViewSort } from "akasha/pages/core/schema/view-data/view-data.module.code.ts"
import type { PageResolver } from "akasha/pages/core/view/modules/apply-grouping-shared/apply-grouping-shared.module.code.ts"
import {
  getDefaultGroupSorts,
  sortGroupedResults,
} from "akasha/pages/core/view/modules/apply-grouping-sort/apply-grouping-sort.module.code.ts"
import type { ServerGroupedSection } from "akasha/pages/ui/components/page-system-tab-content-props/page-system-tab-content-props.module.code.ts"
import { PageTimeline } from "akasha/pages/ui/components/page-timeline/page-timeline.module.code.tsx"
import type { PageRow } from "akasha/pages/ui/components/view-engine/view-row/view-row.module.code.ts"
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
