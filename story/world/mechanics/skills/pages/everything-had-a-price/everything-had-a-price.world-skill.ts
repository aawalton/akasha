import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const everythingHadAPrice = {
  id: "01a06575-9809-7d82-891c-3b333d4f3861",
  type: "page-type/world-skill",
  slug: "everything-had-a-price",
  title: "Everything Had a Price",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
