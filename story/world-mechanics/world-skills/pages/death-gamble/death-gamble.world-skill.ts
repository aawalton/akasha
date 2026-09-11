import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const deathGamble = {
  id: "01a06575-9802-7cab-b36b-a9040d69b096",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "death-gamble",
  title: "Death Gamble",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
