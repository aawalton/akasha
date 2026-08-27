import { describe, expect, it } from "bun:test"
import {
  deriveStatusAssessment,
  ItemAwardSchema,
  QuestWindowSchema,
  StatusAssessmentSchema,
  SystemChoiceSchema,
  SystemWindowSchema,
  TalentActivationSchema,
} from "./system-window-schema"

describe("SystemWindowSchema", () => {
  it("accepts a quest-added window", () => {
    const w = {
      type: "quest-added" as const,
      quest: { title: "Ascend", objective: "Reach floor 3" },
    }
    expect(SystemWindowSchema.parse(w)).toEqual(w)
  })

  it("aliases a legacy 'quest-offer' window → 'quest-added'", () => {
    const legacy = {
      type: "quest-offer" as const,
      quest: { title: "Ascend", objective: "Reach floor 3" },
    }
    expect(SystemWindowSchema.parse(legacy)).toEqual({
      type: "quest-added",
      quest: { title: "Ascend", objective: "Reach floor 3" },
    })
  })

  it("accepts a quest-complete window", () => {
    const w = {
      type: "quest-complete" as const,
      quest: { id: "q1", title: "Ascend", objective: "Reach floor 3", reward: "+1 Stamina" },
    }
    expect(SystemWindowSchema.parse(w)).toEqual(w)
  })

  it("accepts an item-award window (name + labeled descriptor lines)", () => {
    const w = {
      type: "item-award" as const,
      award: {
        id: "cloak-1",
        item: "Cloak of the Wanderer",
        descriptors: [
          { label: "Effect", value: "+2 stealth in shadow" },
          { label: "Source", value: "third-floor cache" },
        ],
      },
    }
    expect(SystemWindowSchema.parse(w)).toEqual(w)
  })

  it("accepts a minimal item-award window (name only, no descriptors)", () => {
    const w = { type: "item-award" as const, award: { item: "Brass Key" } }
    expect(SystemWindowSchema.parse(w)).toEqual(w)
  })

  it("rejects an item-award descriptor missing its value (a labeled datum, not free prose)", () => {
    expect(() =>
      ItemAwardSchema.parse({ item: "Cloak", descriptors: [{ label: "Effect" }] })
    ).toThrow()
  })

  it("rejects an item-award with a free-prose 'lines' array (the forbidden voiced shape)", () => {
    expect(() => ItemAwardSchema.parse({ item: "Cloak", lines: ["The System intones…"] })).toThrow()
  })

  it("accepts a status-assessment window", () => {
    const w = {
      type: "status-assessment" as const,
      assessment: {
        name: "Alan",
        level: 1,
        class: "None",
        attributes: { WILL: 16 },
        pools: { health: 70 },
      },
    }
    expect(SystemWindowSchema.parse(w)).toEqual(w)
  })

  it("accepts a talent-activation window", () => {
    const w = {
      type: "talent-activation" as const,
      activation: {
        holder: "Nyx",
        talent: "unknown",
        status: "first activation",
        note: "selection required",
      },
    }
    expect(SystemWindowSchema.parse(w)).toEqual(w)
  })

  it("accepts a system-choice window (unresolved and resolved)", () => {
    const unresolved = {
      type: "system-choice" as const,
      choice: {
        id: "perk-1",
        title: "Choose a perk",
        prompt: "Bind one talent to your companion.",
        options: [
          { id: "ironhide", label: "Ironhide", detail: "+2 armor" },
          { id: "swiftness", label: "Swiftness" },
        ],
      },
    }
    expect(SystemWindowSchema.parse(unresolved)).toEqual(unresolved)
    const resolved = {
      type: "system-choice" as const,
      choice: { ...unresolved.choice, selectedOptionId: "ironhide" },
    }
    expect(SystemWindowSchema.parse(resolved)).toEqual(resolved)
  })

  it("rejects a system-choice window with no options (an empty choice is not a choice)", () => {
    expect(() => SystemChoiceSchema.parse({ id: "c1", title: "Pick", options: [] })).toThrow()
  })

  it("accepts a level-up window (level only, and level + attrPoints)", () => {
    const bare = { type: "level-up" as const, level: 5 }
    expect(SystemWindowSchema.parse(bare)).toEqual(bare)
    const withPoints = { type: "level-up" as const, level: 7, attrPoints: 3 }
    expect(SystemWindowSchema.parse(withPoints)).toEqual(withPoints)
  })

  it("accepts a skill window (name only, and name + rank)", () => {
    const bare = { type: "skill" as const, skill: "Chain Whip" }
    expect(SystemWindowSchema.parse(bare)).toEqual(bare)
    const withRank = { type: "skill" as const, skill: "Smithing", rank: "Apprentice" }
    expect(SystemWindowSchema.parse(withRank)).toEqual(withRank)
  })

  it("accepts an affinity window", () => {
    const w = { type: "affinity" as const, affinity: "Force Affinity" }
    expect(SystemWindowSchema.parse(w)).toEqual(w)
  })

  it("accepts a class window", () => {
    const w = { type: "class" as const, class: "Ironbound" }
    expect(SystemWindowSchema.parse(w)).toEqual(w)
  })

  it("accepts a title window", () => {
    const w = { type: "title" as const, title: "Tower-Climber" }
    expect(SystemWindowSchema.parse(w)).toEqual(w)
  })

  it("rejects a level-up window with a non-numeric level", () => {
    expect(() => SystemWindowSchema.parse({ type: "level-up", level: "5" })).toThrow()
  })

  it("rejects an unknown window type", () => {
    expect(() => SystemWindowSchema.parse({ type: "stat-gain", payload: {} })).toThrow()
  })

  for (const prose of ["text", "description", "narration", "body"]) {
    it(`quest payload rejects the prose slot "${prose}"`, () => {
      expect(() =>
        QuestWindowSchema.parse({ title: "T", objective: "O", [prose]: "The System intones…" })
      ).toThrow()
    })
    it(`status-assessment payload rejects the prose slot "${prose}"`, () => {
      expect(() => StatusAssessmentSchema.parse({ name: "Alan", [prose]: "…" })).toThrow()
    })
    it(`item-award payload rejects the prose slot "${prose}"`, () => {
      expect(() =>
        ItemAwardSchema.parse({ item: "Cloak", [prose]: "The System intones…" })
      ).toThrow()
    })
    it(`talent-activation payload rejects the prose slot "${prose}"`, () => {
      expect(() =>
        TalentActivationSchema.parse({
          holder: "Nyx",
          talent: "unknown",
          status: "first activation",
          [prose]: "The System intones…",
        })
      ).toThrow()
    })
    it(`system-choice payload rejects the prose slot "${prose}"`, () => {
      expect(() =>
        SystemChoiceSchema.parse({
          id: "c1",
          title: "Pick",
          options: [{ id: "a", label: "A" }],
          [prose]: "The System intones…",
        })
      ).toThrow()
    })
    it(`level-up window rejects the prose slot "${prose}"`, () => {
      expect(() =>
        SystemWindowSchema.parse({ type: "level-up", level: 5, [prose]: "The System intones…" })
      ).toThrow()
    })
    it(`skill window rejects the prose slot "${prose}"`, () => {
      expect(() =>
        SystemWindowSchema.parse({ type: "skill", skill: "Smithing", [prose]: "…" })
      ).toThrow()
    })
    it(`affinity window rejects the prose slot "${prose}"`, () => {
      expect(() =>
        SystemWindowSchema.parse({ type: "affinity", affinity: "Force Affinity", [prose]: "…" })
      ).toThrow()
    })
    it(`class window rejects the prose slot "${prose}"`, () => {
      expect(() =>
        SystemWindowSchema.parse({ type: "class", class: "Ironbound", [prose]: "…" })
      ).toThrow()
    })
    it(`title window rejects the prose slot "${prose}"`, () => {
      expect(() =>
        SystemWindowSchema.parse({ type: "title", title: "Tower-Climber", [prose]: "…" })
      ).toThrow()
    })
  }

  it("status-assessment rejects a non-numeric attribute value", () => {
    expect(() =>
      StatusAssessmentSchema.parse({ name: "Alan", attributes: { WILL: "high" } })
    ).toThrow()
  })
})

describe("deriveStatusAssessment", () => {
  it("projects a revealed sheet + hud pools into a mute readout", () => {
    const assessment = deriveStatusAssessment(
      { name: "Alan", level: 1, class: "None", attributes: { WILL: 16, MIGHT: 11 } },
      { health: 70, mana: 104 }
    )
    expect(assessment).toEqual({
      name: "Alan",
      level: 1,
      class: "None",
      attributes: { WILL: 16, MIGHT: 11 },
      pools: { health: 70, mana: 104 },
    })
  })

  it("drops non-numeric attribute values (honest numeric readout)", () => {
    const assessment = deriveStatusAssessment({
      name: "Alan",
      attributes: { WILL: 16, aura: { hidden: true } },
    })
    expect(assessment.attributes).toEqual({ WILL: 16 })
  })

  it("falls back to kind when the sheet is unnamed", () => {
    expect(deriveStatusAssessment({ kind: "wraith" }).name).toBe("wraith")
  })

  it("fails loud when the sheet has neither name nor kind (no subject)", () => {
    expect(() => deriveStatusAssessment({ level: 3 })).toThrow()
  })

  it("omits empty attributes/pools rather than emitting empty records", () => {
    const assessment = deriveStatusAssessment({ name: "Alan" }, {})
    expect(assessment).toEqual({ name: "Alan" })
  })
})
