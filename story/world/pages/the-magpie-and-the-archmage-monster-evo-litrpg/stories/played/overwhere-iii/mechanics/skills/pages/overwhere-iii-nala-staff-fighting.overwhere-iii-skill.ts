import type { OverwhereIiiSkill } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/skills/overwhere-iii-skill.page-type.types.ts"

export const overwhereIiiNalaStaffFighting = {
  id: "01a0fd4e-875f-7713-80a4-6befcb57ed9e",
  type: "page-type/overwhere-iii-skill",
  slug: "overwhere-iii-nala-staff-fighting",
  title: "Nala's Staff Fighting",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description:
    "Fighting with a quarterstaff: guarding, stepping aside, and striking with either end.",
  character: "character-player/overwhere-iii-nala",
  skill: "world-skill/overwhere-iii-staff-fighting",
  level: 1,
} as const satisfies OverwhereIiiSkill
