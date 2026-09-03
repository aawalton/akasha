import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ringOfPreservation = {
  id: "019e6238-c304-70c5-b39d-c2179391c1af",
  pageTypeSlug: "temper-skill",
  slug: "ring-of-preservation",
  title: "Ring of Preservation",
  key: "ring-of-preservation",
  baseName: "Circle of Protection",
  description:
    '"Brand the earth at your location with a rune of protection for 10 seconds. You and your allies in the area gain Minor Protection and Minor Endurance, reducing damage taken by 5% and increasing Stamina Recovery by 15%, and are healed for 435 Health every 1 second."',
  icon: "/esoui/art/icons/ability_fightersguild_001_b.dds",
  esoSkillId: 42548,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
