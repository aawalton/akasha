import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const forwardMomentum = {
  id: "019e6226-00f6-7058-b41d-ad3838271d3a",
  pageTypeSlug: "temper-skill",
  slug: "forward-momentum",
  title: "Forward Momentum",
  key: "forward-momentum",
  baseName: "Momentum",
  description:
    '"Focus your strength and resolve to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20%, as well as gaining Minor Endurance, increasing your Stamina Recovery by 15% for 40 seconds.\\n\\nActivating this ability removes all snares and immobilizations from you and grants immunity to them for 4 seconds."',
  icon: "/esoui/art/icons/ability_2handed_005_a.dds",
  esoSkillId: 39892,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
