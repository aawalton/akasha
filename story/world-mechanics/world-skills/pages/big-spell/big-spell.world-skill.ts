import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const bigSpell = {
  id: "01a06575-97f5-7ac5-bd41-4e686d6e492d",
  type: "world-skill",
  slug: "big-spell",
  title: "Big Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
