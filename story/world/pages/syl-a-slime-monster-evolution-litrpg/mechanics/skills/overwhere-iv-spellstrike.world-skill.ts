import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvSpellstrike = {
  id: "01a0f3d0-9d1c-758b-a959-229e76a286b7",
  type: "page-type/world-skill",
  slug: "overwhere-iv-spellstrike",
  title: "Spellstrike",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A Spellblade skill: a spell worked through a held weapon's blow, for less mana.",
  manaCost: 0,
  durationMinutes: 0,
} as const satisfies WorldSkill
