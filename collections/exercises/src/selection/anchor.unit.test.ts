import { describe, expect, test } from "bun:test"
import { deriveAnchor, rankCandidates, type ScoredCandidate } from "./anchor"

function cand(id: string, blend: number, over: Partial<ScoredCandidate> = {}): ScoredCandidate {
  return {
    id,
    name: id,
    movementPattern: "h-push",
    secondaryPattern: null,
    muscleFocus: "push",
    laterality: "bilateral",
    skillCost: "moderate",
    isBallistic: false,
    equipment: "dumbbell",
    scores: { longevity: 0, energy: 0, functionality: 0, aesthetics: 0, blend },
    loadsLadder: [],
    lastSessionSets: [],
    logged: false,
    sessionsLogged: 0,
    lastDayStr: null,
    priorDayStr: null,
    improvingRecently: true,
    ...over,
  }
}

describe("deriveAnchor", () => {
  test("no candidates → none", () => {
    const a = deriveAnchor([])
    expect(a.candidate).toBeNull()
    expect(a.state).toBe("none")
  })

  test("no history for the pattern → introduce the top-ranked movement (novel)", () => {
    const a = deriveAnchor([cand("low", 0.4), cand("top", 0.7)])
    expect(a.state).toBe("novel")
    expect(a.candidate?.id).toBe("top")
  })

  test("holds the most-logged movement while it is still progressing", () => {
    const a = deriveAnchor([
      cand("bench", 0.5, { logged: true, sessionsLogged: 5, improvingRecently: true }),
      cand("higher-blend", 0.9),
    ])
    expect(a.state).toBe("held")
    expect(a.candidate?.id).toBe("bench")
  })

  test("most-logged wins over a more-recent-but-less-logged movement", () => {
    const a = deriveAnchor([
      cand("often", 0.5, { logged: true, sessionsLogged: 6, lastDayStr: "2026-06-01" }),
      cand("recent", 0.5, { logged: true, sessionsLogged: 2, lastDayStr: "2026-07-20" }),
    ])
    expect(a.candidate?.id).toBe("often")
  })

  test("a stalled anchor is HELD and flagged, never auto-swapped (protects the measurement lift)", () => {
    const a = deriveAnchor([
      cand("stalled", 0.5, { logged: true, sessionsLogged: 5, improvingRecently: false }),
      cand("cousin", 0.8),
    ])
    expect(a.state).toBe("stalled-held")
    expect(a.candidate?.id).toBe("stalled")
  })
})

describe("rankCandidates", () => {
  const blend = (c: ScoredCandidate): number => c.scores.blend
  const pool = [cand("a", 0.9), cand("b", 0.8), cand("c", 0.7)]

  test("the score decides the lead, whatever the day — the seed is no longer a positional picker", () => {
    for (const daySeed of [0, 1, 2, 3, 4, 5, 20659]) {
      expect(rankCandidates(pool, daySeed, 0, blend)[0]?.id).toBe("a")
    }
  })

  test("distinct scores rank strictly, so the whole order is day-independent", () => {
    expect(rankCandidates(pool, 0, 0, blend).map((c) => c.id)).toEqual(["a", "b", "c"])
    expect(rankCandidates(pool, 3, 1, blend).map((c) => c.id)).toEqual(["a", "b", "c"])
  })

  test("the seed still varies EXACT ties by day — reproducible variety where score cannot discriminate", () => {
    const tied = [cand("x", 0.5), cand("y", 0.5), cand("z", 0.5)]
    expect(rankCandidates(tied, 0, 0, blend).map((c) => c.id)).toEqual(["x", "y", "z"])
    expect(rankCandidates(tied, 1, 0, blend).map((c) => c.id)).toEqual(["y", "z", "x"])
    expect(rankCandidates(tied, 2, 0, blend).map((c) => c.id)).toEqual(["z", "x", "y"])
    expect(rankCandidates(tied, 5, 1, blend).map((c) => c.id)).toEqual(
      rankCandidates(tied, 5, 1, blend).map((c) => c.id)
    )
  })

  test("a tie-break never lifts a tied candidate over a strictly better one", () => {
    const mixed = [cand("best", 0.9), cand("x", 0.5), cand("y", 0.5)]
    for (const daySeed of [0, 1, 2, 3, 4]) {
      expect(rankCandidates(mixed, daySeed, 0, blend)[0]?.id).toBe("best")
    }
  })

  test("ranks by the supplied score, not by blend — the recency-adjusted objective", () => {
    const bonusFor: Record<string, number> = { a: 0, b: 0, c: 0.25 }
    const effective = (c: ScoredCandidate): number => c.scores.blend + (bonusFor[c.id] ?? 0)
    expect(rankCandidates(pool, 0, 0, effective).map((c) => c.id)).toEqual(["c", "a", "b"])
  })

  test("the weaker tail beyond the rotation window stays in score order", () => {
    const big = [
      cand("a", 0.9),
      cand("b", 0.8),
      cand("c", 0.7),
      cand("d", 0.6),
      cand("e", 0.5),
      cand("tail", 0.1),
    ]
    expect(rankCandidates(big, 3, 0, blend)[5]?.id).toBe("tail")
  })
})
