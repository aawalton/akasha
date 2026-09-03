import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const inspiredScholarship = {
  id: "019e6245-a6b3-74b9-b10c-06430282fa6b",
  pageTypeSlug: "temper-skill",
  slug: "inspired-scholarship",
  title: "Inspired Scholarship",
  key: "inspired-scholarship",
  baseName: "Tome-Bearer's Inspiration",
  description:
    '"Etch a series of runes onto your weapon that pulse with power once every 3 seconds. Each pulse enhances your class abilities, and striking an enemy with one deals an additional 935 Magic Damage and generates Crux if you have none.\\n\\nWhile slotted on either ability bar, gain Major Brutality and Major Sorcery, increasing your Weapon and Spell Damage by 20%."',
  icon: "/esoui/art/icons/ability_arcanist_005_a.dds",
  esoSkillId: 40185842,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
