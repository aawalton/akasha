import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cutpurse = {
  id: "019e624a-12c4-7739-87f3-6cc555a094a6",
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
