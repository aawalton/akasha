import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIiiCurrentLash = {
  id: "01a0ed1d-a291-7bbb-925f-388972097e83",
  type: "page-type/world-skill",
  slug: "overwhere-iii-current-lash",
  title: "Current Lash",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description: "Raw mana pulled from the currents and loosed as a lash, a shove or a ward.",
  manaCost: 2,
  durationMinutes: 1,
} as const satisfies WorldSkill
