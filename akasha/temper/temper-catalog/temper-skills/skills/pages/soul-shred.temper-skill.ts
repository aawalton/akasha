import type { TemperSkill } from "../temper-skill.page-type.ts"

export const soulShred = {
  id: "01a05fd1-7cd3-73ce-9bb9-b272abccbd93",
  pageTypeSlug: "temper-skill",
  slug: "soul-shred",
  title: "Soul Shred",
  key: "soul-shred",
  baseName: "Soul Shred",
  description:
    '"Ravage nearby enemies\' souls with a night rune, dealing |cffffff12802|r Magic Damage and stunning them for |cffffff4|r seconds. \\n\\nAn ally can target a ravaged enemy and activate the Soul Leech synergy, dealing |cffffff10851|r Magic Damage to them and healing for the damage caused."',
  icon: "/esoui/art/icons/ability_nightblade_018.dds",
  esoSkillId: 25091,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "nightblade-siphoning",
  skillType: "ultimate",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
