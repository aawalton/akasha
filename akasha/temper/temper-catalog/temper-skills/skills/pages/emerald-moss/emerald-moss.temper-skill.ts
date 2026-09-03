import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const emeraldMoss = {
  id: "019e6245-a661-7d7b-905a-6f129f72797e",
  pageTypeSlug: "temper-skill",
  slug: "emerald-moss",
  title: "Emerald Moss",
  key: "emerald-moss",
  baseName: "Emerald Moss",
  description:
    '"Increases your healing done with Green Balance abilities by 5% for each Green Balance ability slotted.\\n\\nCurrent Bonus: 0%."',
  icon: "/esoui/art/icons/passive_warden_005.dds",
  esoSkillId: 85877,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-green-balance",
  skillType: "passive",
  subcategoryId: "warden-green-balance",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
