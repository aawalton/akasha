import type { CompanionBaseRoleId } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import {
  type CompanionSkillId,
  companionSkillAt,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import {
  type CompanionSkillSlotId,
  companionSkillSlots,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-slots/companion-skill-slots.module.code.ts"
import { calculateCompanionStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-stats-calculator/companion-stats-calculator.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"

const NO_SKILL: CompanionSkillId = "no-skill"

function getRoleMetricIds(roles: readonly CompanionBaseRoleId[]): readonly CompanionMetricId[] {
  const metrics: CompanionMetricId[] = []
  if (roles.includes("dps")) metrics.push("companion-dps-total")
  if (roles.includes("healer")) metrics.push("companion-hps-total")
  if (roles.includes("tank")) metrics.push("companion-tps-total")
  if (roles.includes("support")) {
    metrics.push("companion-support-dps")
    metrics.push("companion-support-tps")
  }
  return metrics
}

function sanitizeSkillBar(state: CompanionState): CompanionState {
  const roles = state.companion.baseRoles
  const skillBar = state.skills["skill-bar"]
  let changed = false

  const sanitized: Record<CompanionSkillSlotId, CompanionSkillId> = { ...skillBar }
  for (const slotId of companionSkillSlots.ids) {
    const skillId = skillBar[slotId]
    if (skillId !== NO_SKILL) {
      const { validRoles } = companionSkillAt(skillId)
      if (validRoles.length > 0 && !validRoles.some((r) => roles.includes(r))) {
        sanitized[slotId] = NO_SKILL
        changed = true
      }
    }
  }

  if (!changed) return state
  return { ...state, skills: { ...state.skills, "skill-bar": sanitized } }
}

export function evaluate(state: CompanionState): number {
  const metricIds = getRoleMetricIds(state.companion.baseRoles)
  if (metricIds.length === 0) return 0

  const result = calculateCompanionStats(sanitizeSkillBar(state))

  let total = 0
  for (const metricId of metricIds) {
    let value = result.metrics[metricId]?.value ?? 0
    if (metricId === "companion-tps-total") value /= 10
    if (metricId === "companion-support-tps") value /= 10
    total += value
  }
  return total
}
