import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const bodyRegulateTemperature = {
  id: "01a06575-97f7-7320-a315-f712367d3fe3",
  type: "world-skill",
  slug: "body-regulate-temperature",
  title: "Body: Regulate Temperature",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
