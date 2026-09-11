import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fastBoiling = {
  id: "01a06575-980b-7712-b82a-142c9aa64a06",
  type: "world-skill",
  slug: "fast-boiling",
  title: "Fast Boiling",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
