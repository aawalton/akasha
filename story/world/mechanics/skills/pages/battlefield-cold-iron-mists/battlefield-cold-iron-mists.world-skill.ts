import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battlefieldColdIronMists = {
  id: "01a06575-97f4-7a24-af8f-3ad0b8a808bb",
  type: "page-type/world-skill",
  slug: "battlefield-cold-iron-mists",
  title: "Battlefield – Cold Iron Mists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
