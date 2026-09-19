import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodyOfStone = {
  id: "01a06575-97f7-72bc-9719-a2e1459d938a",
  type: "page-type/world-skill",
  slug: "body-of-stone",
  title: "Body of Stone",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
