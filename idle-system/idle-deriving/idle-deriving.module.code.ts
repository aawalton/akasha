import {
  AFFINITY_SEATS,
  DERIVED_RATE_MAX,
  DERIVED_RATE_MIN,
  SYNERGY_NEG_MAX,
  SYNERGY_NEG_MIN,
  SYNERGY_NEG_SHARE,
  SYNERGY_POS_MAX,
  SYNERGY_POS_MIN,
} from "../idle-constants/idle-constants.module.code.ts"
import type { GameState, SynergyMatrix } from "../idle-state/idle-state.module.code.ts"

export function hashContent(content: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < content.length; i++) {
    h ^= content.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h >>> 0
}

function mechanicUnit(content: string, mechanicKey: string): number {
  return hashContent(content + mechanicKey) / 4294967296
}

export function deriveBaseRate(content: string): number {
  const steps = (DERIVED_RATE_MAX - DERIVED_RATE_MIN) * 10 + 1
  const step = Math.min(steps - 1, Math.floor(mechanicUnit(content, "baseRate") * steps))
  return (DERIVED_RATE_MIN * 10 + step) / 10
}

export function deriveAffinity(content: string): "lead" | "support" | "anchor" {
  const idx = Math.min(2, Math.floor(mechanicUnit(content, "affinity") * AFFINITY_SEATS.length))
  return AFFINITY_SEATS[idx] ?? "lead"
}

export function deriveWeatherOrderKey(content: string): number {
  return mechanicUnit(content, "weatherOrder")
}

export function pairSynergyFromHashes(hashA: number, hashB: number): number {
  const lo = Math.min(hashA, hashB)
  const hi = Math.max(hashA, hashB)
  const u = hashContent(`${lo}+${hi}:synergy`) / 4294967296
  const value =
    u < SYNERGY_NEG_SHARE
      ? SYNERGY_NEG_MIN + (u / SYNERGY_NEG_SHARE) * (SYNERGY_NEG_MAX - SYNERGY_NEG_MIN)
      : SYNERGY_POS_MIN +
        ((u - SYNERGY_NEG_SHARE) / (1 - SYNERGY_NEG_SHARE)) * (SYNERGY_POS_MAX - SYNERGY_POS_MIN)
  return Math.round(value * 1000) / 1000
}

export type PersonaIdentity = {
  readonly slug: string
}

export type DerivedMechanics = {
  readonly rosterSlugs: readonly string[]
  readonly synergyMatrix: SynergyMatrix
  readonly rateBySlug: Record<string, number>
  readonly affinityBySlug: Record<string, "lead" | "support" | "anchor">
}

export function deriveMechanics(personas: readonly PersonaIdentity[]): DerivedMechanics {
  const hashBySlug: Record<string, number> = {}
  const rateBySlug: Record<string, number> = {}
  const affinityBySlug: Record<string, "lead" | "support" | "anchor"> = {}
  const orderKey: Record<string, number> = {}
  for (const p of personas) {
    hashBySlug[p.slug] = hashContent(p.slug)
    rateBySlug[p.slug] = deriveBaseRate(p.slug)
    affinityBySlug[p.slug] = deriveAffinity(p.slug)
    orderKey[p.slug] = deriveWeatherOrderKey(p.slug)
  }
  const rosterSlugs = personas
    .map((p) => p.slug)
    .toSorted((a, b) => {
      const byKey = (orderKey[a] ?? 0) - (orderKey[b] ?? 0)
      return byKey !== 0 ? byKey : a.localeCompare(b)
    })
  const synergyMatrix: SynergyMatrix = {}
  for (let i = 0; i < rosterSlugs.length; i++) {
    for (let j = i + 1; j < rosterSlugs.length; j++) {
      const a = rosterSlugs[i]
      const b = rosterSlugs[j]
      if (a === undefined || b === undefined) continue
      const key = [a, b].sort().join("+")
      synergyMatrix[key] = pairSynergyFromHashes(hashBySlug[a] ?? 0, hashBySlug[b] ?? 0)
    }
  }
  return { rosterSlugs, synergyMatrix, rateBySlug, affinityBySlug }
}

export function applyDerivedMechanics(s: GameState, d: DerivedMechanics): GameState {
  const teammates = s.teammates.map((t) => {
    const rate = d.rateBySlug[t.slug]
    if (rate === undefined) return t
    return { ...t, rate, affinity: d.affinityBySlug[t.slug] ?? t.affinity }
  })
  return { ...s, teammates, synergyMatrix: d.synergyMatrix, mechanicsRoster: d.rosterSlugs }
}
