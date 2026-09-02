import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceTheImperfectRing = {
  id: "01a05fd2-1e8c-7273-9a70-7e88b79d7afb",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-the-imperfect-ring",
  title: "Vengeance The Imperfect Ring",
  key: "vengeance-the-imperfect-ring",
  baseName: "Vengeance The Imperfect Ring",
  description:
    '"Summon a flawed rune under an enemy that etches them and up to 2 foes nearby with scrawled glyphs, dealing |cffffff14172|r Magic Damage over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_arcanist_004.dds",
  esoSkillId: 238225,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
