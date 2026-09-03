import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const absorb = {
  id: "019e6226-00c9-71c2-bddf-5450f422d024",
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
  effects: "jsonl",
} as const satisfies TemperSkill
