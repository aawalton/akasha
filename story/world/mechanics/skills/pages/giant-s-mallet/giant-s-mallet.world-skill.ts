import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giantSMallet = {
  id: "01a06575-9814-7091-b854-4fd9d61cadcd",
  type: "page-type/world-skill",
  slug: "giant-s-mallet",
  title: "Giant’s Mallet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
