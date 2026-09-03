import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const puncture = {
  id: "019e6f53-a55f-7403-a23c-13c508797884",
  pageTypeSlug: "temper-skill",
  slug: "puncture",
  title: "Puncture",
  key: "puncture",
  baseName: "Puncture",
  description:
    '"Thrust your weapon with disciplined precision at an enemy, dealing |cffffff4036|r Physical Damage and taunting them to attack you for |cffffff15|r seconds.\\n\\nAlso inflicts Major Breach on the enemy, reducing their Physical and Spell Resistance by |cffffff5948|r for |cffffff15|r seconds."',
  icon: "/esoui/art/icons/ability_1handed_002.dds",
  esoSkillId: 28306,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
