import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterBlessingOfArmor = {
  id: "01a06575-9816-708a-ae01-1336d8d71fab",
  type: "page-type/world-skill",
  slug: "greater-blessing-of-armor",
  title: "Greater Blessing of Armor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
