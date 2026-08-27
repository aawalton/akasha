import { describe, expect, test } from "bun:test"
import { applyIntent } from "../idle-actions"
import { freshState, NOW, ownedState } from "./test-helpers"

describe("idle-actions — team", () => {
  test("sets the active lineup over owned members without spending resource", () => {
    const s = ownedState(1, { resource: 500 })
    const { state, outcome } = applyIntent(s, { type: "team", members: ["aura", "abby"] }, NOW)
    expect(outcome).toEqual({ applied: true })
    expect(state.activeTeam).toEqual(["aura", "abby"])
    expect(state.resource).toBe(500)
    expect(state.lineupSince).toBe(NOW)
  })

  test("a lineup change applies even at zero resource (no affordability gate)", () => {
    const s = ownedState(1)
    const { state, outcome } = applyIntent(s, { type: "team", members: ["aura", "abby"] }, NOW)
    expect(outcome).toEqual({ applied: true })
    expect(state.activeTeam).toEqual(["aura", "abby"])
    expect(state.resource).toBe(0)
  })

  test("re-submitting the identical lineup preserves the cohesion streak", () => {
    const s = ownedState(1, { activeTeam: ["aura", "abby"], resource: 500, lineupSince: NOW })
    const { state, outcome } = applyIntent(s, { type: "team", members: ["aura", "abby"] }, NOW + 5)
    expect(outcome).toEqual({ applied: true })
    expect(state.resource).toBe(500)
    expect(state.lineupSince).toBe(NOW)
  })

  test("empty members clears the lineup", () => {
    const s = ownedState(1, { activeTeam: ["aura", "abby"], resource: 500 })
    const { state, outcome } = applyIntent(s, { type: "team", members: [] }, NOW)
    expect(outcome).toEqual({ applied: true, reason: "cleared" })
    expect(state.activeTeam).toEqual([])
    expect(state.resource).toBe(500)
  })

  test("over the seat cap is rejected", () => {
    const s = ownedState(1)
    const { outcome } = applyIntent(
      s,
      { type: "team", members: ["aura", "abby", "aelwyn", "ali"] },
      NOW
    )
    expect(outcome).toEqual({ applied: false, reason: "over-cap" })
  })

  test("an unowned member is rejected", () => {
    const s = freshState(0)
    const { outcome } = applyIntent(s, { type: "team", members: ["aura", "amy"] }, NOW)
    expect(outcome).toEqual({ applied: false, reason: "not-owned" })
  })
})
