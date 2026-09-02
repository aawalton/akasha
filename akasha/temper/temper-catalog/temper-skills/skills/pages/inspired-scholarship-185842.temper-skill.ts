import type { TemperSkill } from "../temper-skill.page-type.ts"

export const inspiredScholarship185842 = {
  id: "01a05fd0-dcc8-7b37-bc37-ca82d92a76f0",
  pageTypeSlug: "temper-skill",
  slug: "inspired-scholarship-185842",
  title: "Inspired Scholarship",
  key: "inspired-scholarship-185842",
  baseName: "Tome-Bearer's Inspiration",
  description:
    '"Etch a series of runes onto your weapon that pulse with power once every |cffffff3|r seconds. Each pulse enhances your class abilities, and striking an enemy with one deals an additional |cffffff3253|r Magic Damage and generates Crux if you have none.\\n\\nWhile slotted on either ability bar, gain Major Brutality and Major Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r%."',
  icon: "/esoui/art/icons/ability_arcanist_005_a.dds",
  esoSkillId: 185842,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
