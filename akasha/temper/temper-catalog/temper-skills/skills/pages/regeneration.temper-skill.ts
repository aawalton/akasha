import type { TemperSkill } from "../temper-skill.page-type.ts"

export const regeneration = {
  id: "01a05fd1-7c82-700b-a747-ecc3d883c066",
  pageTypeSlug: "temper-skill",
  slug: "regeneration",
  title: "Regeneration",
  key: "regeneration",
  baseName: "Regeneration",
  description:
    '"Share your staff\'s life-giving energy, healing you or a nearby ally for |cffffff10950|r Health over |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_002.dds",
  esoSkillId: 28536,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
