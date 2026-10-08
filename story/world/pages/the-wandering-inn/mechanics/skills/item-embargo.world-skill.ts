import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const itemEmbargo = {
  id: "01a06575-9820-70a9-836e-ef71e1bf9162",
  type: "page-type/world-skill",
  slug: "item-embargo",
  title: "Item Embargo",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.608Z",
  updatedAt: "2026-09-22T13:32:35.000Z",
} as const satisfies WorldSkill
