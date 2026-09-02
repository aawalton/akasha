import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSilverBolts = {
  id: "01a05fd2-1e87-7b3e-ac92-f1993b48756c",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-silver-bolts",
  title: "Vengeance Silver Bolts",
  key: "vengeance-silver-bolts",
  baseName: "Vengeance Silver Bolts",
  description:
    '"Fire a Dawnguard Vampire Hunter\'s crossbow bolt to strike an enemy, dealing |cffffff10017|r Physical Damage."',
  icon: "/esoui/art/icons/ability_fightersguild_003.dds",
  esoSkillId: 246070,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-fighters-guild",
  skillType: "active",
  subcategoryId: "vengeance-guild-fighters-guild",
} as const satisfies TemperSkill
