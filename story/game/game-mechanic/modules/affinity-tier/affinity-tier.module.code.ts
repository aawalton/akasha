export type Tier = {
  readonly rank: string
  readonly cap: number
}

export const AFFINITY_TIERS: readonly Tier[] = [
  { rank: "affinity", cap: 10 },
  { rank: "manipulation", cap: 50 },
  { rank: "spirit", cap: 250 },
  { rank: "soul", cap: 1000 },
]

export const AFFINITY_RANKS: readonly string[] = AFFINITY_TIERS.map((one) => one.rank)

export function tierIndexAt(rank: string): number {
  return AFFINITY_TIERS.findIndex((one) => one.rank === rank)
}
