import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const venomArrow = {
  id: "019e6226-011d-7ec5-80f5-518c45102e32",
  pageTypeSlug: "temper-skill",
  slug: "venom-arrow",
  title: "Venom Arrow",
  key: "venom-arrow",
  baseName: "Poison Arrow",
  description:
    '"Shoot an arrow coated in Shadowscale poison at an enemy, dealing 1161 Poison Damage and an additional 3470 Poison Damage over 20 seconds.\\n\\nIf the enemy hit is casting an ability they are interrupted, set Off Balance, and stunned for 3 seconds.\\n\\nAfter casting you gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage for 20 seconds."',
  icon: "/esoui/art/icons/ability_bow_002_a.dds",
  esoSkillId: 40823,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
