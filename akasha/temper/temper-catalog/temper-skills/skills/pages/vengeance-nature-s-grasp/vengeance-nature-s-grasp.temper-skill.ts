import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceNatureSGrasp = {
  id: "01a05fd2-1e79-7936-afd1-ef70275e4db6",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-nature-s-grasp",
  title: "Vengeance Nature's Grasp",
  key: "vengeance-nature-s-grasp",
  baseName: "Vengeance Nature's Grasp",
  description:
    '"Launch a vine to swing yourself to an ally, healing them for |cffffff13388|r Health."',
  icon: "/esoui/art/icons/ability_warden_011.dds",
  esoSkillId: 238071,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-green-balance",
  skillType: "active",
  subcategoryId: "vengeance-warden-green-balance",
} as const satisfies TemperSkill
