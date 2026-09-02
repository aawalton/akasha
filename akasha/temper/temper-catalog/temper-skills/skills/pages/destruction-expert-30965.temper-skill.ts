import type { TemperSkill } from "../temper-skill.page-type.ts"

export const destructionExpert30965 = {
  id: "01a05fd0-8e08-7044-8ee8-46003742bd36",
  pageTypeSlug: "temper-skill",
  slug: "destruction-expert-30965",
  title: "Destruction Expert",
  key: "destruction-expert-30965",
  baseName: "Destruction Expert",
  description:
    '"When you kill an enemy with a Destruction Staff ability, you restore |cffffff1800|r Magicka.\\n\\nWhen you absorb damage using a Destruction Staff Damage Shield, you restore |cffffff900|r Magicka. This effect can occur once every |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_weapon_006.dds",
  esoSkillId: 30965,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 41,
  morphIndex: 0,
  rank: 41,
  skillLineId: "weapon-destruction-staff",
  skillType: "passive",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
