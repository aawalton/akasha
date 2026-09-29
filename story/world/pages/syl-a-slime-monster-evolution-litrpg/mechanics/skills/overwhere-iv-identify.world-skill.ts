import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvIdentify = {
  id: "01a0ed30-cadd-72bc-8be1-fcb6e5fd6156",
  type: "page-type/world-skill",
  slug: "overwhere-iv-identify",
  title: "Identify",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A skill that shows a being's name, race, class and levels, or what a thing is.",
  manaCost: 1,
  durationMinutes: 0,
} as const satisfies WorldSkill
