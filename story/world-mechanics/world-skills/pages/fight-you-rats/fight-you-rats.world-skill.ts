import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fightYouRats = {
  id: "01a06575-980c-7c35-8ab5-2e005b1a213b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "fight-you-rats",
  title: "Fight, You Rats",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
