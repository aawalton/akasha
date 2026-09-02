import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSoulShred = {
  id: "01a05fd2-1e88-759d-9bf3-f0ad61eb334f",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-soul-shred",
  title: "Vengeance Soul Shred",
  key: "vengeance-soul-shred",
  baseName: "Vengeance Soul Shred",
  description:
    '"Ravage up to 3 nearby enemies\' souls with a night rune, dealing |cffffff20285|r Magic Damage and stunning them for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_018.dds",
  esoSkillId: 237722,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-siphoning",
  skillType: "ultimate",
  subcategoryId: "vengeance-nightblade-siphoning",
} as const satisfies TemperSkill
