import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const glyphicOfTheTides = {
  id: "019e6245-a693-7c43-80cb-a5249f3ca2ad",
  pageTypeSlug: "temper-skill",
  slug: "glyphic-of-the-tides",
  title: "Glyphic of the Tides",
  key: "glyphic-of-the-tides",
  baseName: "Vitalizing Glyphic",
  description:
    '"Summon an Apocryphal glyphic, which you and your allies can heal. The glyphic spawns at 53% Health and grows stronger the more you heal it.\\n\\nThe power within the glyphic grants up to 200 Weapon and Spell Damage and heals you and your allies around it for up to 928 Health every 1 second in proportion to its Health.\\n\\nAt full Health the glyphic grants Major Protection, reducing damage taken by 10%."',
  icon: "/esoui/art/icons/ability_arcanist_018_a.dds",
  esoSkillId: 40193794,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "ultimate",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
