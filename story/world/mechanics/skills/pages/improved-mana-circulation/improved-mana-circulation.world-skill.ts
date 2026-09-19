import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const improvedManaCirculation = {
  id: "01a06575-981e-741e-8a5a-69b7e74944f7",
  type: "page-type/world-skill",
  slug: "improved-mana-circulation",
  title: "Improved Mana Circulation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
