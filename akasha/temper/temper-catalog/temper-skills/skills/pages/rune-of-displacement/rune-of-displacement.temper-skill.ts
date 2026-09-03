import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runeOfDisplacement = {
  id: "019e6245-a718-75fa-bcda-86dc582b1417",
  pageTypeSlug: "temper-skill",
  slug: "rune-of-displacement",
  title: "Rune of Displacement",
  key: "rune-of-displacement",
  baseName: "The Imperfect Ring",
  description:
    '"Summon a discharging rune under an enemy. After 2 seconds the rune pulses, pulling in foes between 2 to 10 meters and etching them with scrawled glyphs that deal 4780 Magic Damage over 18 seconds.\\n\\nAn ally near the initial target can activate the Runebreak synergy, dealing 2698 Frost Damage to enemies within 7 meters."',
  icon: "/esoui/art/icons/ability_arcanist_004_a.dds",
  esoSkillId: 40185839,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
