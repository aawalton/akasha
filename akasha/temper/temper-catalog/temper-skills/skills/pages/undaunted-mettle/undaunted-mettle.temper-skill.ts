import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const undauntedMettle = {
  id: "019e6238-c329-76dd-96b9-91e2459f70a0",
  pageTypeSlug: "temper-skill",
  slug: "undaunted-mettle",
  title: "Undaunted Mettle",
  key: "undaunted-mettle",
  baseName: "Undaunted Mettle",
  description:
    '"Increases your Max Health, Stamina, and Magicka by 2% per type of Armor (Heavy, Medium, Light) that you have equipped. \\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_armor_014.dds",
  esoSkillId: 55386,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-undaunted",
  skillType: "passive",
  subcategoryId: "guild-undaunted",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
