import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ringOfPreservation40169 = {
  id: "01a05fd1-7c9c-72aa-8af0-651b701f7fdb",
  pageTypeSlug: "temper-skill",
  slug: "ring-of-preservation-40169",
  title: "Ring of Preservation",
  key: "ring-of-preservation-40169",
  baseName: "Circle of Protection",
  description:
    '"Brand the earth at your location with a rune of protection for |cffffff10|r seconds. You and your allies in the area gain Minor Protection and Minor Endurance, reducing damage taken by |cffffff5|r% and increasing Stamina Recovery by |cffffff15|r%, and are healed for |cffffff1371|r Health every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_fightersguild_001_b.dds",
  esoSkillId: 40169,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "guild-fighters-guild",
  skillType: "active",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
