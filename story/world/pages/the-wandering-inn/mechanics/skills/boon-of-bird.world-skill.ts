import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boonOfBird = {
  id: "01a06575-97f7-70e1-90b3-f7db3eaf48fa",
  type: "page-type/world-skill",
  slug: "boon-of-bird",
  title: "Boon of Bird",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
