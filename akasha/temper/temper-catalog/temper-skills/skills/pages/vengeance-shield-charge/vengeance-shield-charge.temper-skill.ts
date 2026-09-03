import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceShieldCharge = {
  id: "019e6f53-a980-78b9-9fb5-4ae3eb8bdffe",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-shield-charge",
  title: "Vengeance Shield Charge",
  key: "vengeance-shield-charge",
  baseName: "Vengeance Shield Charge",
  description: '"Rush an enemy and ram them, stunning them for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_1handed_003.dds",
  esoSkillId: 240564,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "vengeance-weapon-one-hand-and-shield",
} as const satisfies TemperSkill
