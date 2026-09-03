import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceHearthfire = {
  id: "019e6f53-a924-79e5-9ad8-8bba3a194f79",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-hearthfire",
  title: "Vengeance Hearthfire",
  key: "vengeance-hearthfire",
  baseName: "Vengeance Hearthfire",
  description:
    '"Tend to a warming tinder that heals up to 3 of you and your allies for |cffffff12048|r Health."',
  icon: "/esoui/art/icons/ability_dragonknight_016.dds",
  esoSkillId: 237788,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-ardent-flame",
} as const satisfies TemperSkill
