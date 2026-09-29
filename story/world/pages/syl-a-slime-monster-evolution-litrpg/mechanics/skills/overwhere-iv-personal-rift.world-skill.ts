import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvPersonalRift = {
  id: "01a0ed2b-3867-749a-bf4f-bcd3243bde6e",
  type: "page-type/world-skill",
  slug: "overwhere-iv-personal-rift",
  title: "Personal Rift",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "A spell of Dimension Magic: a sphere of the caster's own space, where things move at her will.",
  manaCost: 10,
  durationMinutes: 10,
} as const satisfies WorldSkill
