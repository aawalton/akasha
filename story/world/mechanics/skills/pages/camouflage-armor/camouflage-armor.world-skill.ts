import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const camouflageArmor = {
  id: "01a06575-97fa-74b9-924d-257cc7df9f18",
  type: "page-type/world-skill",
  slug: "camouflage-armor",
  title: "Camouflage Armor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
