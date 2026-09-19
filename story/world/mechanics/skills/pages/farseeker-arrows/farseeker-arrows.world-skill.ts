import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const farseekerArrows = {
  id: "01a06575-980b-7b70-963d-3fe6698868f6",
  type: "page-type/world-skill",
  slug: "farseeker-arrows",
  title: "Farseeker Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
