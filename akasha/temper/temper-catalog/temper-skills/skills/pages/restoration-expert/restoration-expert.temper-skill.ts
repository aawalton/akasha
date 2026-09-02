import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const restorationExpert = {
  id: "01a05fd1-7c92-74fa-bbb2-624f0c5e0ab6",
  pageTypeSlug: "temper-skill",
  slug: "restoration-expert",
  title: "Restoration Expert",
  key: "restoration-expert",
  baseName: "Restoration Expert",
  description: '"Increases your healing by 15% on allies under 30% Health."',
  icon: "/esoui/art/icons/ability_templar_016.dds",
  esoSkillId: 45519,
  isMorph: false,
  learnedLevel: 17,
  lineRankNeeded: 17,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-restoration-staff",
  skillType: "passive",
  subcategoryId: "weapon-restoration-staff",
  status: "unsupported",
} as const satisfies TemperSkill
