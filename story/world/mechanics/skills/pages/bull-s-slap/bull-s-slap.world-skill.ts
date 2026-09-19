import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bullSSlap = {
  id: "01a06575-97f9-7baa-83a8-8b58019d270f",
  type: "page-type/world-skill",
  slug: "bull-s-slap",
  title: "Bull’s Slap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
