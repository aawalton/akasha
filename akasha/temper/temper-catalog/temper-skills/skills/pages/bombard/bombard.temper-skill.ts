import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bombard = {
  id: "019e6226-00d9-76e0-b4e2-cb73c9658313",
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
