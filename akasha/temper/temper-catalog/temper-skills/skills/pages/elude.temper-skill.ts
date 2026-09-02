import type { TemperSkill } from "../temper-skill.page-type.ts"

export const elude = {
  id: "01a05fd0-8e1a-7a1a-8f82-2849e1e99766",
  pageTypeSlug: "temper-skill",
  slug: "elude",
  title: "Elude",
  key: "elude",
  baseName: "Evasion",
  description:
    '"Shroud yourself in mist to gain Major Evasion, reducing damage taken from area attacks by 20% for 16 seconds.\\n\\nWhile this effect is active, when you take damage from a direct area of effect attack you gain Major Expedition for 0 seconds, increasing your Movement Speed by 30%. \\n\\nEach piece of Medium Armor worn increases the duration of this ability."',
  icon: "/esoui/art/icons/ability_armor_002_b.dds",
  esoSkillId: 41137,
  isMorph: true,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 2,
  rank: 12,
  skillLineId: "armor-medium-armor",
  skillType: "active",
  subcategoryId: "armor-medium-armor",
} as const satisfies TemperSkill
