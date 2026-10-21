import { describe, expect, test } from "bun:test"
import { classMasteryOf } from "akasha/temper/catalog/skill/modules/character-templates-reading/character-templates-reading.module.code.ts"

const READING = {
  keyOf: (said: unknown) => `key of ${String(said)}`,
  effectsOf: () => [{ metricId: "critical-damage" }],
}

describe("classMasteryOf", () => {
  test("reads a class mastery page with the class it names as that class's key", () => {
    const mastery = classMasteryOf(
      {
        slug: "above-and-beyond",
        key: "above-and-beyond",
        title: "Above and Beyond",
        description: "Increases your Critical Damage and Healing by 25%.",
        esoSkillId: 263605,
        class: "the class",
      },
      READING
    )
    expect(mastery).toEqual({
      id: "above-and-beyond",
      name: "Above and Beyond",
      description: "Increases your Critical Damage and Healing by 25%.",
      esoSkillId: 263605,
      classId: "key of the class",
      effects: [{ metricId: "critical-damage" } as never],
    })
  })
})
