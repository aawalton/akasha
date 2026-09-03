import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const theLanguidEye = {
  id: "019e6245-a751-7613-8e03-0caaa7e45399",
  pageTypeSlug: "temper-skill",
  slug: "the-languid-eye",
  title: "The Languid Eye",
  key: "the-languid-eye",
  baseName: "The Unblinking Eye",
  description:
    "\"Tear open the fabric of the Aurbis to summon a scion of Hermaeus Mora. This being casts forth a beam that rends asunder reality for 6 seconds that deals 1115 Magic Damage to enemies within 5 meters every 0.5 seconds and snares them by 50% for 3 seconds. Every 0.5 seconds, the beam's damage increases by 7%.\\n\\nThe scion's beam can be repositioned by recasting The Languid Eye.\"",
  icon: "/esoui/art/icons/ability_arcanist_006_b.dds",
  esoSkillId: 40189867,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "ultimate",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
