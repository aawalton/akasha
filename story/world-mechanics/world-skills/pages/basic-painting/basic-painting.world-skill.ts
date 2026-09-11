import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicPainting = {
  id: "01a06575-97f4-7e3a-8221-38b751886c36",
  type: "world-skill",
  slug: "basic-painting",
  title: "Basic Painting",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
