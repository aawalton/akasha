import type { TemperSkill } from "../temper-skill.page-type.ts"

export const proximityDetonation = {
  id: "01a05fd1-2e1e-7e22-86df-b1047ac99786",
  pageTypeSlug: "temper-skill",
  slug: "proximity-detonation",
  title: "Proximity Detonation",
  key: "proximity-detonation",
  baseName: "Magicka Detonation",
  description:
    '"Activate a magical bomb on yourself that explodes after 8 seconds, dealing 449 Magic Damage to all enemies in the area.\\n\\nEach enemy within the bomb\'s radius increases the damage by 100%, including the original target."',
  icon: "/esoui/art/icons/ability_ava_proximity_detonation.dds",
  esoSkillId: 63302,
  isMorph: true,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 2,
  rank: 12,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
