import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const couchPotatoExercise = {
  id: "01a06575-97fe-7923-bacd-ec6a606041f5",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "couch-potato-exercise",
  title: "Couch Potato Exercise",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
