import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lethalArrow38685 = {
  id: "019e6f53-a3df-756e-8f55-f131dab266d3",
  pageTypeSlug: "temper-skill",
  slug: "lethal-arrow-38685",
  title: "Lethal Arrow",
  key: "lethal-arrow-38685",
  baseName: "Snipe",
  description:
    '"Plant a masterfully aimed arrow in an enemy\'s vital spot, dealing |cffffff8635|r Poison Damage and applying the Poisoned status effect.\\n\\nAlso afflicts enemy with Minor Defile, which reduces their healing received and damage shield strength by |cffffff6|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_bow_001_a.dds",
  esoSkillId: 38685,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
