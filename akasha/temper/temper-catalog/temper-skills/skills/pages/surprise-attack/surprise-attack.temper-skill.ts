import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const surpriseAttack = {
  id: "019e6245-a74d-71df-8b2a-1692fa278e42",
  pageTypeSlug: "temper-skill",
  slug: "surprise-attack",
  title: "Surprise Attack",
  key: "surprise-attack",
  baseName: "Veiled Strike",
  description:
    '"Slash an enemy, dealing 2399 Physical Damage and applying the Sundered status effect.\\n\\nIf you strike an enemy from their flank you set them Off Balance. This attack will also be guaranteed to be a Critical Strike, up to once every 3 seconds."',
  icon: "/esoui/art/icons/ability_nightblade_002_a.dds",
  esoSkillId: 36234,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
