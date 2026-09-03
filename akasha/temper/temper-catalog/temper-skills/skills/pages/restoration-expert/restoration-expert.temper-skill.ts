import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const restorationExpert = {
  id: "019e6226-010d-7f3d-a316-4b2aec39cd1d",
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
  effects: "jsonl",
} as const satisfies TemperSkill
