import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const alwaysFindARockSling = {
  id: "01a06575-97eb-7780-9d1e-831a7e4b380d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "always-find-a-rock-sling",
  title: "Always Find A Rock (Sling)",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
