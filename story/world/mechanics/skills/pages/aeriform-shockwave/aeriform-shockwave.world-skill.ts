import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aeriformShockwave = {
  id: "01a06575-97ea-71e8-acf4-b204c3e9bfa5",
  type: "page-type/world-skill",
  slug: "aeriform-shockwave",
  title: "Aeriform Shockwave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
