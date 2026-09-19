import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const forgedByDeed = {
  id: "01a06575-9810-736f-82be-c98ad0c85b83",
  type: "page-type/world-skill",
  slug: "forged-by-deed",
  title: "Forged By Deed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
