import type { TemperSkill } from "../temper-skill.page-type.ts"

export const criticalRush38778 = {
  id: "01a05fd0-8ded-709b-93b6-3723dc7b6f56",
  pageTypeSlug: "temper-skill",
  slug: "critical-rush-38778",
  title: "Critical Rush",
  key: "critical-rush-38778",
  baseName: "Critical Charge",
  description:
    '"Launch across the earth and smash an enemy, dealing |cffffff4845|r Physical Damage. Deals up to |cffffff50|r% more damage based on the distance traveled.\\n\\nThis attack is always a Critical Strike."',
  icon: "/esoui/art/icons/ability_2handed_003_b.dds",
  esoSkillId: 38778,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
