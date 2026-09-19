import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const baneArrows = {
  id: "01a06575-97f2-7a7e-81b0-8863471c36b4",
  type: "page-type/world-skill",
  slug: "bane-arrows",
  title: "Bane Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
