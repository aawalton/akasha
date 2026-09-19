import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodyStoredEnergy = {
  id: "01a06575-97f7-7ee6-aa44-3d78bc376f1a",
  type: "page-type/world-skill",
  slug: "body-stored-energy",
  title: "Body: Stored Energy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
