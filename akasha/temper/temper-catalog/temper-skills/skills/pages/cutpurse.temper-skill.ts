import type { TemperSkill } from "../temper-skill.page-type.ts"

export const cutpurse = {
  id: "01a05fd0-8df3-7b0c-a665-1d8ef394d089",
  pageTypeSlug: "temper-skill",
  slug: "cutpurse",
  title: "Cutpurse",
  key: "cutpurse",
  baseName: "Cutpurse",
  description:
    '"Increases your experience gain with the Medium Armor skill line by 15%.\\n\\nIncreases your chance to successfully pickpocket by 5%."',
  icon: "/esoui/art/icons/ability_armor_010.dds",
  esoSkillId: 36063,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "racial-khajiit-skills",
  skillType: "passive",
  subcategoryId: "racial-khajiit-skills",
  status: "unsupported",
} as const satisfies TemperSkill
