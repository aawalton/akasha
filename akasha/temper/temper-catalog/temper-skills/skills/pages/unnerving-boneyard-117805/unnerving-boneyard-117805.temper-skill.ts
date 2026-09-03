import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unnervingBoneyard117805 = {
  id: "019e6f53-a88e-7616-8970-82f6f2abe36b",
  pageTypeSlug: "temper-skill",
  slug: "unnerving-boneyard-117805",
  title: "Unnerving Boneyard",
  key: "unnerving-boneyard-117805",
  baseName: "Boneyard",
  description:
    '"Desecrate the ground at the target location, dealing |cffffff11110|r Frost Damage over |cffffff10|r seconds to enemies inside and applying Major Breach and Minor Vulnerability, reducing Physical and Spell Resistance by |cffffff5948|r and increasing damage taken by |cffffff5|r% for |cffffff4.1|r seconds each tick.\\n\\nConsumes a corpse on cast to deal |cffffff30|r% more damage.\\n\\nAn ally in the area can activate the Grave Robber synergy, dealing |cffffff8261|r Frost Damage to nearby enemies and healing for the damage done."',
  icon: "/esoui/art/icons/ability_necromancer_004_a.dds",
  esoSkillId: 117805,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "necromancer-grave-lord",
  skillType: "active",
  subcategoryId: "necromancer-grave-lord",
} as const satisfies TemperSkill
