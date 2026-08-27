import { describe, expect, test } from "bun:test"
import type { PendingActionInput } from "./client-envelope"
import { selectPendingActions } from "./pending-actions"

const a = (text: string, submittedAt: number): PendingActionInput => ({ text, submittedAt })

describe("selectPendingActions — pending iff after the revealed frontier", () => {
  test("no commits (both null): every action is pending, oldest-first", () => {
    const actions = [a("two", 200), a("one", 100), a("three", 300)]
    expect(selectPendingActions(actions, null, null)).toEqual([
      a("one", 100),
      a("two", 200),
      a("three", 300),
    ])
  })

  test("empty actions: empty result regardless of frontier", () => {
    expect(selectPendingActions([], 500, 400)).toEqual([])
    expect(selectPendingActions([], null, null)).toEqual([])
  })

  test("latest turn newer than some actions: only actions after the turn are pending", () => {
    const actions = [a("old", 100), a("mid", 200), a("new", 300)]
    expect(selectPendingActions(actions, 200, null)).toEqual([a("new", 300)])
  })

  test("action exactly at the frontier is NOT pending (strict greater-than)", () => {
    const actions = [a("edge", 200), a("after", 201)]
    expect(selectPendingActions(actions, 200, null)).toEqual([a("after", 201)])
  })

  test("state frontier applies the same way as a turn frontier (beat/state game)", () => {
    const actions = [a("old", 100), a("new", 300)]
    expect(selectPendingActions(actions, null, 200)).toEqual([a("new", 300)])
  })

  test("both frontiers set: the MAX of the two is the cutoff (covers both shapes)", () => {
    const actions = [a("a1", 150), a("a2", 250), a("a3", 350)]
    expect(selectPendingActions(actions, 100, 300)).toEqual([a("a3", 350)])
    expect(selectPendingActions(actions, 300, 100)).toEqual([a("a3", 350)])
  })

  test("two actions before any response: both pending, in submitted order", () => {
    const actions = [a("look", 100), a("wait", 200)]
    expect(selectPendingActions(actions, null, null)).toEqual([a("look", 100), a("wait", 200)])
  })

  test("two actions, then a response commits after both: neither pending", () => {
    const actions = [a("look", 100), a("wait", 200)]
    expect(selectPendingActions(actions, 300, null)).toEqual([])
  })

  test("unsorted input is returned oldest-first", () => {
    const actions = [a("c", 300), a("a", 100), a("b", 200)]
    expect(selectPendingActions(actions, 50, null)).toEqual([a("a", 100), a("b", 200), a("c", 300)])
  })
})
