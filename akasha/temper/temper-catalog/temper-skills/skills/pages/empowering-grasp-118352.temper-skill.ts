import type { TemperSkill } from "../temper-skill.page-type.ts"

export const empoweringGrasp118352 = {
  id: "01a05fd0-8e1c-78de-b0a8-3eff94ab29ea",
  pageTypeSlug: "temper-skill",
  slug: "empowering-grasp-118352",
  title: "Empowering Grasp",
  key: "empowering-grasp-118352",
  baseName: "Grave Grasp",
  description:
    '"Summon three patches of skeletal claws from the ground in front of you. Enemies in the first area are snared by |cffffff30|r% for |cffffff5|r seconds, immobilized in the second area for |cffffff4|r seconds, and stunned in the final area for |cffffff3|r seconds.\\n\\nEach area applies Major Maim to enemies and Empower to your allies for |cffffff10|r seconds, reducing enemy damage done by |cffffff10|r% and allied Heavy Attack Damage against monsters by |cffffff70|r%."',
  icon: "/esoui/art/icons/ability_necromancer_009_a.dds",
  esoSkillId: 118352,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
