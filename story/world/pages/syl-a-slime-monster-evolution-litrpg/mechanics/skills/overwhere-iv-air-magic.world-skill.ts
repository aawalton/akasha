import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvAirMagic = {
  id: "01a0ed30-cadc-771f-aadf-bf7185704688",
  type: "page-type/world-skill",
  slug: "overwhere-iv-air-magic",
  title: "Air Magic",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The elemental magic of wind and breath.",
  manaCost: 4,
  durationMinutes: 0,
} as const satisfies WorldSkill
