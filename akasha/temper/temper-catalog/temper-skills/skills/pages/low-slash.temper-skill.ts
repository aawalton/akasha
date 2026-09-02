import type { TemperSkill } from "../temper-skill.page-type.ts"

export const lowSlash = {
  id: "01a05fd1-2ded-7418-a041-0f8381a01264",
  pageTypeSlug: "temper-skill",
  slug: "low-slash",
  title: "Low Slash",
  key: "low-slash",
  baseName: "Low Slash",
  description:
    '"Surprise an enemy with a deep lunge, dealing |cffffff4846|r Physical Damage and afflicting them with Minor Maim, reducing their damage done by |cffffff5|r% for |cffffff15|r seconds."',
  icon: "/esoui/art/icons/ability_1handed_001.dds",
  esoSkillId: 28304,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
