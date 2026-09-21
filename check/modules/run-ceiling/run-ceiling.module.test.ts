import { expect, test } from "bun:test"
import { MEASURED_ON, ranOver } from "akasha/check/modules/run-ceiling/run-ceiling.module.code.ts"
import {
  BURNS_AT,
  costing,
  GATHERED,
  SLOWER,
  SPENT_ON_THE_SLOWER_NODE,
} from "akasha/check/modules/run-ceiling/run-ceiling.module.test-fixtures.ts"

test("a check at its ceiling refuses nothing, and one over it names its own page", () => {
  const one = { ...GATHERED, checkCeiling: 1 }
  expect(ranOver(one, "check", costing(0.6, 0.4))).toBe(null)
  const said = ranOver(one, "check", costing(1.2, 0))
  expect(said?.path).toBe(BURNS_AT)
  expect(said?.reason).toContain("spent 1.2 processor seconds judging this change, over the 1")
})

test("the time counted is the check's own together with what the check spawns", () => {
  const one = { ...GATHERED, checkCeiling: 1 }
  expect(ranOver(one, "check", costing(0.9, 0.05))).toBe(null)
  expect(ranOver(one, "check", costing(0.05, 1.5))?.reason).toContain("spent 1.55 processor")
})

test("a group stating no ceiling refuses nothing however long its check runs", () => {
  expect(ranOver(GATHERED, "check", costing(600, 600))).toBe(null)
  expect(ranOver({ ...GATHERED, checkCeiling: null }, "check", costing(600, 600))).toBe(null)
})

test("a run the watcher let by for being under twice its ceiling is refused here", () => {
  const one = { ...GATHERED, auditCeiling: 15 }
  expect(ranOver(one, "audit", costing(0, 15.041))?.path).toBe(BURNS_AT)
  expect(ranOver(one, "audit", costing(0, 29.9))?.reason).toContain("over the 15 its page states")
})

test("the group whose code ran decides which group states the ceiling", () => {
  const one = { ...GATHERED, checkCeiling: 9, auditCeiling: 1 }
  expect(ranOver(one, "check", costing(2, 0))).toBe(null)
  expect(ranOver(one, "audit", costing(2, 0))?.reason).toContain("over the 1 its page states")
})

test("a run naming the node the ceiling was measured on is weighed against that ceiling", () => {
  const one = { ...GATHERED, auditCeiling: 15 }
  const spent = { ...costing(0, 15.424), node: MEASURED_ON }
  expect(ranOver(one, "audit", spent)?.path).toBe(BURNS_AT)
  expect(ranOver(one, "audit", { ...spent, childCpuSeconds: 15 })).toBe(null)
})

test("a run naming no node at all is weighed against its ceiling as every run was before", () => {
  const one = { ...GATHERED, auditCeiling: 15 }
  expect(costing(0, 15.424).node).toBe(undefined)
  expect(ranOver(one, "audit", costing(0, 15.424))?.path).toBe(BURNS_AT)
})

test("a round landing on another node of the pool refuses none of the six that round refused", () => {
  for (const [slug, spent, ceiling] of SPENT_ON_THE_SLOWER_NODE) {
    const one = { ...GATHERED, slug, auditCeiling: ceiling }
    expect(spent).toBeGreaterThan(ceiling)
    expect(ranOver(one, "audit", { ...costing(0, spent), node: SLOWER })).toBe(null)
    expect(ranOver(one, "audit", { ...costing(0, spent), node: MEASURED_ON })?.path).toBe(BURNS_AT)
  }
})

test("a check with no headroom left refuses on the measuring node however tight that headroom is", () => {
  const one = { ...GATHERED, slug: "no-raw-nul-bytes", auditCeiling: 15 }
  expect(ranOver(one, "audit", { ...costing(12.338, 2.2), node: SLOWER })).toBe(null)
  expect(ranOver(one, "audit", { ...costing(12.338, 2.2), node: MEASURED_ON })).toBe(null)
  expect(ranOver(one, "audit", { ...costing(12.338, 3.2), node: MEASURED_ON })?.path).toBe(BURNS_AT)
})
