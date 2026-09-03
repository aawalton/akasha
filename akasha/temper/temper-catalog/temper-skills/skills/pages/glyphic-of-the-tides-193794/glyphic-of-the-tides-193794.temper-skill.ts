import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const glyphicOfTheTides193794 = {
  id: "019e6f53-a293-73ac-9423-e96e96fc3656",
  pageTypeSlug: "temper-skill",
  slug: "glyphic-of-the-tides-193794",
  title: "Glyphic of the Tides",
  key: "glyphic-of-the-tides-193794",
  baseName: "Vitalizing Glyphic",
  description:
    '"Summon an Apocryphal glyphic, which you and your allies can heal. The glyphic spawns at |cffffff53|r% Health and grows stronger the more you heal it.\\n\\nThe power within the glyphic grants up to |cffffff200|r Weapon and Spell Damage and heals you and your allies around it for up to |cffffff2921|r Health every |cffffff1|r second in proportion to its Health.\\n\\nAt full Health the glyphic grants Major Protection, reducing damage taken by |cffffff10|r%."',
  icon: "/esoui/art/icons/ability_arcanist_018_a.dds",
  esoSkillId: 193794,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "ultimate",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
