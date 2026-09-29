import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvWaterMagic = {
  id: "01a0ed30-cadd-70ae-a77e-2eb156ccf2f0",
  type: "page-type/world-skill",
  slug: "overwhere-iv-water-magic",
  title: "Water Magic",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The elemental magic of water, from a drink conjured to a lashing stream.",
  manaCost: 4,
  durationMinutes: 0,
} as const satisfies WorldSkill
