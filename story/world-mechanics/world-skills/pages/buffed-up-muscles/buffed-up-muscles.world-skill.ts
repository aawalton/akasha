import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const buffedUpMuscles = {
  id: "01a06575-97f9-7982-ac85-e2c5f866912d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "buffed-up-muscles",
  title: "Buffed Up Muscles",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
