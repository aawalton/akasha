import { describe, expect, test } from "bun:test"
import type { ScoredCandidate } from "./anchor"
import { selectSession } from "./selector"
import { cand, inputs, set, unfilled } from "./selector-fixtures"
import {
  FOCUS_TEMPLATES,
  NATIVE_PATTERN_BY_ROLE,
  NATIVE_PATTERNS,
} from "./slot-templates"

const PUSH_POOL: readonly ScoredCandidate[] = [
  cand("DB Bench Press", "h-push", 0.55, {
    sessionsLogged: 4,
    lastSessionSets: [set(30, 15), set(30, 15), set(30, 15)],
  }),
  cand("DB Incline Press", "v-push", 0.48, { lastSessionSets: [set(20, 12), set(20, 12)] }),
  cand("DB Floor Press", "h-push", 0.45, { logged: false, sessionsLogged: 0, lastDayStr: null }),
  cand("DB Lateral Raise", "isolation-other", 0.3, { lastSessionSets: [set(10, 15), set(10, 15)] }),
  cand("Dead Bug", "core-anti-extension", 0.35, {
    equipment: "body only",
    loadsLadder: [],
    lastSessionSets: [set(null, 12)],
  }),
  cand("Treadmill Walk", "conditioning", 0.4, { lastSessionSets: [] }),
  cand("DB Squeeze Press", "h-push", 0.2),
]

describe("selectSession — worked push day (regression pin)", () => {
  const { plan, envelope } = selectSession(inputs(PUSH_POOL))

  test("emits the six-slot ordered plan in role order", () => {
    expect(plan.focus).toBe("push")
    expect(plan.slots.map((s) => s.role)).toEqual([
      "anchor",
      "accessory",
      "accessory",
      "accessory",
      "accessory",
      "conditioning",
    ])
    expect(plan.slots.map((s) => s.exerciseName)).toEqual([
      "DB Bench Press",
      "DB Incline Press",
      "DB Floor Press",
      "DB Lateral Raise",
      "Dead Bug",
      "Treadmill Walk",
    ])
    expect(unfilled(envelope)).toEqual([])
  })

  test("the anchor is the logged, progressing movement, held despite a fresh alternative", () => {
    const anchor = envelope.decisions[0]
    expect(anchor?.exerciseName).toBe("DB Bench Press")
    expect(anchor?.anchorState).toBe("held")
    expect(anchor?.rulesFired).toContain("anchor:held")
    expect(anchor?.rejected.length).toBeGreaterThan(0)
  })

  test("the anchor at the load ceiling fires the coarse-jump guard (hold + extend reps)", () => {
    const anchor = plan.slots[0]
    expect(anchor?.progression.action).toBe("hold-extend-reps")
    expect(anchor?.progression.coarseJumpGuardFired).toBe(true)
    expect(anchor?.progression.prescribedLoad).toBe(30)
    expect(anchor?.targetSets).toBe(4)
    expect(anchor?.targetRir).toBe(2)
    expect(plan.slots[0]?.progression.action).toBe("hold-extend-reps")
  })

  test("the v-push accessory beats reps at the same load", () => {
    expect(plan.slots[1]?.progression.action).toBe("beat-reps")
    expect(plan.slots[1]?.progression.prescribedLoad).toBe(20)
  })

  test("exactly one novel movement is introduced, honoring the ≤1-novel cap", () => {
    const floor = envelope.decisions[2]
    expect(floor?.exerciseName).toBe("DB Floor Press")
    expect(floor?.rulesFired).toContain("novelty:novel(1/1)")
    expect(floor?.progression.action).toBe("introduce")
    const novelPicks = envelope.decisions.filter((d) =>
      d.rulesFired.some((r) => r.startsWith("novelty:novel"))
    )
    expect(novelPicks).toHaveLength(1)
  })

  test("the isolation accessory adds load when the next increment is reachable", () => {
    expect(plan.slots[3]?.progression.action).toBe("increase-load")
    expect(plan.slots[3]?.progression.prescribedLoad).toBe(15)
  })

  test("coverage repair fires for the uncovered core-anti bucket, not for already-covered push patterns", () => {
    const deadBug = envelope.decisions[4]
    expect(deadBug?.exerciseName).toBe("Dead Bug")
    expect(deadBug?.rulesFired).toContain("coverage-repair:core-anti-extension")
    const floor = envelope.decisions[2]
    expect(floor?.rulesFired.some((r) => r.startsWith("coverage-repair"))).toBe(false)
  })

  test("the conditioning finisher is time-based (no rep range, no load progression)", () => {
    const finisher = plan.slots[5]
    expect(finisher?.role).toBe("conditioning")
    expect(finisher?.repRangeLow).toBe(0)
    expect(finisher?.repRangeHigh).toBe(0)
    expect(finisher?.progression.prescribedLoad).toBeNull()
  })

  test("the envelope carries the week coverage and the settled weights", () => {
    expect(envelope.coverage.gaps).toHaveLength(7)
    expect(envelope.weights).toEqual({
      longevity: 40,
      energy: 30,
      functionality: 20,
      aesthetics: 10,
    })
    expect(envelope.decisions).toHaveLength(6)
  })
})

describe("selectSession — novelty cap across the session", () => {
  test("a second novel-only slot is left unfilled once the cap is spent", () => {
    const pool = [
      cand("Anchor Press", "h-push", 0.6),
      cand("Novel VPull", "v-pull", 0.5, { logged: false, sessionsLogged: 0, lastDayStr: null }),
      cand("Novel VPush", "v-push", 0.5, { logged: false, sessionsLogged: 0, lastDayStr: null }),
      cand("Novel HPull", "h-pull", 0.5, { logged: false, sessionsLogged: 0, lastDayStr: null }),
    ]
    const { envelope } = selectSession(inputs(pool, { focus: "upper" }))
    const novelPicks = envelope.decisions.filter((d) =>
      d.rulesFired.some((r) => r.startsWith("novelty:novel"))
    )
    expect(novelPicks.length).toBeLessThanOrEqual(1)
  })
})

describe("selectSession — mobility never fills a strength slot", () => {
  const MOBILITY_POOL: readonly ScoredCandidate[] = [
    cand("Cat Stretch", "mobility", 0.99),
    cand("Pullups", "v-pull", 0.6),
    cand("DB Row", "h-pull", 0.5),
    cand("DB Curl", "isolation-other", 0.4, { muscleFocus: "pull" }),
  ]

  test("the top-scoring mobility movement never reaches a pull anchor or accessory", () => {
    const { plan, envelope } = selectSession(inputs(MOBILITY_POOL, { focus: "pull" }))
    expect(plan.slots.map((s) => s.movementPattern)).not.toContain("mobility")
    expect(plan.slots.map((s) => s.exerciseName)).not.toContain("Cat Stretch")
    expect(envelope.decisions.map((d) => d.exerciseName)).not.toContain("Cat Stretch")
  })

  test("the strength slots take the next-best non-mobility candidate, or report unfilled", () => {
    const { plan, envelope } = selectSession(inputs(MOBILITY_POOL, { focus: "pull" }))
    expect(plan.slots.map((s) => s.exerciseName)).toEqual(["Pullups", "DB Row", "DB Curl"])
    expect(plan.slots[0]?.role).toBe("anchor")
    expect(unfilled(envelope)).toContain("accessory:v-pull|h-pull")
  })
})

describe("selectSession — a mobility slot accepts a mobility movement", () => {
  const FLEX_POOL: readonly ScoredCandidate[] = [
    cand("Cat Stretch", "mobility", 0.6, {
      equipment: "body only",
      loadsLadder: [],
      lastSessionSets: [set(null, 10)],
    }),
    cand("Thoracic Bridge", "mobility", 0.5, {
      equipment: "body only",
      loadsLadder: [],
      lastSessionSets: [set(null, 10)],
    }),
  ]

  test("the flex focus fills both mobility slots with mobility-pattern movements", () => {
    const { plan, envelope } = selectSession(inputs(FLEX_POOL, { focus: "flex" }))
    expect(plan.slots.map((s) => s.role)).toEqual(["mobility", "mobility"])
    expect(plan.slots.map((s) => s.movementPattern)).toEqual(["mobility", "mobility"])
    expect(plan.slots.map((s) => s.exerciseName).sort()).toEqual(["Cat Stretch", "Thoracic Bridge"])
    expect(unfilled(envelope)).toEqual([])
  })

  test("the mobility slots admit their native pattern and nothing else", () => {
    const { envelope } = selectSession(inputs(FLEX_POOL, { focus: "flex" }))
    expect(envelope.decisions.map((d) => d.slotPatterns)).toEqual([["mobility"], ["mobility"]])
  })
})

describe("selectSession — role-native patterns lock in both directions", () => {
  test("every native-role slot in every template lists exactly its native pattern", () => {
    for (const [focus, slots] of Object.entries(FOCUS_TEMPLATES)) {
      for (const slot of slots) {
        const native = NATIVE_PATTERN_BY_ROLE[slot.role]
        if (native === undefined) continue
        expect({ focus, patterns: slot.patterns }).toEqual({ focus, patterns: [native] })
      }
    }
  })

  test("no strength slot in any template lists a native pattern as a fallback", () => {
    for (const [focus, slots] of Object.entries(FOCUS_TEMPLATES)) {
      for (const slot of slots) {
        if (NATIVE_PATTERN_BY_ROLE[slot.role] !== undefined) continue
        const leaked = slot.patterns.filter((p) => NATIVE_PATTERNS.has(p))
        expect({ focus, leaked }).toEqual({ focus, leaked: [] })
      }
    }
  })

  test("a mobility slot with no mobility candidate is left unfilled, never substituted", () => {
    const pool = [
      cand("KB Clean", "hinge", 0.9),
      cand("DB Bench Press", "h-push", 0.85),
      cand("Goblet Squat", "squat", 0.8),
    ]
    const { plan, envelope } = selectSession(inputs(pool, { focus: "flex" }))
    expect(plan.slots).toEqual([])
    expect(unfilled(envelope)).toEqual(["mobility:mobility", "mobility:mobility"])
  })

  test("a conditioning slot with no conditioning candidate takes no gait substitute", () => {
    const pool = [
      cand("DB Bench Press", "h-push", 0.55, { lastSessionSets: [set(20, 12)] }),
      cand("Monster Walk", "gait", 0.9),
    ]
    const { plan } = selectSession(inputs(pool, { focus: "push" }))
    expect(plan.slots.some((s) => s.role === "conditioning")).toBe(false)
    expect(plan.slots.some((s) => s.exerciseName === "Monster Walk")).toBe(false)
  })

  test("a conditioning movement cannot fill a strength slot", () => {
    const pool = [
      cand("High Knees", "conditioning", 0.95),
      cand("Goblet Squat", "squat", 0.4, { lastSessionSets: [set(30, 12)] }),
    ]
    const { plan } = selectSession(inputs(pool, { focus: "legs" }))
    expect(plan.slots[0]?.exerciseName).toBe("Goblet Squat")
    const strengthSlots = plan.slots.filter((s) => s.role !== "conditioning")
    expect(strengthSlots.every((s) => s.movementPattern !== "conditioning")).toBe(true)
    expect(plan.slots.find((s) => s.role === "conditioning")?.exerciseName).toBe("High Knees")
  })
})

describe("selectSession — focus-aware isolation slots", () => {
  const PULL_POOL: readonly ScoredCandidate[] = [
    cand("Pullups", "v-pull", 0.7, { muscleFocus: "pull", lastSessionSets: [set(null, 8)] }),
    cand("DB Row", "h-pull", 0.6, { muscleFocus: "pull", lastSessionSets: [set(30, 12)] }),
    cand("Close-Grip DB Press", "isolation-other", 0.55, {
      muscleFocus: "push",
      lastSessionSets: [set(20, 12)],
    }),
    cand("DB Bicep Curl", "isolation-other", 0.3, {
      muscleFocus: "pull",
      lastSessionSets: [set(15, 12)],
    }),
  ]

  test("a pull day's isolation slot rejects pressing musculature and takes the pulling one", () => {
    const { plan } = selectSession(inputs(PULL_POOL, { focus: "pull" }))
    const isolation = plan.slots.find((s) => s.movementPattern === "isolation-other")
    expect(isolation?.exerciseName).toBe("DB Bicep Curl")
    expect(plan.slots.some((s) => s.exerciseName === "Close-Grip DB Press")).toBe(false)
  })

  test("the same movement is correct on the push day it actually trains", () => {
    const pushPool = [
      cand("DB Bench Press", "h-push", 0.7, { lastSessionSets: [set(30, 12)] }),
      cand("Close-Grip DB Press", "isolation-other", 0.55, {
        muscleFocus: "push",
        lastSessionSets: [set(20, 12)],
      }),
    ]
    const { plan } = selectSession(inputs(pushPool, { focus: "push" }))
    expect(plan.slots.some((s) => s.exerciseName === "Close-Grip DB Press")).toBe(true)
  })

  test("an isolation slot with no matching-focus candidate reports the gap honestly", () => {
    const pool = PULL_POOL.filter((c) => c.name !== "DB Bicep Curl")
    const { envelope } = selectSession(inputs(pool, { focus: "pull" }))
    expect(unfilled(envelope)).toContain("accessory:isolation-other")
  })

  test("the upper template's isolation slot declares no focus — both sides are legitimate", () => {
    const upper = FOCUS_TEMPLATES.upper ?? []
    const isolation = upper.find((s) => s.patterns.includes("isolation-other"))
    expect(isolation?.muscleFocus).toBeUndefined()
  })
})
