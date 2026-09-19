import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const buffArmor = {
  id: "01a06575-97f9-7bda-bb1b-876ffb4328db",
  type: "page-type/world-skill",
  slug: "buff-armor",
  title: "Buff Armor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
