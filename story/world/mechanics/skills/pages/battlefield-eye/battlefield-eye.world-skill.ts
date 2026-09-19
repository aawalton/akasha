import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const battlefieldEye = {
  id: "01a06575-97f4-79a8-8382-e7587dffe9d7",
  type: "page-type/world-skill",
  slug: "battlefield-eye",
  title: "Battlefield Eye",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
