import type { TemperSkill } from "../temper-skill.page-type.ts"

export const rapidStrikes = {
  id: "01a05fd1-2e2b-7c6f-a4ab-1c92621ea64d",
  pageTypeSlug: "temper-skill",
  slug: "rapid-strikes",
  title: "Rapid Strikes",
  key: "rapid-strikes",
  baseName: "Flurry",
  description:
    '"Flood an enemy with steel, battering them with four consecutive attacks that each deal 689 Physical Damage.\\n\\nEach hit increases the damage of the subsequent hit by 5%."',
  icon: "/esoui/art/icons/ability_dualwield_002_b.dds",
  esoSkillId: 40590,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
