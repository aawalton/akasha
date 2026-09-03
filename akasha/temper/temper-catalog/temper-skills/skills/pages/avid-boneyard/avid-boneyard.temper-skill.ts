import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const avidBoneyard = {
  id: "019e6245-a5f0-7cf4-9e5d-a75ade5014ed",
  pageTypeSlug: "temper-skill",
  slug: "avid-boneyard",
  title: "Avid Boneyard",
  key: "avid-boneyard",
  baseName: "Boneyard",
  description:
    '"Desecrate the ground at the target location, dealing 3190 Frost Damage over 10 seconds to enemies inside and applying Minor Vulnerability, increasing their damage taken by 5%.\\n\\nConsumes a corpse on cast to deal 30% more damage.\\n\\nYou or an ally in the area can activate the Grave Robber synergy, dealing 2249 Frost Damage to enemies and healing for the damage done."',
  icon: "/esoui/art/icons/ability_necromancer_004_b.dds",
  esoSkillId: 40117850,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
