import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const handOfGod = {
  id: "01a06575-9818-727d-9096-06bfa52f4ee4",
  type: "page-type/world-skill",
  slug: "hand-of-god",
  title: "Hand of God",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
