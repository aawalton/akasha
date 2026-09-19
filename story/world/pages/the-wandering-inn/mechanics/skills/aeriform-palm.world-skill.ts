import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aeriformPalm = {
  id: "01a06575-97ea-74e1-adc1-9f323c07e535",
  type: "page-type/world-skill",
  slug: "aeriform-palm",
  title: "Aeriform Palm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
