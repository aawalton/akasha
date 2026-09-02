import { PanelCard } from "@akasha/design-layout/panel-card"
import { StatRow } from "@akasha/design-patterns/stat-row"
import type { MetricValue } from "@akasha/temper-characters-stats/metric-value"
import type { StatsRecord } from "../stats-types/stats-types.module.code.ts"

interface OptimizationPanelCardProps {
  stats: StatsRecord
  searchTerm: string
  className?: string
}

type OvercappedRatingMetric = MetricValue & {
  valueType: "rating"
  divisor: number
  cap: number
}

function isOvercappedRatingMetric(stat: MetricValue): stat is OvercappedRatingMetric {
  if (stat.valueType !== "rating") return false
  if (!("cap" in stat) || typeof stat.cap !== "number") return false
  if (!("divisor" in stat) || typeof stat.divisor !== "number") return false
  return stat.value / stat.divisor > stat.cap
}

export function OptimizationPanelCard({
  stats,
  searchTerm,
  className,
}: OptimizationPanelCardProps) {
  const lowerSearch = searchTerm.trim().toLowerCase()

  const overcappedMetrics = Object.values(stats).filter(
    (stat): stat is OvercappedRatingMetric =>
      stat !== undefined &&
      isOvercappedRatingMetric(stat) &&
      (lowerSearch === "" ||
        stat.name.toLowerCase().includes(lowerSearch) ||
        "optimization".includes(lowerSearch))
  )

  if (overcappedMetrics.length === 0) {
    return null
  }

  return (
    <PanelCard id="optimization" collapsible={true} title="Optimization" className={className}>
      <div className="space-y-4">
        {overcappedMetrics.map((stat) => {
          const surplusRating = stat.value - stat.cap * stat.divisor
          const surplusPercent = ((stat.value / stat.divisor - stat.cap) * 100).toFixed(2)
          const capPercent = (stat.cap * 100).toFixed(0)
          const cappedRating = Math.round(stat.cap * stat.divisor)

          return (
            <div key={stat.id} className="space-y-1">
              <StatRow label={stat.name} useAccentColor depth={0} />
              <StatRow
                label="Surplus"
                value={
                  <span className="text-warning">
                    +{Math.round(surplusRating).toLocaleString()} (+{surplusPercent}%)
                  </span>
                }
                depth={1}
              />
              <StatRow
                label={`Capped at ${capPercent}%`}
                value={cappedRating.toLocaleString()}
                depth={1}
              />
            </div>
          )
        })}
      </div>
    </PanelCard>
  )
}
