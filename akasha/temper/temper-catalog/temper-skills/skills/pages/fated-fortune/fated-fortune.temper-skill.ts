import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fatedFortune = {
  id: "019e6245-a680-71b7-b269-65d3840a53b0",
  pageTypeSlug: "temper-skill",
  slug: "fated-fortune",
  title: "Fated Fortune",
  key: "fated-fortune",
  baseName: "Fated Fortune",
  description:
    '"Warp fate when you generate or consume Crux, increasing your Critical Damage and Critical Healing by 12% for 7 seconds."',
  icon: "/esoui/art/icons/passive_arcanist_04.dds",
  esoSkillId: 184847,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "passive",
  subcategoryId: "arcanist-herald-of-the-tome",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
