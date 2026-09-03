import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const empoweringGrasp = {
  id: "019e6245-a663-7705-ac0b-3ff651f649d1",
  pageTypeSlug: "temper-skill",
  slug: "empowering-grasp",
  title: "Empowering Grasp",
  key: "empowering-grasp",
  baseName: "Grave Grasp",
  description:
    '"Summon three patches of skeletal claws from the ground in front of you. Enemies in the first area are snared by 30% for 5 seconds, immobilized in the second area for 4 seconds, and stunned in the final area for 3 seconds.\\n\\nEach area applies Major Maim to enemies and Empower to your allies for 10 seconds, reducing enemy damage done by 10% and allied Heavy Attack Damage against monsters by 70%."',
  icon: "/esoui/art/icons/ability_necromancer_009_a.dds",
  esoSkillId: 40118352,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
