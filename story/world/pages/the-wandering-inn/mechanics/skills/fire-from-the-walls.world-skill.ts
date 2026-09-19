import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fireFromTheWalls = {
  id: "01a06575-980c-7dcf-bacb-48c7cb6125d5",
  type: "page-type/world-skill",
  slug: "fire-from-the-walls",
  title: "Fire From the Walls",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
