import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const circleOfProtection = {
  id: "019e6f53-9fe5-7421-9375-d34f610c2b58",
  pageTypeSlug: "temper-skill",
  slug: "circle-of-protection",
  title: "Circle of Protection",
  key: "circle-of-protection",
  baseName: "Circle of Protection",
  description:
    '"Brand the earth at your location with a rune of protection for |cffffff20|r seconds. You and your allies in the area gain Minor Protection and Minor Endurance, reducing your damage taken by |cffffff5|r% and increasing your Stamina Recovery by |cffffff15|r%."',
  icon: "/esoui/art/icons/ability_fightersguild_001.dds",
  esoSkillId: 35737,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
