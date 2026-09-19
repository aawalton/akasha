import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fireMagnet = {
  id: "01a06575-980c-71fe-ac8d-6f7773e734ac",
  type: "page-type/world-skill",
  slug: "fire-magnet",
  title: "Fire Magnet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
