import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const followUp = {
  id: "01a05fd0-dc91-71c1-b99a-d737de928ea8",
  pageTypeSlug: "temper-skill",
  slug: "follow-up",
  title: "Follow Up",
  key: "follow-up",
  baseName: "Follow Up",
  description:
    '"When you complete a fully-charged Heavy Attack, your damage done with Two Handed attacks increases by 10% for 4 seconds."',
  icon: "/esoui/art/icons/passive_dragonknight_016.dds",
  esoSkillId: 45446,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-two-handed",
  skillType: "passive",
  subcategoryId: "weapon-two-handed",
  status: "unsupported",
} as const satisfies TemperSkill
