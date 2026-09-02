import { describe, expect, test } from "bun:test"
import {
  type CompanionStatsPanelInput,
  deriveCompanionStatsPanelState,
} from "./companion-stats-panel-state.module.code.ts"

function input(overrides: Partial<CompanionStatsPanelInput> = {}): CompanionStatsPanelInput {
  return { hasCompanion: true, isLoading: false, hasError: false, statCount: 12, ...overrides }
}

describe("deriveCompanionStatsPanelState", () => {
  test("asks for a companion before anything else", () => {
    expect(deriveCompanionStatsPanelState(input({ hasCompanion: false, hasError: true }))).toBe(
      "no-companion"
    )
  })

  test("reports the calculation as still running before judging its output", () => {
    expect(deriveCompanionStatsPanelState(input({ isLoading: true, statCount: 0 }))).toBe(
      "calculating"
    )
  })

  test("a failed calculation is never reported as a finished, empty result", () => {
    const state = deriveCompanionStatsPanelState(input({ hasError: true, statCount: 0 }))
    expect(state).toBe("calculation-failed")
    expect(state).not.toBe("no-stats")
  })

  test("a failure outranks stats left over from an earlier build", () => {
    expect(deriveCompanionStatsPanelState(input({ hasError: true, statCount: 40 }))).toBe(
      "calculation-failed"
    )
  })

  test("reports an empty result only when the calculation actually succeeded", () => {
    expect(deriveCompanionStatsPanelState(input({ statCount: 0 }))).toBe("no-stats")
  })

  test("shows stats once the calculation reports any", () => {
    expect(deriveCompanionStatsPanelState(input({ statCount: 1 }))).toBe("stats")
  })
})
