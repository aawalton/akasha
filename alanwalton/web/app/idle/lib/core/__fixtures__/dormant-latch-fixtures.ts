/**
 * Shared fixtures for the dormant-latch byte-identity suite (#13271,
 * re-anchored #13391). Extracted from `dormant-latch.unit.test.ts` so the
 * DORMANCY / RATE-UNCHANGED invariants and the UNLOCKED-MATH invariants can
 * live in separate test files under the 500-line code-file cap while sharing
 * one roster/ladder construction (no drift between the two suites).
 */

import { withLatches } from "../accrual"
import { MECHANICS } from "../constants"
import { type GachaGirl, type GachaState, type GameState, type SynergyMatrix, type Teammate } from "../types"

// The 20 dormant mechanics: every entry in the canonical MECHANICS table gated
// ABOVE the ★13 baseline fixture (`ladderState(13)`), where the 4 lower-gated
// mechanics — weather ★1 / affinity ★6 / fourthSeat ★8 / mastery ★10 — are
// already unlocked. Deriving the set + each gate from MECHANICS means the guard
// (the test) and the guarded (`withLatches` / `STAR_GATE_LADDER`) share ONE
// source and can no longer drift. Each `flag` is a key of GameState (cast-free).
export const DORMANT = MECHANICS.filter((m) => m.stars > 13)

// Full-default Teammate so call sites stay cast-free. No `owned` — unlock lives in the roster.
export function tm(over: Partial<Teammate> & { slug: string }): Teammate {
  return {
    name: over.slug,
    color: "#fff",
    portrait: "p",
    flavor: "f",
    cost: 0,
    rate: 1,
    rank: 1,
    level: null,
    stage: "s",
    ...over,
  }
}

// A gacha roster (#13391) unlocking exactly the given slugs at 0★/empty (every
// gacha lever identity) — the single unlock signal in the unified model.
export function rosterState(slugs: readonly string[]): GachaState {
  const girls: Record<string, GachaGirl> = {}
  for (const slug of slugs) girls[slug] = { stars: 0, dupeProgress: 0, images: [] }
  return { girls, cycleDraws: 0 }
}

// Minimal GameState; override spread last. Every teammate passed is UNLOCKED by
// default (a 0★ roster entry per slug); pass explicit `gacha` to override.
export function gs(over: Partial<GameState>): GameState {
  const base: GameState = {
    resource: 0,
    teammates: [],
    lastTickAt: 0,
    gacha: rosterState((over.teammates ?? []).map((t) => t.slug)),
  }
  return { ...base, ...over }
}

// Local six-girl fixture. The production values are identity-DERIVED (#14092 —
// no per-persona constants remain in code); the byte-identity invariants here
// are structural (gating, not specific values), so plain test literals carry
// them. `TEST_SYNERGY` keeps the two edges the unlocked-math tests exercise:
// one positive (abby+ali, the bloom hot pair) and exactly one negative
// (aine+aura, the friction pair eclipse neutralizes).
export const TEST_SLUGS = ["aura", "abby", "aelwyn", "ali", "aine", "amy"] as const
const TEST_AFFINITY: Record<string, "lead" | "support" | "anchor"> = {
  aura: "lead",
  abby: "support",
  aelwyn: "anchor",
  ali: "support",
  aine: "lead",
  amy: "anchor",
}
export const TEST_TEAMMATES: readonly Teammate[] = TEST_SLUGS.map((slug) =>
  tm({ slug, rate: 10, affinity: TEST_AFFINITY[slug] })
)
export const TEST_SYNERGY: SynergyMatrix = { "abby+ali": 0.25, "aine+aura": -0.1 }

// A test-roster state at a given star level, latches folded as the server persists.
export function ladderState(stars: number): GameState {
  return withLatches(
    gs({
      teammates: [...TEST_TEAMMATES],
      legacyStars: stars,
      synergyMatrix: TEST_SYNERGY,
      mechanicsRoster: TEST_SLUGS,
      activeTeam: ["aura", "aelwyn", "abby"],
    })
  )
}
