import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armorpiercingBlows = {
  id: "01a06575-97ec-724c-89b0-413009186b2b",
  type: "page-type/world-skill",
  slug: "armorpiercing-blows",
  title: "Armorpiercing Blows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
