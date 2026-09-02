import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSunFire = {
  id: "01a05fd2-1e8a-78b0-ade9-317dd5aa3eb9",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-sun-fire",
  title: "Vengeance Sun Fire",
  key: "vengeance-sun-fire",
  baseName: "Vengeance Sun Fire",
  description:
    '"Blast an enemy with a charge of radiant heat, dealing |cffffff17008|r Flame Damage over |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_templar_sun_fire.dds",
  esoSkillId: 237949,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "vengeance-templar-dawns-wrath",
} as const satisfies TemperSkill
