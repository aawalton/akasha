import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const adrenalineRush = {
  id: "019e624a-12bb-7319-8fe4-6abb0101350d",
  type: "page-type/temper-skill",
  slug: "adrenaline-rush",
  title: "Adrenaline Rush",
  key: "adrenaline-rush",
  baseName: "Adrenaline Rush",
  description:
    "When you deal damage, you restore 1005 Stamina. This effect can occur once every 5 seconds.",
  icon: "/esoui/art/icons/ability_armor_012.dds",
  esoSkillId: 45315,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/racial-redguard-skills",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  hashPlace: 17,
  createdAt: "2026-05-26T03:18:02.171Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 1005 (Constant)", "<<2>> = 5 seconds (Constant)"],
} as const satisfies TemperSkill
