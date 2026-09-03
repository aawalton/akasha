import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const recuperativeTreatise = {
  id: "019e6245-a702-7256-b44b-300648742341",
  pageTypeSlug: "temper-skill",
  slug: "recuperative-treatise",
  title: "Recuperative Treatise",
  key: "recuperative-treatise",
  baseName: "Tome-Bearer's Inspiration",
  description:
    '"Etch a series of runes onto your weapon that pulse with power once every 5 seconds. Each pulse enhances your class abilities, and striking an enemy with one deals an additional 1161 Magic Damage, restores 600 Magicka and Stamina, and generates Crux if you have none.\\n\\nWhile slotted on either ability bar, gain Major Brutality and Major Sorcery, increasing your Weapon and Spell Damage by 20%."',
  icon: "/esoui/art/icons/ability_arcanist_005_b.dds",
  esoSkillId: 40183047,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
