import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const advancedSpecies86068 = {
  id: "019e6f53-9e99-7d50-a393-5ea31db151d9",
  type: "page-type/temper-skill",
  slug: "advanced-species-86068",
  title: "Advanced Species",
  key: "advanced-species-86068",
  baseName: "Advanced Species",
  description:
    '"Increases your Critical Damage by |cffffff2|r% for each Animal Companion ability slotted.\\n\\nCurrent Bonus: |cffffff0|r%."',
  icon: "/esoui/art/icons/passive_warden_011.dds",
  esoSkillId: 86068,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
