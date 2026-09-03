import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const darkVigor = {
  id: "019e6245-a640-7984-a547-a860a1b1f4b9",
  pageTypeSlug: "temper-skill",
  slug: "dark-vigor",
  title: "Dark Vigor",
  key: "dark-vigor",
  baseName: "Dark Vigor",
  description:
    '"Increases your Max Health by 5% for each Shadow ability slotted.\\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_sorcerer_044.dds",
  esoSkillId: 45084,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-shadow",
  skillType: "passive",
  subcategoryId: "nightblade-shadow",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
