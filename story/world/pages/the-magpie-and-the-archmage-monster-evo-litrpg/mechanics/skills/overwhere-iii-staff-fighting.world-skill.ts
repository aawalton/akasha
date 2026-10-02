import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIiiStaffFighting = {
  id: "01a0fd47-b8a9-7ea3-8229-25aeff53c7f0",
  type: "page-type/world-skill",
  slug: "overwhere-iii-staff-fighting",
  title: "Staff Fighting",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "Fighting with a quarterstaff: guarding, stepping aside, and striking with either end.",
  manaCost: 0,
} as const satisfies WorldSkill
