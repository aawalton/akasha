import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magickaAid = {
  id: "019e6251-4cd0-79b4-8702-6b1b98ec2224",
  pageTypeSlug: "temper-skill",
  slug: "magicka-aid",
  title: "Magicka Aid",
  key: "magicka-aid",
  baseName: "Magicka Aid",
  description:
    '"Increases your Magicka Recovery by 10% for each Support ability slotted.\\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_sorcerer_038.dds",
  esoSkillId: 45622,
  isMorph: false,
  learnedLevel: 9,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 2,
  skillLineId: "alliance-war-support",
  skillType: "passive",
  subcategoryId: "alliance-war-support",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
