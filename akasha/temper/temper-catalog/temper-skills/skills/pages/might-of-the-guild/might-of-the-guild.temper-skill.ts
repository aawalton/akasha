import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mightOfTheGuild = {
  id: "01a05fd1-2dfe-7a4a-95b4-a15cd5e91faf",
  pageTypeSlug: "temper-skill",
  slug: "might-of-the-guild",
  title: "Might of the Guild",
  key: "might-of-the-guild",
  baseName: "Might of the Guild",
  description:
    '"Casting a Mages Guild ability grants you Empower, increasing the damage of your Heavy Attacks against monsters by 70% for 10 seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoSkillId: 45607,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-mages-guild",
  skillType: "passive",
  subcategoryId: "guild-mages-guild",
  status: "unsupported",
} as const satisfies TemperSkill
