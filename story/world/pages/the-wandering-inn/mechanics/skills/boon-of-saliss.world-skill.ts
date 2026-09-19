import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boonOfSaliss = {
  id: "01a06575-97f7-7b4e-8998-0608ba418179",
  type: "page-type/world-skill",
  slug: "boon-of-saliss",
  title: "Boon of Saliss",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
