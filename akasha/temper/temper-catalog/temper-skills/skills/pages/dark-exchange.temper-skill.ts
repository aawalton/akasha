import type { TemperSkill } from "../temper-skill.page-type.ts"

export const darkExchange = {
  id: "01a05fd0-8dfa-77bc-8697-f065e1b4ef08",
  pageTypeSlug: "temper-skill",
  slug: "dark-exchange",
  title: "Dark Exchange",
  key: "dark-exchange",
  baseName: "Dark Exchange",
  description:
    '"Bargain with darkness to restore |cffffff8160|r Health and |cffffff3600|r Magicka instantly, and an additional |cffffff2400|r Magicka over |cffffff20|r seconds. \\n\\nThe exchange also grants you Minor Berserk for |cffffff20|r seconds, increasing your damage done by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_sorcerer_dark_exchange.dds",
  esoSkillId: 24584,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
