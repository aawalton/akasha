import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIiiGust = {
  id: "01a0f181-909d-78f9-b549-2d1c364286d0",
  type: "page-type/world-skill",
  slug: "overwhere-iii-gust",
  title: "Gust",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description: "A short, hard blast of wind from the open palm.",
  manaCost: 2,
} as const satisfies WorldSkill
