import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const lesserToughness = {
  id: "01a06575-9823-7cff-809b-3947c2179523",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "lesser-toughness",
  title: "Lesser Toughness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
