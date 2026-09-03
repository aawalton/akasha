import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const proximityDetonation61500 = {
  id: "019e6f53-a552-7092-a00d-9c2fcabcd5a8",
  pageTypeSlug: "temper-skill",
  slug: "proximity-detonation-61500",
  title: "Proximity Detonation",
  key: "proximity-detonation-61500",
  baseName: "Magicka Detonation",
  description:
    '"Activate a magical bomb on yourself that explodes after |cffffff8|r seconds, dealing |cffffff1652|r Magic Damage to all enemies in the area.\\n\\nEach enemy within the bomb\'s radius increases the damage by |cffffff100|r%, including the original target."',
  icon: "/esoui/art/icons/ability_ava_proximity_detonation.dds",
  esoSkillId: 61500,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 2,
  rank: 7,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
