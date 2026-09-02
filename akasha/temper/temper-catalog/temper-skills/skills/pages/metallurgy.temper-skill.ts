import type { TemperSkill } from "../temper-skill.page-type.ts"

export const metallurgy = {
  id: "01a05fd1-2dfd-74c2-80a6-65c5cc6bc1c6",
  pageTypeSlug: "temper-skill",
  slug: "metallurgy",
  title: "Metallurgy",
  key: "metallurgy",
  baseName: "Metallurgy",
  description:
    '"Reduces research times by 25%, limits research time to 30 days, and allows the research of three items at once."',
  icon: "/esoui/art/icons/crafting_runecrafter_armor_vendor_component_002.dds",
  esoSkillId: 58784,
  isMorph: false,
  learnedLevel: 45,
  lineRankNeeded: 45,
  morphIndex: 0,
  rank: 4,
  skillLineId: "craft-blacksmithing",
  skillType: "passive",
  subcategoryId: "craft-blacksmithing",
} as const satisfies TemperSkill
