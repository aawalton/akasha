import type { TemperSkill } from "../temper-skill.page-type.ts"

export const graveGrasp = {
  id: "01a05fd0-dca0-7f3c-8be3-f07fdc9dbd6f",
  pageTypeSlug: "temper-skill",
  slug: "grave-grasp",
  title: "Grave Grasp",
  key: "grave-grasp",
  baseName: "Grave Grasp",
  description:
    '"Summon three patches of skeletal claws from the ground in front of you. Enemies in the first area are snared by |cffffff30|r% for |cffffff5|r seconds, immobilized in the second area for |cffffff4|r seconds, and stunned in the final area for |cffffff3|r seconds.\\n\\nEach patch applies Minor Maim to enemies hit for |cffffff10|r seconds, reducing their damage done by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_necromancer_009.dds",
  esoSkillId: 115177,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
