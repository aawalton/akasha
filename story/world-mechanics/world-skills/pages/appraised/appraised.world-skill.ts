import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const appraised = {
  id: "01a06575-97ec-7863-8a40-bc26badfcc6a",
  type: "world-skill",
  slug: "appraised",
  title: "Appraised",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
