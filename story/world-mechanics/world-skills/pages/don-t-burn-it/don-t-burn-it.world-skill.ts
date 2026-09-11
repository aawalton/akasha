import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const donTBurnIt = {
  id: "01a06575-9804-742f-aea9-b5f373c75fdf",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "don-t-burn-it",
  title: "Don’t Burn It",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
