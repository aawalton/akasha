import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectTemperatureControl = {
  id: "01a0657d-028f-7824-9a55-37b2a9365aa1",
  type: "page-type/world-skill",
  slug: "perfect-temperature-control",
  title: "Perfect Temperature Control",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
