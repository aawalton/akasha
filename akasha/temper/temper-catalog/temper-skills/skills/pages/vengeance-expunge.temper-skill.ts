import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceExpunge = {
  id: "01a05fd1-d2a0-7dfd-abf6-97c4180105aa",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-expunge",
  title: "Vengeance Expunge",
  key: "vengeance-expunge",
  baseName: "Vengeance Expunge",
  description:
    '"Embrace the power of death, removing up to |cffffff2|r negative effects from yourself.\\n\\nWhile slotted on either bar you gain |cffffff150|r Health, Magicka, and Stamina Recovery."',
  icon: "/esoui/art/icons/ability_necromancer_014.dds",
  esoSkillId: 238255,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-living-death",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-living-death",
} as const satisfies TemperSkill
