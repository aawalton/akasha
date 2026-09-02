import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const platingsExpertise = {
  id: "01a05fd1-2e14-74ab-9d69-3bb52ae1f0fc",
  pageTypeSlug: "temper-skill",
  slug: "platings-expertise",
  title: "Platings Expertise",
  key: "platings-expertise",
  baseName: "Platings Expertise",
  description: '"More than doubles the chances of improving items with platings."',
  icon: "/esoui/art/icons/passive_platingexpertise.dds",
  esoSkillId: 103648,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-jewelry-crafting",
  skillType: "passive",
  subcategoryId: "craft-jewelry-crafting",
} as const satisfies TemperSkill
