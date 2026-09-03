import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const diplomat = {
  id: "019e624a-12c5-79ba-a5dc-59b38c7d5322",
  pageTypeSlug: "temper-skill",
  slug: "diplomat",
  title: "Diplomat",
  key: "diplomat",
  baseName: "Diplomat",
  description:
    '"Increases your experience gain with the One Hand and Shield skill line by 15%.\\n\\nIncreases your gold gained by 1%."',
  icon: "/esoui/art/icons/ability_templar_027.dds",
  esoSkillId: 36312,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "racial-imperial-skills",
  skillType: "passive",
  subcategoryId: "racial-imperial-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
