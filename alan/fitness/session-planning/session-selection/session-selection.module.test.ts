import { expect, test } from "bun:test"
import { computeCoverage } from "../weekly-coverage/weekly-coverage.module.code.ts"
import { selectSession } from "./session-selection.module.code.ts"
import {
  candidate,
  novelCandidate,
  performed,
  selectorInputs,
  unfilled,
} from "./session-selection.module.test-fixtures.ts"

const PUSH_POOL = [
  candidate("bench", "h-push", 0.8),
  candidate("overhead", "v-push", 0.7),
  candidate("flye", "h-push", 0.4),
  candidate("triceps", "isolation-other", 0.3),
  candidate("plank", "core-anti-extension", 0.6),
  candidate("row-bike", "conditioning", 0.5),
]

test("the anchor slot leads the plan", () => {
  const { plan } = selectSession(selectorInputs(PUSH_POOL))
  expect(plan.slots[0]?.role).toBe("anchor")
  expect(plan.slots[0]?.movementPattern).toBe("h-push")
  expect(plan.slots[0]?.sortOrder).toBe(0)
})

test("a movement fills at most one slot", () => {
  const { plan } = selectSession(selectorInputs(PUSH_POOL))
  const slugs = plan.slots.map((slot) => slot.exerciseSlug)
  expect(new Set(slugs).size).toBe(slugs.length)
})

test("nothing in the pool leaves every required slot unfilled", () => {
  const { plan, envelope } = selectSession(selectorInputs([]))
  expect(plan.slots).toEqual([])
  expect(unfilled(envelope).length).toBe(5)
  expect(envelope.unfilledSlots.every((one) => one.reason === "no-in-kit-candidate")).toBe(true)
})

test("an optional slot going unfilled is no gap", () => {
  const { envelope } = selectSession(selectorInputs(PUSH_POOL.slice(0, 5)))
  expect(unfilled(envelope)).not.toContain("conditioning:conditioning")
})

test("the plan and the envelope agree on how many slots were filled", () => {
  const { plan, envelope } = selectSession(selectorInputs(PUSH_POOL))
  expect(envelope.decisions.length).toBe(plan.slots.length)
})

test("every decision names the rules that fired", () => {
  const { envelope } = selectSession(selectorInputs(PUSH_POOL))
  for (const decision of envelope.decisions) {
    expect(decision.rulesFired).toContain("in-kit")
    expect(decision.rationale.length).toBeGreaterThan(0)
  }
})

test("recency is not weighed for the anchor", () => {
  const { envelope } = selectSession(selectorInputs(PUSH_POOL))
  expect(envelope.decisions[0]?.rulesFired).toContain("recency:not-applied(anchor)")
})

test("only the anchor decision carries an anchor state", () => {
  const { envelope } = selectSession(selectorInputs(PUSH_POOL))
  expect(envelope.decisions[0]?.anchorState).not.toBeNull()
  for (const decision of envelope.decisions.slice(1)) {
    expect(decision.anchorState).toBeNull()
  }
})

test("a novel accessory spends the session's one introduction", () => {
  const pool = [
    ...PUSH_POOL,
    novelCandidate("new-flye", "h-push", 0.99),
    novelCandidate("new-crunch", "core-anti-rotation", 0.99),
  ]
  const { envelope } = selectSession(selectorInputs(pool))
  const spent = envelope.decisions.filter((one) =>
    one.rulesFired.some((rule) => rule.startsWith("novelty:novel"))
  )
  expect(spent.length).toBe(1)
})

test("the anchor is outside the novelty budget", () => {
  const onlyNovel = [novelCandidate("fresh-press", "h-push", 0.9)]
  const { envelope } = selectSession(selectorInputs(onlyNovel))
  expect(envelope.decisions[0]?.rulesFired).toContain("novelty:exempt(anchor)")
})

test("a slot with only novel candidates left over budget says why", () => {
  const pool = [
    candidate("bench", "h-push", 0.8),
    novelCandidate("new-a", "v-push", 0.9),
    novelCandidate("new-b", "isolation-other", 0.9),
  ]
  const { envelope } = selectSession(selectorInputs(pool))
  const capped = envelope.unfilledSlots.filter((one) => one.reason === "novelty-capped")
  expect(capped.length).toBeGreaterThan(0)
})

test("a movement already performed today holds the slot it fits", () => {
  const pool = [
    candidate("bench", "h-push", 0.9),
    candidate("floor-press", "h-push", 0.1),
    candidate("overhead", "v-push", 0.7),
  ]
  const { plan } = selectSession(
    selectorInputs(pool, { sessionPerformed: new Set(["floor-press"]) })
  )
  expect(plan.slots[0]?.exerciseSlug).toBe("floor-press")
})

test("a flexible slot repairs a pattern the week still owes", () => {
  const pool = [
    candidate("bench", "h-push", 0.9),
    candidate("overhead", "v-push", 0.8),
    candidate("triceps", "isolation-other", 0.7),
    candidate("plank", "core-anti-extension", 0.1),
  ]
  const { envelope } = selectSession(selectorInputs(pool))
  const repaired = envelope.decisions.filter((one) =>
    one.rulesFired.some((rule) => rule.startsWith("coverage-repair:"))
  )
  expect(repaired.length).toBeGreaterThan(0)
})

test("a muscle-focused slot takes only that focus", () => {
  const pool = [
    candidate("bench", "h-push", 0.9),
    candidate("curl", "isolation-other", 0.9, { muscleFocus: "pull" }),
  ]
  const { envelope } = selectSession(selectorInputs(pool))
  const focused = envelope.decisions.find((one) => one.rulesFired.includes("focus-muscle:push"))
  expect(focused).toBeUndefined()
  expect(unfilled(envelope)).toContain("accessory:isolation-other")
})

test("a conditioning movement fills no accessory slot", () => {
  const pool = [candidate("bench", "h-push", 0.9), candidate("row-bike", "conditioning", 0.99)]
  const { plan } = selectSession(selectorInputs(pool))
  const conditioning = plan.slots.filter((slot) => slot.movementPattern === "conditioning")
  expect(conditioning.every((slot) => slot.role === "conditioning")).toBe(true)
})

test("a secondary pattern lets a movement fill a slot", () => {
  const pool = [
    candidate("bench", "h-push", 0.9),
    candidate("dip", "isolation-other", 0.8, { secondaryPattern: "v-push" }),
  ]
  const { plan } = selectSession(selectorInputs(pool))
  expect(plan.slots.some((slot) => slot.exerciseSlug === "dip")).toBe(true)
})

test("a conditioning slot is prescribed without a load progression", () => {
  const { plan } = selectSession(selectorInputs(PUSH_POOL))
  const finisher = plan.slots.find((slot) => slot.role === "conditioning")
  expect(finisher?.progression.action).toBe("introduce")
  expect(finisher?.progression.rationale).toContain("Zone-2")
})

test("an anchor with history is progressed from that history", () => {
  const pool = [
    candidate("bench", "h-push", 0.9, {
      lastSessionSets: [performed(10, 15), performed(10, 15), performed(10, 15)],
    }),
  ]
  const { plan } = selectSession(selectorInputs(pool))
  expect(plan.slots[0]?.progression.action).toBe("increase-load")
  expect(plan.slots[0]?.progression.prescribedLoad).toBe(15)
})

test("the plan carries the reps the progression prescribed", () => {
  const pool = [
    candidate("bench", "h-push", 0.9, {
      lastSessionSets: [performed(30, 15)],
      loadsLadder: [30],
    }),
  ]
  const { plan } = selectSession(selectorInputs(pool))
  expect(plan.slots[0]?.repRangeLow).toBe(15)
  expect(plan.slots[0]?.repRangeHigh).toBe(17)
  expect(plan.slots[0]?.targetSets).toBe(4)
  expect(plan.slots[0]?.progression.coarseJumpGuardFired).toBe(true)
})

test("a decision names the four next best it passed over", () => {
  const pool = [
    candidate("bench", "h-push", 0.9),
    candidate("a", "v-push", 0.8),
    candidate("b", "v-push", 0.7),
    candidate("c", "v-push", 0.6),
    candidate("d", "v-push", 0.5),
    candidate("e", "v-push", 0.4),
    candidate("f", "v-push", 0.3),
  ]
  const { envelope } = selectSession(selectorInputs(pool))
  const accessory = envelope.decisions.find((one) => one.role === "accessory")
  expect(accessory?.rejected.length).toBe(4)
  expect(accessory?.rejected.map((one) => one.exerciseSlug)).not.toContain(accessory?.exerciseSlug)
})

test("the envelope carries the weights the policy stated", () => {
  const inputs = selectorInputs(PUSH_POOL)
  const { envelope } = selectSession(inputs)
  expect(envelope.weights).toEqual(inputs.policy.weights)
  expect(envelope.focus).toBe("push")
  expect(envelope.daySeed).toBe(0)
})

test("the coverage handed in is the coverage reported", () => {
  const coverage = computeCoverage([{ movementPattern: "squat", laterality: "bilateral" }])
  const { envelope } = selectSession(selectorInputs(PUSH_POOL, { coverage }))
  expect(envelope.coverage).toBe(coverage)
})

test("a focus no template names is planned as full body", () => {
  const pool = [
    candidate("squat", "squat", 0.9),
    candidate("bench", "h-push", 0.8),
    candidate("row", "h-pull", 0.7),
  ]
  const { plan } = selectSession(selectorInputs(pool, { focus: "whatever" }))
  expect(plan.focus).toBe("whatever")
  expect(plan.slots[0]?.movementPattern).toBe("squat")
})
