import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const boonOfSaliss = {
  id: "01a06575-97f7-7b4e-8998-0608ba418179",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "boon-of-saliss",
  title: "Boon of Saliss",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
