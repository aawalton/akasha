import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const opportunist = {
  id: "01a05fd1-2e0a-7a8c-8872-1e1bfc7a7679",
  pageTypeSlug: "temper-skill",
  slug: "opportunist",
  title: "Opportunist",
  key: "opportunist",
  baseName: "Opportunist",
  description:
    '"Increases your experience gain with the Light Armor skill line by 15%.\\n\\nIncreases your Alliance Points gained by 1%."',
  icon: "/esoui/art/icons/ability_sorcerer_010.dds",
  esoSkillId: 36247,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "racial-breton-skills",
  skillType: "passive",
  subcategoryId: "racial-breton-skills",
  status: "unsupported",
} as const satisfies TemperSkill
