export const TEMPER_TIERS = ["shared", "game", "player"] as const

export type TemperTier = (typeof TEMPER_TIERS)[number]

export const TIER_RANK_BY_TIER: Readonly<Record<TemperTier, number>> = {
  shared: 0,
  game: 1,
  player: 2,
}

const TEMPER_PREFIX = "packages/temper/"

export const TEMPER_COMPOSITION_ROOTS: readonly string[] = [
  "packages/temper/web",
  "packages/temper/scripts",
  "packages/temper/addons",
  "packages/temper/catalog/addon",
  "packages/temper/catalog/core",
]

export function isCompositionRoot(workspacePath: string): boolean {
  const normalized = workspacePath.replace(/\/+$/, "")
  return TEMPER_COMPOSITION_ROOTS.includes(normalized)
}

export function tierForWorkspacePath(workspacePath: string): TemperTier | null {
  const normalized = workspacePath.replace(/\/+$/, "")
  if (!normalized.startsWith(TEMPER_PREFIX)) return null
  const rest = normalized.slice(TEMPER_PREFIX.length)
  if (rest.length === 0) return null
  const segment = rest.split("/")[0]
  if (segment === undefined) return null
  return TEMPER_TIERS.find((tier) => tier === segment) ?? null
}
