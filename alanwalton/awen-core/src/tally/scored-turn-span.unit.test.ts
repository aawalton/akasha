import { describe, expect, test } from "bun:test"
import { scoredTurnSpan } from "../tally"
import { bTurn } from "./fixtures"

describe("scoredTurnSpan (#15717 turnRange fix)", () => {
  test("min..max of turnNumbers present — the SCORED span, not the requested filter", () => {
    expect(scoredTurnSpan([bTurn("a.", 56), bTurn("b.", 87), bTurn("c.", 70)])).toEqual({
      from: 56,
      to: 87,
    })
  })

  test("null when no scored turn carries a turnNumber (or none scored)", () => {
    expect(scoredTurnSpan([])).toBeNull()
    expect(scoredTurnSpan([{ externalId: "x", text: "a." }])).toBeNull()
  })

  test("a single scored turn spans itself", () => {
    expect(scoredTurnSpan([bTurn("a.", 5)])).toEqual({ from: 5, to: 5 })
  })
})
