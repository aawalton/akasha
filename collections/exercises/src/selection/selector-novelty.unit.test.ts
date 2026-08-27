import { describe, expect, test } from "bun:test"
import type { ScoredCandidate } from "./anchor"
import { patternLateralityKey } from "./coverage"
import { selectSession } from "./selector"
import { cand, inputs, novel, set } from "./selector-fixtures"
import { FOCUS_TEMPLATES } from "./slot-templates"

describe("selectSession — the novelty budget is allocated by need, not slot order", () => {
  test("a novel ANCHOR does not consume the budget, so the starved last slot still fills", () => {
    const pool = [
      novel("Chin-Up", "v-pull", 0.41, { muscleFocus: "pull" }),
      cand("DB Row", "h-pull", 0.44, { muscleFocus: "pull", lastSessionSets: [set(30, 12)] }),
      cand("DB Shrug", "isolation-other", 0.17, { muscleFocus: "pull" }),
      novel("Plank", "core-anti-extension", 0.35, { equipment: "body only", loadsLadder: [] }),
    ]
    const { plan, envelope } = selectSession(inputs(pool, { focus: "pull" }))
    expect(plan.slots[0]?.exerciseName).toBe("Chin-Up")
    expect(envelope.decisions[0]?.rulesFired).toContain("novelty:exempt(anchor)")
    expect(plan.slots.map((s) => s.exerciseName)).toContain("Plank")
    const capped = envelope.decisions.filter((d) =>
      d.rulesFired.some((r) => r.startsWith("novelty:novel"))
    )
    expect(capped.map((d) => d.exerciseName)).toEqual(["Plank"])
  })

  test("an earlier slot with a logged option cannot spend a budget a starving slot needs", () => {
    const pool = [
      cand("DB Bench Press", "h-push", 0.55, { lastSessionSets: [set(30, 10)] }),
      novel("KB Thruster", "v-push", 0.52),
      cand("DB Shoulder Press", "v-push", 0.3, { lastSessionSets: [set(20, 12)] }),
      novel("Dead Bug", "core-anti-extension", 0.35, { equipment: "body only", loadsLadder: [] }),
    ]
    const { plan } = selectSession(inputs(pool, { focus: "push" }))
    const names = plan.slots.map((s) => s.exerciseName)
    expect(names).toContain("DB Shoulder Press")
    expect(names).not.toContain("KB Thruster")
    expect(names).toContain("Dead Bug")
  })

  test("a slot starved only by the budget reports novelty-capped, not a missing catalog row", () => {
    const pool = [
      cand("DB Bench Press", "h-push", 0.55, { lastSessionSets: [set(30, 10)] }),
      novel("KB Thruster", "v-push", 0.52),
      cand("DB Shoulder Press", "v-push", 0.3, { lastSessionSets: [set(20, 12)] }),
      novel("Dead Bug", "core-anti-extension", 0.35, { equipment: "body only", loadsLadder: [] }),
    ]
    const { envelope } = selectSession(inputs(pool, { focus: "push" }))
    expect(envelope.unfilledSlots).toContainEqual({
      slot: "accessory:h-push|v-push",
      reason: "novelty-capped",
    })
    expect(envelope.unfilledSlots).toContainEqual({
      slot: "accessory:isolation-other",
      reason: "no-in-kit-candidate",
    })
  })

  test("a novel CONDITIONING finisher is exempt too — unlogged is not unfamiliar", () => {
    const pool = [
      cand("Goblet Squat", "squat", 0.4, { lastSessionSets: [set(30, 12)] }),
      cand("RDL", "hinge", 0.5, { lastSessionSets: [set(30, 10)] }),
      cand("Reverse Lunge", "lunge", 0.3, {
        laterality: "unilateral",
        lastSessionSets: [set(20, 12)],
      }),
      novel("Plank", "core-anti-extension", 0.35, { equipment: "body only", loadsLadder: [] }),
      novel("Trail Walk", "conditioning", 0.28),
    ]
    const { plan, envelope } = selectSession(inputs(pool, { focus: "legs" }))
    const names = plan.slots.map((s) => s.exerciseName)
    expect(names).toContain("Trail Walk")
    expect(names).toContain("Plank")
    const finisher = envelope.decisions.find((d) => d.role === "conditioning")
    expect(finisher?.rulesFired).toContain("novelty:exempt(conditioning)")
    const capped = envelope.decisions.filter((d) =>
      d.rulesFired.some((r) => r.startsWith("novelty:novel"))
    )
    expect(capped.map((d) => d.exerciseName)).toEqual(["Plank"])
  })
})

describe("selectSession — session de-duplication is keyed on (pattern, laterality)", () => {
  const LEGS_POOL: readonly ScoredCandidate[] = [
    cand("Goblet Squat", "squat", 0.5, { lastSessionSets: [set(30, 12)] }),
    cand("RDL", "hinge", 0.45, { lastSessionSets: [set(30, 10)] }),
    cand("Bulgarian Split Squat", "lunge", 0.4, {
      laterality: "unilateral",
      lastSessionSets: [set(20, 12)],
    }),
    cand("DB Rear Lunge", "lunge", 0.35, {
      laterality: "unilateral",
      lastSessionSets: [set(20, 12)],
    }),
    cand("Single Leg Glute Bridge", "hinge", 0.3, {
      laterality: "unilateral",
      equipment: "body only",
      loadsLadder: [],
      lastSessionSets: [set(null, 12)],
    }),
  ]

  test("the coverage-flex slot repairs the uncovered laterality over a second same-side lunge", () => {
    const { plan } = selectSession(inputs(LEGS_POOL, { focus: "legs" }))
    const names = plan.slots.map((s) => s.exerciseName)
    expect(names).toContain("Single Leg Glute Bridge")
    expect(names).not.toContain("DB Rear Lunge")
  })

  test("no two picks in the session share a (pattern, laterality) pair", () => {
    const { envelope } = selectSession(inputs(LEGS_POOL, { focus: "legs" }))
    const keys = envelope.decisions.map((d) =>
      patternLateralityKey(d.featuresUsed.movementPattern, d.featuresUsed.laterality)
    )
    expect(new Set(keys).size).toBe(keys.length)
  })
})

describe("selectSession — the post-strength finisher prefers non-ballistic steady state", () => {
  const CONDITIONING_POOL: readonly ScoredCandidate[] = [
    cand("DB Bench Press", "h-push", 0.55, { lastSessionSets: [set(30, 10)] }),
    cand("High Knees", "conditioning", 0.58, { isBallistic: true }),
    cand("Trail Walk", "conditioning", 0.28, { isBallistic: false }),
  ]

  test("the finisher takes the steady-state movement despite a much higher-blending interval", () => {
    const { plan } = selectSession(inputs(CONDITIONING_POOL, { focus: "push" }))
    expect(plan.slots.find((s) => s.role === "conditioning")?.exerciseName).toBe("Trail Walk")
  })

  test("a conditioning DAY's own slot carries no preference — intervals belong there", () => {
    const { plan } = selectSession(inputs(CONDITIONING_POOL, { focus: "conditioning" }))
    expect(plan.slots[0]?.exerciseName).toBe("High Knees")
  })

  test("the finisher still fills when every candidate is ballistic — a preference, not a filter", () => {
    const pool = [
      cand("DB Bench Press", "h-push", 0.55, { lastSessionSets: [set(30, 10)] }),
      cand("High Knees", "conditioning", 0.58, { isBallistic: true }),
    ]
    const { plan } = selectSession(inputs(pool, { focus: "push" }))
    expect(plan.slots.find((s) => s.role === "conditioning")?.exerciseName).toBe("High Knees")
  })

  test("the ballistic preference is declared per slot, on exactly the ruled slots", () => {
    const declared: string[] = []
    for (const [focus, slots] of Object.entries(FOCUS_TEMPLATES)) {
      slots.forEach((slot, i) => {
        if (slot.ballisticPreference === undefined) return
        declared.push(`${focus}[${i}] ${slot.role} ${slot.ballisticPreference}`)
      })
    }
    expect(declared.sort()).toEqual([
      "conditioning[1] power prefer",
      "core[3] conditioning avoid",
      "flex[0] mobility avoid",
      "flex[1] mobility avoid",
      "full-body[5] conditioning avoid",
      "legs[5] conditioning avoid",
      "lower[4] conditioning avoid",
      "pull[5] conditioning avoid",
      "push[5] conditioning avoid",
    ])
  })

  test("the flex day prefers controlled end-range work over a higher-blending ballistic drill", () => {
    const pool = [
      cand("Frog Hops", "mobility", 0.447, { isBallistic: true }),
      cand("Cat Stretch", "mobility", 0.302),
      cand("One Knee To Chest", "mobility", 0.301),
    ]
    const { plan } = selectSession(inputs(pool, { focus: "flex" }))
    expect(plan.slots.map((s) => s.exerciseName)).not.toContain("Frog Hops")
  })
})
