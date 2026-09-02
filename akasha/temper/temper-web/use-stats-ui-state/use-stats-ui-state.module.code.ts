import type { MetricValue } from "@akasha/temper-characters-stats/metric-value"
import type { BuffOrDebuffSource } from "@akasha/temper-formula-framework/buff-or-debuff-source"
import { useState } from "react"

export function useStatsUIState() {
  const [selectedMetric, setSelectedMetric] = useState<MetricValue | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedBuff, setSelectedBuff] = useState<BuffOrDebuffSource | null>(null)
  const [isBuffDialogOpen, setIsBuffDialogOpen] = useState(false)
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false)

  return {
    selectedMetric,
    setSelectedMetric,
    isDialogOpen,
    setIsDialogOpen,
    selectedBuff,
    setSelectedBuff,
    isBuffDialogOpen,
    setIsBuffDialogOpen,
    showAdvancedMetrics,
    setShowAdvancedMetrics,
  }
}
