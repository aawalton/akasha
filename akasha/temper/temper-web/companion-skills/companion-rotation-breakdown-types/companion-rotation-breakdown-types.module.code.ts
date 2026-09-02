import type { CompanionBaseRoleId } from "@akasha/temper-companions-core/companion-base-roles"
import type { CompanionMetricId } from "@akasha/temper-companions-core/companion-metric-ids"
import type { CompanionMetricValue } from "@akasha/temper-companions-core/companion-metrics"
import type { CompanionFormulaStats } from "@akasha/temper-companions-core/companion-skill-formula"
import type { CompanionSkillSlotId } from "@akasha/temper-companions-core/companion-skill-slots"
import type { CompanionSkillId } from "@akasha/temper-companions-core/companion-skills"
import type { RotationBreakdownRowId } from "@akasha/temper-companions-core/rotation-breakdown-rows"
import type { SkillUsageSummary } from "@akasha/temper-companions-core/rotation-types"

export function getPrimaryRows(
  roles: readonly CompanionBaseRoleId[]
): ReadonlyArray<RotationBreakdownRowId> {
  const rows: RotationBreakdownRowId[] = []
  if (roles.includes("dps")) rows.push("dpc")
  if (roles.includes("healer")) rows.push("hpc")
  if (roles.includes("tank")) rows.push("tps")
  return rows
}

export interface SkillBreakdownTableProps {
  summaries: readonly SkillUsageSummary[]
  cycleDuration: number
  formulaStats: CompanionFormulaStats
  metricStats: Partial<Record<CompanionMetricId, CompanionMetricValue>>
  skillBar: Record<CompanionSkillSlotId, CompanionSkillId>
  primaryRows?: ReadonlyArray<RotationBreakdownRowId>
}
