import { describe, expect, test } from "bun:test"
import scratchState from "../__fixtures__/scratch-state.json"
import { type IdleSave, parseIdleSave } from "../idle-save"
import { normalizeGameState, sumOwnedRanks } from "./accrual"
import { isUnlocked } from "./gacha/state"
import { effectiveRate, totalRate } from "./rate"
import { type GameState } from "./types"

function legacyShapeOf(unified: IdleSave): Record<string, unknown> {
  const teammates = unified.teammates.map((t) => ({ ...t, owned: true }))
  const rest: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(unified)) if (k !== "gacha") rest[k] = v
  return { ...rest, teammates }
}

function reload(s: GameState): GameState {
  return normalizeGameState(parseIdleSave(JSON.parse(JSON.stringify(s))))
}

describe("unified migration (#13391) — dual→roster, progression-preserving", () => {
  const unifiedSave = parseIdleSave(scratchState)
  const legacySave = parseIdleSave(legacyShapeOf(unifiedSave))
  const migrated = normalizeGameState(legacySave)
  const fromUnified = normalizeGameState(unifiedSave)

  test("migrating the legacy shape lands EXACTLY on the re-baselined canonical state", () => {
    expect(migrated).toEqual(fromUnified)
  })

  test("every previously-owned teammate is unlocked via the roster, at 0★/empty", () => {
    expect(Object.keys(migrated.gacha.girls).sort()).toEqual(
      migrated.teammates.map((t) => t.slug).sort()
    )
    for (const t of migrated.teammates) {
      expect(isUnlocked(migrated, t.slug)).toBe(true)
      expect(migrated.gacha.girls[t.slug]).toEqual({ stars: 0, dupeProgress: 0, images: [] })
    }
  })

  test("the legacy `owned` flag is stripped from every teammate", () => {
    for (const t of migrated.teammates) {
      expect(Object.hasOwn(t, "owned")).toBe(false)
    }
  })

  test("earned progression comes through the migration unchanged", () => {
    expect(migrated.teammates.map((t) => [t.slug, t.rank])).toEqual(
      legacySave.teammates.map((t) => [t.slug, t.rank])
    )
    expect(migrated.legacyStars).toBe(20)
    expect(migrated.prestigeUnlocked).toBe(true)
    expect(migrated.activeTeam).toEqual(["amy", "aine", "ali"])
    expect(migrated.peakTeamRate).toBe(34529.2857)
  })

  test("the rate is byte-identical across the collapse (authorized re-baseline did not move it)", () => {
    expect(totalRate(migrated)).toBe(totalRate(fromUnified))
  })

  test("idempotent + reversible-by-recompute: a second normalize pass is a fixpoint", () => {
    expect(reload(migrated)).toEqual(migrated)
    expect(normalizeGameState(parseIdleSave(JSON.parse(JSON.stringify(migrated))))).toEqual(
      migrated
    )
  })
})

describe("zero-index rank re-index (#15553) — one-shot, floored, stamped", () => {
  function unstampedSave(ranks: readonly number[]): IdleSave {
    return parseIdleSave({
      resource: 0,
      lastTickAt: 0,
      teammates: ranks.map((rank, i) => ({
        slug: `p${i}`,
        name: `p${i}`,
        color: "#fff",
        portrait: "p",
        flavor: "f",
        cost: 0,
        rate: 10,
        rank,
        level: null,
        stage: "s",
      })),
      gacha: {
        girls: Object.fromEntries(
          ranks.map((_, i) => [`p${i}`, { stars: 0, dupeProgress: 0, images: [] }])
        ),
        cycleDraws: 0,
      },
    })
  }

  test("each teammate rank is decremented once (floored at 0) and the save is stamped", () => {
    const migrated = normalizeGameState(unstampedSave([1, 2, 10, 11]))
    expect(migrated.teammates.map((t) => t.rank)).toEqual([0, 1, 9, 10])
    expect(migrated.ranksZeroIndexed).toBe(true)
  })

  test("a fresh 1-indexed persona (rank 1) becomes rank 0 — the free starting rank is removed", () => {
    expect(normalizeGameState(unstampedSave([1])).teammates[0]?.rank).toBe(0)
  })

  test("idempotent: a second normalize does NOT decrement again (the stamp guards it)", () => {
    const once = normalizeGameState(unstampedSave([1, 10]))
    const twice = reload(once)
    expect(once.teammates.map((t) => t.rank)).toEqual([0, 9])
    expect(twice.teammates.map((t) => t.rank)).toEqual([0, 9])
  })

  test("an already-stamped (zero-indexed) save is never decremented", () => {
    const stamped = parseIdleSave({ ...unstampedSave([5]), ranksZeroIndexed: true })
    expect(normalizeGameState(stamped).teammates[0]?.rank).toBe(5)
  })

  test("acceptance: 10 personas × 10 purchased ranks totals exactly 100 (was 110 with the free rank)", () => {
    const migrated = normalizeGameState(unstampedSave(Array.from({ length: 10 }, () => 11)))
    expect(sumOwnedRanks(migrated)).toBe(100)
  })

  test("a fresh (rank 0) persona contributes 0 to the total and earns nothing", () => {
    const migrated = normalizeGameState(unstampedSave([1]))
    const fresh = migrated.teammates[0]
    if (fresh === undefined) throw new Error("expected a teammate")
    expect(sumOwnedRanks(migrated)).toBe(0)
    expect(effectiveRate(fresh)).toBe(0)
  })
})
