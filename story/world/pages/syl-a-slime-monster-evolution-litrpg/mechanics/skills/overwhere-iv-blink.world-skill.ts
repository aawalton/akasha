import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvBlink = {
  id: "01a0ed1c-03da-7cd2-a410-2c60745860c5",
  type: "page-type/world-skill",
  slug: "overwhere-iv-blink",
  title: "Blink",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "A spell of Dimension Magic: a step through space to a spot in sight, with no ground between.",
  manaCost: 5,
  durationMinutes: 0,
} as const satisfies WorldSkill
