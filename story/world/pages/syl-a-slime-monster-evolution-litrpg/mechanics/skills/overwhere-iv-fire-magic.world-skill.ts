import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvFireMagic = {
  id: "01a0ed30-cadd-750e-838d-77aa58c2ef09",
  type: "page-type/world-skill",
  slug: "overwhere-iv-fire-magic",
  title: "Fire Magic",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The elemental magic of flame and heat.",
  manaCost: 4,
  durationMinutes: 0,
} as const satisfies WorldSkill
