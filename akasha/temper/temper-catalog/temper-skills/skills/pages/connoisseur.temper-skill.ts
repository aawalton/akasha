import type { TemperSkill } from "../temper-skill.page-type.ts"

export const connoisseur = {
  id: "01a05fd0-43a0-7f2f-bc91-51d01657bcdf",
  pageTypeSlug: "temper-skill",
  slug: "connoisseur",
  title: "Connoisseur",
  key: "connoisseur",
  baseName: "Connoisseur",
  description: '"Adds 20 minutes to the duration of any consumed drink."',
  icon: "/esoui/art/icons/ability_provisioner_005.dds",
  esoSkillId: 44615,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-provisioning",
  skillType: "passive",
  subcategoryId: "craft-provisioning",
} as const satisfies TemperSkill
