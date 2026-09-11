import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const doormatOfCleanliness = {
  id: "01a06575-9805-7f0b-ade9-221ca429c076",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "doormat-of-cleanliness",
  title: "Doormat of Cleanliness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
