import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const reach = {
  id: "01a05fd1-2e2d-71f4-8c74-49f078a4cdd7",
  pageTypeSlug: "temper-skill",
  slug: "reach",
  title: "Reach",
  key: "reach",
  baseName: "Reach",
  description:
    '"Increases the range of long-range abilities by 5 meters while near a keep or outpost.\\n\\nAny ability with a range greater than 28 meters is affected."',
  icon: "/esoui/art/icons/ability_weapon_001.dds",
  esoSkillId: 45621,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 2,
  skillLineId: "alliance-war-assault",
  skillType: "passive",
  subcategoryId: "alliance-war-assault",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
