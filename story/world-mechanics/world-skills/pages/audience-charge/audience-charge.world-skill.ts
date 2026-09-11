import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const audienceCharge = {
  id: "01a06575-97ee-77c2-b455-e0039210849c",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "audience-charge",
  title: "Audience Charge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
