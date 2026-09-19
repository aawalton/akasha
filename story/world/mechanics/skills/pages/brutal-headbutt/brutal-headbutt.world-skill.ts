import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const brutalHeadbutt = {
  id: "01a06575-97f9-7e1c-83f6-f745e07f1415",
  type: "page-type/world-skill",
  slug: "brutal-headbutt",
  title: "Brutal Headbutt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
