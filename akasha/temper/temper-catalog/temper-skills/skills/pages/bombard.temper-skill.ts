import type { TemperSkill } from "../temper-skill.page-type.ts"

export const bombard = {
  id: "01a05fd0-4376-7e83-8199-4e232bfa4fef",
  pageTypeSlug: "temper-skill",
  slug: "bombard",
  title: "Bombard",
  key: "bombard",
  baseName: "Arrow Spray",
  description:
    '"Fire a burst of arrows in one shot, dealing 1742 Physical Damage to enemies in front of you. \\n\\nEnemies hit are immobilized for 4 seconds."',
  icon: "/esoui/art/icons/ability_bow_005_a.dds",
  esoSkillId: 40777,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
