import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const undeath = {
  id: "019e6251-4cfb-79f0-99c6-7f15eb1b7670",
  pageTypeSlug: "temper-skill",
  slug: "undeath",
  title: "Undeath",
  key: "undeath",
  baseName: "Undeath",
  description:
    '"Reduces your damage taken by up to 15% based on your missing Health.\\n\\nCurrent bonus: 1%"',
  icon: "/esoui/art/icons/passive_u26_vampire_03.dds",
  esoSkillId: 33090,
  isMorph: false,
  learnedLevel: 9,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-vampire",
  skillType: "passive",
  subcategoryId: "world-vampire",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
