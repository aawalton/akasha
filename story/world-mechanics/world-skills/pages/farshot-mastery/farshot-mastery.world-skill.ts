import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const farshotMastery = {
  id: "01a06575-980b-72b5-a4e5-2fcfcfc83092",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "farshot-mastery",
  title: "Farshot Mastery",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
