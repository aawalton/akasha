import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const wreckingBlow38807 = {
  id: "019e6f53-aa04-763a-a73f-80f29cf4a4ac",
  pageTypeSlug: "temper-skill",
  slug: "wrecking-blow-38807",
  title: "Wrecking Blow",
  key: "wrecking-blow-38807",
  baseName: "Uppercut",
  description:
    '"Slam an enemy with an upward swing, dealing |cffffff9595|r Physical Damage.\\n\\nGrants you Major Berserk and Empower for |cffffff3|r seconds, increasing damage done by |cffffff10|r% and increasing damage done with Heavy Attacks against monsters by |cffffff70|r%."',
  icon: "/esoui/art/icons/ability_2handed_001_b.dds",
  esoSkillId: 38807,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 2,
  rank: 2,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
