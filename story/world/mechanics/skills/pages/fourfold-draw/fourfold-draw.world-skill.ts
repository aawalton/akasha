import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fourfoldDraw = {
  id: "01a06575-9810-74fa-82ba-1ceb57f09a37",
  type: "page-type/world-skill",
  slug: "fourfold-draw",
  title: "Fourfold Draw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
