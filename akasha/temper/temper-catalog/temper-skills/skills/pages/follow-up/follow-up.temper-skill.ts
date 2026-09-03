import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const followUp = {
  id: "019e6226-00f2-7c16-9995-54924f771bb5",
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
  effects: "jsonl",
} as const satisfies TemperSkill
