import { describe, expect, test } from "bun:test"
import { matchPersonaForAgent, type PersonaMatchCandidate } from "./last-messaged.module.code.ts"

const PERSONAS: readonly PersonaMatchCandidate[] = [
  { id: "1", slug: "aria-blue" },
  { id: "2", slug: "nova" },
]

describe("matchPersonaForAgent", () => {
  test("tries the stated persona before the agent's name", () => {
    expect(matchPersonaForAgent("Nova", "Aria Blue", PERSONAS)).toBe("1")
  })

  test("falls back to the agent's name where no persona is stated", () => {
    expect(matchPersonaForAgent("Nova", null, PERSONAS)).toBe("2")
  })

  test("falls back to the agent's name where the stated persona matches nobody", () => {
    expect(matchPersonaForAgent("Nova", "Ghost", PERSONAS)).toBe("2")
  })

  test("answers nothing where neither is given", () => {
    expect(matchPersonaForAgent(null, null, PERSONAS)).toBeNull()
  })

  test("answers nothing where nobody matches", () => {
    expect(matchPersonaForAgent("Ghost", null, PERSONAS)).toBeNull()
  })
})
