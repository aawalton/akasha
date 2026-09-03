import { expect, test } from "bun:test"
import type {
  PlannedSlot,
  SessionPlan,
} from "../session-selection/session-selection.module.code.ts"
import {
  decideMovementDone,
  decideNextSet,
  HIGH_RPE_THRESHOLD,
  partitionSkips,
  type SessionSet,
} from "./next-set.module.code.ts"

function set(setNumber: number, reps: number | null, rpe: number | null = null): SessionSet {
  return { setNumber, reps, rpe }
}

function slot(exerciseSlug: string, over: Partial<PlannedSlot> = {}): PlannedSlot {
  return {
    sortOrder: 0,
    role: "accessory",
    exerciseSlug,
    title: exerciseSlug,
    movementPattern: "h-push",
    repRangeLow: 10,
    repRangeHigh: 15,
    targetRir: 2,
    targetSets: 3,
    progression: {
      action: "beat-reps",
      prescribedLoad: 10,
      prescribedRepLow: 10,
      prescribedRepHigh: 15,
      prescribedSets: 3,
      coarseJumpGuardFired: false,
      rationale: "hold load, beat reps",
    },
    ...over,
  }
}

function plan(slots: readonly PlannedSlot[]): SessionPlan {
  return { focus: "push", slots }
}

const NOTHING_SKIPPED: ReadonlySet<string> = new Set()

test("a movement with nothing logged is not done", () => {
  const decision = decideMovementDone({
    sets: [],
    prescribedSets: 3,
    repRangeLow: 10,
    skippedAfterPerforming: false,
  })
  expect(decision.done).toBe(false)
  expect(decision.reason).toBeNull()
})

test("a movement is done once its prescribed sets are logged", () => {
  const decision = decideMovementDone({
    sets: [set(1, 12), set(2, 12), set(3, 12)],
    prescribedSets: 3,
    repRangeLow: 10,
    skippedAfterPerforming: false,
  })
  expect(decision.reason).toBe("sets-complete")
})

test("a set at the high RPE threshold ends the movement", () => {
  const decision = decideMovementDone({
    sets: [set(1, 12, HIGH_RPE_THRESHOLD)],
    prescribedSets: 3,
    repRangeLow: 10,
    skippedAfterPerforming: false,
  })
  expect(decision.reason).toBe("high-rpe")
})

test("a set below the high RPE threshold does not end the movement", () => {
  const decision = decideMovementDone({
    sets: [set(1, 12, HIGH_RPE_THRESHOLD - 1)],
    prescribedSets: 3,
    repRangeLow: 10,
    skippedAfterPerforming: false,
  })
  expect(decision.done).toBe(false)
})

test("a set below the range floor ends the movement", () => {
  const decision = decideMovementDone({
    sets: [set(1, 9)],
    prescribedSets: 3,
    repRangeLow: 10,
    skippedAfterPerforming: false,
  })
  expect(decision.reason).toBe("reps-below-range")
  expect(decision.why).toContain("9 reps")
})

test("a completed movement is complete rather than skipped", () => {
  const decision = decideMovementDone({
    sets: [set(1, 12), set(2, 12), set(3, 12)],
    prescribedSets: 3,
    repRangeLow: 10,
    skippedAfterPerforming: true,
  })
  expect(decision.reason).toBe("sets-complete")
})

test("a movement skipped after work is done for that reason", () => {
  const decision = decideMovementDone({
    sets: [set(1, 12)],
    prescribedSets: 3,
    repRangeLow: 10,
    skippedAfterPerforming: true,
  })
  expect(decision.reason).toBe("skipped-after-performing")
})

test("a skip before any work excludes and a skip after any work ends", () => {
  const split = partitionSkips(new Set(["a", "b"]), new Set(["b"]))
  expect([...split.toExclude]).toEqual(["a"])
  expect([...split.afterPerforming]).toEqual(["b"])
})

test("nothing skipped splits into nothing", () => {
  const split = partitionSkips(new Set(), new Set(["a"]))
  expect(split.toExclude.size).toBe(0)
  expect(split.afterPerforming.size).toBe(0)
})

test("the first unfinished slot takes the next set", () => {
  const decision = decideNextSet({
    plan: plan([slot("bench"), slot("flye")]),
    loggedByExercise: new Map([["bench", [set(1, 12), set(2, 12), set(3, 12)]]]),
    skippedAfterPerforming: NOTHING_SKIPPED,
  })
  expect(decision.kind).toBe("set")
  if (decision.kind !== "set") return
  expect(decision.slot.exerciseSlug).toBe("flye")
  expect(decision.setNumber).toBe(1)
})

test("the set number follows what is already logged", () => {
  const decision = decideNextSet({
    plan: plan([slot("bench")]),
    loggedByExercise: new Map([["bench", [set(1, 12)]]]),
    skippedAfterPerforming: NOTHING_SKIPPED,
  })
  expect(decision.kind).toBe("set")
  if (decision.kind !== "set") return
  expect(decision.setNumber).toBe(2)
  expect(decision.why).toContain("hold load, beat reps")
})

test("a movement finishing its sets is not explained to the next one", () => {
  const decision = decideNextSet({
    plan: plan([slot("bench"), slot("flye")]),
    loggedByExercise: new Map([["bench", [set(1, 12), set(2, 12), set(3, 12)]]]),
    skippedAfterPerforming: NOTHING_SKIPPED,
  })
  expect(decision.kind).toBe("set")
  if (decision.kind !== "set") return
  expect(decision.why).not.toContain("done for today")
})

test("a movement ending early is explained to the next one", () => {
  const decision = decideNextSet({
    plan: plan([slot("bench"), slot("flye")]),
    loggedByExercise: new Map([["bench", [set(1, 12, 9.5)]]]),
    skippedAfterPerforming: NOTHING_SKIPPED,
  })
  expect(decision.kind).toBe("set")
  if (decision.kind !== "set") return
  expect(decision.slot.exerciseSlug).toBe("flye")
  expect(decision.why).toContain("bench is done for today")
})

test("a session with every slot done prescribes nothing further", () => {
  const decision = decideNextSet({
    plan: plan([slot("bench")]),
    loggedByExercise: new Map([["bench", [set(1, 12), set(2, 12), set(3, 12)]]]),
    skippedAfterPerforming: NOTHING_SKIPPED,
  })
  expect(decision.kind).toBe("done")
  expect(decision.why).toContain("push")
})

test("an empty plan is already complete", () => {
  const decision = decideNextSet({
    plan: plan([]),
    loggedByExercise: new Map(),
    skippedAfterPerforming: NOTHING_SKIPPED,
  })
  expect(decision.kind).toBe("done")
})

test("a slot skipped after work is passed over", () => {
  const decision = decideNextSet({
    plan: plan([slot("bench"), slot("flye")]),
    loggedByExercise: new Map([["bench", [set(1, 12)]]]),
    skippedAfterPerforming: new Set(["bench"]),
  })
  expect(decision.kind).toBe("set")
  if (decision.kind !== "set") return
  expect(decision.slot.exerciseSlug).toBe("flye")
})
