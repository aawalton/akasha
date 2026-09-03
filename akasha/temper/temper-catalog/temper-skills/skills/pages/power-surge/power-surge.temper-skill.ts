import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const powerSurge = {
  id: "019e6245-a6ec-7a49-af23-214d329b9ee3",
  pageTypeSlug: "temper-skill",
  slug: "power-surge",
  title: "Power Surge",
  key: "power-surge",
  baseName: "Surge",
  description:
    '"Invoke Meridia\'s name to gain Major Brutality and Major Sorcery, increasing your Weapon Damage and Spell Damage by 20% for 33 seconds.\\n\\nWhile active, activating a Critical heal causes the ability to heal you and your allies around you for 2550 Health. This effect can occur once every 3 seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_power_surge.dds",
  esoSkillId: 30396,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
