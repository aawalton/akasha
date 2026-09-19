import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const declareFoeBaneFurniture = {
  id: "01a06575-9802-7ce8-92da-c31eeaa8159e",
  type: "page-type/world-skill",
  slug: "declare-foe-bane-furniture",
  title: "Declare Foe: Bane (Furniture)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
