import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const graniteSArmor = {
  id: "01a06575-9816-763a-a9b4-95fb0a3db4bc",
  type: "page-type/world-skill",
  slug: "granite-s-armor",
  title: "Granite’s Armor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
