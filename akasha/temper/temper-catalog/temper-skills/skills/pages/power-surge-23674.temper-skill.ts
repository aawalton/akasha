import type { TemperSkill } from "../temper-skill.page-type.ts"

export const powerSurge23674 = {
  id: "01a05fd1-2e1a-70bf-939f-354b35195a5a",
  pageTypeSlug: "temper-skill",
  slug: "power-surge-23674",
  title: "Power Surge",
  key: "power-surge-23674",
  baseName: "Surge",
  description:
    '"Invoke Meridia\'s name to gain Major Brutality and Major Sorcery, increasing your Weapon Damage and Spell Damage by |cffffff20|r% for |cffffff33|r seconds.\\n\\nWhile active, activating a Critical heal causes the ability to heal you and your allies around you for |cffffff2601|r Health. This effect can occur once every |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_power_surge.dds",
  esoSkillId: 23674,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
