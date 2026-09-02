import type { TemperSkill } from "../temper-skill.page-type.ts"

export const advancedSpecies = {
  id: "01a05fd0-4341-7ea0-9c84-3d5253b0ef97",
  pageTypeSlug: "temper-skill",
  slug: "advanced-species",
  title: "Advanced Species",
  key: "advanced-species",
  baseName: "Advanced Species",
  description:
    '"Increases your Critical Damage by 5% for each Animal Companion ability slotted.\\n\\nCurrent Bonus: 0%."',
  icon: "/esoui/art/icons/passive_warden_011.dds",
  esoSkillId: 86069,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-animal-companions",
  skillType: "passive",
  subcategoryId: "warden-animal-companions",
  status: "supported",
} as const satisfies TemperSkill
