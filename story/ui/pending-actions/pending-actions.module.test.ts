import { describe, expect, test } from "bun:test"
import { selectPendingActions } from "./pending-actions.module.code.ts"

const at = (submittedAt: number, text = "act"): { text: string; submittedAt: number } => ({
  text,
  submittedAt,
})

describe("selectPendingActions", () => {
  test("keeps only what was submitted after the newer of the two times", () => {
    const actions = [at(10), at(20), at(30)]
    expect(selectPendingActions(actions, 15, 25).map((a) => a.submittedAt)).toEqual([30])
  })

  test("takes the turn time when no state time is given", () => {
    const actions = [at(10), at(30)]
    expect(selectPendingActions(actions, 20, null).map((a) => a.submittedAt)).toEqual([30])
  })

  test("keeps everything when neither time is given", () => {
    const actions = [at(2), at(1)]
    expect(selectPendingActions(actions, null, null).map((a) => a.submittedAt)).toEqual([1, 2])
  })

  test("orders what it keeps oldest first", () => {
    const actions = [at(50), at(31), at(42)]
    expect(selectPendingActions(actions, 30, 30).map((a) => a.submittedAt)).toEqual([31, 42, 50])
  })

  test("drops an action submitted at the very frontier", () => {
    expect(selectPendingActions([at(30)], 30, null)).toEqual([])
  })

  test("is empty when nothing is pending", () => {
    expect(selectPendingActions([], 1, 2)).toEqual([])
  })
})
