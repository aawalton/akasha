import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const earpiercingWhistle = {
  id: "01a06575-9806-7401-bcaf-9afca31fcb30",
  type: "page-type/world-skill",
  slug: "earpiercing-whistle",
  title: "Earpiercing Whistle",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
