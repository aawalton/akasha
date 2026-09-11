import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const lesserDexterity = {
  id: "01a06575-9822-7cd5-858f-78604ed3b542",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "lesser-dexterity",
  title: "Lesser Dexterity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
