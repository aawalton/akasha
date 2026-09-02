import { describe, expect, test } from "bun:test"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { MAX_COMPANION_RAPPORT } from "../companion-rapport/companion-rapport.module.code.ts"
import type { AccountQuestUnionProgress } from "../completion-account-union-progress/completion-account-union-progress.module.code.ts"
import type { CompanionProgressEntry } from "../completion-ui-types/completion-ui-types.module.code.ts"
import { buildCompanionSummary } from "./completion-summary-companion.module.code.ts"

const EMPTY_QUEST_UNION: AccountQuestUnionProgress = {
  zones: [],
  completedCount: 0,
  totalCount: 0,
}

function companionEntry(
  companionId: CompanionId,
  name: string,
  rapport: number
): CompanionProgressEntry {
  return { companionId, name, level: 20, maxLevel: 20, rapport } satisfies CompanionProgressEntry
}

function unmeasuredCompanionEntry(
  companionId: CompanionId,
  name: string,
  rapport: number
): CompanionProgressEntry {
  return { companionId, name, maxLevel: 20, rapport } satisfies CompanionProgressEntry
}

describe("buildCompanionSummary counts companion rapport in points", () => {
  test("the rapport total is the companion count times the rapport ceiling", () => {
    const progress = [
      companionEntry("bastian", "Bastian Hallix", 4000),
      companionEntry("mirri", "Mirri Elendis", 2009),
    ]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-rapport"].total).toBe(2 * MAX_COMPANION_RAPPORT)
  })

  test("the rapport count is the raw points summed across companions", () => {
    const progress = [
      companionEntry("bastian", "Bastian Hallix", 4000),
      companionEntry("mirri", "Mirri Elendis", 2009),
    ]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-rapport"].count).toBe(6009)
  })
})

describe("buildCompanionSummary counts companion levels only where they were measured", () => {
  test("an unmeasured companion adds to neither the count nor the total", () => {
    const progress = [
      unmeasuredCompanionEntry("bastian", "Bastian Hallix", 0),
      unmeasuredCompanionEntry("mirri", "Mirri Elendis", 0),
    ]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-level"]).toEqual({ count: 0, total: 0 })
  })

  test("a measured companion adds to both", () => {
    const progress = [companionEntry("bastian", "Bastian Hallix", 0)]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-level"]).toEqual({ count: 20, total: 20 })
  })

  test("a mixed roster narrows the total to the measured companions", () => {
    const progress = [
      companionEntry("bastian", "Bastian Hallix", 0),
      unmeasuredCompanionEntry("mirri", "Mirri Elendis", 0),
    ]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-level"]).toEqual({ count: 20, total: 20 })
  })

  test("a measured level of 0 still adds its total", () => {
    const progress = [{ ...companionEntry("bastian", "Bastian Hallix", 0), level: 0 }]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-level"]).toEqual({ count: 0, total: 20 })
  })

  test("companion rapport is left whole when the levels are unmeasured", () => {
    const progress = [
      unmeasuredCompanionEntry("bastian", "Bastian Hallix", 4000),
      unmeasuredCompanionEntry("mirri", "Mirri Elendis", 2009),
    ]
    const summary = buildCompanionSummary(progress, [], EMPTY_QUEST_UNION)
    expect(summary["companion-rapport"]).toEqual({
      count: 6009,
      total: 2 * MAX_COMPANION_RAPPORT,
    })
  })
})
