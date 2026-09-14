import type {
  GameState,
  SynergyMatrix,
} from "akasha/alan/harness/idle-system/modules/idle-state/idle-state.module.code.ts"

export type DerivedMechanics = {
  readonly rosterSlugs: readonly string[]
  readonly synergyMatrix: SynergyMatrix
  readonly rateBySlug: Record<string, number>
  readonly affinityBySlug: Record<string, "lead" | "support" | "anchor">
}

export function applyDerivedMechanics(s: GameState, d: DerivedMechanics): GameState {
  const teammates = s.teammates.map((t) => {
    const rate = d.rateBySlug[t.slug]
    if (rate === undefined) return t
    return { ...t, rate, affinity: d.affinityBySlug[t.slug] ?? t.affinity }
  })
  return { ...s, teammates, synergyMatrix: d.synergyMatrix, mechanicsRoster: d.rosterSlugs }
}
