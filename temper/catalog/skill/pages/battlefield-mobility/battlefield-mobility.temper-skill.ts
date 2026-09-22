import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const battlefieldMobility = {
  id: "019e6226-00d5-76c0-a467-2b322f11eab2",
  type: "page-type/temper-skill",
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
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
