import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const carpentry = {
  id: "01a05fd0-4387-7dd5-b291-0953c3b38deb",
  pageTypeSlug: "temper-skill",
  slug: "carpentry",
  title: "Carpentry",
  key: "carpentry",
  baseName: "Carpentry",
  description:
    '"Reduces research times by 25%, limits research time to 30 days, and allows the research of three items at once."',
  icon: "/esoui/art/icons/crafting_forester_plug_component_002.dds",
  esoSkillId: 58783,
  isMorph: false,
  learnedLevel: 45,
  lineRankNeeded: 45,
  morphIndex: 0,
  rank: 4,
  skillLineId: "craft-woodworking",
  skillType: "passive",
  subcategoryId: "craft-woodworking",
} as const satisfies TemperSkill
