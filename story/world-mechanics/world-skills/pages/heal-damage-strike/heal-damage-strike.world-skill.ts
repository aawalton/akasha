import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const healDamageStrike = {
  id: "01a06575-9819-7c04-9a12-d36e866f7633",
  type: "world-skill",
  slug: "heal-damage-strike",
  title: "Heal Damage — Strike",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
