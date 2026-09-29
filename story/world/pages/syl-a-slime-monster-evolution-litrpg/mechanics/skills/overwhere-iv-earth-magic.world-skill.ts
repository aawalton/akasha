import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvEarthMagic = {
  id: "01a0ed30-cadd-74f7-80c0-126e4d85dbd7",
  type: "page-type/world-skill",
  slug: "overwhere-iv-earth-magic",
  title: "Earth Magic",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The elemental magic of soil and stone.",
  manaCost: 4,
  durationMinutes: 0,
} as const satisfies WorldSkill
