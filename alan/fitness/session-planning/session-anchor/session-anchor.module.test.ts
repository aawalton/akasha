import { expect, test } from "bun:test"
import {
  deriveAnchor,
  ROTATION_WINDOW,
  rankCandidates,
  type ScoredCandidate,
} from "./session-anchor.module.code.ts"

function candidate(slug: string, over: Partial<ScoredCandidate> = {}): ScoredCandidate {
  return {
    exerciseSlug: slug,
    title: slug,
    movementPattern: "h-push",
    secondaryPattern: null,
    muscleFocus: "push",
    laterality: "bilateral",
    skillCost: "moderate",
    isBallistic: false,
    equipment: "dumbbell",
    scores: { longevity: 0, energy: 0, functionality: 0, aesthetics: 0, blend: 0.5 },
    loadsLadder: [5, 10, 15],
    lastSessionSets: [],
    logged: true,
    sessionsLogged: 3,
    lastDayStr: "2026-07-20",
    priorDayStr: "2026-07-20",
    improvingRecently: true,
    ...over,
  }
}

function blend(slug: string, value: number, over: Partial<ScoredCandidate> = {}): ScoredCandidate {
  return candidate(slug, {
    scores: { longevity: 0, energy: 0, functionality: 0, aesthetics: 0, blend: value },
    ...over,
  })
}

const NEVER_LOGGED: Partial<ScoredCandidate> = {
  logged: false,
  sessionsLogged: 0,
  lastDayStr: null,
  priorDayStr: null,
}

test("no candidate anchors nothing", () => {
  const pick = deriveAnchor([])
  expect(pick.candidate).toBeNull()
  expect(pick.state).toBe("none")
})

test("a pattern with nothing logged introduces its best-scoring movement", () => {
  const pick = deriveAnchor([blend("low", 0.2, NEVER_LOGGED), blend("high", 0.9, NEVER_LOGGED)])
  expect(pick.state).toBe("novel")
  expect(pick.candidate?.exerciseSlug).toBe("high")
  expect(pick.rationale).toContain("high")
})

test("the anchor is the movement logged most, not the one scored best", () => {
  const pick = deriveAnchor([
    blend("scored-best", 0.99, { sessionsLogged: 1 }),
    blend("logged-most", 0.1, { sessionsLogged: 8 }),
  ])
  expect(pick.state).toBe("held")
  expect(pick.candidate?.exerciseSlug).toBe("logged-most")
})

test("an equal count is broken by the more recent day", () => {
  const pick = deriveAnchor([
    candidate("older", { lastDayStr: "2026-07-01" }),
    candidate("newer", { lastDayStr: "2026-07-20" }),
  ])
  expect(pick.candidate?.exerciseSlug).toBe("newer")
})

test("an equal count and day is broken by the blend", () => {
  const pick = deriveAnchor([blend("dim", 0.1), blend("bright", 0.8)])
  expect(pick.candidate?.exerciseSlug).toBe("bright")
})

test("a stalled anchor is held and flagged rather than swapped", () => {
  const pick = deriveAnchor([
    candidate("stalled", { improvingRecently: false }),
    blend("shiny", 0.99, NEVER_LOGGED),
  ])
  expect(pick.state).toBe("stalled-held")
  expect(pick.candidate?.exerciseSlug).toBe("stalled")
  expect(pick.rationale).toContain("stalled")
})

test("history outranks no history even where the unlogged one scores better", () => {
  const pick = deriveAnchor([blend("fresh", 0.99, NEVER_LOGGED), blend("known", 0.1)])
  expect(pick.candidate?.exerciseSlug).toBe("known")
})

const scoreOf = (one: ScoredCandidate): number => one.scores.blend

test("one candidate is ranked as itself", () => {
  const only = [blend("a", 0.5)]
  expect(rankCandidates(only, 7, 3, scoreOf).map((one) => one.exerciseSlug)).toEqual(["a"])
})

test("the ranking runs from the best score down", () => {
  const pool = [blend("mid", 0.5), blend("top", 0.9), blend("low", 0.1)]
  expect(rankCandidates(pool, 0, 0, scoreOf).map((one) => one.exerciseSlug)).toEqual([
    "top",
    "mid",
    "low",
  ])
})

test("the rotation reorders nothing where every score differs", () => {
  const pool = [blend("a", 0.9), blend("b", 0.5), blend("c", 0.1)]
  const first = rankCandidates(pool, 0, 0, scoreOf).map((one) => one.exerciseSlug)
  const later = rankCandidates(pool, 41, 2, scoreOf).map((one) => one.exerciseSlug)
  expect(later).toEqual(first)
})

test("the rotation turns tied candidates by the day and the slot", () => {
  const pool = [blend("a", 0.5), blend("b", 0.5), blend("c", 0.5)]
  const turned = new Set<string>()
  for (let daySeed = 0; daySeed < 6; daySeed += 1) {
    const ranked = rankCandidates(pool, daySeed, 0, scoreOf)
    const head = ranked[0]
    if (head !== undefined) turned.add(head.exerciseSlug)
  }
  expect(turned.size).toBeGreaterThan(1)
})

test("a negative seed still turns within the window", () => {
  const pool = [blend("a", 0.5), blend("b", 0.5)]
  const ranked = rankCandidates(pool, -3, 0, scoreOf)
  expect(ranked.length).toBe(2)
})

test("nothing beyond the rotation window is turned into it", () => {
  const pool = Array.from({ length: ROTATION_WINDOW + 3 }, (_, index) =>
    blend(`c${index}`, 1 - index * 0.01)
  )
  const ranked = rankCandidates(pool, 3, 1, scoreOf)
  expect(ranked.slice(ROTATION_WINDOW).map((one) => one.exerciseSlug)).toEqual(
    pool.slice(ROTATION_WINDOW).map((one) => one.exerciseSlug)
  )
})

test("nothing handed in is reordered", () => {
  const pool = [blend("a", 0.1), blend("b", 0.9)]
  rankCandidates(pool, 0, 0, scoreOf)
  expect(pool.map((one) => one.exerciseSlug)).toEqual(["a", "b"])
})
