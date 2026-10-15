import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const athletics = {
  id: "019e6238-c293-78ef-8bf0-2f9ef588e311",
  type: "page-type/temper-skill",
  slug: "athletics",
  title: "Athletics",
  key: "athletics",
  baseName: "Athletics",
  description:
    "Increases the Movement Speed bonus of Sprint by 3% for each piece of Medium Armor equipped.\n\nCurrent bonus: 0%.\n\nReduces the cost of Roll Dodge by 4% for each piece of Medium Armor equipped.\n\nCurrent bonus: 0%.",
  icon: "/esoui/art/icons/ability_armor_009.dds",
  esoSkillId: 45574,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/armor-medium-armor",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 57,
  createdAt: "2026-05-26T02:59:07.539Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3 MediumArmor (Medium Armor, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 4 (Constant)",
    "<<3>> = 4 MediumArmor (Medium Armor, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
