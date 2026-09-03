import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceTheUnblinkingEye = {
  id: "019e6f53-a9a0-747a-92ee-9351aeae8d9f",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-the-unblinking-eye",
  title: "Vengeance The Unblinking Eye",
  key: "vengeance-the-unblinking-eye",
  baseName: "Vengeance The Unblinking Eye",
  description:
    '"Tear open the fabric of the Aurbis to summon a scion of Hermaeus Mora to attack your target. This being casts forth a beam that rends asunder reality after |cffffff0.6|r seconds, dealing |cffffff31500|r Magic Damage to the enemy over |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_arcanist_006.dds",
  esoSkillId: 238228,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-herald-of-the-tome",
  skillType: "ultimate",
  subcategoryId: "vengeance-arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
