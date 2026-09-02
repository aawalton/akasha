import { companionBaseRoles } from "../companion-base-roles/companion-base-roles.module.code.ts"
import { evaluate } from "../companion-optimizer/companion-optimizer.module.code.ts"
import { calculateCompanionStats } from "../companion-stats-calculator/companion-stats-calculator.module.code.ts"
import type { CompanionStatsResult } from "../companion-stats-result/companion-stats-result.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import { type CompanionId, companions } from "../companions/companions.module.code.ts"

export interface DecodedBuild {
  id: string
  userId: string
  visibility: string
  createdAt: number
  updatedAt: number
  name: string
  description: string
  buildData: CompanionState | null
}

export interface Build {
  id: string
  buildData: CompanionState | null
  visibility: string
}

export function getBuildScore(buildData: CompanionState): number {
  if (buildData.companion.baseRoles.includes("support")) {
    return evaluate(buildData)
  }
  const stats = calculateCompanionStats(buildData)
  return stats.metrics["companion-score"]?.value ?? 0
}

const DISPLAY_ROLE_ORDER: readonly string[] = companionBaseRoles.ids

export function mapBaseRolesToDisplayRoles(baseRoles: readonly string[]): readonly string[] {
  return [...new Set(baseRoles)].sort()
}

export function displayRoleComboKey(displayRoles: readonly string[]): string {
  return [...displayRoles].sort().join("+")
}

export function compareDisplayRoleCombos(a: readonly string[], b: readonly string[]): number {
  if (a.length !== b.length) return a.length - b.length
  return displayRoleComboKey(a).localeCompare(displayRoleComboKey(b))
}

export function displayRolesToLabel(displayRoles: readonly string[]): string {
  return [...displayRoles]
    .sort((a, b) => DISPLAY_ROLE_ORDER.indexOf(a) - DISPLAY_ROLE_ORDER.indexOf(b))
    .map((role) => (companionBaseRoles.has(role) ? companionBaseRoles.data[role].name : role))
    .join(" + ")
}

export function displayRolesToAbbreviation(displayRoles: readonly string[]): string {
  return [...displayRoles]
    .sort((a, b) => DISPLAY_ROLE_ORDER.indexOf(a) - DISPLAY_ROLE_ORDER.indexOf(b))
    .map((role) =>
      companionBaseRoles.has(role)
        ? companionBaseRoles.data[role].abbreviation
        : role.charAt(0).toUpperCase()
    )
    .join("")
}

export function buildOverallRankMap(builds: readonly Build[]): Map<CompanionId, number> {
  const roleSetBuilds = new Map<string, { bestByCompanion: Map<CompanionId, number> }>()

  for (const build of builds) {
    if (!build.buildData) continue
    if (build.visibility !== "public") continue
    if (build.buildData.companion.id === "no-companion") continue
    if (build.buildData.companion.baseRoles.length === 0) continue

    const key = [...build.buildData.companion.baseRoles].sort().join(",")

    let entry = roleSetBuilds.get(key)
    if (!entry) {
      entry = { bestByCompanion: new Map() }
      roleSetBuilds.set(key, entry)
    }

    const companionId = build.buildData.companion.id
    const score = getBuildScore(build.buildData)
    const existing = entry.bestByCompanion.get(companionId)
    if (existing === undefined || score > existing) {
      entry.bestByCompanion.set(companionId, score)
    }
  }

  const categoryResults: { rankMap: Map<CompanionId, number>; defaultRank: number }[] = []

  for (const [, { bestByCompanion }] of roleSetBuilds) {
    if (bestByCompanion.size === 0) continue

    const sorted = [...bestByCompanion.entries()].sort((a, b) => b[1] - a[1])
    const rankMap = new Map<CompanionId, number>()
    for (const [i, [companionId]] of sorted.entries()) {
      rankMap.set(companionId, i + 1)
    }

    categoryResults.push({ rankMap, defaultRank: sorted.length + 1 })
  }

  if (categoryResults.length === 0) return new Map()

  const allCompanionIds = new Set<CompanionId>()
  for (const { rankMap } of categoryResults) {
    for (const companionId of rankMap.keys()) {
      allCompanionIds.add(companionId)
    }
  }

  const totals: { companionId: CompanionId; total: number }[] = [...allCompanionIds].map(
    (companionId) => {
      let total = 0
      for (const { rankMap, defaultRank } of categoryResults) {
        total += rankMap.get(companionId) ?? defaultRank
      }
      return { companionId, total }
    }
  )

  totals.sort((a, b) => a.total - b.total)

  const result = new Map<CompanionId, number>()
  for (const [i, { companionId }] of totals.entries()) {
    result.set(companionId, i + 1)
  }

  return result
}

export interface RankedEntry {
  companionId: CompanionId
  companionName: string
  buildId: string
  buildName: string
  rank: number
  score: number
  metrics: Record<string, number>
}

export type ComboRankingsMap = Map<string, RankedEntry[]>

export function buildRankingsMap(
  builds: readonly Build[],
  targetArmor: string | null,
  targetCount: string | null,
  targetHealth: string | null
): ComboRankingsMap {
  const comboBuilds = new Map<string, { displayRoles: readonly string[]; builds: Build[] }>()

  for (const build of builds) {
    if (!build.buildData) continue
    if (build.visibility !== "public") continue
    if (build.buildData.companion.id === "no-companion") continue
    if (build.buildData.companion.baseRoles.length === 0) continue

    const displayRoles = mapBaseRolesToDisplayRoles(build.buildData.companion.baseRoles)
    if (displayRoles.length === 0) continue
    const key = displayRoleComboKey(displayRoles)

    let entry = comboBuilds.get(key)
    if (!entry) {
      entry = { displayRoles, builds: [] }
      comboBuilds.set(key, entry)
    }
    entry.builds.push(build)
  }

  const result: ComboRankingsMap = new Map()

  for (const [key, { displayRoles, builds: comboEntries }] of comboBuilds) {
    const isDps = displayRoles.includes("dps")

    const filtered = comboEntries.filter((build) => {
      if (!build.buildData || !isDps) return true
      if (targetArmor != null && build.buildData.target.armor !== targetArmor) return false
      if (targetCount != null) {
        const buildCount = build.buildData.target.targetCount ?? 1
        if (targetCount === "1" && buildCount !== 1) return false
        if (targetCount === "3" && buildCount === 1) return false
      }
      if (targetHealth != null) {
        const buildHealth = build.buildData.target.targetHealth ?? "full"
        if (buildHealth !== targetHealth) return false
      }
      return true
    })

    const bestByCompanion = new Map<
      CompanionId,
      { buildId: string; buildName: string; buildData: CompanionState; score: number }
    >()

    for (const build of filtered) {
      if (!build.buildData) continue
      const companionId = build.buildData.companion.id
      const score = getBuildScore(build.buildData)

      const existing = bestByCompanion.get(companionId)
      if (!existing || score > existing.score) {
        bestByCompanion.set(companionId, {
          buildId: build.id,
          buildName: build.buildData.name,
          buildData: build.buildData,
          score,
        })
      }
    }

    const entries: RankedEntry[] = []
    for (const [companionId, { buildId, buildName, buildData, score }] of bestByCompanion) {
      const stats = calculateCompanionStats(buildData)
      const metrics: Record<string, number> = {}
      for (const [metricId, metricValue] of Object.entries(stats.metrics)) {
        if (metricValue) {
          metrics[metricId] = metricValue.value
        }
      }
      entries.push({
        companionId,
        companionName: companions.data[companionId].name,
        buildId,
        buildName,
        rank: 0,
        score,
        metrics,
      })
    }

    entries.sort((a, b) => b.score - a.score)
    for (const [i, entry] of entries.entries()) {
      entry.rank = i + 1
    }

    if (entries.length > 0) {
      result.set(key, entries)
    }
  }

  return result
}

export function getBuildScoreAndStats(buildData: CompanionState): {
  score: number
  stats: CompanionStatsResult
} {
  if (buildData.companion.baseRoles.includes("support")) {
    const score = evaluate(buildData)
    const stats = calculateCompanionStats(buildData)
    return { score, stats }
  }

  const stats = calculateCompanionStats(buildData)
  return { score: stats.metrics["companion-score"]?.value ?? 0, stats }
}

export function getBuildScoreWithAllRolesFallback(buildData: CompanionState): number {
  if (buildData.companion.baseRoles.length > 0) return getBuildScore(buildData)
  const withAllRoles: CompanionState = {
    ...buildData,
    companion: {
      ...buildData.companion,
      baseRoles: [...companionBaseRoles.ids],
    },
  }
  return getBuildScore(withAllRoles)
}
