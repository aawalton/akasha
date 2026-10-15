import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const agility = {
  id: "019e6238-c28d-7382-b246-b7cafaa2982c",
  type: "page-type/temper-skill",
  slug: "agility",
  title: "Agility",
  key: "agility",
  baseName: "Agility",
  description:
    "Increases your Weapon and Spell Damage by 2% for each piece of Medium Armor worn.\n\nCurrent bonus: 0%.",
  icon: "/esoui/art/icons/ability_armor_010.dds",
  esoSkillId: 45572,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/armor-medium-armor",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 25,
  createdAt: "2026-05-26T02:59:07.533Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 2% (Constant)",
    "<<2>> = 2 MediumArmor (Medium Armor, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
