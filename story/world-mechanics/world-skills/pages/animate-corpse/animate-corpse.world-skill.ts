import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const animateCorpse = {
  id: "01a06575-97eb-7aab-8167-a58ed3363b88",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "animate-corpse",
  title: "Animate Corpse",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
