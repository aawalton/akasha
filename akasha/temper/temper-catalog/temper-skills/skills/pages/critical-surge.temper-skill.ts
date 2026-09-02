import type { TemperSkill } from "../temper-skill.page-type.ts"

export const criticalSurge = {
  id: "01a05fd0-8ded-791e-9573-d87596e677f8",
  pageTypeSlug: "temper-skill",
  slug: "critical-surge",
  title: "Critical Surge",
  key: "critical-surge",
  baseName: "Surge",
  description:
    '"Invoke Meridia\'s name to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20% for 33 seconds.\\n\\nWhile active, dealing Critical Damage heals you for 3300 Health. This effect can occur once every 1 second."',
  icon: "/esoui/art/icons/ability_sorcerer_critical_surge.dds",
  esoSkillId: 30406,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
