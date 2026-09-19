import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arcedShots = {
  id: "01a06575-97ec-7e7a-9d14-0e40dba7d9d9",
  type: "page-type/world-skill",
  slug: "arced-shots",
  title: "Arced Shots",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
