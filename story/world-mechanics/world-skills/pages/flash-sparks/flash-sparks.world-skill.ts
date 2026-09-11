import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flashSparks = {
  id: "01a06575-980d-732e-9c3a-dc0cf4569be8",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "flash-sparks",
  title: "Flash Sparks",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
