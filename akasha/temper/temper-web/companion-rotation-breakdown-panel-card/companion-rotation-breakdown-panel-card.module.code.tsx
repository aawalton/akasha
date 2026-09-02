"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import { Skeleton } from "@akasha/design-primitives/skeleton"
import { Text } from "@akasha/design-primitives/text-body"
import type { CompanionBaseRoleId } from "@akasha/temper-companions-core/companion-base-roles"
import type { CompanionMetricId } from "@akasha/temper-companions-core/companion-metric-ids"
import type { CompanionMetricValue } from "@akasha/temper-companions-core/companion-metrics"
import type { CompanionFormulaStats } from "@akasha/temper-companions-core/companion-skill-formula"
import type { CompanionSkillSlotId } from "@akasha/temper-companions-core/companion-skill-slots"
import type { CompanionSkillId } from "@akasha/temper-companions-core/companion-skills"
import type { RotationResult } from "@akasha/temper-companions-core/rotation-types"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { SkillBreakdownTable } from "../companion-rotation-breakdown-table/companion-rotation-breakdown-table.module.code.tsx"
import { getPrimaryRows } from "../companion-rotation-breakdown-types/companion-rotation-breakdown-types.module.code.ts"
import { deriveCompanionRotationOutcome } from "../companion-rotation-outcome/companion-rotation-outcome.module.code.ts"
import { useCompanion } from "../use-companion/use-companion.module.code.ts"
import { useCompanionStats } from "../use-companion-stats/use-companion-stats.module.code.ts"

interface CompanionRotationBreakdownPanelCardProps {
  className?: string
}

export function CompanionRotationBreakdownPanelCard({
  className,
}: CompanionRotationBreakdownPanelCardProps) {
  const build = useCompanion()
  const { rotation, isLoading, formulaStats, stats } = useCompanionStats()

  const hasCompanion = build.companion.id !== "no-companion"
  const hasSkills = Object.values(build.skills["skill-bar"]).some((id) => id !== "no-skill")

  return (
    <PanelCard id="companion-rotation" collapsible={true} title="Rotation" className={className}>
      {!hasCompanion ? (
        <Text>Select a companion to see rotation info.</Text>
      ) : !hasSkills ? (
        <Text>Slot skills to see rotation simulation.</Text>
      ) : isLoading ? (
        <RotationLoading />
      ) : !rotation ? (
        <Text>Unable to simulate rotation.</Text>
      ) : (
        <RotationContent
          rotation={rotation}
          formulaStats={formulaStats}
          metricStats={stats}
          skillBar={build.skills["skill-bar"]}
          roles={build.companion.baseRoles}
        />
      )}
    </PanelCard>
  )
}

function RotationLoading() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  )
}

interface RotationContentProps {
  rotation: RotationResult
  formulaStats: CompanionFormulaStats
  metricStats: Partial<Record<CompanionMetricId, CompanionMetricValue>>
  skillBar: Record<CompanionSkillSlotId, CompanionSkillId>
  roles: readonly CompanionBaseRoleId[]
}

function RotationContent({
  rotation,
  formulaStats,
  metricStats,
  skillBar,
  roles,
}: RotationContentProps) {
  const outcome = deriveCompanionRotationOutcome(rotation)

  switch (outcome) {
    case "nothing-simulated":
      return (
        <Text>
          None of the slotted skills are ones the rotation simulation runs. It skips passive skills
          and any skill it has no data for, and every slot on the bar fell into one of those. If
          these are normal active skills, the gap is in Temper's skill data, not in your setup.
        </Text>
      )
    case "no-damage-or-healing":
      return (
        <Text>
          The simulation ran your slotted skills and came back with no damage and no healing. A bar
          of pure buff, debuff, or taunt skills produces exactly that. If a skill here should be
          dealing damage or healing, the simulation is not reading it, and that is Temper's to fix.
        </Text>
      )
    case "breakdown":
      return (
        <SkillBreakdownTable
          summaries={rotation.skillSummaries}
          cycleDuration={rotation.config.cycleDuration}
          formulaStats={formulaStats}
          metricStats={metricStats}
          skillBar={skillBar}
          primaryRows={getPrimaryRows(roles)}
        />
      )
    default:
      return assertNever(outcome)
  }
}
