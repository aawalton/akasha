import type { TemperSkill } from "../temper-skill.page-type.ts"

export const magnumShot = {
  id: "01a05fd1-2df5-77ee-8377-1ee9b8225890",
  pageTypeSlug: "temper-skill",
  slug: "magnum-shot",
  title: "Magnum Shot",
  key: "magnum-shot",
  baseName: "Scatter Shot",
  description:
    '"Blast an enemy with an explosive arrow, dealing 1727 Physical Damage and knocking them back 8 meters."',
  icon: "/esoui/art/icons/ability_bow_004_b.dds",
  esoSkillId: 40869,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
