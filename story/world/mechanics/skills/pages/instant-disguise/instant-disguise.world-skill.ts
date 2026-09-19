import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const instantDisguise = {
  id: "01a06575-981f-708c-a5a9-8f02b63da80e",
  type: "page-type/world-skill",
  slug: "instant-disguise",
  title: "Instant Disguise",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
