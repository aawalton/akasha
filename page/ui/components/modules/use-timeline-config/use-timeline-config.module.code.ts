import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { ViewConfig } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import { TIMELINE_DATE_PROPERTY_TYPES } from "akasha/page/ui/components/modules/page-timeline-helpers/page-timeline-helpers.module.code.ts"
import { useCallback, useMemo } from "react"

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
