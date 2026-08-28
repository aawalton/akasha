export const TEMPER_TIERS = ["shared", "game", "player"] as const

export type TemperTier = (typeof TEMPER_TIERS)[number]

export const TIER_RANK_BY_TIER: Readonly<Record<TemperTier, number>> = {
  shared: 0,
  game: 1,
  player: 2,
}

const TEMPER_PREFIX = "temper/"

export const TEMPER_COMPOSITION_ROOTS: readonly string[] = [
  "temper/web",
  "temper/scripts",
  "temper/addons",
  "temper/catalog-addon",
  "temper/catalog-core",
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
  const name = rest.split("/")[0]
  if (name === undefined) return null
  const word = name.split("-")[0]
  return TEMPER_TIERS.find((tier) => tier === word) ?? null
}
