import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const naturesGift = {
  id: "019e6245-a6d8-7282-8f0c-adc48bda6e8c",
  pageTypeSlug: "temper-skill",
  slug: "natures-gift",
  title: "Nature's Gift",
  key: "natures-gift",
  baseName: "Nature's Gift",
  description:
    '"When you heal an ally with a Green Balance ability, you gain 277 Magicka or 277 Stamina, whichever resource pool is lower. This effect can occur once every 1 second."',
  icon: "/esoui/art/icons/passive_warden_006.dds",
  esoSkillId: 85879,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-green-balance",
  skillType: "passive",
  subcategoryId: "warden-green-balance",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
