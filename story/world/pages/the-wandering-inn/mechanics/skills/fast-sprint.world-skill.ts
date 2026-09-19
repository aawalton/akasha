import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastSprint = {
  id: "01a06575-980c-73ab-b3f2-43025605261d",
  type: "page-type/world-skill",
  slug: "fast-sprint",
  title: "Fast Sprint",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
