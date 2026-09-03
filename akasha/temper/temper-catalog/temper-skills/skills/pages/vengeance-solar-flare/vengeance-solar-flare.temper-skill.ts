import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSolarFlare = {
  id: "019e6f53-a98c-7180-8ebd-1910e66ac729",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-solar-flare",
  title: "Vengeance Solar Flare",
  key: "vengeance-solar-flare",
  baseName: "Vengeance Solar Flare",
  description:
    '"Conjure a ball of solar energy to heave at an enemy, dealing |cffffff15025|r Magic Damage to them."',
  icon: "/esoui/art/icons/ability_templar_solar_flare.dds",
  esoSkillId: 237953,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "vengeance-templar-dawns-wrath",
} as const satisfies TemperSkill
