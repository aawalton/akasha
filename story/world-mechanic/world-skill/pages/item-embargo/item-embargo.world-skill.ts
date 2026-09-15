import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const itemEmbargo = {
  id: "01a06575-9820-70a9-836e-ef71e1bf9162",
  type: "world-skill",
  slug: "item-embargo",
  title: "Item Embargo",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
