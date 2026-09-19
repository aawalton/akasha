import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aPactOfTrust = {
  id: "01a06575-97e7-737c-a86b-40faae76c1e3",
  type: "page-type/world-skill",
  slug: "a-pact-of-trust",
  title: "A Pact of Trust",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
