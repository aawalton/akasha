import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bombard38705 = {
  id: "01a05fd0-4376-7c01-9f23-1c698575c695",
  pageTypeSlug: "temper-skill",
  slug: "bombard-38705",
  title: "Bombard",
  key: "bombard-38705",
  baseName: "Arrow Spray",
  description:
    '"Fire a burst of arrows in one shot, dealing |cffffff6401|r Physical Damage to enemies in front of you. \\n\\nEnemies hit are immobilized for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_bow_005_a.dds",
  esoSkillId: 38705,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
