import { describe, expect, test } from "bun:test"
import { selectSession } from "./selector"
import { cand, FIXTURE_POLICY, inputs, novel } from "./selector-fixtures"

describe("selectSession — the score decides, the ESO day breaks exact ties", () => {
  test("a strictly better accessory leads on every ESO day — no positional picking", () => {
    const pool = [
      cand("Anchor", "h-push", 0.9),
      cand("VPush A", "v-push", 0.6),
      cand("VPush B", "v-push", 0.5),
    ]
    const leadOn = (daySeed: number): string | undefined =>
      selectSession(inputs(pool, { daySeed })).plan.slots.find(
        (s) => s.movementPattern === "v-push"
      )?.exerciseName
    for (const daySeed of [0, 1, 2, 3, 4, 20659]) expect(leadOn(daySeed)).toBe("VPush A")
  })

  test("the ESO day still varies an EXACT tie — reproducible variety where score cannot discriminate", () => {
    const pool = [
      cand("Anchor", "h-push", 0.9),
      cand("VPush A", "v-push", 0.5),
      cand("VPush B", "v-push", 0.5),
    ]
    const leadOn = (daySeed: number): string | undefined =>
      selectSession(inputs(pool, { daySeed })).plan.slots.find(
        (s) => s.movementPattern === "v-push"
      )?.exerciseName
    expect(leadOn(0)).not.toBe(leadOn(1))
    expect(leadOn(0)).toBe(leadOn(2))
  })
})

describe("selectSession — the recency term", () => {
  const staleVsFresh = (blendStale: number, blendFresh: number): string | undefined => {
    const pool = [
      cand("Anchor", "h-push", 0.9),
      cand("Stale", "v-push", blendStale, { priorDayStr: "2026-06-01" }),
      cand("Fresh", "v-push", blendFresh, { priorDayStr: "2026-07-24" }),
    ]
    return selectSession(inputs(pool)).plan.slots.find((s) => s.movementPattern === "v-push")
      ?.exerciseName
  }

  test("a movement not performed in weeks outranks an identically-scoring one performed yesterday", () => {
    expect(staleVsFresh(0.5, 0.5)).toBe("Stale")
  })

  test("staleness never promotes a clearly-inferior movement over a clearly-better one", () => {
    expect(staleVsFresh(0.3, 0.5)).toBe("Fresh")
  })

  test("staleness does trade places between comparable movements", () => {
    expect(staleVsFresh(0.48, 0.5)).toBe("Stale")
  })

  test("a never-performed movement is not promoted by recency — it stays budget-governed", () => {
    const pool = [
      cand("Anchor", "h-push", 0.9),
      cand("Logged VPush", "v-push", 0.5, { priorDayStr: "2026-07-24" }),
      novel("Never VPush", "v-push", 0.7),
    ]
    const decision = selectSession(inputs(pool)).envelope.decisions.find(
      (d) => d.slotPatterns[0] === "v-push"
    )
    expect(decision?.rulesFired).toContain("recency:none(never-performed)")
  })

  test("the anchor does not rotate from recency — the progressing lift is held", () => {
    const pool = [
      cand("Held Anchor", "h-push", 0.5, {
        logged: true,
        sessionsLogged: 5,
        priorDayStr: "2026-07-24",
      }),
      cand("Stale Cousin", "h-push", 0.55, {
        logged: true,
        sessionsLogged: 1,
        priorDayStr: "2026-01-01",
      }),
    ]
    const anchorSlot = selectSession(inputs(pool)).plan.slots.find((s) => s.role === "anchor")
    expect(anchorSlot?.exerciseName).toBe("Held Anchor")
  })

  test("the anchor decision states that recency was not applied, rather than leaving it inferred", () => {
    const pool = [cand("Held Anchor", "h-push", 0.5, { logged: true, sessionsLogged: 5 })]
    const anchor = selectSession(inputs(pool)).envelope.decisions.find((d) => d.role === "anchor")
    expect(anchor?.rulesFired).toContain("recency:not-applied(anchor)")
  })

  test("a set logged today cannot demote the movement mid-session — staleness is measured before today", () => {
    const pool = [
      cand("Anchor", "h-push", 0.9),
      cand("In Progress", "v-push", 0.5, {
        lastDayStr: "2026-07-25",
        priorDayStr: "2026-07-04",
      }),
      cand("Rival", "v-push", 0.52, { priorDayStr: "2026-07-24" }),
    ]
    const lead = selectSession(inputs(pool)).plan.slots.find(
      (s) => s.movementPattern === "v-push"
    )?.exerciseName
    expect(lead).toBe("In Progress")
  })

  test("the weight is policy data — raising it changes the ranking with no code change", () => {
    const pool = [
      cand("Anchor", "h-push", 0.9),
      cand("Stale", "v-push", 0.3, { priorDayStr: "2026-01-01" }),
      cand("Fresh", "v-push", 0.5, { priorDayStr: "2026-07-24" }),
    ]
    const hot = { ...FIXTURE_POLICY, recencyWeight: 0.3 }
    const lead = selectSession(inputs(pool, { policy: hot })).plan.slots.find(
      (s) => s.movementPattern === "v-push"
    )?.exerciseName
    expect(lead).toBe("Stale")
  })
})

describe("selectSession — a slot already worked this session keeps its movement", () => {
  test("a re-rank cannot re-open a slot with a different movement", () => {
    const pool = [
      cand("Anchor", "h-push", 0.9),
      cand("Worked VPush", "v-push", 0.3),
      novel("Freshly Affordable VPush", "v-push", 0.8),
    ]
    const pinned = selectSession(
      inputs(pool, { sessionPerformed: new Set(["Worked VPush"]) })
    ).plan.slots.find((s) => s.movementPattern === "v-push")
    expect(pinned?.exerciseName).toBe("Worked VPush")
  })

  test("the envelope reports the pin rather than leaving it to be inferred", () => {
    const pool = [cand("Anchor", "h-push", 0.9), cand("Worked VPush", "v-push", 0.3)]
    const decision = selectSession(
      inputs(pool, { sessionPerformed: new Set(["Worked VPush"]) })
    ).envelope.decisions.find((d) => d.slotPatterns[0] === "v-push")
    expect(decision?.rulesFired).toContain("session:already-performed")
  })

  test("an untouched slot still ranks normally — the pin is per slot, not per session", () => {
    const pool = [
      cand("Anchor", "h-push", 0.9),
      cand("Worked VPush", "v-push", 0.3),
      cand("Better HPull", "h-pull", 0.8),
      cand("Worse HPull", "h-pull", 0.2),
    ]
    const plan = selectSession(
      inputs(pool, { focus: "upper", sessionPerformed: new Set(["Worked VPush"]) })
    ).plan
    expect(plan.slots.find((s) => s.movementPattern === "v-push")?.exerciseName).toBe(
      "Worked VPush"
    )
    expect(plan.slots.find((s) => s.movementPattern === "h-pull")?.exerciseName).toBe(
      "Better HPull"
    )
  })
})
