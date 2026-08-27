import { describe, expect, test } from "bun:test"
import {
  decideMovementDone,
  decideNextSet,
  HIGH_RPE_THRESHOLD,
  partitionSkips,
  type SessionSet,
} from "./next-set"
import type { SessionPlan } from "./selector"
import { selectSession } from "./selector"
import { cand, inputs, set } from "./selector-fixtures"

function logged(...sets: readonly SessionSet[]): readonly SessionSet[] {
  return sets
}

function s(setNumber: number, reps: number | null, rpe: number | null): SessionSet {
  return { setNumber, reps, rpe }
}

const NOT_SKIPPED = { skippedAfterPerforming: false }

describe("decideMovementDone — within-movement volume responds to performance", () => {
  test("no sets yet — the movement has not started, let alone finished", () => {
    const d = decideMovementDone({
      sets: [],
      prescribedSets: 3,
      repRangeLow: 10,
      ...NOT_SKIPPED,
    })
    expect(d.done).toBe(false)
  })

  test("a comfortable set inside the range continues the movement", () => {
    const d = decideMovementDone({
      sets: logged(s(1, 12, 7)),
      prescribedSets: 3,
      repRangeLow: 10,
      ...NOT_SKIPPED,
    })
    expect(d.done).toBe(false)
  })

  test("a set at the high-RPE threshold ends the movement early", () => {
    const d = decideMovementDone({
      sets: logged(s(1, 12, 7), s(2, 11, HIGH_RPE_THRESHOLD)),
      prescribedSets: 4,
      repRangeLow: 10,
      ...NOT_SKIPPED,
    })
    expect(d.done).toBe(true)
    expect(d.reason).toBe("high-rpe")
  })

  test("reps falling below the target floor ends the movement early", () => {
    const d = decideMovementDone({
      sets: logged(s(1, 12, 7), s(2, 8, 7)),
      prescribedSets: 4,
      repRangeLow: 10,
      ...NOT_SKIPPED,
    })
    expect(d.done).toBe(true)
    expect(d.reason).toBe("reps-below-range")
  })

  test("the prescribed set count completes the movement without an early-stop reason", () => {
    const d = decideMovementDone({
      sets: logged(s(1, 12, 7), s(2, 12, 7), s(3, 12, 8)),
      prescribedSets: 3,
      repRangeLow: 10,
      ...NOT_SKIPPED,
    })
    expect(d.done).toBe(true)
    expect(d.reason).toBe("sets-complete")
  })

  test("only the LAST set decides the early stop — an earlier hard set does not end the movement", () => {
    const d = decideMovementDone({
      sets: logged(s(1, 12, HIGH_RPE_THRESHOLD), s(2, 12, 7)),
      prescribedSets: 4,
      repRangeLow: 10,
      ...NOT_SKIPPED,
    })
    expect(d.done).toBe(false)
  })

  test("a set with no reps or RPE recorded (a timed activity) cannot trigger an early stop", () => {
    const d = decideMovementDone({
      sets: logged(s(1, null, null)),
      prescribedSets: 2,
      repRangeLow: 0,
      ...NOT_SKIPPED,
    })
    expect(d.done).toBe(false)
  })

  test("a skip after work already logged ends the movement before its prescribed sets", () => {
    const d = decideMovementDone({
      sets: logged(s(1, 12, 7)),
      prescribedSets: 3,
      repRangeLow: 10,
      skippedAfterPerforming: true,
    })
    expect(d.done).toBe(true)
    expect(d.reason).toBe("skipped-after-performing")
  })

  test("an explicit skip is reported in preference to an inferred early stop", () => {
    const d = decideMovementDone({
      sets: logged(s(1, 12, HIGH_RPE_THRESHOLD)),
      prescribedSets: 3,
      repRangeLow: 10,
      skippedAfterPerforming: true,
    })
    expect(d.reason).toBe("skipped-after-performing")
  })

  test("a skip still ends the movement when only warmups were logged for it", () => {
    const d = decideMovementDone({
      sets: [],
      prescribedSets: 3,
      repRangeLow: 10,
      skippedAfterPerforming: true,
    })
    expect(d.done).toBe(true)
    expect(d.reason).toBe("skipped-after-performing")
  })

  test("a movement that finished its sets reports that, not a redundant skip", () => {
    const d = decideMovementDone({
      sets: logged(s(1, 12, 7), s(2, 12, 7), s(3, 12, 7)),
      prescribedSets: 3,
      repRangeLow: 10,
      skippedAfterPerforming: true,
    })
    expect(d.reason).toBe("sets-complete")
  })
})

describe("partitionSkips — one decision, two disjoint meanings", () => {
  test("a skip of unstarted work leaves the pool, and ends nothing", () => {
    const p = partitionSkips(new Set(["A"]), new Set())
    expect([...p.toExclude]).toEqual(["A"])
    expect([...p.afterPerforming]).toEqual([])
  })

  test("a skip of work already performed stays in the pool, and ends its slot instead", () => {
    const p = partitionSkips(new Set(["A"]), new Set(["A"]))
    expect([...p.toExclude]).toEqual([])
    expect([...p.afterPerforming]).toEqual(["A"])
  })

  test("every skip lands in exactly one half, so the two halves cannot disagree", () => {
    const p = partitionSkips(new Set(["A", "B", "C"]), new Set(["B", "Z"]))
    expect([...p.toExclude].sort()).toEqual(["A", "C"])
    expect([...p.afterPerforming]).toEqual(["B"])
  })

  test("a performed movement that was never skipped is claimed by neither half", () => {
    const p = partitionSkips(new Set(), new Set(["A"]))
    expect(p.toExclude.size).toBe(0)
    expect(p.afterPerforming.size).toBe(0)
  })
})

function legsPlan(): SessionPlan {
  const pool = [
    cand("Goblet Squat", "squat", 0.5, { lastSessionSets: [set(30, 12), set(30, 12)] }),
    cand("Single Leg Glute Bridge", "hinge", 0.4, { lastSessionSets: [set(null, 12)] }),
    cand("Goblet Bulgarian Split Squat", "lunge", 0.45, {
      lastSessionSets: [set(20, 12), set(20, 12)],
    }),
  ]
  return selectSession(inputs(pool, { focus: "legs" })).plan
}

const NO_SKIPS = { skippedAfterPerforming: new Set<string>() }

describe("decideNextSet — exactly one set, re-derived from live session state", () => {
  const plan = legsPlan()

  test("an empty session opens with the first set of the first slot", () => {
    const d = decideNextSet({ plan, loggedByExercise: new Map(), ...NO_SKIPS })
    expect(d.kind).toBe("set")
    if (d.kind !== "set") return
    expect(d.slot.sortOrder).toBe(0)
    expect(d.setNumber).toBe(1)
  })

  test("a movement under way continues to its next set rather than starting something new", () => {
    const first = plan.slots[0]
    if (first === undefined) throw new Error("expected a first slot")
    const d = decideNextSet({
      plan,
      loggedByExercise: new Map([[first.exerciseId, logged(s(1, 12, 7))]]),
      ...NO_SKIPS,
    })
    expect(d.kind).toBe("set")
    if (d.kind !== "set") return
    expect(d.slot.exerciseId).toBe(first.exerciseId)
    expect(d.setNumber).toBe(2)
  })

  test("a completed movement hands over to the next slot", () => {
    const first = plan.slots[0]
    const second = plan.slots[1]
    if (first === undefined || second === undefined) throw new Error("expected two slots")
    const done = Array.from({ length: first.targetSets }, (_, i) => s(i + 1, first.repRangeHigh, 7))
    const d = decideNextSet({
      plan,
      loggedByExercise: new Map([[first.exerciseId, done]]),
      ...NO_SKIPS,
    })
    expect(d.kind).toBe("set")
    if (d.kind !== "set") return
    expect(d.slot.exerciseId).toBe(second.exerciseId)
    expect(d.setNumber).toBe(1)
  })

  test("a high-RPE set moves the loop on early, and says why", () => {
    const first = plan.slots[0]
    const second = plan.slots[1]
    if (first === undefined || second === undefined) throw new Error("expected two slots")
    const d = decideNextSet({
      plan,
      loggedByExercise: new Map([[first.exerciseId, logged(s(1, 12, 7), s(2, 10, 9.5))]]),
      ...NO_SKIPS,
    })
    expect(d.kind).toBe("set")
    if (d.kind !== "set") return
    expect(d.slot.exerciseId).toBe(second.exerciseId)
    expect(d.why).toContain(first.exerciseName)
    expect(d.why.toLowerCase()).toContain("rpe")
  })

  test("the session ends plainly once every planned slot is complete", () => {
    const all = new Map(
      plan.slots.map((slot) => [
        slot.exerciseId,
        Array.from({ length: slot.targetSets }, (_, i) => s(i + 1, slot.repRangeHigh, 7)),
      ])
    )
    const d = decideNextSet({ plan, loggedByExercise: all, ...NO_SKIPS })
    expect(d.kind).toBe("done")
  })

  test("an empty plan is done immediately rather than emitting a phantom set", () => {
    const d = decideNextSet({
      plan: { focus: "legs", slots: [] },
      loggedByExercise: new Map(),
      ...NO_SKIPS,
    })
    expect(d.kind).toBe("done")
  })

  test("the emitted set carries the movement's own prescription, not a session projection", () => {
    const d = decideNextSet({ plan, loggedByExercise: new Map(), ...NO_SKIPS })
    expect(d.kind).toBe("set")
    if (d.kind !== "set") return
    const first = plan.slots[0]
    expect(d.slot.repRangeLow).toBe(first?.repRangeLow ?? -1)
    expect(d.slot.targetRir).toBe(first?.targetRir ?? -1)
    expect(d.why).toContain(first?.progression.rationale ?? "")
  })

  test("set numbering follows the working sets already logged for that movement", () => {
    const first = plan.slots[0]
    if (first === undefined) throw new Error("expected a first slot")
    const d = decideNextSet({
      plan,
      loggedByExercise: new Map([[first.exerciseId, logged(s(1, 12, 7), s(2, 12, 7))]]),
      ...NO_SKIPS,
    })
    expect(d.kind).toBe("set")
    if (d.kind !== "set") return
    expect(d.setNumber).toBe(3)
  })
})

describe("--skip — re-derive around unstarted work, END a slot already worked", () => {
  const SQUATS = ["Goblet Squat", "Back Squat"]

  function legsPool() {
    return [
      cand("Goblet Squat", "squat", 0.5, {
        sessionsLogged: 5,
        lastSessionSets: [set(30, 12), set(30, 12)],
      }),
      cand("Back Squat", "squat", 0.48, { sessionsLogged: 2, lastSessionSets: [set(60, 8)] }),
      cand("Single Leg Glute Bridge", "hinge", 0.4, { lastSessionSets: [set(null, 12)] }),
    ]
  }

  function afterSkipping(skipped: readonly string[], performed: readonly string[]) {
    const base = inputs(legsPool(), { focus: "legs", sessionPerformed: new Set(performed) })
    const skips = partitionSkips(new Set(skipped), base.sessionPerformed)
    const { plan } = selectSession({
      ...base,
      candidates: base.candidates.filter((c) => !skips.toExclude.has(c.id)),
    })
    const loggedByExercise = new Map(performed.map((id) => [id, logged(s(1, 12, 7))]))
    const decision = decideNextSet({
      plan,
      loggedByExercise,
      skippedAfterPerforming: skips.afterPerforming,
    })
    return { plan, decision }
  }

  test("a NOT-yet-started movement leaves the pool and its slot re-derives around it", () => {
    const { plan, decision } = afterSkipping(["Goblet Squat"], [])
    expect(plan.slots.map((slot) => slot.exerciseId)).not.toContain("Goblet Squat")
    expect(decision.kind).toBe("set")
    if (decision.kind !== "set") return
    expect(decision.slot.exerciseId).toBe("Back Squat")
  })

  test("a movement ALREADY worked stays in the pool, so its slot keeps it", () => {
    const { plan } = afterSkipping(["Goblet Squat"], ["Goblet Squat"])
    expect(plan.slots[0]?.exerciseId).toBe("Goblet Squat")
  })

  test("skipping a movement ALREADY worked ends that slot — no substitute in its pattern", () => {
    const { decision } = afterSkipping(["Goblet Squat"], ["Goblet Squat"])
    expect(decision.kind).toBe("set")
    if (decision.kind !== "set") return
    expect(SQUATS).not.toContain(decision.slot.exerciseId)
    expect(decision.slot.movementPattern).not.toBe("squat")
  })

  test("the terminal reason reaches the envelope, naming the movement it ended", () => {
    const { decision } = afterSkipping(["Goblet Squat"], ["Goblet Squat"])
    expect(decision.kind).toBe("set")
    if (decision.kind !== "set") return
    expect(decision.why).toContain("Goblet Squat")
    expect(decision.why).toContain("skipped")
  })

  test("without the skip, the movement already worked gets its next set", () => {
    const { decision } = afterSkipping([], ["Goblet Squat"])
    expect(decision.kind).toBe("set")
    if (decision.kind !== "set") return
    expect(decision.slot.exerciseId).toBe("Goblet Squat")
    expect(decision.setNumber).toBe(2)
  })
})
