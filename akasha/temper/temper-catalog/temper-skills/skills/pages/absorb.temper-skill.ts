import type { TemperSkill } from "../temper-skill.page-type.ts"

export const absorb = {
  id: "01a05fd0-433a-78ab-85db-99397059fa13",
  pageTypeSlug: "temper-skill",
  slug: "absorb",
  title: "Absorb",
  key: "absorb",
  baseName: "Absorb",
  description:
    '"Restores 600 Magicka whenever you block an attack. This effect can occur once every .25 seconds."',
  icon: "/esoui/art/icons/ability_weapon_010.dds",
  esoSkillId: 45521,
  isMorph: false,
  learnedLevel: 46,
  lineRankNeeded: 46,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-restoration-staff",
  skillType: "passive",
  subcategoryId: "weapon-restoration-staff",
  status: "unsupported",
} as const satisfies TemperSkill
