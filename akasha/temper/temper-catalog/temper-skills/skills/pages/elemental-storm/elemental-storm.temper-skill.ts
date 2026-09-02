import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalStorm = {
  id: "01a05fd0-8e18-729f-8bc6-16b0062ae450",
  pageTypeSlug: "temper-skill",
  slug: "elemental-storm",
  title: "Elemental Storm",
  key: "elemental-storm",
  baseName: "Elemental Storm",
  description:
    '"Create a cataclysmic storm at the target location that builds for |cffffff2|r seconds then lays waste to all enemies in the area, dealing |cffffff6057|r Magic Damage every |cffffff1|r second for |cffffff7|r seconds."',
  icon: "/esoui/art/icons/ability_destructionstaff_012.dds",
  esoSkillId: 83619,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "weapon-destruction-staff",
  skillType: "ultimate",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
