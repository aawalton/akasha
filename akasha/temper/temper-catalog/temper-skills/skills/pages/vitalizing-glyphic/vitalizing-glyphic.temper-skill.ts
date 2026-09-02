import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vitalizingGlyphic = {
  id: "01a05fd2-1e93-7fd0-8f4a-b9f67b4c5f20",
  pageTypeSlug: "temper-skill",
  slug: "vitalizing-glyphic",
  title: "Vitalizing Glyphic",
  key: "vitalizing-glyphic",
  baseName: "Vitalizing Glyphic",
  description:
    '"Summon an Apocryphal glyphic, which you and your allies can heal. The glyphic spawns at |cffffff30|r% Health and grows stronger the more you heal it.\\n\\nThe power within the glyphic grants up to |cffffff200|r Weapon and Spell Damage and heals you and your allies around it for up to |cffffff2921|r Health every |cffffff1|r second in proportion to its Health."',
  icon: "/esoui/art/icons/ability_arcanist_018.dds",
  esoSkillId: 183709,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "ultimate",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
