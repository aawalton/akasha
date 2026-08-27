import { useCallback, useMemo } from "react"
import type { PropertyDefinition } from "@shared/pages-core/types"
import type { ViewConfig } from "@shared/pages-core/schema/view-data"
import { TIMELINE_DATE_PROPERTY_TYPES } from "./page-timeline-helpers"

export function useTimelineConfig({
  properties,
  viewConfig,
  onViewConfigChange,
}: {
  properties: readonly PropertyDefinition[]
  viewConfig: ViewConfig
  onViewConfigChange: (config: ViewConfig) => void
}) {
  const timelinePropertyOptions = useMemo(
    () =>
      properties
        .filter((p) => TIMELINE_DATE_PROPERTY_TYPES.has(p.type))
        .map((p) => ({ id: p.id, label: p.title })),
    [properties]
  )
  const onTimelineStartChange = useCallback(
    (id: string) => onViewConfigChange({ ...viewConfig, timelineStartProperty: id }),
    [viewConfig, onViewConfigChange]
  )
  const onTimelineEndChange = useCallback(
    (id: string | null) =>
      onViewConfigChange({ ...viewConfig, timelineEndProperty: id ?? undefined }),
    [viewConfig, onViewConfigChange]
  )
  return { timelinePropertyOptions, onTimelineStartChange, onTimelineEndChange }
}
