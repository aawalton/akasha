import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bigSpell = {
  id: "01a06575-97f5-7ac5-bd41-4e686d6e492d",
  type: "page-type/world-skill",
  slug: "big-spell",
  title: "Big Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
