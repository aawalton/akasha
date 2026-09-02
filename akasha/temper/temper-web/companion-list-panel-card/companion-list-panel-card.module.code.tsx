import { Badge, BadgeRow } from "@akasha/design-badges/badge"
import { PanelCard } from "@akasha/design-layout/panel-card"
import { CardContent, CardHeader, CardTitle, CardTitleBadges } from "@akasha/design-primitives/card"
import { Text } from "@akasha/design-primitives/text-body"
import { PagesUILink as Link } from "@akasha/pages-ui/navigation-context"
import { companionUrl } from "@akasha/temper-build-support/build-url"
import {
  type CompanionBaseRoleId,
  getBaseRoleName,
} from "@akasha/temper-companions-core/companion-base-roles"
import { calculateCompanionStats } from "@akasha/temper-companions-core/companion-stats-calculator"
import type { CompanionStatsResult } from "@akasha/temper-companions-core/companion-stats-result"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { getWeaponRole } from "@akasha/temper-companions-core/companion-weapon-role-match"
import { companionWeaponRoles } from "@akasha/temper-companions-core/companion-weapon-roles"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { buildId } from "@akasha/temper-formula-framework/branded-id"

function getRolePrimaryStats(roles: readonly CompanionBaseRoleId[]): ReadonlySet<string> {
  const stats = new Set<string>()
  if (roles.includes("dps")) stats.add("Damage")
  if (roles.includes("healer")) stats.add("Healing")
  if (roles.includes("support")) stats.add("Support")
  if (roles.includes("tank")) stats.add("Toughness")
  return stats
}

interface CompanionListPanelCardBuild {
  id: string
  name: string
  description: string
  buildData: CompanionState | null
  createdAt: number
  updatedAt: number
  score: number
  userId: string
}

interface CompanionListPanelCardProps {
  build: CompanionListPanelCardBuild
  getCompanionName: (companionId: CompanionId) => string
  isOwnBuild: boolean
  isTarget: boolean
  userHandle: string | null
  precomputedStats?: CompanionStatsResult | null
}

export function CompanionListPanelCard({
  build,
  getCompanionName,
  isOwnBuild,
  isTarget,
  userHandle,
  precomputedStats,
}: CompanionListPanelCardProps) {
  const buildData = build.buildData

  const stats =
    precomputedStats !== undefined
      ? precomputedStats
      : buildData
        ? calculateCompanionStats(buildData)
        : null

  const roles = buildData?.companion?.baseRoles ?? []
  const weaponRoleId = buildData ? getWeaponRole(buildData) : "no-weapon-role"

  const allStats = [
    { name: "Damage", metricId: "companion-dps-total" as const },
    { name: "Healing", metricId: "companion-hps-total" as const },
    { name: "Support", metricId: "companion-support-score" as const },
    { name: "Toughness", metricId: "companion-tps-total" as const },
  ]

  const primaryNames = getRolePrimaryStats(roles)
  const relevantStats = allStats.filter((s) => primaryNames.has(s.name))

  return (
    <Link
      href={`${companionUrl(buildId(build.id), build.name)}?tab=companion`}
      className="block w-full min-[520px]:w-auto"
    >
      <PanelCard
        id={`companion-${build.id}`}
        key={build.id}
        className="group h-[232px] cursor-pointer justify-between transition-colors"
      >
        <CardHeader className="flex-col items-stretch pb-3">
          <CardTitle className="text-lg">
            {build.name !== "" ? build.name : "Untitled Build"}
            <CardTitleBadges>
              {!isOwnBuild && userHandle != null && <Badge variant="accent">{userHandle}</Badge>}
              {isOwnBuild && <Badge variant="accent">My Build</Badge>}
              {isTarget && <Badge variant="elevation-muted">Target</Badge>}
            </CardTitleBadges>
          </CardTitle>
          <BadgeRow>
            {buildData?.companion?.id != null && buildData.companion.id !== "no-companion" && (
              <Badge variant="elevation-muted">{getCompanionName(buildData.companion.id)}</Badge>
            )}
            {roles.length > 0 && <Badge variant="elevation-muted">{getBaseRoleName(roles)}</Badge>}
            {weaponRoleId !== "no-weapon-role" && (
              <Badge variant="elevation-muted">
                {companionWeaponRoles.data[weaponRoleId].name}
              </Badge>
            )}
          </BadgeRow>
          <BadgeRow>
            <Badge variant="accent" className="font-semibold">
              <span>Score</span>
              <span className="font-mono">{Math.round(build.score).toLocaleString()}</span>
            </Badge>
            {relevantStats.map((metric) => {
              const value = stats?.metrics[metric.metricId]?.value ?? 0
              return (
                <Badge key={metric.metricId} variant="elevation-muted">
                  <span className="text-secondary">{metric.name}</span>
                  <span className="font-mono">{value.toLocaleString()}</span>
                </Badge>
              )
            })}
          </BadgeRow>
        </CardHeader>
        <CardContent className="space-y-4">
          {build.description !== "" && <Text className="line-clamp-2">{build.description}</Text>}
          <Text variant="caption" as="div">
            {build.createdAt === build.updatedAt ? "Created" : "Updated"}{" "}
            {new Date(build.updatedAt).toLocaleDateString()}
          </Text>
        </CardContent>
      </PanelCard>
    </Link>
  )
}
