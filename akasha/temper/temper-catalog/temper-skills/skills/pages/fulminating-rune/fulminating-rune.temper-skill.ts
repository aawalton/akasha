import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fulminatingRune = {
  id: "019e6245-a68d-7c0b-a3eb-8dcdbb55446f",
  pageTypeSlug: "temper-skill",
  slug: "fulminating-rune",
  title: "Fulminating Rune",
  key: "fulminating-rune",
  baseName: "The Imperfect Ring",
  description:
    '"Summon an explosive rune under an enemy that etches foes nearby with scrawled glyphs, dealing 4642 Magic Damage over 20 seconds.\\n\\nThe rune lingers on the initial target for 6 seconds before detonating, dealing 1438 Frost Damage to enemies within 7 meters. Rune detonation cannot be primed with Fulminating Rune again for 6 seconds.\\n\\nUp to 3 allies near the initial target can activate the Runebreak synergy, dealing 2698 Frost Damage to enemies within 7 meters."',
  icon: "/esoui/art/icons/ability_arcanist_004_b.dds",
  esoSkillId: 40182988,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
