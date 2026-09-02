import type { TemperSkill } from "../temper-skill.page-type.ts"

export const destructionExpert = {
  id: "01a05fd0-8e08-7ce3-ac55-2ab039c4718f",
  pageTypeSlug: "temper-skill",
  slug: "destruction-expert",
  title: "Destruction Expert",
  key: "destruction-expert",
  baseName: "Destruction Expert",
  description:
    '"When you kill an enemy with a Destruction Staff ability, you restore 3600 Magicka.\\n\\nWhen you absorb damage using a Destruction Staff Damage Shield, you restore 1800 Magicka. This effect can occur once every 10 seconds."',
  icon: "/esoui/art/icons/ability_weapon_006.dds",
  esoSkillId: 45514,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-destruction-staff",
  skillType: "passive",
  subcategoryId: "weapon-destruction-staff",
  status: "unsupported",
} as const satisfies TemperSkill
