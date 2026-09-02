import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const metallurgy48160 = {
  id: "01a05fd1-2dfd-7edc-8aa4-cb0428914c56",
  pageTypeSlug: "temper-skill",
  slug: "metallurgy-48160",
  title: "Metallurgy",
  key: "metallurgy-48160",
  baseName: "Metallurgy",
  description: '"Reduces research times by 5% and allows the research of two items at once."',
  icon: "/esoui/art/icons/crafting_runecrafter_armor_vendor_component_002.dds",
  esoSkillId: 48160,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "craft-blacksmithing",
  skillType: "passive",
  subcategoryId: "craft-blacksmithing",
} as const satisfies TemperSkill
