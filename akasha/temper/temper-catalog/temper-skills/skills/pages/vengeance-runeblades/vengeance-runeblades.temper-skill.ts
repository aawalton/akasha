import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRuneblades = {
  id: "01a05fd2-1e83-7ecc-bceb-898b2b9ba961",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-runeblades",
  title: "Vengeance Runeblades",
  key: "vengeance-runeblades",
  baseName: "Vengeance Runeblades",
  description:
    '"Craft an Apocryphal rune before launching it at a foe, dealing |cffffff10017|r Magic Damage and generating Crux."',
  icon: "/esoui/art/icons/ability_arcanist_001.dds",
  esoSkillId: 238169,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
