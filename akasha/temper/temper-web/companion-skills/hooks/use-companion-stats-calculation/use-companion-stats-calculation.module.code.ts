import type { CompanionEffectSource } from "@akasha/temper-companions-core/companion-effect-sources"
import type { CompanionMetricId } from "@akasha/temper-companions-core/companion-metric-ids"
import type { CompanionMetricValue } from "@akasha/temper-companions-core/companion-metrics"
import { calculateCompanionStats } from "@akasha/temper-companions-core/companion-stats-calculator"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import type { RotationResult } from "@akasha/temper-companions-core/rotation-types"
import { useEffect, useState } from "react"

export function useCompanionStatsCalculation(build: CompanionState) {
  const [stats, setStats] = useState<Partial<Record<CompanionMetricId, CompanionMetricValue>>>({})
  const [sources, setSources] = useState<readonly CompanionEffectSource[]>([])
  const [rotation, setRotation] = useState<RotationResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let cancelled = false

    function loadStats() {
      setIsLoading(true)
      try {
        const result = calculateCompanionStats(build)
        if (!cancelled) {
          setStats(result.metrics)
          setSources(result.sources)
          setRotation(result.rotation)
          setHasError(false)
        }
      } catch (error) {
        console.error("[CompanionStatsPanel] Failed to calculate stats:", error)
        if (!cancelled) {
          setStats({})
          setSources([])
          setRotation(null)
          setHasError(true)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadStats()

    return () => {
      cancelled = true
    }
  }, [build])

  return {
    stats,
    sources,
    rotation,
    isLoading,
    hasError,
  }
}
