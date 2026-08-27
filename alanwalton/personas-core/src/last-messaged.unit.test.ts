import { describe, expect, test } from "bun:test"
import { matchPersonaForAgent } from "./last-messaged"

const PERSONAS = [
  { id: "id-amy", slug: "amy" },
  { id: "id-ali", slug: "ali" },
  { id: "id-nimue", slug: "nimue" },
] as const

describe("matchPersonaForAgent", () => {
  test("matches by the row's classified persona slug → persona id", () => {
    expect(matchPersonaForAgent(null, "amy", PERSONAS)).toBe("id-amy")
    expect(matchPersonaForAgent("whatever", "ali", PERSONAS)).toBe("id-ali")
  })

  test("match is case-insensitive via toPersonaSlug", () => {
    expect(matchPersonaForAgent(null, "AMY", PERSONAS)).toBe("id-amy")
  })

  test("falls back to the agent name when the classified persona does not match", () => {
    expect(matchPersonaForAgent("ali", "none", PERSONAS)).toBe("id-ali")
    expect(matchPersonaForAgent("ali", "unknown", PERSONAS)).toBe("id-ali")
    expect(matchPersonaForAgent("ali", null, PERSONAS)).toBe("id-ali")
  })

  test("the classified persona takes precedence over the name", () => {
    expect(matchPersonaForAgent("ali", "amy", PERSONAS)).toBe("id-amy")
  })

  test("multi-word-title persona matches by her single-segment slug", () => {
    expect(matchPersonaForAgent(null, "nimue", PERSONAS)).toBe("id-nimue")
  })

  test("no persona matches the agent → null (non-persona agent)", () => {
    expect(matchPersonaForAgent("devops-manager", "worker", PERSONAS)).toBe(null)
    expect(matchPersonaForAgent(null, "", PERSONAS)).toBe(null)
  })
})
