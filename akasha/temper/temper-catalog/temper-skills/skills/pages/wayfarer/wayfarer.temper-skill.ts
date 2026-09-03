import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const wayfarer = {
  id: "019e624a-12e6-7c5c-89d5-df7e1a07d1aa",
  pageTypeSlug: "temper-skill",
  slug: "wayfarer",
  title: "Wayfarer",
  key: "wayfarer",
  baseName: "Wayfarer",
  description:
    '"Increases your experience gain with the One Hand and Shield skill line by 15%.\\n\\nIncreases the duration of any eaten food by 15 minutes."',
  icon: "/esoui/art/icons/ability_templar_027.dds",
  esoSkillId: 84680,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "racial-redguard-skills",
  skillType: "passive",
  subcategoryId: "racial-redguard-skills",
  status: "unsupported",
} as const satisfies TemperSkill
