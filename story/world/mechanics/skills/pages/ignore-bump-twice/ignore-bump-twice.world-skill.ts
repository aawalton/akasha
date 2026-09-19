import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ignoreBumpTwice = {
  id: "01a06575-981c-7ebf-85db-17ca53b67a97",
  type: "page-type/world-skill",
  slug: "ignore-bump-twice",
  title: "Ignore Bump (Twice)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
