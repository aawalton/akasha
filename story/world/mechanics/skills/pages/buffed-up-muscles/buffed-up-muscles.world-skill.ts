import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const buffedUpMuscles = {
  id: "01a06575-97f9-7982-ac85-e2c5f866912d",
  type: "page-type/world-skill",
  slug: "buffed-up-muscles",
  title: "Buffed Up Muscles",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
