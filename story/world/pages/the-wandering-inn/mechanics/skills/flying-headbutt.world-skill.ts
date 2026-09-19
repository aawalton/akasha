import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flyingHeadbutt = {
  id: "01a06575-980f-7128-8d45-ad5bf106654c",
  type: "page-type/world-skill",
  slug: "flying-headbutt",
  title: "Flying Headbutt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
