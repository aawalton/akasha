import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const battlefieldMobility = {
  id: "019e6226-00d5-76c0-a467-2b322f11eab2",
  pageTypeSlug: "temper-skill",
  slug: "battlefield-mobility",
  title: "Battlefield Mobility",
  key: "battlefield-mobility",
  baseName: "Battlefield Mobility",
  description: '"Reduces the Movement Speed penalty of Bracing.\\n\\nCurrent penalty: 36%"',
  icon: "/esoui/art/icons/ability_armor_009.dds",
  esoSkillId: 45473,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "passive",
  subcategoryId: "weapon-one-hand-and-shield",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
