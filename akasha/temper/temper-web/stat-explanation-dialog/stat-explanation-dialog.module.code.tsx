"use client"

import { cn } from "@akasha/design-primitives/cn"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@akasha/design-primitives/dialog"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Text } from "@akasha/design-primitives/text-body"
import { metricToDisplayFormula } from "@akasha/temper-characters-stats/metric-display-formula"
import type { MetricValue } from "@akasha/temper-characters-stats/metric-value"
import { getMetricDisplayName } from "@akasha/temper-characters-stats/metrics"
import type { EffectSource } from "@akasha/temper-formula-framework/effect-source"
import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import { formatStatValue } from "@akasha/temper-formula-framework/number-format"
import { typedPartialRecordKeys } from "@akasha/temper-formula-framework/record-parts"
import { FormulaDisplay } from "../formula-display/formula-display.module.code.tsx"

interface StatExplanationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  metric: MetricValue | null
  sources: readonly EffectSource[]
  allStats: Partial<Record<MetricId, MetricValue>>
}

export function StatExplanationDialog({
  open,
  onOpenChange,
  metric,
  sources,
  allStats,
}: StatExplanationDialogProps) {
  const surface = useSurface()

  if (!metric) {
    return null
  }

  const metricValues = new Map<MetricId, number>()
  for (const id of typedPartialRecordKeys(allStats)) {
    const mv = allStats[id]
    if (mv) metricValues.set(id, mv.value)
  }

  const displayFormula = metricToDisplayFormula(metric, sources, metricValues)
  const name = getMetricDisplayName(metric.id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <div className={cn("overflow-x-auto rounded-md p-4", surfaceClass(surface + 1))}>
            {displayFormula ? (
              <FormulaDisplay formula={displayFormula} />
            ) : (
              <Text>{formatStatValue(metric)} (no formula)</Text>
            )}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
