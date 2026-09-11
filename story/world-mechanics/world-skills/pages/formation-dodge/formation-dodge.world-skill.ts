import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const formationDodge = {
  id: "01a06575-9810-7a1b-9e8b-352446a849d2",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "formation-dodge",
  title: "Formation: Dodge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
