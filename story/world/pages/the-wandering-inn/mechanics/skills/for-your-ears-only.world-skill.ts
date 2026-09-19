import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const forYourEarsOnly = {
  id: "01a06575-980f-7927-9c8d-187ffcbe5f7a",
  type: "page-type/world-skill",
  slug: "for-your-ears-only",
  title: "For Your Ears Only",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
