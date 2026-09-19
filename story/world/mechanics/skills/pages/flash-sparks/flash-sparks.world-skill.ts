import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashSparks = {
  id: "01a06575-980d-732e-9c3a-dc0cf4569be8",
  type: "page-type/world-skill",
  slug: "flash-sparks",
  title: "Flash Sparks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
