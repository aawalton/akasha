import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armformDuelist = {
  id: "01a06575-97ec-7e2d-a10b-78075d01a2d7",
  type: "page-type/world-skill",
  slug: "armform-duelist",
  title: "Armform: Duelist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
