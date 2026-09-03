import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fulminatingRune182988 = {
  id: "019e6f53-a262-73a2-aa7e-9e391b8c0107",
  pageTypeSlug: "temper-skill",
  slug: "fulminating-rune-182988",
  title: "Fulminating Rune",
  key: "fulminating-rune-182988",
  baseName: "The Imperfect Ring",
  description:
    '"Summon an explosive rune under an enemy that etches foes nearby with scrawled glyphs, dealing |cffffff15235|r Magic Damage over |cffffff20|r seconds.\\n\\nThe rune lingers on the initial target for |cffffff6|r seconds before detonating, dealing |cffffff5288|r Frost Damage to enemies within 7 meters. Rune detonation cannot be primed with Fulminating Rune again for |cffffff6|r seconds.\\n\\nUp to 3 allies near the initial target can activate the Runebreak synergy, dealing |cffffff9914|r Frost Damage to enemies within 7 meters."',
  icon: "/esoui/art/icons/ability_arcanist_004_b.dds",
  esoSkillId: 182988,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
