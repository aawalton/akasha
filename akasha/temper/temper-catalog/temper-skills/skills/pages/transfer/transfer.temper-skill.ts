import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const transfer = {
  id: "01a05fd1-d270-7b33-ac1a-2ebf19e7869c",
  pageTypeSlug: "temper-skill",
  slug: "transfer",
  title: "Transfer",
  key: "transfer",
  baseName: "Transfer",
  description:
    '"Casting a Siphoning ability while in combat generates 2 Ultimate. This effect can occur once every 4 seconds."',
  icon: "/esoui/art/icons/passive_sorcerer_002.dds",
  esoSkillId: 45145,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "nightblade-siphoning",
  skillType: "passive",
  subcategoryId: "nightblade-siphoning",
  status: "unsupported",
} as const satisfies TemperSkill
