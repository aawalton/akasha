import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSunShield = {
  id: "019e6f53-a997-795a-82ad-121dfd407df9",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-sun-shield",
  title: "Vengeance Sun Shield",
  key: "vengeance-sun-shield",
  baseName: "Vengeance Sun Shield",
  description:
    '"Summon the warmth of the sun to surround you and the 2 closest group members, granting a damage shield that absorbs up to |cffffff15341|r damage for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_templar_sun_shield.dds",
  esoSkillId: 237890,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-aedric-spear",
  skillType: "active",
  subcategoryId: "vengeance-templar-aedric-spear",
} as const satisfies TemperSkill
