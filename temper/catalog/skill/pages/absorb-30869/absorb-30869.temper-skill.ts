import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const absorb30869 = {
  id: "019e6f53-9e80-70a4-a7d0-5c11407177a4",
  type: "page-type/temper-skill",
  slug: "absorb-30869",
  title: "Absorb",
  key: "absorb-30869",
  baseName: "Absorb",
  description:
    "Restores |cffffff300|r Magicka whenever you block an attack. This effect can occur once every |cffffff.25|r seconds.",
  icon: "/esoui/art/icons/ability_weapon_010.dds",
  esoSkillId: 30869,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 28,
  morphIndex: 0,
  rank: 28,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/passive",
  hashPlace: 3,
  createdAt: "2026-05-28T16:03:31.584Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 300 (Constant)"],
} as const satisfies TemperSkill
