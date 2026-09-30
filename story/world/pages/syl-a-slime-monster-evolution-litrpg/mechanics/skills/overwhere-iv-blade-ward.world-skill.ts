import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvBladeWard = {
  id: "01a0f3d0-9d1b-77d0-808b-2c2b3d028620",
  type: "page-type/world-skill",
  slug: "overwhere-iv-blade-ward",
  title: "Blade Ward",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A Spellblade skill: mana hardened along a held weapon, to turn a blow aside.",
  manaCost: 3,
  durationMinutes: 1,
} as const satisfies WorldSkill
