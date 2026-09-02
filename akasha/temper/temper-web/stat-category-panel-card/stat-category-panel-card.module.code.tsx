import { PanelCard } from "@akasha/design-layout/panel-card"
import {
  type CategoryNode,
  isMetricNode,
  isSubcategoryNode,
} from "@akasha/temper-characters-stats/metric-tree-types"
import type { MetricValue } from "@akasha/temper-characters-stats/metric-value"
import {
  hasVisibleMetricRows,
  MetricTreeRenderer,
} from "../metric-tree-renderer/metric-tree-renderer.module.code.tsx"
import { StatSubcategoryPanelCard } from "../stat-subcategory-panel-card/stat-subcategory-panel-card.module.code.tsx"
import type { StatsRecord } from "../stats-types/stats-types.module.code.ts"

interface StatCategoryPanelCardProps {
  id: string
  category: CategoryNode
  stats: StatsRecord
  searchTerm?: string
  onStatClick: (metric: MetricValue) => void
  showAdvancedMetrics?: boolean
  className?: string
}

export function StatCategoryPanelCard({
  id,
  category,
  stats,
  searchTerm,
  onStatClick,
  showAdvancedMetrics,
  className,
}: StatCategoryPanelCardProps) {
  if (!category.children || category.children.length === 0) {
    return null
  }

  if (!hasVisibleMetricRows(category.children, stats, showAdvancedMetrics)) {
    return null
  }

  return (
    <PanelCard id={id} collapsible={true} title={category.name} className={className}>
      {category.children.map((child) => {
        if (isMetricNode(child)) {
          return (
            <MetricTreeRenderer
              key={child.id}
              nodes={[child]}
              stats={stats}
              searchTerm={searchTerm}
              onMetricClick={onStatClick}
              showAdvancedMetrics={showAdvancedMetrics}
            />
          )
        }

        if (isSubcategoryNode(child)) {
          return (
            <StatSubcategoryPanelCard
              key={child.id}
              subcategoryName={child.name}
              subcategoryNodes={child.children || []}
              stats={stats}
              searchTerm={searchTerm}
              onStatClick={onStatClick}
              showAdvancedMetrics={showAdvancedMetrics}
            />
          )
        }

        return null
      })}
    </PanelCard>
  )
}
