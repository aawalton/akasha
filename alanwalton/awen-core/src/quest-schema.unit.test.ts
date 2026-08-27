import { describe, expect, it } from "bun:test"
import { QUEST_STATUSES, QuestSchema } from "./quest-schema"

describe("QuestSchema", () => {
  const valid = {
    id: "reach-floor-3",
    title: "Ascend the Hotel",
    objective: "Reach the third floor",
    conditions: ["Clear the second-floor lobby"],
    reward: "+1 Stamina",
    status: "active" as const,
  }

  it("accepts a fully-populated structured quest", () => {
    expect(QuestSchema.parse(valid)).toEqual(valid)
  })

  it("accepts the minimal required shape (no optionals)", () => {
    const minimal = { id: "q1", title: "T", objective: "O", status: "active" as const }
    expect(QuestSchema.parse(minimal)).toEqual(minimal)
  })

  it("carries the two lifecycle statuses (acceptance is automatic, #15331)", () => {
    expect(QUEST_STATUSES).toEqual(["active", "complete"])
  })

  it("coerces a legacy stored 'offered' status → 'active'", () => {
    expect(QuestSchema.parse({ ...valid, status: "offered" })).toEqual({
      ...valid,
      status: "active",
    })
  })

  for (const prose of ["text", "description", "narration", "body", "prose", "flavor"]) {
    it(`rejects the free-prose slot "${prose}" (mute by construction)`, () => {
      expect(() => QuestSchema.parse({ ...valid, [prose]: "The System intones…" })).toThrow()
    })
  }

  it("rejects an out-of-enum status", () => {
    expect(() => QuestSchema.parse({ ...valid, status: "abandoned" })).toThrow()
  })
})
