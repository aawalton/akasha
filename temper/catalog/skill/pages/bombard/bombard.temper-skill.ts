import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const bombard = {
  id: "019e6226-00d9-76e0-b4e2-cb73c9658313",
  type: "page-type/temper-skill",
  slug: "bombard",
  title: "Bombard",
  key: "bombard",
  baseName: "Arrow Spray",
  description:
    "Fire a burst of arrows in one shot, dealing 1742 Physical Damage to enemies in front of you. \n\nEnemies hit are immobilized for 4 seconds.",
  icon: "/esoui/art/icons/ability_bow_005_a.dds",
  esoSkillId: 40777,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 139,
  createdAt: "2026-05-26T02:38:38.297Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077476 MaxStat + 0.81349 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, Direct, R2 = 1)",
    "<<2>> = 4 seconds (Constant)",
  ],
} as const satisfies TemperSkill
