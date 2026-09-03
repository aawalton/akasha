import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceVitalizingGlyphic = {
  id: "019e6f53-a9ab-7c6e-b32b-0156061f3f21",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-vitalizing-glyphic",
  title: "Vengeance Vitalizing Glyphic",
  key: "vengeance-vitalizing-glyphic",
  baseName: "Vengeance Vitalizing Glyphic",
  description:
    '"Call forth an Apocryphal glyphic for |cffffff6|r seconds, which heals you or up to 3 allies around it for |cffffff9180|r Health every |cffffff1|r second and grants Major Force while in the area, increasing Critical Damage by |cffffff20|r%."',
  icon: "/esoui/art/icons/ability_arcanist_018.dds",
  esoSkillId: 238549,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-curative-runeforms",
  skillType: "ultimate",
  subcategoryId: "vengeance-arcanist-curative-runeforms",
} as const satisfies TemperSkill
