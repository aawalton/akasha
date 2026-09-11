import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const instantaneousBarrage = {
  id: "01a06575-981f-7ddd-9c34-91e69c9ef7a2",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "instantaneous-barrage",
  title: "Instantaneous Barrage",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
