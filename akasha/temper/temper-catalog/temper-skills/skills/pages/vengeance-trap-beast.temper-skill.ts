import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceTrapBeast = {
  id: "01a05fd2-1e8c-71bb-92d8-65843ba3af00",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-trap-beast",
  title: "Vengeance Trap Beast",
  key: "vengeance-trap-beast",
  baseName: "Vengeance Trap Beast",
  description:
    '"Set a sharpened blade trap under your target that deals |cffffff10500|r Bleed Damage over |cffffff5|r seconds, and immobilizes them for |cffffff2|r seconds.\\n\\nThe trap cannot be blocked."',
  icon: "/esoui/art/icons/ability_fightersguild_004.dds",
  esoSkillId: 246275,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-guild-fighters-guild",
  skillType: "active",
  subcategoryId: "vengeance-guild-fighters-guild",
} as const satisfies TemperSkill
