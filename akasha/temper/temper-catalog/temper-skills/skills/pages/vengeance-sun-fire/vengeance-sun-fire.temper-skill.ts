import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSunFire = {
  id: "019e6f53-a996-7284-b69f-ec24567cab99",
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
