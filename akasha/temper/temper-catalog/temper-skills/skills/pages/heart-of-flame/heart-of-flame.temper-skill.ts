import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const heartOfFlame = {
  id: "019e6f53-a2f9-722e-9dc6-a1a2ef6c51ad",
  pageTypeSlug: "temper-skill",
  slug: "heart-of-flame",
  title: "Heart of Flame",
  key: "heart-of-flame",
  baseName: "Core of Flame",
  description:
    '"Let the fire within draw heat to your heart, restoring |cffffff15|r% of your missing Health and |cffffff15|r% of your missing Magicka and Stamina every |cffffff2|r seconds over |cffffff4|r seconds.\\n\\nWhen this ability completes, you release this heat as a blast of fire that deals |cffffff7361|r Flame Damage to nearby enemies."',
  icon: "/esoui/art/icons/ability_dragonknight_012_b.dds",
  esoSkillId: 32785,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
