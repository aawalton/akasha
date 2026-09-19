import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const drawMyThunderingHeart = {
  id: "01a06575-9805-70d0-8448-f4dbc1d2ce70",
  type: "page-type/world-skill",
  slug: "draw-my-thundering-heart",
  title: "Draw My Thundering Heart",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
