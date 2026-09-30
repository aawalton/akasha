import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIiiCleansingWeave = {
  id: "01a0f211-8317-72e5-a83d-6469e0f3d6b0",
  type: "page-type/world-skill",
  slug: "overwhere-iii-cleansing-weave",
  title: "Cleansing Weave",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "A thread of holy current drawn through blight, unpicking it strand by strand with a slow white-gold light.",
  manaCost: 3,
  durationMinutes: 5,
} as const satisfies WorldSkill
