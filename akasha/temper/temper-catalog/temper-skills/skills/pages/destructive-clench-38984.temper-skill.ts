import type { TemperSkill } from "../temper-skill.page-type.ts"

export const destructiveClench38984 = {
  id: "01a05fd0-8e09-7037-aa47-d5c8bc9ad042",
  pageTypeSlug: "temper-skill",
  slug: "destructive-clench-38984",
  title: "Destructive Clench",
  key: "destructive-clench-38984",
  baseName: "Destructive Touch",
  description:
    '"Devastate an enemy with an enhanced charge from your staff, dealing |cffffff4038|r Magic Damage.\\n\\nThe initial hit always applies the element\'s status effect.\\n\\nFlame Clench also knocks the enemy back.\\n\\nFrost Clench deals less damage, has increased range, applies Major Maim, immobilizes, and taunts the enemy.\\n\\nShock Clench converts the attack into an area of effect explosion."',
  icon: "/esoui/art/icons/ability_destructionstaff_005_a.dds",
  esoSkillId: 38984,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 14,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
