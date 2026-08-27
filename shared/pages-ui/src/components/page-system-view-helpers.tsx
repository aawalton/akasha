"use client"

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@shared/design-patterns/components/empty"
import { Button } from "@shared/design-primitives/components/button"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { type PageResolver } from "@shared/pages-core/view/apply-grouping-shared"
import { getDefaultGroupSorts, sortGroupedResults } from "@shared/pages-core/view/apply-grouping-sort"
import { Plus } from "lucide-react"
import type { ReactNode } from "react"
import type { PropertyDefinition } from "@shared/pages-core/types"
import type { ViewSort } from "@shared/pages-core/schema/view-data"
import type { PageRow } from "../view-engine/page-row"
import type { ServerGroupedSection } from "./page-system-view-types"
import { PageTimeline } from "./page-timeline"

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

export function readRelationConfig(
  config: PropertyDefinition["config"]
): { targetPageTypeId: string; backRelationPropertyId: string } | undefined {
  if (!config || typeof config !== "object" || Array.isArray(config)) return undefined
  const { targetPageTypeId, backRelationPropertyId } = config
  if (typeof targetPageTypeId !== "string" || targetPageTypeId.length === 0) return undefined
  if (typeof backRelationPropertyId !== "string" || backRelationPropertyId.length === 0) {
    return undefined
  }
  return { targetPageTypeId, backRelationPropertyId }
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
