import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceCircleOfProtection = {
  id: "01a05fd1-d291-7dee-9440-0792cb4ad935",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-circle-of-protection",
  title: "Vengeance Circle of Protection",
  key: "vengeance-circle-of-protection",
  baseName: "Vengeance Circle of Protection",
  description:
    '"Brand the earth at your location with a rune of protection, granting up to 3 of you and your allies Major Protection, reducing their damage taken by |cffffff10|r% for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_001.dds",
  esoSkillId: 246071,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-fighters-guild",
  skillType: "active",
  subcategoryId: "vengeance-guild-fighters-guild",
} as const satisfies TemperSkill
