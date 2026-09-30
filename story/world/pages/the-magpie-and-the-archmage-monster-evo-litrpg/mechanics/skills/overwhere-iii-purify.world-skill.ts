import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIiiPurify = {
  id: "01a0f1ba-4ccd-7d99-92a2-f2fe38477432",
  type: "page-type/world-skill",
  slug: "overwhere-iii-purify",
  title: "Purify",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "A white-gold holy light that burns away blight, curses and afflictions from what it touches.",
  manaCost: 5,
} as const satisfies WorldSkill
