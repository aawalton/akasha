import type { TemperSkill } from "../temper-skill.page-type.ts"

export const restorationExpert30980 = {
  id: "01a05fd1-7c92-7bbb-9c4f-981fc30547ab",
  pageTypeSlug: "temper-skill",
  slug: "restoration-expert-30980",
  title: "Restoration Expert",
  key: "restoration-expert-30980",
  baseName: "Restoration Expert",
  description: '"Increases your healing by |cffffff8|r% on allies under |cffffff30|r% Health."',
  icon: "/esoui/art/icons/ability_templar_016.dds",
  esoSkillId: 30980,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "weapon-restoration-staff",
  skillType: "passive",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
