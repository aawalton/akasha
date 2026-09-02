import type { TemperSkill } from "../temper-skill.page-type.ts"

export const annulment = {
  id: "01a05fd0-434b-7ea5-8ff2-d9d4b23fb031",
  pageTypeSlug: "temper-skill",
  slug: "annulment",
  title: "Annulment",
  key: "annulment",
  baseName: "Annulment",
  description:
    '"Convert a portion of your Magicka into a protective ward, gaining a damage shield that absorbs |cffffff5046|r damage for |cffffff6|r seconds. Damage shield strength capped at |cffffff50|r% of your Max Health."',
  icon: "/esoui/art/icons/ability_armor_003.dds",
  esoSkillId: 29338,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "armor-light-armor",
  skillType: "active",
  subcategoryId: "armor-light-armor",
} as const satisfies TemperSkill
